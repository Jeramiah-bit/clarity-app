# Clarity — Daily Self-Inquiry
## CLAUDE.md — Project Intelligence File v2.0

> Paste the contents of this file at the start of any new Claude session in VS Code to restore full project context instantly. Claude has no memory between sessions — this file is your bridge.

---

## Project Overview

**App name:** Clarity — Daily Self-Inquiry
**Tagline:** One question a day. Total honesty. It compounds.
**Internal aesthetic name:** "The Silent Monolith"
**Platform:** iOS and Android via Expo (React Native)
**Status:** In development — MVP build phase
**Developer:** Jeramiah Seidl (beginner builder, working in VS Code with Claude)
**Project path:** `~/Desktop/clarity-app`

Clarity is a daily self-inquiry app. Each day the user receives one philosophical question and answers it by speaking — either audio only or on camera (user chooses every session). The archive becomes a map of their own mind over time. This is preemptive clarity work — not therapy, not journaling, not a habit tracker.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Expo SDK 51+ | Always use `npx expo` — global CLI is uninstalled |
| Language | JavaScript (not TypeScript) | All files as `.jsx` or `.js` |
| Navigation | Expo Router | File-based routing in `app/` directory |
| Audio recording | expo-av Audio.Recording | For voice-only mode |
| Audio playback | expo-av Audio.Sound | Playback of audio entries |
| Camera | expo-camera | For video mode |
| Video recording | expo-camera recordAsync() | Built into expo-camera |
| Video playback | expo-av Video component | Playback of video entries |
| File storage | expo-file-system | Save recordings locally on device |
| Thumbnails | expo-video-thumbnails | Preview images for archive (v1.5) |
| Data persistence | @react-native-async-storage/async-storage | All metadata, streak, preferences |
| Icons | @expo/vector-icons | Ionicons preferred |
| Fonts | expo-google-fonts | Playfair Display + Inter |
| Notifications | expo-notifications | Daily reminder at user-set time |
| Payments | react-native-purchases (RevenueCat) | Post-MVP only |
| IDE | VS Code | React Native Tools extension |
| Device testing | Expo Go on iPhone | Scan QR from `npx expo start` |

### Install all packages in one command:
```bash
npx expo install expo-av expo-camera expo-file-system expo-video-thumbnails @react-native-async-storage/async-storage @expo-google-fonts/inter @expo-google-fonts/playfair-display expo-font expo-notifications
```

---

## Folder Structure

```
clarity-app/
  app/
    _layout.jsx           ← Root layout, load fonts, tab navigation shell
    index.jsx             ← Screen 1: Home / Today's Question
    record.jsx            ← Screen 2: Mode selector + recording (audio or video)
    review.jsx            ← Screen 3: Playback before saving
    archive.jsx           ← Screen 4: Personal entry archive
    settings.jsx          ← Screen 5: Categories, reminder, subscription
  components/
    QuestionCard.jsx      ← Daily question card (navy background, category label, question text)
    ModeSelector.jsx      ← Voice only / On camera two-card selector
    AudioRecorder.jsx     ← Animated waveform + audio recording UI
    VideoRecorder.jsx     ← Full-screen camera recording UI
    ArchiveEntry.jsx      ← Single entry row (date, mode icon, question snippet)
    StreakBadge.jsx        ← Gold pill "Day 7" badge
    PlaybackView.jsx      ← Shared playback for audio and video
    WeeklySynthesis.jsx   ← Weekly synthesis card in archive
  data/
    prompts.json          ← Full curated prompt library (40+ prompts, 8 categories)
  utils/
    storage.js            ← AsyncStorage helper functions
    dateHelpers.js        ← Date formatting
    streakHelpers.js      ← Streak calculation logic
    promptHelpers.js      ← Daily prompt selection
  assets/
    fonts/
    images/               ← App icon (water drop), splash screen
  app.json                ← Name, icon, splash, permissions
  package.json
  CLAUDE.md               ← This file
  clarity-prd.md          ← Full PRD
  design/                 ← Stitch wireframe screenshots for reference
```

---

## Final Brand & Visual Design

### Colour Palette — LOCKED

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#1E2D3D` | Question card bg, subscription card, primary text on light screens |
| Warm Ivory | `#F5F0E8` | ALL light screen backgrounds — Home, Archive, Settings, Mode Selector, Recording |
| Steel Blue-Grey | `#9AB1C0` | ALL interactive elements: CTA buttons, waveform bars, icons, toggles active state |
| Soft Gold | `#C4A35A` | Streak badge ONLY |
| Stone Grey | `#8E8E93` | Secondary labels, muted text, inactive nav, subtitle text |
| Pure White | `#FFFFFF` | Text on deep navy, card surfaces |

**CRITICAL: There is NO green, NO sage, NO dark green anywhere in this app. If you see green in any component, replace it with either `#1E2D3D` (dark) or `#9AB1C0` (accent).**

### Typography — LOCKED

| Use | Font | Size | Weight |
|---|---|---|---|
| Question text | Playfair Display serif | 24–26pt | Regular |
| Screen headings | Playfair Display serif | 20–28pt | Regular |
| Italic micro-copy | Playfair Display serif | 13pt | Italic |
| UI labels, buttons | Inter sans-serif | 15–16pt | 500 |
| Body, secondary text | Inter sans-serif | 13–14pt | 400 |
| Nav labels | Inter sans-serif | 10–11pt all caps | 500 |
| Category labels | Inter sans-serif | 10pt all caps | 500, colour `#9AB1C0` |

### Style Rules — LOCKED

- Corner radius: **8pt** on all cards and buttons — tighter than typical
- **No gradients** anywhere
- **No drop shadows** anywhere
- **No pill-shaped buttons** — 8pt radius only, never 999px/50% radius
- **No green or sage** in any context whatsoever
- Bottom nav: warm ivory background `#F5F0E8`, no border, no separator line, charcoal icons and labels, active tab = slightly bolder icon only, NO colour accent on active tab
- Recording screens use **warm ivory** background (not black) — matches rest of app
- The question card is always the visual hero — nothing competes with it

### App Icon — FINALISED

Water drop with concentric ripple rings. Illustrated style (not photorealistic, not flat cartoon). Steel blue-grey `#9AB1C0` drop with internal highlight gradient and subtle 4-pointed star gleam at reduced opacity. Warm ivory `#F5F0E8` background, completely flat. Drop hovers fractionally above ripple surface — small gap between drop and first ring. Four evenly-spaced symmetrical elliptical rings fading from `#9AB1C0` to near-transparent outward. iOS rounded square, 1024x1024px. File saved in `assets/images/icon.png`.

---

## Screen Specifications — FINAL

### Screen 1 — Home (`app/index.jsx`)

```
Background: #F5F0E8

TOP ROW:
  Left:  "OCTOBER 24, 2023" — Inter 11pt #8E8E93 all caps
  Right: Streak badge — #C4A35A pill, flame icon, "Day 7" white Inter 12pt

QUESTION CARD (full width, 8pt radius):
  Background: #1E2D3D
  Top inside: "AVOIDANCE" — Inter 10pt #9AB1C0 all caps
  Main text: Playfair Display 24pt #FFFFFF
  Example: "What are you pretending not to know right now?"
  Bottom padding: generous

BELOW CARD:
  "Take your time." — Playfair Display 13pt italic #8E8E93 centred

CTA BUTTON (full width):
  Background: #9AB1C0
  Label: "Answer this question →" — Inter 15pt 500 #FFFFFF
  Height: 52pt, radius: 8pt

YEAR AGO TEXT (hide in v1 MVP, show after Day 365):
  "Exactly one year ago, you were reflecting on unspoken boundaries."
  Inter 13pt #8E8E93, italic emphasis on topic name

BOTTOM NAV:
  Background: #F5F0E8, no border, no separator
  Icons: sparkle (TODAY active), book (ARCHIVE), gear (SETTINGS)
  Labels: Inter 10pt all caps #1E2D3D
  Active: slightly bolder icon only — NO colour change
```

Navigate to `app/record.jsx` on CTA button press.

---

### Screen 2 — Record (`app/record.jsx`)

**Part A — Mode Selector:**
```
Background: #F5F0E8

HEADER:
  Back arrow left: #1E2D3D
  "Clarity" centre: Playfair Display italic #1E2D3D

HEADING:
  "How would you like to answer?"
  Playfair Display 36pt #1E2D3D centred

SUBTITLE:
  Today's question — Inter 16pt #8E8E93 centred 2-line max

TWO CARDS (side by side, 8pt radius):
  Background: #FFFFFF
  Border: 0.5px #1E2D3D at 15% opacity
  Left card: mic icon #9AB1C0, "Voice only" Inter 16pt bold #1E2D3D,
             "No camera required" Inter 14pt #8E8E93
  Right card: camera icon #9AB1C0, "On camera" Inter 16pt bold #1E2D3D,
              "Full presence" Inter 14pt #8E8E93

FOOTER:
  "Your answer is private. Nothing is shared."
  Playfair Display 13pt italic #8E8E93 centred
```

**Part B — Audio Recording:**
```
Background: #F5F0E8

TOP:
  X close button: #8E8E93
  Question reminder: "What are you pretending not to know..."
  Inter 13pt #8E8E93 centred, 60% opacity

CENTRE:
  Animated waveform: 8-10 vertical bars varying heights
  Colour: #9AB1C0
  Below: "1:23" — Inter 32pt #1E2D3D centred

BOTTOM:
  Stop button: #1E2D3D rounded square, white square icon inside, 60pt
  Mute icon: bottom left, #8E8E93
```

On stop → navigate to `app/review.jsx` passing `{ uri, mode: 'audio', promptText, promptId }`

---

### Screen 3 — Review (`app/review.jsx`)

```
Background: #F5F0E8

CONTENT:
  Today's question in Playfair Display 18pt #1E2D3D above playback
  Playback: waveform for audio, video player for camera mode

BUTTONS (stacked, full width):
  1. "Save to archive" — #9AB1C0 fill, white Inter 15pt, 8pt radius
  2. "Try again" — outlined, #1E2D3D border, #1E2D3D text, 8pt radius
  3. "Discard" — plain text, #8E8E93, centred, no border
```

On save → write to AsyncStorage → update streak → navigate to `app/archive.jsx`

---

### Screen 4 — Archive (`app/archive.jsx`)

```
Background: #F5F0E8

HEADER ROW:
  Left: hamburger icon #1E2D3D
  Centre: "Your Archive" italic Playfair Display
  Right: "Archive" bold Inter #1E2D3D

SUBHEADER:
  "Your archive" — Playfair Display 28pt #1E2D3D left
  "23 entries" — Inter 13pt #8E8E93 right

ENTRY LIST ROWS:
  Date: "Oct 12" — Inter 12pt #8E8E93 left
  Icon: mic or camera in #9AB1C0, 14pt
  Snippet: "What does silence so..." — Inter 13pt #1E2D3D
  Most recent row: subtle #9AB1C0 left border accent (2pt)
  Dividers: 0.5px #8E8E93 at 20% opacity between rows

WEEKLY SYNTHESIS CARD (below entries):
  Background: #FFFFFF, subtle border, 8pt radius
  Icon: #9AB1C0
  "Weekly Synthesis" — Playfair Display italic 20pt #1E2D3D
  Theme text — Inter 14pt #8E8E93
  "Read Synthesis" button: #1E2D3D fill, white Inter text, 8pt radius

EMPTY STATE:
  "Your first answer is waiting."
  Playfair Display 14pt italic #8E8E93 centred

BOTTOM NAV: Archive tab active (bolder book icon)
```

---

### Screen 5 — Settings (`app/settings.jsx`)

```
Background: #F5F0E8

HEADER: "Your Archive" Inter bold centred

DAILY REMINDER section:
  "DAILY REMINDER" — Inter 11pt #8E8E93 all caps section label
  "8:00 AM" — Inter 36pt #1E2D3D
  "Change time" — Inter 13pt #9AB1C0 link

PROMPT CATEGORIES section:
  "PROMPT CATEGORIES" — Inter 11pt #8E8E93 all caps
  8 toggle rows: Desires & Wants, Avoidance, Values, Identity,
                 Fear, Clarity, Gratitude & Loss, Growth
  Toggle active: #9AB1C0
  Toggle inactive: #8E8E93 at 30% opacity

CLARITY PRO CARD:
  Background: #1E2D3D, 8pt radius
  "Clarity Pro" — Inter bold 18pt #FFFFFF
  Bullets in #F5F0E8 Inter 13pt:
    • Unlimited archival storage
    • Advanced behavioral insights
    • Guided seasonal reflection series
  "Upgrade" button: #9AB1C0 fill, white Inter, 8pt radius, full width minus 16pt padding

"VERSION 1.0" — Inter 11pt #8E8E93 centred bottom

BOTTOM NAV: Settings tab active (bolder gear icon)
```

---

## Data Models

### Prompt (`data/prompts.json`)
```json
{
  "id": "001",
  "text": "What are you pretending not to know right now?",
  "category": "Avoidance",
  "tradition": "Jungian shadow work"
}
```

### Entry (AsyncStorage key: `"clarityArchive"`)
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

### User State (AsyncStorage key: `"clarityUserState"`)
```json
{
  "currentStreak": 7,
  "lastEntryDate": "2026-03-23",
  "reminderEnabled": true,
  "reminderTime": "08:00",
  "activeCategories": [
    "Desires & Wants", "Avoidance", "Values", "Identity",
    "Fear", "Clarity", "Gratitude & Loss", "Growth"
  ],
  "onboardingComplete": true,
  "totalEntries": 23
}
```

---

## AsyncStorage Helpers (`utils/storage.js`)

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getArchive = async () => {
  try {
    const raw = await AsyncStorage.getItem('clarityArchive');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};

export const saveEntry = async (entry) => {
  const archive = await getArchive();
  const updated = [entry, ...archive];
  await AsyncStorage.setItem('clarityArchive', JSON.stringify(updated));
};

export const getUserState = async () => {
  try {
    const raw = await AsyncStorage.getItem('clarityUserState');
    return raw ? JSON.parse(raw) : {
      currentStreak: 0,
      lastEntryDate: null,
      reminderEnabled: false,
      reminderTime: '08:00',
      activeCategories: [
        'Desires & Wants', 'Avoidance', 'Values', 'Identity',
        'Fear', 'Clarity', 'Gratitude & Loss', 'Growth'
      ],
      onboardingComplete: false,
      totalEntries: 0
    };
  } catch (e) { return null; }
};

export const updateUserState = async (updates) => {
  const current = await getUserState();
  const updated = { ...current, ...updates };
  await AsyncStorage.setItem('clarityUserState', JSON.stringify(updated));
};

export const deleteEntry = async (id) => {
  const archive = await getArchive();
  const updated = archive.filter(e => e.id !== id);
  await AsyncStorage.setItem('clarityArchive', JSON.stringify(updated));
};
```

---

## MVP Feature Checklist

### Version 1.0 — Build in this order
- [ ] **Screen 1:** Home screen — question card, streak badge, CTA button, bottom nav
- [ ] **Screen 2A:** Mode selector — voice only / on camera cards
- [ ] **Screen 2B:** Audio recording — waveform, timer, stop button
- [ ] **Screen 3:** Review — playback, save / try again / discard
- [ ] **Wire data:** AsyncStorage save + retrieve entries end to end
- [ ] **Screen 4:** Archive — entry list, weekly synthesis card, empty state
- [ ] **Screen 5:** Settings — toggles, reminder time, Clarity Pro card
- [ ] Streak counter updates on each saved entry
- [ ] Daily prompt rotates from `prompts.json`
- [ ] Empty state on archive
- [ ] App icon and splash in app.json

### Version 1.5
- [ ] Daily reminder notification (expo-notifications)
- [ ] Custom reminder time picker

### Version 2.0
- [ ] Video recording mode (full Screen 2C)
- [ ] Transcription
- [ ] AI theme/pattern insights
- [ ] Weekly Synthesis auto-generation
- [ ] Cloud backup (Supabase)
- [ ] RevenueCat subscription

---

## app.json Permissions

```json
{
  "expo": {
    "name": "Clarity",
    "slug": "clarity-app",
    "ios": {
      "infoPlist": {
        "NSMicrophoneUsageDescription": "Clarity needs microphone access to record your spoken answers.",
        "NSCameraUsageDescription": "Clarity needs camera access for video recording mode.",
        "NSPhotoLibraryUsageDescription": "Clarity needs photo library access to save your recordings."
      }
    }
  }
}
```

---

## Claude Prompts — Use These in VS Code Sessions

**Starting Screen 1:**
> "I'm building the Clarity app in Expo with React Native. Here is my CLAUDE.md: [paste full file]. Please build `app/index.jsx` — the Home screen. Show today's question card with the category label, the question text in Playfair Display, the streak badge in gold, the 'Answer this question' button in steel blue-grey, and the bottom navigation bar. Use exact colours and specs from the CLAUDE.md."

**Starting Screen 2 (Mode Selector):**
> "I'm building the Clarity app in Expo. Here is my CLAUDE.md: [paste]. Here is my current `app/index.jsx`: [paste file]. Please build `app/record.jsx` — the mode selector screen showing two white cards for Voice only and On camera. Background is warm ivory #F5F0E8. Use the exact specs from CLAUDE.md."

**Building the Audio Recorder:**
> "I'm building the Clarity app in Expo. Here is my CLAUDE.md: [paste]. I need to add audio recording to `app/record.jsx` using expo-av that records for up to 90 seconds, shows an animated waveform using React Native Animated with bars in #9AB1C0, and navigates to the review screen with the audio URI when stop is tapped. Here is my current file: [paste]."

**Wiring AsyncStorage:**
> "I'm building the Clarity app in Expo. Here is my `utils/storage.js`: [paste]. Here is my `app/review.jsx`: [paste]. When the user taps 'Save to archive', call saveEntry() with the entry object and navigate to the archive screen. Show me the updated review.jsx."

**Fixing a bug:**
> "I'm building the Clarity app in Expo. Here is my [filename]: [paste file]. I'm getting this error: [paste exact error]. Please fix it and explain what was wrong."

---

## Development Commands

```bash
# Start dev server
npx expo start

# Clear cache (use when something breaks)
npx expo start --clear

# Install Expo-compatible package
npx expo install [package-name]

# Check for dependency issues
npx expo doctor
```

---

## Setup Notes

- Global expo-cli is uninstalled — always use `npx expo`
- Project path: `~/Desktop/clarity-app`
- Testing on iPhone via Expo Go — scan QR from terminal
- If Expo Go has no scan button: manually enter `exp://[IP]:8081`
- iPhone and MacBook must be on the same WiFi network
- JavaScript only — no TypeScript — all files `.jsx` or `.js`
- Build Screen 1 and get it working on your iPhone before touching Screen 2

---

## Build Sequence — Start Here

**Today's goal: Get Screen 1 running on your iPhone.**

1. Open terminal in `~/Desktop/clarity-app`
2. Run `npx expo start`
3. Scan QR with Expo Go
4. Open a new Claude chat in claude.ai
5. Paste this entire CLAUDE.md file
6. Say: "Please build app/index.jsx — the Home screen for Clarity."
7. Replace the contents of your `app/index.jsx` with what Claude gives you
8. Save the file — it hot-reloads on your phone instantly
9. Iterate until Screen 1 looks right
10. Then move to Screen 2

---

*Clarity — Daily Self-Inquiry · CLAUDE.md Version 2.0 · March 2026*
