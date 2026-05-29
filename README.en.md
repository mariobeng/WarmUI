# WarmUI — An Aging-Friendly Experience Enhancement Layer for the Elderly

[![GitHub stars](https://img.shields.io/github/stars/mariobeng/WarmUI?style=social)](https://github.com/mariobeng/WarmUI)
[![GitHub forks](https://img.shields.io/github/forks/mariobeng/WarmUI?style=social)](https://github.com/mariobeng/WarmUI/fork)
[![GitHub license](https://img.shields.io/github/license/mariobeng/WarmUI)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@warm-ui/components)](https://www.npmjs.com/package/@warm-ui/components)

**An open-source frontend component library that helps every product gently embrace the elderly.**

English | [简体中文](README.md)

---

## Why WarmUI?

Today's internet products are mostly designed by young people, for young people. When an elderly person tries to make a doctor's appointment, pay bills, or video chat with family on their phone, they often face tiny text, complex operations, and unfamiliar prompts—not because they "can't learn," but because the product was never truly designed for them.

Existing "elderly modes" often just crudely enlarge fonts and increase contrast, ignoring deeper needs of the elderly: genuine understanding of information, fear of pressing the wrong button, and sensitivity about "being a burden."

**WarmUI aims to change this.** It's not just a style theme, but a comprehensive aging-friendly component library covering cognition, touch, and emotion. Any web product integrating it gains an interaction designer who understands and loves the elderly.

---

## Core Features

### 🎯 Layer 1: Basic Sensory Compensation

| Component | Problem Solved | Technical Highlights |
| --------- | -------------- | -------------------- |
| **Dynamic Font Engine** `warm-text` | Not global enlargement, but intelligent scaling by content type | Semantic levels: heading/body/button/caption/large + level scaling |
| **Anti-shake Touch Area** `warm-button` | Accidental touches due to hand tremors | Configurable debounce delay + touch tolerance area |
| **Speech Enhancement** `warm-speech` | Not just TTS, reads page structure aloud | Auto-generates page outline, natural language reading |
| **High Contrast Theme** `warm-theme` | Color blind/low vision users can't see clearly | 5 preset themes: red-green color blindness, blue-yellow color blindness, high contrast |

### 🧠 Layer 2: Cognitive Assistance

| Component | Problem Solved | Technical Highlights |
| --------- | -------------- | -------------------- |
| **Plain Language Translator** `warm-translator` | Complex text is hard to understand | Hover/long-press shows "plain language" bubble, supports static and API dynamic translation |
| **Next Step Guide** `warm-guide` | Elderly don't know where to click on new pages | Breathing animation highlight + overlay + voice prompt, one-click dismiss |
| **Lost Rescue** `warm-rescue` | Elderly don't know where they are or how to get back | Floating rescue button + voice input + keyword navigation matching |

### 💬 Layer 3: Emotional Connection

| Component | Problem Solved | Technical Highlights |
| --------- | -------------- | -------------------- |
| **Family Notes** `warm-note` | Children want to leave reminders for parents | Remote note system, 4 types (reminder/tip/warning/encouragement), dismissible |
| **Completion Praise** `warm-praise` | Elderly need positive feedback after completing tasks | Flower bloom + confetti + voice encouragement, equal tone |
| **Buddy Mode** `warm-buddy` | Remote assistance is hard for elderly to describe | One-time security code + highlight guidance + voice explanation, 5-minute auto-expiry |

### 🔧 Layer 4: Developer Tools

| Tool | Problem Solved | Technical Highlights |
| ---- | -------------- | -------------------- |
| **Aging Simulator** (Browser Extension) | Developers can't empathize | 9 simulations: 4 visual + 3 tactile + 3 cognitive |
| **Elderly Assistant** (Browser Extension) | One-click aging-friendly for any webpage | 6 enhancers + 5 preset scenarios, for elderly direct use |
| **Compliance Checker** `warm-checker` | Products struggle to meet accessibility standards | 4 auto-checks: touch target / contrast / alt text / age discrimination |

---

## Technical Philosophy

- **Framework Agnostic**: Core based on Web Components, with React/Vue wrappers provided
- **Progressive Enhancement**: No need to refactor existing projects, any component can be imported individually
- **Privacy First**: Voice and AI capabilities processed locally first, cloud calls are informed and not stored
- **Open Source Symbiosis**: MIT license, welcoming designers, social workers, families, and everyone who cares about the elderly

---

## Installation

### Using Web Components (Framework Agnostic)

```bash
npm install @warm-ui/components
```

```js
import "@warm-ui/components";
```

Use directly in HTML:

```html
<warm-button elder-friendly>Confirm Appointment</warm-button>
<warm-text size="heading">Aging-Friendly Title</warm-text>
<warm-guide overlay target="#submitBtn">Click this blue button to complete</warm-guide>
<warm-translator translation="Just confirm you are yourself"
  >Please verify your identity</warm-translator
>
```

### React

```bash
npm install @warm-ui/react
```

```jsx
import {
  WarmButton,
  WarmText,
  WarmGuide,
  WarmTranslator,
  WarmPraise,
  applyTheme,
  runAccessibilityCheck,
} from "@warm-ui/react";

function App() {
  return (
    <>
      <WarmButton elderFriendly>Confirm Appointment</WarmButton>
      <WarmText size="heading">Welcome</WarmText>
      <WarmGuide overlay target="#submitBtn">
        Click this blue button to complete
      </WarmGuide>
    </>
  );
}
```

### Vue

```bash
npm install @warm-ui/vue
```

```vue
<template>
  <WarmButton elderFriendly>Confirm Appointment</WarmButton>
  <WarmText size="heading">Welcome</WarmText>
</template>

<script setup>
import { WarmButton, WarmText, applyTheme } from "@warm-ui/vue";
</script>
```

---

## Component API

### Core Components

#### WarmButton — Aging-Friendly Button

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `elder-friendly` | Boolean | false | Enable aging-friendly mode (enlarged button + default 300ms debounce + 12px tolerance) |
| `debounce-delay` | Number | 0 | Debounce delay (ms), defaults to 300 when elder-friendly |
| `tolerance` | Number | 0 | Touch tolerance area (px), defaults to 12 when elder-friendly |
| `disabled` | Boolean | false | Disable button |

| Event | Description |
| ----- | ----------- |
| `warm-click` | Button click (after debounce) |

#### WarmText — Dynamic Font Engine

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `size` | String | `body` | Semantic level: `heading` / `body` / `button` / `caption` / `large` / `normal` |
| `level` | Number | - | Scaling level, each level adds 8% font size |
| `plain` | Boolean | false | Secondary text style (lighter color) |

#### WarmCard — Card Container

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `highlight` | Boolean | false | Highlight mode (blue border shadow) |

#### WarmDialog — Gentle Dialog

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `open` | Boolean | false | Whether to show |
| `close-on-overlay` | Boolean | false | Whether clicking overlay closes (default: no, to prevent accidental touches) |

| Method | Description |
| ------ | ----------- |
| `open()` | Open dialog |
| `close()` | Close dialog |

| Event | Description |
| ----- | ----------- |
| `warm-dialog-open` | Dialog opened |
| `warm-dialog-close` | Dialog closed |

| Slot | Description |
| ---- | ----------- |
| `header` | Title area |
| default | Content area |
| `footer` | Footer actions |

#### WarmToast — Light Toast

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `show` | Boolean | false | Whether to show |
| `type` | String | - | Type: `success` / `error`, default none |

| Method | Description |
| ------ | ----------- |
| `show(duration)` | Show toast, auto-hides after 3000ms by default |
| `hide()` | Hide toast |

#### WarmGuide — Next Step Guide

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `overlay` | Boolean | false | Full-screen overlay mode, guide shows at bottom center |
| `target` | String | - | CSS selector, highlight target element (breathing animation) |
| `voice` | Boolean | true | Whether to auto-read guide text |

| Method | Description |
| ------ | ----------- |
| `dismiss()` | Close guide and highlight |
| `showWithTarget(sel)` | Show guide and highlight specified target |

| Event | Description |
| ----- | ----------- |
| `warm-guide-dismiss` | Guide dismissed |

#### WarmNote — Family Note

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `type` | String | `reminder` | Note type: `reminder` / `tip` / `warning` / `encourage` |
| `author` | String | - | Note author |
| `time` | String | - | Note time |
| `note-id` | String | - | Note ID for remote note storage |
| `remote` | String | - | Remote note marker, `own` means deletable |
| `dismissable` | Boolean | false | Show "I understand" close button |

| Event | Description |
| ----- | ----------- |
| `warm-note-dismiss` | Clicked "I understand" to close note |

| Static Method | Description |
| ------------- | ----------- |
| `WarmNote.saveRemoteNote(id, data)` | Save remote note to localStorage |
| `WarmNote.listRemoteNotes()` | Get all remote notes list |

#### WarmRescue — Lost Rescue

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `float` | Boolean | false | Float mode, circular button at bottom-right, click to expand full panel |
| `pages` | String | - | JSON array, navigable pages list `[{name, keywords}]` |

| Method | Description |
| ------ | ----------- |
| `expand()` | Expand floating panel |
| `collapse()` | Collapse floating panel |

| Event | Description |
| ----- | ----------- |
| `warm-rescue-navigate` | Voice navigation matched, `detail.matched` is the matched page |

### Enhancement Components

#### WarmSpeech — Speech Enhancement

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `text` | String | - | Text to read, if not set reads element text content |
| `mode` | String | `text` | Read mode: `text` (plain text) / `outline` (page outline) |
| `lang` | String | `zh-CN` | Reading language |
| `rate` | Number | `0.9` | Reading speed |

#### WarmTranslator — Plain Language Translator

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `translation` | String | - | Static translation text, if not set calls API for dynamic translation |
| `original` | String | - | Original text label, if not set auto-gets element text content |

- **Desktop**: Hover 800ms to show translation bubble
- **Mobile**: Long-press to toggle translation bubble

#### WarmPraise — Completion Praise

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `show` | Boolean | false | Whether to show praise animation |
| `message` | String | - | Custom praise text |
| `voice` | Boolean | false | Whether to read praise text aloud |

| Method | Description |
| ------ | ----------- |
| `show(index?)` | Show praise, can pass message index (0-4), random by default |
| `hide()` | Hide praise |

- 5 built-in praise messages, randomly rotated
- Auto-hides after 3.5 seconds, press Esc to close early

#### WarmBuddy — Buddy Mode

| Method | Description |
| ------ | ----------- |
| `highlightTarget(selector, speech)` | Highlight target element on elderly's screen + voice explanation |
| `clearHighlight()` | Clear highlight guidance |

| Event | Description |
| ----- | ----------- |
| `warm-buddy-code` | Security code generated, `detail.code` |
| `warm-buddy-connected` | Remote assistance connected |
| `warm-buddy-disconnected` | Connection disconnected |

- 6-digit security code, auto-expires after 5 minutes
- Flow: Generate code → Tell family → Family enters code → Connection successful

---

## Utility Module API

### Theme — High Contrast Dynamic Colors

```js
import { applyTheme, getSavedTheme, getAvailableThemes, THEMES } from "@warm-ui/components";
```

| Method/Property | Description |
| --------------- | ----------- |
| `applyTheme(name)` | Apply theme globally, save to localStorage |
| `getSavedTheme()` | Get saved theme name, default `default` |
| `getAvailableThemes()` | Return all available themes list `[{id, name}]` |
| `THEMES` | Theme configuration object |

**Built-in Themes**:

| Theme ID | Name |
| -------- | ---- |
| `default` | Default Theme |
| `deuteranopia` | Red-Green Color Blindness (Green Weak) |
| `protanopia` | Red-Green Color Blindness (Red Weak) |
| `tritanopia` | Blue-Yellow Color Blindness |
| `high-contrast` | High Contrast |

### SpeechAdapter — Speech Adapter

```js
import { SpeechAdapter, speechAdapter } from "@warm-ui/components";
```

| Method | Description |
| ------ | ----------- |
| `speak(text, options?)` | Text-to-speech reading |
| `speakOutline(outline, options?)` | Read page outline summary |
| `startRecognition(options)` | Start speech recognition |
| `stop()` | Stop reading |
| `registerProvider(name, handler)` | Register custom TTS provider |
| `registerRecognitionProvider(name, handler)` | Register custom speech recognition provider |

| Static Method | Description |
| ------------- | ----------- |
| `SpeechAdapter.isTTSSupported()` | Check if browser supports TTS |
| `SpeechAdapter.isRecognitionSupported()` | Check if browser supports speech recognition |

**Default Instance**: `speechAdapter`, ready to use.

### Checker — One-Click Compliance Check

```js
import { runAccessibilityCheck, formatReport, CHECK_RULES } from "@warm-ui/components";
```

| Method/Property | Description |
| --------------- | ----------- |
| `runAccessibilityCheck(ruleIds?)` | Run compliance check, returns Promise<report object> |
| `formatReport(report)` | Generate friendly text format check report |
| `CHECK_RULES` | Check rules array |

**Check Rules**:

| Rule ID | Name | Level | Description |
| ------- | ---- | ----- | ----------- |
| `touch-target-size` | Touch Target Size | error | Is clickable area ≥ 44×44dp |
| `contrast-ratio` | Color Contrast | error | Is contrast ratio AA level (≥4.5:1) |
| `alt-text` | Image Alt Text | warning | Do images have alt attribute |
| `age-discrimination` | Age Discrimination Check | error | Is there age-discriminatory logic |

### API Proxy — Service Interface Proxy

```js
import { translateToPlain, getNavigationSuggestion } from "@warm-ui/components";
```

| Method | Description |
| ------ | ----------- |
| `translateToPlain(text, lang?)` | Plain language translation API |
| `getNavigationSuggestion(query, pages)` | AI navigation suggestion API |

- Built-in rate limiting: max 20 requests per minute
- Requires backend to provide `/api/warm/translate` and `/api/warm/navigate` endpoints

---

## Browser Extensions

### Aging Simulator `@warm-ui/plugin`

A Chrome extension for developers to simulate the real experience of elderly people using web products.

**9 Simulation Modes**:

| Category | Mode | Description |
| -------- | ---- | ----------- |
| 👓 Visual | Blurred Vision | Simulate presbyopia vision decline |
| 👓 Visual | Yellowed Vision | Simulate yellowing of lens |
| 👓 Visual | Tunnel Vision | Simulate peripheral vision loss |
| 👓 Visual | Contrast Reduction | Simulate reduced contrast sensitivity |
| 🖐️ Tactile | Hand Tremor (Page Shake) | Simulate impact of hand tremors on reading |
| 🖐️ Tactile | Hand Tremor (Cursor Shake) | Simulate impact of hand tremors on operation |
| 🖐️ Tactile | Fine Motor Weakness | Simulate reduced finger dexterity |
| 🧠 Cognitive | Slower Information Processing | Simulate reduced cognitive processing speed |
| 🧠 Cognitive | Easily Distracted Attention | Simulate difficulty concentrating |
| 🧠 Cognitive | Cognitive Downgrade | Hide icons + replace terminology |

### Elderly Assistant `@warm-ui/elder-plugin`

A Chrome extension for elderly direct use, making any webpage aging-friendly with one click.

**5 Preset Scenarios**:

| Scenario | Description |
| -------- | ----------- |
| Large Font Mode | Larger, clearer text (recommended) |
| Simple Mode | Remove distractions, focus on content |
| Voice First | Auto-read selected text |
| Night Mode | Dark background, protect eyes |
| Custom | Freely combine enhancement features |

**6 Enhancers**:

| Enhancer | Description |
| -------- | ----------- |
| 🔤 Font Enlarge | 3 levels (small/medium/large) |
| 🎨 High Contrast | 3 themes (high contrast/color blind/dark) |
| 📄 Reading Mode | Remove ads and distractions |
| 👆 Anti-Mistouch | Larger buttons, harder to misclick |
| 🔊 Voice Reading | Select text, read it aloud |
| 🧭 Page Guide | Tell you where to click next |

---

## Online Demo

WarmUI provides a full-featured simulation experience page. Clone and run locally to try all 12 components.

```bash
# 1. Clone repository
git clone https://github.com/mariobeng/WarmUI.git
cd WarmUI

# 2. Start static server (choose one)
npx serve . -p 3000
# or
npx http-server . -p 3000

# 3. Open in browser
# http://localhost:3000/demo/
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
| ------- | ------ | ------- | ------ | ---- |
| Web Components | ✅ 54+ | ✅ 63+ | ✅ 10.1+ | ✅ 79+ |
| Speech Synthesis | ✅ 33+ | ✅ 49+ | ✅ 7+ | ✅ 14+ |
| Speech Recognition | ✅ 33+ | ❌ | ❌ | ✅ 79+ |
| CSS Custom Props | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 15+ |

> Speech Recognition is currently only supported by Chromium-based browsers, other browsers will gracefully degrade.

---

## Who Should Use This?

- Frontend teams needing to improve product aging-friendly experience
- Government/enterprise projects with accessibility compliance requirements
- Products serving elderly users (healthcare, finance, social, etc.)
- Developers and designers interested in accessibility

---

## Contributing

We especially welcome non-technical contributors—designers, social workers, elderly family members. If you want to make technology warmer, your voice is valuable.

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for more.

---

## License

[MIT License](LICENSE)

---

**We believe the best technology doesn't make the elderly "catch up with the times," but lets the times wait a moment and lend a hand to those who have accompanied it to today.**

[MIT License](LICENSE) | [GitHub Repository](https://github.com/mariobeng/WarmUI) | [Documentation Site] | [Join Community]
