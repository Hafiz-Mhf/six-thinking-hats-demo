# Six Thinking Hats Interactive Facilitator — Current Context & Status

> **Living Context Document:** This document reflects the latest architecture, implementation progress, test status, and upcoming roadmap for the Six Thinking Hats web application. It should be updated whenever significant updates, refactors, or new features are introduced.

**Last Updated:** 2026-10-29  
**Current Git Branch:** `feat/colored-brain-six-hats-visual-app` (pushed to `origin`)  
**Project Repository:** [https://github.com/Hafiz-Mhf/six-thinking-hats-demo](https://github.com/Hafiz-Mhf/six-thinking-hats-demo)

---

## 1. Project Overview & Objectives

* **Core Purpose:** A visual-first, low-text interactive web guide combining **Arthur Carmazzi's Colored Brain** and **Dr. Edward de Bono's Six Thinking Hats** to help HR and teams communicate better, reduce friction, and run productive meetings.
* **Core HR Mental Model — Natural Style vs. Meeting Hat:**
  * **Natural Style (Colored Brain — Who You Are):** How your brain naturally takes in information (Purple 🟣 Facts & Details, Red 🔴 Action & Steps, Green 🟢 Fresh Ideas, Blue 🔵 People & Feelings). Everyone is different. It is who you are, and that is okay. Explains why two people can clash in a 1-on-1 talk if their styles differ.
  * **Meeting Hat (Six Thinking Hats — How We Think Together):** A simple tool for team meetings (White ⚪ Facts, Red 🔴 Gut Feelings, Yellow 🟡 Positives, Black ⚫ Risks, Green 🟢 Ideas, Blue 🔵 Next Steps). Instead of arguing back and forth, the whole team wears the same hat at the same time so no one feels personally attacked.
* **Key Objectives:**
  1. **Self-Awareness in 60s:** Quick 3-scenario quiz showing your natural communication style, strengths, stress triggers, and tips on how to talk to teammates.
  2. **Everyday Workplace Guide:** Practical guide for 4 common workplace situations (resolving team disagreements, handling project crises without blame, brainstorming new initiatives, 1-on-1 feedback). Shows how to talk 1-on-1 vs. which hats to use in a group.
  3. **4-Style Meeting Simulator:** Interactive demo showing how all 4 styles (Alex, Ryan, Chloe, Maya) work together smoothly under the same hat.
  4. **Simple & Zero Overhead:** Works offline in any browser, projector-friendly, zero login or complex setup.

---

## 2. Current Implementation Status

All stages of the dual-framework visual experience have been implemented, tested, and verified:

| Subsystem / Feature | Status | Verification |
| :--- | :--- | :--- |
| **Brain Archetypes & Workplace Scenarios Data** (`brainData.ts`, `workplaceScenarios.ts`) | ✅ Complete | Unit tests pass (`tests/brainData.test.ts`) |
| **Module 1: Find Your Brain in 60s** (`BrainFinderModule.tsx`, `BrainAvatar.tsx`) | ✅ Complete | Component tests pass (`tests/BrainFinderModule.test.tsx`) |
| **Module 2: When & Where to Apply** (`WhenWhereModule.tsx`, `HardwareSoftwareGraphic.tsx`) | ✅ Complete | Component tests pass (`tests/WhenWhereModule.test.tsx`) |
| **Module 3: 4-Brain Parallel Simulator** (`HatSimulatorModule.tsx`, Web Audio synth) | ✅ Complete | Component tests pass (`tests/HatSimulatorModule.test.tsx`) |
| **App Shell & Stage Navigation** (`App.tsx`, `VisualHeader.tsx`, `PrintHandout.tsx`) | ✅ Complete | Integration tests pass (`tests/App.test.tsx`) |
| **Full Test Suite & Production Bundle** | ✅ Complete | 13/13 test files (22/22 tests) pass, `npm run build` zero TS errors |

---

## 3. Architecture & File Structure

```
d:/six-thinking-hats-demo/
├── docs/
│   └── superpowers/
│       ├── specs/2026-10-12-six-thinking-hats-design.md     # Detailed design spec
│       └── plans/2026-10-12-six-thinking-hats-plan.md       # Implementation plan
├── src/
│   ├── components/
│   │   ├── playbook/                                        # Hub 1: Learn & Guide
│   │   │   ├── HatCard.tsx                                  # 6-hat cards & modal details
│   │   │   ├── PlaybookHub.tsx                              # Playbook root hub
│   │   │   ├── RecipeViewer.tsx                             # Daily meeting recipe browser
│   │   │   └── ThinkingVisualizer.tsx                       # Parallel vs. Adversarial graphic
│   │   └── workspace/                                       # Hub 2: Live Facilitator
│   │       ├── ActionItemTable.tsx                          # Step 4: Action item register
│   │       ├── FacilitatorHUD.tsx                           # Docked presenter toolbar
│   │       ├── HatHeader.tsx                                # Active hat chromatic banner & prompts
│   │       ├── MatrixOverview.tsx                           # Step 3: 6-column synthesis modal
│   │       ├── StickyCard.tsx                               # Sticky note item with metadata
│   │       ├── StickyWall.tsx                               # Rapid note input & card grid
│   │       ├── TimerDisplay.tsx                             # Audio-visual timer ticker
│   │       └── WorkspaceHub.tsx                             # Workspace root layout
│   ├── context/
│   │   └── WorkshopContext.tsx                              # Central state reducer & localStorage sync
│   ├── data/
│   │   ├── hatDefinitions.ts                                # 6 hats info, rules, DOs & DON'Ts
│   │   ├── recipes.ts                                       # 4 daily work recipes (15m, 30m, 45m)
│   │   └── sampleTemplates.ts                               # Workplace case study templates
│   ├── hooks/
│   │   └── useFacilitatorHotkeys.ts                         # Keyboard shortcut listener
│   ├── types/
│   │   └── index.ts                                         # Core TypeScript contracts
│   ├── utils/
│   │   ├── audio.ts                                         # Native Web Audio synth chimes
│   │   ├── exportMarkdown.ts                                # Formatted Markdown generator & downloader
│   │   └── timer.ts                                         # Timer math & urgency thresholds
│   ├── App.tsx                                              # Top shell & tab navigation
│   ├── index.css                                            # Theme CSS variables & print styles
│   └── main.tsx                                             # React 19 entry point
├── tests/                                                   # 9 Vitest unit & integration test files
├── CURRENT_CONTEXT.md                                       # Living context document (this file)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Key Functional Features

### 4.1 Daily Work Meeting Recipes
Pre-configured workflows ready to run in daily engineering work:
1. **Quick Standup Dilemma (15 min):** Blue → Red → Yellow → Black → Red → Blue (fast resolution for blockers or PR disagreements).
2. **Sprint Retrospective / Post-Mortem (45 min):** Blue → White → Red → Yellow → Black → Green → Blue (facts, psychological safety, root vulnerabilities, solutions).
3. **New Feature / Creative Brainstorm (30 min):** Blue → White → Green → Yellow → Black → Blue (protects ideation from premature criticism).
4. **Risk & Architecture Review (30 min):** Blue → White → Yellow → Black → Blue (systematic stress testing of designs and migrations).

### 4.2 Active Hat Immersion & Metadata Tagging
* UI dynamically adapts color palettes, tints, and borders to the active hat.
* **Black Hat:** Allows tagging cards with `Low`, `Medium`, or `High` risk severity.
* **Red Hat:** Allows tagging cards with `Positive Gut`, `Uneasy / Skeptical`, or `Neutral Pulse`.
* **Green Hat:** Enables one-click `+1` idea upvoting.

### 4.3 Facilitator Controls & Hotkeys
* `1` to `6`: Jump to White, Red, Yellow, Black, Green, or Blue Hat.
* `Space`: Toggle timer start/pause.
* `T`: Add +60 seconds to countdown.
* `N`: Focus rapid note input bar.
* `M`: Toggle 6-Column Matrix synthesis modal.
* *Note:* Hotkeys automatically disengage while typing in text inputs or textareas.

### 4.4 Synthesis & Export Deliverables
* **Markdown Report (`.md`):** Formats meeting topic, categorized 6-hat notes with votes/tags, and action table for easy sharing in Slack/Notion/Confluence/Jira.
* **Printable Handout (`Ctrl+P`):** Clean print layout rendering an executive summary on A4 landscape.
* **Local Persistence:** Continuous auto-save to `localStorage` (`six_hats_session_v1`).

---

## 5. Development & Testing Commands

```bash
# Run local development server (Vite)
npm run dev

# Run Vitest unit & integration test suite
npm test

# Run TypeScript type check and production build
npm run build
```

---

## 6. Project Roadmap & Next Steps

- [x] Phase 1: Prototype Scaffolding & Visual System
- [x] Phase 2: Workflow Engine, Recipes & Facilitator HUD
- [x] Phase 3: Exporters (Markdown & Print) & Hotkey Controls
- [x] Phase 4: Attendance at Six Thinking Hats Workshop (Oct 26–27, 2026)
- [ ] **Phase 5 (Current Milestone): Team Knowledge Transfer (KT) Execution (Oct 29–30, 2026)**
  - Run live 60–90 min session with team using the Playbook and pre-loaded case studies.
  - Collect live feedback on facilitation flow and prompt clarity.
- [ ] **Future Enhancements (Post-KT):**
  - Session history archive (switch between multiple past saved sessions).
  - Optional local peer-to-peer / QR code participant note submission.
  - Additional specialized daily work recipes based on team feedback.

---

## 7. Change Log

* **2026-10-29:** Implemented visual-first dual-framework experience combining Arthur Carmazzi's Colored Brain and Dr. Edward de Bono's Six Thinking Hats:
  * Implemented 60-second visual self-diagnostic module (`BrainFinderModule`, `BrainAvatar`) with archetype superpower, kryptonite, and peer communication badges.
  * Implemented "When & Where to Apply" interactive matrix (`WhenWhereModule`, `HardwareSoftwareGraphic`) with 4 common workplace scenarios (resolving team disagreements, handling project crises without blame, brainstorming new initiatives, 1-on-1 feedback).
  * Refactored analogy from tech terms ("Hardware vs Software") to an HR-friendly model: "Natural Style (Who You Are) vs. Meeting Hat (How We Think Together)" with simple, concise everyday language.
  * Implemented 4-avatar parallel meeting simulator (`HatSimulatorModule`) with synced avatar behaviors, Web Audio oscillator timer chimes, hotkeys, and live note capture.
  * Added printable A4 landscape team summary cheat sheet (`PrintHandout`).
  * 13 test files passing (22/22 unit and integration tests), clean production build.
* **2026-10-28:** Created `CURRENT_CONTEXT.md` as the living project context document following completion and merge of all core MVP modules into `main`.
* **2026-10-12:** Completed Tasks 1–9; implemented PlaybookHub, WorkspaceHub, FacilitatorHUD, Timer with Web Audio API, MatrixOverview, ActionItemTable, and Markdown exporter. Merged to `main` and pushed to GitHub.
