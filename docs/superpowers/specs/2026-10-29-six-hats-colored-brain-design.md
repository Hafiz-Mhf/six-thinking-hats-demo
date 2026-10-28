# Six Thinking Hats & Colored Brain Interactive Visual Experience — Design Specification

- **Date:** 2026-10-29
- **Topic:** Dual-Framework Visual Facilitator & Interactive Team Guide (Six Thinking Hats + Arthur Carmazzi's Colored Brain)
- **Target Audience:** Internal Engineering Team, Tech Leads, Facilitator
- **Status:** Approved for Implementation Planning

---

## 1. Executive Summary & Core Philosophy

### 1.1 Background & Need
Following the workshop combining **Dr. Edward de Bono's Six Thinking Hats** and **Arthur Carmazzi's Colored Brain Communication**, this application is rebuilt as an **interactive, visual-first journey**. It is tailored for engineers and cross-functional teams to understand both frameworks with **minimal text, intuitive iconography, and fast visual comprehension**.

### 1.2 The Conceptual Bridge: Hardware vs. Software
The core message communicated visually to the team:
* **Colored Brain (Innate Hardware / Who You Are):**
  - Genetic, default way the brain processes information (Purple, Red, Green, Blue).
  - Unconscious and stable. Explains why team members naturally clash when communicating 1-on-1.
* **Six Thinking Hats (Software / What You Wear):**
  - Deliberate, temporary thinking modes (White, Red, Yellow, Black, Green, Blue).
  - Conscious and fluid. Aligns all 4 brain processors to look in the exact same direction at the same time during meetings.

---

## 2. The 3-Module Visual Architecture

The application is structured into a progressive 3-stage visual journey:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [App Title]  [🧠 1. Find Your Brain]  [🗺️ 2. Where & When]  [🎩 3. Hat Simulator] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Module 1: 1-Minute Visual "Find Your Brain Color"
Allows team members to discover their natural brain processor in 60 seconds during the meeting through 3 visual scenario cards.

* **Scenario 1: Production Bug Alert**
  - 🟣 **Purple:** Needs logs, history, and root cause before acting (Data & Context).
  - 🔴 **Red:** Demands a checklist: Step 1 rollback, Step 2 isolate, Step 3 patch (Linear Logic).
  - 🟢 **Green:** Tries 3 spontaneous hotfix ideas immediately (Chaotic Innovation).
  - 🔵 **Blue:** Checks team stress levels and focuses on emotional calm (Empathy & Feelings).
* **Scenario 2: 20-Page Technical Spec**
  - 🟣 Reads every footnote and link happily.
  - 🔴 Scans for action items, milestones, and deadlines.
  - 🟢 Skims the title, then sketches an entirely new architecture.
  - 🔵 Asks: *"Who is the user, and does this experience feel right?"*
* **Scenario 3: Mental Battery Drain Trigger**
  - 🟣 Being pressured to decide without sufficient background data.
  - 🔴 Aimless meetings with no agenda, no clear steps, and no structure.
  - 🟢 Rigid micromanagement that forbids out-of-the-box experimentation.
  - 🔵 Cold, aggressive arguments with zero psychological safety.

* **Visual Output Card:**
  - Dynamic avatar badge with glowing color aura.
  - **Superpower Tag** (e.g. *Root Cause Hunter*, *Tactical Driver*, *Visionary Spark*, *Team Radar*).
  - **Kryptonite Tag** (what causes them stress).
  - **Communication Translation Pill** (*"How to talk to this brain type without causing friction"*).
  - Interactive Inspector letting users tap other colors to understand their teammates.

---

### Module 2: Visual "When & Where to Apply" Matrix
Visually maps where each tool applies in daily software engineering work.

* **Workplace Scenario Selectors (1-Click Visual Switcher):**
  1. 🛠️ **Code Review & Architecture Debate**
  2. 🚨 **Production Incident Post-Mortem**
  3. 💡 **Feature Brainstorming & Sprint Planning**
  4. 🤝 **1-on-1 Delegation & Feedback**
* **Side-by-Side Visual Comparison:**
  - **Left (Colored Brain - 1-to-1):** How different brain colors clash in this scenario and how to adapt your language (e.g., Green translating into 1-2-3 bullet points for Red).
  - **Right (Six Hats - Group Meeting):** The exact visual Hat sequence to run (e.g., `Blue ➔ White ➔ Red ➔ Black ➔ Green ➔ Blue`) to give every brain processor their designated phase.

---

### Module 3: 4-Brain Parallel Meeting Simulator
The interactive simulation proving why Six Hats eliminates brain color friction.

* **The 4 Team Avatars:**
  - 🟣 **Alex (Purple):** "The Researcher" (Detail & Data)
  - 🔴 **Ryan (Red):** "The Operator" (Step-by-step & Order)
  - 🟢 **Chloe (Green):** "The Innovator" (Random Sparks & Big Picture)
  - 🔵 **Maya (Blue):** "The Empath" (Intuition & Team Harmony)
* **The Two Simulation States:**
  1. **Before Six Hats (The Natural Clash):** Visual conversation showing Chloe's wild idea being shot down by Ryan's demand for immediate steps and Alex's demand for data, while Maya feels alienated.
  2. **With Six Hats (Parallel Thinking Transformation):**
     - When facilitator triggers a Hat (or keys `1`–`6`), **all 4 avatars visually wear the same colored hat**.
     - Shows the room cooperating: under White Hat, everyone gathers data; under Green Hat, everyone brainstorms wildly; under Black Hat, risks are assessed constructively; under Blue Hat, concrete 1-2-3 action items are locked in.
* **Interactive Facilitation Toolbar & Exporter:**
  - Facilitator hotkeys (`1-6`, `Space` for timer, `N` for rapid note input, `M` for matrix).
  - Web Audio synthetic chimes for countdowns.
  - Printable A4 Landscape Team Cheat Sheet (`Ctrl+P` / PDF).

---

## 3. Tech Stack & State Architecture

* **Framework:** React 19 + TypeScript + Vite.
* **Styling:** Tailwind CSS v4 + dynamic CSS theme variables.
* **Iconography:** `lucide-react`.
* **Sound Engine:** Native Web Audio API oscillator (zero audio asset dependencies).
* **Persistence:** `localStorage` for quick recovery across page reloads.

---

## 4. Testing & Verification Plan

1. **Diagnostic Logic Tests:** Verify scoring and archetype calculation for the 3 visual diagnostic scenarios.
2. **Interactive Component Tests:** Verify that selecting scenarios updates the When & Where visual matrix.
3. **Simulation State Tests:** Verify avatar hat transformations and facilitator hotkey responsiveness.
4. **Export & Print Verification:** Ensure print stylesheet generates a clean A4 landscape team summary.
5. **Build Verification:** Zero TypeScript warnings with `npm run build`.
