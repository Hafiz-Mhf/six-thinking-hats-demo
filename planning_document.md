# Six Thinking Hats Interactive Facilitator Web App - Planning Document

## 1. Project Background & Context
Following attendance at the **Six Thinking Hats Mastery: One Problem, Six Angles** workshop on 26–27 October 2026, this web application serves as an interactive facilitation, presentation, and collaborative thinking tool. The objective is to facilitate the Knowledge Transfer (KT) session to the internal team and provide a sustainable tool for real-world workplace decision-making.

The application translates Dr. Edward de Bono's parallel thinking framework and the 4-step workflow (*Define Topic → Think in Turns → Share & Explore → Summarise & Decide*) into a software-guided experience.

---

## 2. Project Goals & Objectives

### Primary Goals
1. **Interactive Knowledge Transfer:** Enable the facilitator to present the methodology without passive slides.
2. **Behavioral Guardrailing:** Enforce parallel thinking by constraining team participation to one hat at a time, eliminating counter-productive debates.
3. **Action-Oriented Output:** Consolidate inputs from all 6 perspectives into an actionable Blue Hat summary and exportable report.

### Success Metrics
* **Team Engagement:** 100% participation during the live simulation phase via interactive sticky-note contributions.
* **Frictionless Adoption:** Zero training required for participants to submit ideas via desktop or mobile browser.
* **Tangible Deliverable:** A completed, structured action plan generated and exported within a 60–90 minute team workshop.

---

## 3. User Personas

| Persona | Role | Key Needs & Pain Points |
| :--- | :--- | :--- |
| **Facilitator (You)** | Meeting Lead / Knowledge Sharer | Needs structured pacing, timer control, stage management, visual cues for guiding questions, and one-click report generation. |
| **Participant (Team Member)** | Ideator / Evaluator | Needs quick card submission without signup hurdles, clear instructions for the active hat, and psychological safety (especially under Red Hat). |
| **Reviewer / Stakeholder** | Post-Session Consumer | Needs clean, structured summaries showing risks, facts, and actionable decisions without reading messy meeting logs. |

---

## 4. Phased Implementation Roadmap

```
Oct 7 - Oct 14      Oct 15 - Oct 22     Oct 23 - Oct 25     Oct 26 - 27       Oct 29 - 30
   [Phase 1]           [Phase 2]           [Phase 3]          [Phase 4]          [Phase 5]
Core Prototype &    Full Interaction &  Local Dry Run &    Attend Training    Team KT Session
  Visual System       State Handling       Testing        (Refine Prompts)     Execution
```

### Phase 1: Prototype & Visual Core (Oct 7 – Oct 14)
* Scaffold project repository with React + Tailwind CSS.
* Build the presentation deck mode with the 6 Hat cheat sheets.
* Implement the dynamic 6-color theme engine and visual identity.

### Phase 2: Workflow & Interactive Sandbox (Oct 15 – Oct 22)
* Implement the 4-step stepper engine (*Define → Turns → Explore → Summarise*).
* Build sticky-note management (CRUD, upvoting, categorized card walls).
* Implement the integrated countdown timer with audio/visual cues.
* Add Markdown and JSON export capabilities for session summaries.

### Phase 3: Dry Run & Facilitator Controls (Oct 23 – Oct 25)
* Configure facilitator keyboard shortcuts (Quick Hat Switch `1`–`6`, Space to toggle timer).
* Pre-populate realistic workplace case studies (e.g., cross-functional bottleneck, tooling migration).
* Conduct local dry run on a secondary display/projector.

### Phase 4: Training Assimilation (Oct 26 – Oct 27)
* Attend the official 2-day session at *Chatterbox, Level 3*.
* Extract exact facilitation phrases, nuances, and sequence adjustments observed during the workshop.
* Update prompt cards and helper text inside the app.

### Phase 5: Knowledge Transfer Execution (Oct 29 / 30)
* Conduct live 60–90 min session with the team.
* Capture live team inputs and export immediate action items.

---

## 5. Scope & Guardrails

### In Scope (MVP)
* Single-page dual-mode application (Presentation / Showcase Mode + Interactive Workshop Workspace).
* Dynamic theme switching corresponding to the active hat (White, Red, Yellow, Black, Green, Blue).
* Timer module (customizable durations, fast 60s presets for Red Hat).
* Local persistence (`localStorage`) with session reset and sample template loader.
* Export engine producing clean Markdown and printable summary matrices.

### Out of Scope (MVP)
* User account registration and authentication systems (unnecessary friction for internal KT).
* Complex multi-tenant cloud databases (MVP operates standalone; team can input via shared screen or local shared host).