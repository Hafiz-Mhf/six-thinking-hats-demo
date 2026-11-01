# Think Together — Current Context

**Last updated:** 2026-11-01  
**Current branch:** `main`  
**Repository:** https://github.com/Hafiz-Mhf/six-thinking-hats-demo

## Purpose

This is a visual, presenter-led knowledge-sharing deck for an HR / Talent Development team. It explains Arthur Carmazzi's Colored Brain communication framework and Edward de Bono's Six Thinking Hats in plain workplace language.

The experience is intentionally casual. It does not include participant accounts, live collaboration, quizzes, note capture, timers, exports, or meeting-workspace features.

## Presentation flow

1. **Why** — one workplace problem can produce different valid reactions.
2. **Brains** — four communication preferences for personal self-reflection.
3. **Hats** — six deliberate thinking modes used one at a time.
4. **Connection** — choose a brain preference, choose a hat, and see how the mode may feel familiar or require practice.
5. **Daily work** — practical use alone, with teammates, with a boss, or during disagreement.
6. **Example** — an HR Talent Development scenario from problem introduction through all six hats to a conclusion.
7. **Takeaway** — concise rules for respectful communication and structured thinking.

## Content guardrails

- Colored Brain is presented as Arthur Carmazzi's communication framework and a self-reflection aid, not a scientific diagnosis.
- Users identify only their own preference; they should not assign colors to coworkers or managers.
- The familiar titles remain: **The Systemizer, The Analyzer, The Ideator, and The Socializer**.
- Preferences are flexible, context-dependent, and do not measure ability or personality.
- Every brain preference can use every thinking hat.
- During group use, everyone uses the same hat at the same time.

## Active architecture

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/presentation/
│   ├── ConceptVisuals.tsx
│   └── PresentationDeck.tsx
├── data/
│   └── presentationData.ts
└── types/
    └── brain.ts

tests/
├── App.test.tsx
├── sanity.test.ts
└── setup.ts
```

`App.tsx` renders only `PresentationDeck`. The previous quiz, simulator, playbook, facilitator workspace, timer, note-taking, export, and persistence code has been removed because it is not part of the current presentation.

## Source material

- `information.md` contains the synthesized workshop reference.
- `sources/` contains the original workshop images used to prepare that synthesis.
- The presentation deliberately avoids presenting unsupported genetic or diagnostic claims as scientific facts.

## Interaction and accessibility

- Direct seven-stage navigation plus Back and Next controls.
- Left and Right arrow keys move between presentation stages.
- Brain choices and daily-work tabs support local arrow-key navigation without triggering stage changes.
- Interactive choices expose their selected state to assistive technology.
- Repeated brain and hat illustrations are decorative and hidden from screen readers.
- Layouts are responsive for desktop projection and narrow mobile screens.
- Reduced-motion preferences are respected.

## Development commands

```powershell
npm.cmd run dev
npm.cmd test
npm.cmd run build
```

## Current status

- Seven-stage presentation complete.
- Brains section includes safe self-reflection framing and an optional four-preference comparison.
- Hat illustrations use a recognizable crown, band, and brim.
- Connection and Daily Work sections have explicit guided interactions.
- HR Talent Development example includes scenario, six-hat sequence, and conclusion.
- Generated QA screenshots and browser artifacts are excluded from Git.

## Next step

Present the deck to the team and collect feedback on clarity, pacing, and the usefulness of the HR example. Keep future changes focused on the presentation unless a separate interactive facilitator product is explicitly requested.
