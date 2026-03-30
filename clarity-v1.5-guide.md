# Clarity v1.5 — Transcription & Pattern Intelligence
## Technical Implementation Guide

> This file lives in your project root alongside CLAUDE.md.
> When you are ready to build v1.5, paste this into a Claude session
> along with your CLAUDE.md and say: "I am ready to build v1.5 transcription.
> Start with Step 1."

---

## Overview

v1.5 adds three things to the existing app:
1. A Supabase cloud database that stores entry metadata and transcripts
2. OpenAI Whisper transcription called after every saved recording
3. A weekly insight card powered by Claude/GPT-4 (optional, can do later)

None of this changes anything the user sees in v1. It runs silently
in the background, accumulating data that powers v2 features.

---

## Step 1 — Supabase Setup (Do This First, Even in v1)

### 1.1 Create your Supabase project

1. Go to supabase.com and create a free account
2. Create a new project called "clarity-app"
3. Choose a region close to your users (US East for North America)
4. Save your project URL and anon key — you will need these

### 1.2 Database Schema

Run this SQL in the Supabase SQL editor.
Go to: Supabase Dashboard → SQL Editor → New Query → paste and run.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  expo_push_token text,
  streak integer default 0,
  total_entries integer default 0,
  reminder_time text default '08:00',
  active_categories text[] default array[
    'Desires & Wants', 'Avoidance', 'Values', 'Identity',
    'Fear', 'Clarity', 'Gratitude & Loss', 'Growth'
  ]
);

-- Entries table — the core table
create table entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),

  -- Prompt data
  prompt_id text not null,
  prompt_text text not null,
  category text not null,

  -- Recording data
  mode text not null check (mode in ('audio', 'video')),
  duration_seconds integer,
  file_path text,              -- local device path (v1)
  storage_url text,            -- Supabase storage URL (v2)

  -- Transcription — leave null in v1, fill in v1.5
  transcript text,
  transcript_status text default 'pending'
    check (transcript_status in ('pending', 'processing', 'complete', 'failed')),

  -- Pattern data — filled by weekly insight generation
  keywords text[],             -- extracted keywords from transcript
  sentiment text,              -- 'positive', 'neutral', 'negative'
  word_count integer,

  -- Weekly insight association
  week_number integer,         -- ISO week number
  year integer
);

-- Weekly insights table
create table weekly_insights (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  created_at timestamp with time zone default now(),

  week_number integer not null,
  year integer not null,
  entry_count integer not null,

  -- The generated insight text
  themes text[],               -- ["solitude", "avoidance", "work pressure"]
  insight_text text,           -- The full warm paragraph insight
  follow_up_question text,     -- One question to sit with next week

  -- Whether the user has seen this insight
  seen boolean default false,

  unique(user_id, week_number, year)
);

-- Indexes for fast queries
create index entries_user_id_idx on entries(user_id);
create index entries_category_idx on entries(category);
create index entries_created_at_idx on entries(created_at);
create index entries_week_idx on entries(week_number, year);
create index weekly_insights_user_idx on weekly_insights(user_id);

-- Row Level Security — users can only see their own data
alter table users enable row level security;
alter table entries enable row level security;
alter table weekly_insights enable row level security;

create policy "Users can read own data"
  on users for select using (auth.uid() = id);

create policy "Users can read own entries"
  on entries for select using (auth.uid() = user_id);

create policy "Users can insert own entries"
  on entries for insert with check (auth.uid() = user_id);

create policy "Users can update own entries"
  on entries for update using (auth.uid() = user_id);

create policy "Users can read own insights"
  on weekly_insights for select using (auth.uid() = user_id);
```

### 1.3 Install Supabase in your Expo project

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
```

### 1.4 Create Supabase client (`utils/supabase.js`)

```javascript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

Replace SUPABASE_URL and SUPABASE_ANON_KEY with your actual values
from Supabase Dashboard → Settings → API.

---

## Step 2 — Whisper Transcription

### 2.1 How it works

After the user taps "Save to archive" on the review screen:
1. Save the entry to Supabase with transcript_status = 'pending'
2. Send the audio file to OpenAI Whisper API
3. Receive the transcript text
4. Update the entry row with the transcript and status = 'complete'

The user never waits for this — it happens in the background after saving.

### 2.2 Get an OpenAI API key

1. Go to platform.openai.com
2. Create an account and add a payment method
3. Generate an API key
4. Add $5 credit to start — this will transcribe roughly 833 minutes of audio

Store the key in a .env file (never commit this to git):

```
EXPO_PUBLIC_OPENAI_KEY=sk-your-key-here
```

Add .env to your .gitignore file immediately.

### 2.3 Transcription function (`utils/transcription.js`)

```javascript
import * as FileSystem from 'expo-file-system';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

/**
 * Transcribe an audio file using OpenAI Whisper
 * @param {string} audioUri - Local file URI from expo-av recording
 * @returns {string} - Transcript text
 */
export const transcribeAudio = async (audioUri) => {
  try {
    // Read the audio file as base64
    const fileInfo = await FileSystem.getInfoAsync(audioUri);
    if (!fileInfo.exists) {
      throw new Error('Audio file not found at: ' + audioUri);
    }

    // Create form data for the API request
    const formData = new FormData();
    formData.append('file', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'recording.m4a',
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');
    formData.append('response_format', 'text');

    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error('Whisper API error: ' + error);
    }

    const transcript = await response.text();
    return transcript.trim();

  } catch (error) {
    console.error('Transcription failed:', error);
    return null; // Fail silently — user experience not affected
  }
};

/**
 * Extract basic word count and keywords from transcript
 * @param {string} transcript
 * @returns {object} - { wordCount, keywords }
 */
export const analyseTranscript = (transcript) => {
  if (!transcript) return { wordCount: 0, keywords: [] };

  const words = transcript.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  // Words to ignore when finding keywords
  const stopWords = new Set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'you', 'your', 'he', 'she',
    'it', 'they', 'them', 'this', 'that', 'the', 'a', 'an', 'and', 'or',
    'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'was',
    'are', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does',
    'did', 'will', 'would', 'could', 'should', 'may', 'might', 'just',
    'like', 'really', 'very', 'so', 'what', 'when', 'where', 'how',
    'think', 'know', 'feel', 'want', 'need', 'get', 'got', 'go', 'going',
    'its', 'not', 'more', 'about', 'than', 'then', 'there', 'their',
  ]);

  // Count word frequency (excluding stop words)
  const frequency = {};
  words.forEach((word) => {
    const clean = word.replace(/[^a-z]/g, '');
    if (clean.length > 3 && !stopWords.has(clean)) {
      frequency[clean] = (frequency[clean] || 0) + 1;
    }
  });

  // Return top 5 most frequent meaningful words
  const keywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  return { wordCount, keywords };
};
```

### 2.4 Updated saveEntry flow (`utils/storage.js` addition)

Add this function to your existing storage.js:

```javascript
import { supabase } from './supabase';
import { transcribeAudio, analyseTranscript } from './transcription';

/**
 * Save entry to Supabase and trigger background transcription
 * Call this AFTER saving locally with AsyncStorage (keep local save as backup)
 */
export const saveEntryToCloud = async (entry) => {
  try {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // Not signed in yet — skip cloud save for now

    // 2. Get current ISO week number
    const now = new Date();
    const weekNumber = getISOWeekNumber(now);
    const year = now.getFullYear();

    // 3. Insert entry with transcript_status = 'pending'
    const { data: savedEntry, error } = await supabase
      .from('entries')
      .insert({
        user_id: user.id,
        prompt_id: entry.promptId,
        prompt_text: entry.promptText,
        category: entry.category,
        mode: entry.mode,
        duration_seconds: entry.duration,
        file_path: entry.filePath,
        transcript_status: 'pending',
        week_number: weekNumber,
        year: year,
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Transcribe in background (don't await — let it run silently)
    if (entry.mode === 'audio' && entry.filePath) {
      transcribeAndUpdate(savedEntry.id, entry.filePath);
    }

    return savedEntry;

  } catch (error) {
    console.error('Cloud save failed:', error);
    // Local AsyncStorage save already succeeded — user is not affected
  }
};

/**
 * Background transcription — runs after entry is saved
 * User never waits for this
 */
const transcribeAndUpdate = async (entryId, audioUri) => {
  try {
    // Update status to processing
    await supabase
      .from('entries')
      .update({ transcript_status: 'processing' })
      .eq('id', entryId);

    // Transcribe
    const transcript = await transcribeAudio(audioUri);
    if (!transcript) throw new Error('Empty transcript');

    // Analyse
    const { wordCount, keywords } = analyseTranscript(transcript);

    // Update entry with transcript
    await supabase
      .from('entries')
      .update({
        transcript,
        transcript_status: 'complete',
        word_count: wordCount,
        keywords,
      })
      .eq('id', entryId);

  } catch (error) {
    // Mark as failed but do not surface to user
    await supabase
      .from('entries')
      .update({ transcript_status: 'failed' })
      .eq('id', entryId);
  }
};

/**
 * Get ISO week number for a date
 */
const getISOWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};
```

---

## Step 3 — Weekly Insight Generation

### 3.1 How it triggers

On Sunday evening (or after the 7th entry of the week), a function
collects all entries from that week, sends their transcripts to Claude
or GPT-4, and saves the insight to the weekly_insights table.

In v1.5 trigger this manually or on a simple entry count check.
In v2 use a Supabase Edge Function on a cron schedule.

### 3.2 Insight generation function (`utils/insights.js`)

```javascript
import { supabase } from './supabase';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

/**
 * Generate a weekly insight from all entries in the current week
 * Call this after the user's 7th entry, or on Sunday evening
 */
export const generateWeeklyInsight = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const now = new Date();
    const weekNumber = getISOWeekNumber(now);
    const year = now.getFullYear();

    // Check if insight already exists for this week
    const { data: existing } = await supabase
      .from('weekly_insights')
      .select('id')
      .eq('user_id', user.id)
      .eq('week_number', weekNumber)
      .eq('year', year)
      .single();

    if (existing) return null; // Already generated this week

    // Get all completed entries from this week
    const { data: entries, error } = await supabase
      .from('entries')
      .select('prompt_text, category, transcript, word_count, created_at')
      .eq('user_id', user.id)
      .eq('week_number', weekNumber)
      .eq('year', year)
      .eq('transcript_status', 'complete')
      .order('created_at', { ascending: true });

    if (error || !entries || entries.length < 3) return null;
    // Need at least 3 entries with transcripts to generate insight

    // Build prompt for LLM
    const entriesText = entries
      .map((e, i) =>
        `Entry ${i + 1} (${e.category}):\n` +
        `Question: "${e.prompt_text}"\n` +
        `Answer: "${e.transcript}"\n`
      )
      .join('\n---\n');

    const systemPrompt = `You are a warm, wise companion helping someone 
understand themselves better through their daily voice journal entries. 
Your tone is like a thoughtful friend — honest, caring, never clinical 
or therapist-like. You speak directly to the person as "you".`;

    const userPrompt = `Here are ${entries.length} voice journal entries 
from this person's week. Each is their spoken answer to a daily 
self-inquiry question.

${entriesText}

Please provide:
1. THEMES: List 2-3 recurring themes as simple words (e.g. ["avoidance", "work stress", "relationship"])
2. INSIGHT: Write 2-3 sentences of warm, honest observation about what you notice across these entries. 
   Point out something they may not have noticed themselves. Be specific — reference what they actually said.
3. QUESTION: One powerful follow-up question for them to sit with next week.

Respond in this exact JSON format:
{
  "themes": ["theme1", "theme2"],
  "insight": "Your insight paragraph here.",
  "question": "Your follow-up question here?"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cheap and good — ~$0.02 per insight
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('LLM API failed');

    const result = await response.json();
    const parsed = JSON.parse(result.choices[0].message.content);

    // Save insight to Supabase
    const { data: insight } = await supabase
      .from('weekly_insights')
      .insert({
        user_id: user.id,
        week_number: weekNumber,
        year: year,
        entry_count: entries.length,
        themes: parsed.themes,
        insight_text: parsed.insight,
        follow_up_question: parsed.question,
        seen: false,
      })
      .select()
      .single();

    return insight;

  } catch (error) {
    console.error('Insight generation failed:', error);
    return null;
  }
};

/**
 * Get the most recent unseen insight for the current user
 */
export const getUnseenInsight = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('weekly_insights')
    .select('*')
    .eq('user_id', user.id)
    .eq('seen', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data;
};

/**
 * Mark an insight as seen
 */
export const markInsightSeen = async (insightId) => {
  await supabase
    .from('weekly_insights')
    .update({ seen: true })
    .eq('id', insightId);
};
```

---

## Step 4 — Weekly Insight Card UI

### 4.1 Where it lives

The insight card appears in the Archive screen (`app/archive.jsx`)
below the entry list — this is already in your Stitch wireframe
as the "Weekly Synthesis" card.

### 4.2 WeeklySynthesis component (`components/WeeklySynthesis.jsx`)

```javascript
import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { getUnseenInsight, markInsightSeen } from '../utils/insights';

export default function WeeklySynthesis() {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadInsight();
  }, []);

  const loadInsight = async () => {
    const data = await getUnseenInsight();
    setInsight(data);
    setLoading(false);
  };

  const handleRead = async () => {
    setExpanded(true);
    if (insight) {
      await markInsightSeen(insight.id);
    }
  };

  if (loading) return <ActivityIndicator color="#9AB1C0" />;
  if (!insight) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>WEEKLY SYNTHESIS</Text>
        <View style={styles.themePills}>
          {insight.themes?.map((theme, i) => (
            <View key={i} style={styles.pill}>
              <Text style={styles.pillText}>{theme}</Text>
            </View>
          ))}
        </View>
      </View>

      {!expanded ? (
        <TouchableOpacity style={styles.button} onPress={handleRead}>
          <Text style={styles.buttonText}>Read this week's insight</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.insightText}>{insight.insight_text}</Text>
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel}>Sit with this next week:</Text>
            <Text style={styles.questionText}>
              {insight.follow_up_question}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(30, 45, 61, 0.15)',
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '500',
    color: '#9AB1C0',
    letterSpacing: 1,
    marginBottom: 10,
  },
  themePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    backgroundColor: 'rgba(154, 177, 192, 0.15)',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#1E2D3D',
  },
  button: {
    backgroundColor: '#1E2D3D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  insightText: {
    fontFamily: 'PlayfairDisplay',
    fontSize: 16,
    color: '#1E2D3D',
    lineHeight: 26,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  questionCard: {
    borderLeftWidth: 2,
    borderLeftColor: '#9AB1C0',
    paddingLeft: 14,
    marginTop: 8,
  },
  questionLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#8E8E93',
    marginBottom: 6,
  },
  questionText: {
    fontFamily: 'PlayfairDisplay',
    fontSize: 15,
    color: '#1E2D3D',
    lineHeight: 24,
  },
});
```

---

## Cost Estimate at Scale

| Users | Transcription/month | Insights/month | Total API cost |
|-------|--------------------|--------------|--------------  |
| 100   | ~$0.36             | ~$0.28       | ~$0.64/month   |
| 500   | ~$1.80             | ~$1.40       | ~$3.20/month   |
| 1,000 | ~$3.60             | ~$2.80       | ~$6.40/month   |
| 5,000 | ~$18.00            | ~$14.00      | ~$32.00/month  |

Assumptions: 60 second average entry, 7 entries/week/user, gpt-4o-mini pricing.
These costs are negligible relative to subscription revenue.
At $5.99/month from 1,000 users = $5,990 MRR vs $6.40 API cost.

---

## Build Order for v1.5

1. Create Supabase project and run the schema SQL
2. Add Supabase client (`utils/supabase.js`)
3. Add transcription functions (`utils/transcription.js`)
4. Update review screen to call `saveEntryToCloud()` after local save
5. Test: save an entry, check Supabase dashboard to see transcript appear
6. Add insight generation (`utils/insights.js`)
7. Add WeeklySynthesis component to archive screen
8. Test: generate a test insight manually, verify it appears in the card

---

*Clarity v1.5 Technical Guide — March 2026*
