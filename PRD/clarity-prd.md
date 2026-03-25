# Clarity — Daily Self-Inquiry
## Product Requirements Document

> *One question a day. Total honesty. It compounds.*
> Version 2.0 · March 2026 · Jeramiah Seidl

---

## 1. Product Vision & Summary

Clarity is a daily self-inquiry app. Each day the user receives one carefully chosen question — drawn from Stoic philosophy, Buddhist self-inquiry, Jungian psychology, and existential thought — and answers it honestly, either by speaking out loud (audio only) or recording themselves on camera (video). The user chooses their mode each session. Over time the archive becomes a map of their own mind: their fears, desires, contradictions, and growth, all in their own voice.

This is not therapy. It is not journaling. It is not a habit tracker.

It is preemptive clarity work — knowing yourself before problems form, not after.

> **Mission Statement**
> To help people answer the one question that underlies every other question: *what do I actually want?*

---

### 1.1 The Problem

Most people live with a low-level background hum of uncertainty about what they want, what they value, and who they are becoming. Therapy is reactive and expensive. Text journaling is passive and easy to abandon. Meditation is powerful but silent. Nothing exists that combines the depth of philosophical self-inquiry with the honesty of speaking out loud and the permanence of a personal archive.

### 1.2 The Solution

One question per day. The user opens the app, reads their question, chooses how to answer (voice or camera), speaks honestly, and saves it. Over weeks and months the archive becomes something they return to — a record of who they were becoming.

### 1.3 Why Speaking, Not Writing

You cannot be vague when you are hearing your own voice or seeing your own face. Writing allows you to hide behind articulate sentences. Speaking does not. The hesitations, the redirections, the moments where you stop and say "actually, no — the real answer is..." — those are the data.

---

## 2. Target Audience & Niche

### 2.1 Primary Persona: The Reflective Seeker

| Attribute | Description |
|---|---|
| Age | 25–42 years old |
| Occupation | Knowledge workers, creatives, therapists, coaches, entrepreneurs, students |
| Follows / Reads | Ryan Holiday, Alan Watts, Thich Nhat Hanh, Carl Jung, James Clear, Brené Brown |
| Communities | r/Stoicism, r/Meditation, r/Buddhism, r/Jung, r/selfimprovement |
| Pain Point | Feels a gap between their outer life and inner life — busy but not fulfilled |
| Behaviour | Already meditates, journals occasionally, reads philosophy or psychology |
| Willingness to Pay | High — pays for Calm, Headspace, therapy, books, courses |

### 2.2 Secondary Personas

- **The Philosophy Practitioner** — Reads Stoicism, Buddhism, or Jungian psychology and wants a daily practice, not just theory
- **The Therapy Skeptic** — Wants deep inner work but finds therapy too expensive or reactive
- **The Burnout Recoverer** — Professionally successful but personally lost
- **The Mindful Professional** — Already meditates, wants a spoken self-inquiry layer
- **The Creative** — Writers and artists who need honest self-knowledge as part of their process

---

## 3. Prompt Philosophy & Categories

The prompts are the product. Everything else is infrastructure.

### 3.1 Prompt Design Principles

- Every prompt should have a real answer that surprises the user
- No prompt answerable with "yes" or "no"
- No prompt answerable with a generic positive affirmation
- The best prompts create a small moment of resistance before the user speaks
- Prompts come from philosophical traditions but never feel academic

### 3.2 Prompt Categories (8 total)

| Category | Example Prompt |
|---|---|
| Desires & Wants | "What do you keep wanting that you haven't admitted you want?" |
| Avoidance | "What are you pretending not to know right now?" |
| Values | "Did your actions today reflect what you say you care about?" |
| Identity | "Who would you be if no one was watching and nothing was expected of you?" |
| Fear | "What would you do this week if you weren't afraid of how it looked?" |
| Clarity | "What decision have you been avoiding and what is the real reason?" |
| Gratitude & Loss | "What do you have right now that you would miss if it were gone?" |
| Growth | "Where did you act against your own values this week, and why?" |

---

## 4. Feature Specification

### 4.1 MVP Features — Version 1.0

| Feature | Description |
|---|---|
| Daily Prompt Screen | One question per day. Rotates from curated library. Category label shown. |
| Year Ago Memory | Below the CTA: "Exactly one year ago, you were reflecting on [topic]." Shown after Day 365. |
| Mode Selection | Before recording: user chooses Voice only or On camera. Chosen per session. |
| Audio Recording | Voice-only recording, up to 90 seconds. Animated waveform visualisation. |
| Video Recording | Front-facing camera, up to 90 seconds. Full-screen. |
| Playback Review | After recording: play back before saving, re-record, or discard. |
| Save to Archive | Recordings saved locally on device. No cloud required for v1. |
| Archive Screen | Scrollable list: date, mode icon, question snippet. Weekly Synthesis card below. |
| Weekly Synthesis | Card in archive showing a generated theme from the week's entries. |
| Tap to Replay | Tap any archive entry to play it back in full. |
| Streak Counter | "Day 7" gold badge on home screen. |
| Prompt Categories | User toggles categories in Settings. |
| Daily Reminder | Push notification at user-chosen time. "8:00 AM" default. |

### 4.2 Version 2.0 Features — Post-Launch

- AI speech analysis: filler words, pace, pauses
- Transcription of all entries
- Custom user-written prompts
- Monthly look-back feature
- Cloud backup via Supabase
- Sharing a single entry
- Clarity Pro subscription

---

## 5. Tech Stack

### 5.1 Core Framework

| Layer | Tool | Notes |
|---|---|---|
| Framework | Expo SDK 51+ | Use `npx expo` — global CLI deprecated |
| Language | JavaScript (not TypeScript) | Simpler for beginners |
| Navigation | Expo Router | File-based routing in `app/` directory |
| IDE | VS Code | React Native Tools extension + Prettier |
| Device Testing | Expo Go on iPhone | Scan QR from `npx expo start` |

### 5.2 Audio & Video

| Need | Tool |
|---|---|
| Audio recording | expo-av — Audio.Recording API |
| Audio playback | expo-av — Audio.Sound API |
| Camera | expo-camera |
| Video recording | expo-camera recordAsync() |
| Video playback | expo-av Video component |
| File storage | expo-file-system |
| Thumbnails | expo-video-thumbnails |
| Notifications | expo-notifications |

**Install command:**
```bash
npx expo install expo-av expo-camera expo-file-system expo-video-thumbnails @react-native-async-storage/async-storage @expo-google-fonts/inter @expo-google-fonts/playfair-display expo-font expo-notifications
```

### 5.3 Folder Structure

```
clarity-app/
  app/
    _layout.jsx           ← Root layout, fonts, tab navigation
    index.jsx             ← Screen 1: Home / Today's Question
    record.jsx            ← Screen 2: Mode selector + recording
    review.jsx            ← Screen 3: Playback before saving
    archive.jsx           ← Screen 4: Entry archive list
    settings.jsx          ← Screen 5: Categories, reminder, subscription
  components/
    QuestionCard.jsx      ← Daily question card component
    ModeSelector.jsx      ← Voice only / On camera toggle
    AudioRecorder.jsx     ← Waveform + audio recording UI
    VideoRecorder.jsx     ← Full-screen camera recording UI
    ArchiveEntry.jsx      ← Single entry row in archive
    StreakBadge.jsx        ← Gold streak pill
    PlaybackView.jsx      ← Shared playback UI
    WeeklySynthesis.jsx   ← Weekly synthesis card in archive
  data/
    prompts.json          ← Full curated prompt library
  utils/
    storage.js            ← AsyncStorage helpers
    dateHelpers.js        ← Date formatting
    streakHelpers.js      ← Streak logic
    promptHelpers.js      ← Daily prompt selection
  assets/
    fonts/
    images/               ← App icon, splash screen
  app.json
  package.json
  CLAUDE.md
  clarity-prd.md
```

---

## 6. Branding & Visual Identity

### 6.1 Brand Identity

| Element | Direction |
|---|---|
| App Name | Clarity — Daily Self-Inquiry |
| Tagline | "One question a day. Total honesty. It compounds." |
| Internal Brand Name | "The Silent Monolith" aesthetic |
| Personality | Still, wise, honest — like a good therapist who asks questions instead of giving answers |
| Tone | Quiet and direct. No motivational language. No exclamation marks. |

### 6.2 Final Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#1E2D3D` | Question card background, subscription card, primary text on light screens |
| Warm Ivory | `#F5F0E8` | All light screen backgrounds: Home, Archive, Settings, Mode Selector, Recording |
| Steel Blue-Grey | `#9AB1C0` | All interactive elements, CTA buttons, audio waveform bars, card icons, toggle active states |
| Soft Gold | `#C4A35A` | Streak badge only — "Day 7" pill |
| Stone Grey | `#8E8E93` | Secondary labels, muted text, inactive nav tabs, subtitle text |
| Pure White | `#FFFFFF` | Text on deep navy backgrounds, card surfaces on light screens |

**Critical rule: No green or sage anywhere. The palette is exclusively navy, ivory, steel blue-grey, gold, stone, and white.**

### 6.3 Typography

| Use | Font | Size | Weight |
|---|---|---|---|
| Question text | Playfair Display (serif) | 24–26pt | Regular |
| Screen headings | Playfair Display | 20pt | Regular |
| Micro-copy / captions | Playfair Display | 13pt | Italic |
| UI labels, navigation | Inter (sans-serif) | 15–16pt | 500 |
| Body & secondary text | Inter | 13–14pt | 400 |
| Navigation labels | Inter | 10–11pt all caps | 500 |
| Category labels | Inter | 10pt all caps | 500 in `#9AB1C0` |

### 6.4 Style Rules

- Corner radius: 8pt on cards and buttons (tighter than typical — feels considered)
- No gradients anywhere
- No drop shadows anywhere
- No pill-shaped buttons — 8pt radius only
- No green or sage in any context
- Bottom navigation: warm ivory background, no border, no separator, charcoal icons and labels, active tab indicated by slightly bolder icon only — no colour accent
- The question card is always the visual hero of the home screen
- Recording screens: warm ivory background (not black) — matches the rest of the app

### 6.5 App Icon

Water drop with concentric ripple rings. Illustrated style (not photorealistic). Steel blue-grey `#9AB1C0` drop with internal highlight and subtle star gleam. Warm ivory `#F5F0E8` background. Drop hovering fractionally above the ripple surface. Four evenly-spaced symmetrical ripple rings fading from `#9AB1C0` to near-transparent outward. iOS rounded square, 1024x1024px.

---

## 7. Screen Specifications

### Screen 1 — Home / Today's Question (`app/index.jsx`)

Based on final Stitch output:
- Background: warm ivory `#F5F0E8`
- Top left: date "OCTOBER 24, 2023" in Inter 11pt stone grey, all caps
- Top right: streak badge — soft gold `#C4A35A` pill with flame icon, "Day 7" in white Inter 12pt
- Question card: full-width, deep navy `#1E2D3D` background, 8pt radius
  - Category label "AVOIDANCE" in Inter 10pt `#9AB1C0` all caps, top of card
  - Question text in Playfair Display 24pt white: "What are you pretending not to know right now?"
  - Image placeholder at bottom of card (for v2 — remove for v1 MVP, replace with more padding)
- Below card: "Take your time." in 13pt italic Playfair Display, stone grey, centred
- CTA: full-width "Answer this question →" button, `#9AB1C0` fill, white Inter 15pt, 52pt height, 8pt radius
- At very bottom above nav: "Exactly one year ago, you were reflecting on *unspoken boundaries*." in Inter 13pt stone grey with italic emphasis on the topic — show only after Day 365, hide in MVP v1
- Bottom navigation: ivory background, no border, TODAY (active, slightly bolder) / ARCHIVE / SETTINGS in Inter 10pt charcoal all caps, sparkle icon for TODAY, book icon for ARCHIVE, gear icon for SETTINGS

### Screen 2 — Record (`app/record.jsx`)

**Part A — Mode Selector:**
Based on final Stitch output:
- Background: warm ivory `#F5F0E8`
- Back arrow top left in charcoal, "Clarity" wordmark centred in Playfair Display italic
- Heading: "How would you like to answer?" in Playfair Display 36pt deep navy, centred
- Subtitle: today's question in Inter 16pt stone grey, centred, 2-line max
- Two white cards side by side, 8pt radius, subtle border
  - Left: microphone icon in `#9AB1C0`, "Voice only" Inter 16pt bold deep navy, "No camera required" Inter 14pt stone grey
  - Right: camera icon in `#9AB1C0`, "On camera" Inter 16pt bold deep navy, "Full presence" Inter 14pt stone grey
- Footer: "Your answer is private. Nothing is shared." in 13pt italic Playfair Display, stone grey, centred

**Part B — Audio Recording:**
Based on final Stitch output:
- Background: warm ivory `#F5F0E8`
- X close button top left in stone grey
- Question reminder: "What are you pretending not to know..." in Inter 13pt stone grey, centred, top area
- Animated waveform: 8–10 vertical bars of varying heights in `#9AB1C0`, centred
- Timer: "1:23" in Inter 32pt deep navy, centred below waveform
- Stop button: deep navy `#1E2D3D` rounded square with white square stop icon inside, bottom centre, 60pt
- Mute icon: bottom left, stone grey

**Part C — Video Recording:**
- Full-screen front-facing camera
- Question reminder at top, 13pt white 60% opacity
- 90-second countdown timer
- White circular stop button, bottom centre

### Screen 3 — Review (`app/review.jsx`)

- Plays back recording (waveform for audio, video for camera)
- Today's question above playback
- "Save to archive" — `#9AB1C0` fill button
- "Try again" — outlined button, `#1E2D3D` border
- "Discard" — plain text, stone grey, centred

### Screen 4 — Archive (`app/archive.jsx`)

Based on final Stitch output:
- Background: warm ivory `#F5F0E8`
- Top: hamburger menu left, "Your Archive" italic Playfair Display centre, "Archive" bold Inter right
- Below header: "Your archive" Playfair Display 28pt left, "23 entries" Inter 13pt stone grey right
- Entry list rows:
  - Date left: "Oct 12" Inter 12pt stone grey
  - Mode icon centre: microphone or camera icon in `#9AB1C0`
  - Question snippet right: "What does silence so..." Inter 13pt deep navy
  - First entry has subtle `#9AB1C0` left border accent
  - Thin stone grey dividers between rows
- Weekly Synthesis card below entries:
  - Ivory/light background, subtle border, 8pt radius
  - Small icon in `#9AB1C0`
  - "Weekly Synthesis" in Playfair Display italic 20pt deep navy
  - "Your reflections this week lean toward themes of solitude and natural light." Inter 14pt stone grey
  - "Read Synthesis" button — deep navy `#1E2D3D` fill, white Inter text, 8pt radius
- Empty state at bottom: "Your first answer is waiting." italic Playfair Display stone grey centred
- Bottom navigation: ivory, no border, Archive tab active

### Screen 5 — Settings (`app/settings.jsx`)

Based on final Stitch output:
- Background: warm ivory `#F5F0E8`
- Top: hamburger menu, "Your Archive" Inter bold centred
- DAILY REMINDER section: "8:00 AM" Inter 36pt deep navy, "Change time" link in `#9AB1C0` below
- PROMPT CATEGORIES section: 8 toggle rows — Desires & Wants, Avoidance, Values, Identity, Fear, Clarity, Gratitude & Loss, Growth — toggle active state in `#9AB1C0`, inactive in stone grey
- Clarity Pro card: deep navy `#1E2D3D` background, 8pt radius
  - "Clarity Pro" Inter bold 18pt white
  - Three bullet points in warm ivory `#F5F0E8` Inter 13pt:
    - Unlimited archival storage
    - Advanced behavioral insights
    - Guided seasonal reflection series
  - "Upgrade" button: `#9AB1C0` fill, white Inter text, 8pt radius, full card width minus padding
- "VERSION 1.0" Inter 11pt stone grey, centred, bottom
- Bottom navigation: ivory, no border, Settings tab active (slightly bolder gear icon)

---

## 8. Data Models

### Prompt object (`data/prompts.json`)
```json
{
  "id": "001",
  "text": "What are you pretending not to know right now?",
  "category": "Avoidance",
  "tradition": "Jungian shadow work"
}
```

### Entry object (AsyncStorage key: `"clarityArchive"`)
```json
{
  "id": "uuid-string",
  "date": "2026-03-24",
  "promptId": "001",
  "promptText": "What are you pretending not to know right now?",
  "category": "Avoidance",
  "mode": "audio",
  "filePath": "file:///path/to/recording.m4a",
  "thumbnailPath": null,
  "duration": 62
}
```

### User state (AsyncStorage key: `"clarityUserState"`)
```json
{
  "currentStreak": 7,
  "lastEntryDate": "2026-03-23",
  "reminderEnabled": true,
  "reminderTime": "08:00",
  "activeCategories": ["Desires & Wants", "Avoidance", "Values", "Identity", "Fear", "Clarity", "Gratitude & Loss", "Growth"],
  "onboardingComplete": true,
  "totalEntries": 23
}
```

---

## 9. Monetisation

| Tier | Price | Features |
|---|---|---|
| Free | $0 | 7 days of prompts, 10 saved entries, basic archive |
| Clarity Pro (monthly) | $5.99/month | Unlimited prompts, unlimited archive, all categories, advanced insights, guided seasonal series |
| Clarity Pro (annual) | $39.99/year | Same as monthly at 44% discount — default highlighted option |
| Lifetime | $69.99 one-time | All features forever — launch offer only |

Payments via RevenueCat (`react-native-purchases`).

---

## 10. Go-To-Market

### Pre-Launch Validation Post (paste into Reddit)
> *"Does anyone else feel like they don't actually know what they want? Not in a crisis way — just a low-level background hum of uncertainty. I've been trying something where I ask myself one honest question every morning and answer it out loud, just to myself. Curious if anyone else does something like this."*

Post in r/selfimprovement and r/Stoicism first. Target 100 email signups before writing any code.

### Landing Page
Built on Carrd.co. URL to drop into Reddit posts when people ask for a link. Email capture with Beehiiv integration.

### Reddit Communities — Priority Order
1. r/selfimprovement (2.4M) — soft story post
2. r/getdisciplined (2M) — soft story post
3. r/Stoicism (570K) — philosophy angle
4. r/Buddhism (400K) — self-inquiry angle
5. r/Meditation (1M+) — morning practice angle
6. r/Journaling (150K) — video vs text journaling angle
7. r/Jung (100K) — shadow work angle
8. r/SideProject, r/indiehackers — post-launch build in public

---

## 11. Success Metrics

| Metric | 90-Day Target |
|---|---|
| Email waitlist pre-launch | 100+ signups |
| App Store downloads Month 1 | 300+ |
| Free-to-paid conversion | 8–12% |
| Paying users Month 3 | 100+ |
| MRR Month 3 | $600+ |
| App Store rating | 4.7+ stars |
| Day 7 retention | 45%+ |
| Day 30 retention | 35%+ |
| Entries per user first 30 days | 8+ |

> **North Star Metric:** Entries recorded per user per week. 3+ per week = habit formed = they will pay.

---

*Clarity — Daily Self-Inquiry · PRD Version 2.0 · March 2026*
