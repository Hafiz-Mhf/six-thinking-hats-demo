import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, Expand, Minimize, RotateCcw } from 'lucide-react';
import type { BrainColor } from '../../types/brain';
import {
  BRAINS,
  BRAIN_HAT_BEHAVIORS,
  DAILY_CONTEXTS,
  DEMO_CONTENT,
  DEMO_SEQUENCE,
  HATS,
  HR_DEMO_CONCLUSION,
  HR_DEMO_SCENARIO,
  type DailyContextId,
  type HatColor
} from '../../data/presentationData';
import { BrainVisual, HatVisual } from './ConceptVisuals';

const STAGES = [
  { id: 'why', nav: 'Why', eyebrow: 'Start here' },
  { id: 'brains', nav: 'Brains', eyebrow: 'Self-reflection' },
  { id: 'hats', nav: 'Hats', eyebrow: 'Thinking mode' },
  { id: 'connection', nav: 'Connection', eyebrow: 'Use both' },
  { id: 'daily', nav: 'Daily work', eyebrow: 'Make it practical' },
  { id: 'example', nav: 'Example', eyebrow: 'Try it together' },
  { id: 'takeaway', nav: 'Takeaway', eyebrow: 'Remember this' }
] as const;

type StageId = (typeof STAGES)[number]['id'];

function StageHeading({ stage, title, text }: { stage: StageId; title: string; text: string }) {
  const item = STAGES.find((entry) => entry.id === stage)!;
  return (
    <header className="stage-heading">
      <p className="stage-kicker"><span>{STAGES.indexOf(item) + 1}</span>{item.eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </header>
  );
}

export function PresentationDeck() {
  const [stage, setStage] = useState<StageId>(() => {
    const requested = new URLSearchParams(window.location.search).get('stage');
    return STAGES.some((item) => item.id === requested) ? requested as StageId : 'why';
  });
  const [brainId, setBrainId] = useState<BrainColor>('purple');
  const [hatId, setHatId] = useState<HatColor>('white');
  const [contextId, setContextId] = useState<DailyContextId>('alone');
  const [showBrainComparison, setShowBrainComparison] = useState(false);
  const [demoStep, setDemoStep] = useState(() => {
    const requested = Number(new URLSearchParams(window.location.search).get('demo'));
    return Number.isInteger(requested) && requested >= 0 && requested < DEMO_SEQUENCE.length ? requested : 0;
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stageIndex = STAGES.findIndex((item) => item.id === stage);
  const brain = BRAINS.find((item) => item.id === brainId)!;
  const hat = HATS.find((item) => item.id === hatId)!;
  const dailyContext = DAILY_CONTEXTS.find((item) => item.id === contextId)!;
  const demoStage = DEMO_SEQUENCE[demoStep];
  const demoHat = demoStage.kind === 'hat' ? HATS.find((item) => item.id === demoStage.id)! : null;
  const demo = demoHat ? DEMO_CONTENT[demoHat.id] : null;
  const selectedHatIsFamiliar = brain.comfortableHats.includes(hat.id);
  const comparisonBrains = [brain, ...BRAINS.filter((item) => item.id !== brain.id)];

  const goTo = (next: number) => {
    const safeIndex = Math.min(Math.max(next, 0), STAGES.length - 1);
    setStage(STAGES[safeIndex].id);
    window.history.replaceState(null, '', `?stage=${STAGES[safeIndex].id}`);
    if (!navigator.userAgent.includes('jsdom')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDailyContextKey = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % DAILY_CONTEXTS.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + DAILY_CONTEXTS.length) % DAILY_CONTEXTS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = DAILY_CONTEXTS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setContextId(DAILY_CONTEXTS[nextIndex].id);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
  };

  const handleBrainKey = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % BRAINS.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + BRAINS.length) % BRAINS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = BRAINS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setBrainId(BRAINS[nextIndex].id);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('.brain-choice')[nextIndex]?.focus();
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'ArrowRight') goTo(stageIndex + 1);
      if (event.key === 'ArrowLeft') goTo(stageIndex - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [stageIndex]);

  useEffect(() => {
    const handleFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreen);
    return () => document.removeEventListener('fullscreenchange', handleFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  };

  const progress = useMemo(() => `${((stageIndex + 1) / STAGES.length) * 100}%`, [stageIndex]);

  return (
    <div className="presentation-shell">
      <header className="presentation-topbar">
        <button className="brand-mark" type="button" onClick={() => goTo(0)} aria-label="Return to opening">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          <span><strong>Think Together</strong><small>Colored Brain × Six Thinking Hats</small></span>
        </button>

        <nav className="flow-nav" aria-label="Presentation flow">
          {STAGES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={stage === item.id ? 'is-active' : stageIndex > index ? 'is-complete' : ''}
              aria-current={stage === item.id ? 'step' : undefined}
              onClick={() => goTo(index)}
            >
              <span>{index + 1}</span>{item.nav}
            </button>
          ))}
        </nav>

        <button className="icon-button" type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}>
          {isFullscreen ? <Minimize /> : <Expand />}
        </button>
        <div className="flow-progress" aria-hidden="true"><i style={{ width: progress }} /></div>
      </header>

      <main className="presentation-main">
        {stage === 'why' && (
          <section className="stage stage-opening">
            <div className="opening-copy">
              <p className="opening-label">A casual team learning session</p>
              <h1>Why do smart people still <em>misunderstand</em> each other?</h1>
              <p className="opening-lead">One workplace problem can trigger four valid reactions. Trouble starts when we treat a different reaction as a wrong one.</p>
              <button className="primary-action" type="button" onClick={() => goTo(1)}>Explore the four brains <ArrowRight /></button>
            </div>
            <div className="reaction-board" aria-label="Four reactions to one workplace problem">
              <div className="problem-note"><small>Same problem</small><strong>“We need to change how this project works.”</strong></div>
              {BRAINS.map((item) => (
                <article key={item.id} className="reaction-note" style={{ '--accent': item.color, '--soft': item.soft } as React.CSSProperties}>
                  <BrainVisual color={item.id} fill={item.soft} size="sm" />
                  <div><small>{item.title}</small><p>“{item.quote}”</p></div>
                </article>
              ))}
              <p className="board-caption">Different does not mean wrong.</p>
            </div>
          </section>
        )}

        {stage === 'brains' && (
          <section className="stage stage--brains">
            <StageHeading stage="brains" title="Four ways people may prefer to process information" text="Explore the preference closest to how you often work. This is for self-reflection—not for assigning a color to someone else." />
            <aside className="brain-framing" aria-label="How to use Colored Brain">
              <strong>A reflection tool, not a diagnosis.</strong>
              <p>Colored Brain is Arthur Carmazzi's communication framework. Preferences are flexible, can change with the situation, and do not measure ability or personality.</p>
            </aside>
            <div className="brain-explorer">
              <div className="object-picker object-picker--brains" role="group" aria-label="Explore your own communication preference">
                {BRAINS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={brainId === item.id ? 'brain-choice is-active' : 'brain-choice'}
                    style={{ '--accent': item.color, '--accent-text': item.textColor, '--soft': item.soft, '--line': item.line } as React.CSSProperties}
                    aria-pressed={brainId === item.id}
                    onClick={() => setBrainId(item.id)}
                    onKeyDown={(event) => handleBrainKey(event, index)}
                  >
                    <BrainVisual color={item.id} fill={item.soft} />
                    <strong>{item.name}</strong><span>{item.title}</span>
                  </button>
                ))}
              </div>
              <article className="concept-detail" aria-labelledby="brain-profile-title" style={{ '--accent': brain.color, '--accent-text': brain.textColor, '--soft': brain.soft, '--line': brain.line } as React.CSSProperties}>
                <div className="concept-hero">
                  <BrainVisual color={brain.id} fill={brain.soft} size="lg" />
                  <div><p>{brain.name}</p><h2 id="brain-profile-title">{brain.title}</h2><blockquote>“{brain.quote}”</blockquote></div>
                </div>
                <dl className="simple-facts">
                  <div><dt>I may prefer to</dt><dd>{brain.thinks}</dd></div>
                  <div><dt>I may contribute</dt><dd>{brain.contributes}</dd></div>
                  <div><dt>I may find it harder when</dt><dd>{brain.frustratedBy}</dd></div>
                  <div className="wide"><dt>A useful approach to try</dt><dd>{brain.communication}</dd></div>
                </dl>
              </article>
            </div>
            <p className="sr-only" aria-live="polite">{brain.name}, {brain.title} selected. Profile updated.</p>
            <details className="brain-comparison">
              <summary>Compare all four preferences</summary>
              <div className="brain-comparison-grid">
                {BRAINS.map((item) => (
                  <article key={item.id} style={{ '--accent': item.color, '--accent-text': item.textColor, '--soft': item.soft } as React.CSSProperties}>
                    <BrainVisual color={item.id} fill={item.soft} size="sm" />
                    <div><small>{item.name}</small><h2>{item.title}</h2><p><strong>Often values:</strong> {item.contributes}</p><p><strong>Helpful approach:</strong> {item.communication}</p></div>
                  </article>
                ))}
              </div>
            </details>
            <p className="guardrail-note"><strong>Use it safely:</strong> notice your own preference, ask what others need, and adapt without labeling them.</p>
          </section>
        )}

        {stage === 'hats' && (
          <section className="stage">
            <StageHeading stage="hats" title="Six modes for thinking on purpose" text="Choose a hat. Each one gives the conversation a single, clear question." />
            <div className="hat-arc" role="group" aria-label="Choose a thinking hat">
              {HATS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={hatId === item.id ? 'hat-choice is-active' : 'hat-choice'}
                  style={{ '--accent': item.color, '--soft': item.soft, '--line': item.line } as React.CSSProperties}
                  aria-pressed={hatId === item.id}
                  onClick={() => setHatId(item.id)}
                >
                  <HatVisual color={item.id} fill={item.soft} />
                  <strong>{item.name}</strong><span>{item.shortName}</span>
                </button>
              ))}
            </div>
            <article className="hat-detail" style={{ '--accent': hat.color, '--soft': hat.soft, '--line': hat.line } as React.CSSProperties}>
              <div className="hat-question"><small>{hat.name}</small><h2>{hat.question}</h2><p>{hat.purpose}</p></div>
              <div className="hat-example"><small>Sounds like</small><p>“{hat.example}”</p></div>
              <div className="hat-avoid">
                <small>{hat.guidance}</small>
                <p>For example, say:<br />“{hat.say}”</p>
                <p>Avoid saying:<br />“{hat.avoidSay}”</p>
              </div>
            </article>
            <p className="guardrail-note"><strong>One team, one hat:</strong> everyone uses the same mode at the same time.</p>
          </section>
        )}

        {stage === 'connection' && (
          <section className="stage stage--connection">
            <StageHeading stage="connection" title="Use your preference. Choose the thinking you need." text="Your brain shows what feels familiar. A hat helps you use the thinking approach the situation needs." />

            <ol className="connection-guide" aria-label="How to use this section">
              <li><span>1</span><div><strong>Choose a brain</strong><small>What feels natural?</small></div></li>
              <li><span>2</span><div><strong>Choose a hat</strong><small>What does the situation need?</small></div></li>
              <li><span>3</span><div><strong>See the connection</strong><small>How can you use it?</small></div></li>
            </ol>

            <div className="connection-workbench">
              <section className="connection-step connection-step--brains" aria-labelledby="choose-brain-heading">
                <div className="connection-step-heading"><span>1</span><div><h2 id="choose-brain-heading">Choose a brain preference</h2><p>Select the one closest to how you usually process information.</p></div></div>
                <div className="connection-brains">
                  {BRAINS.map((item) => (
                    <button key={item.id} type="button" className={brainId === item.id ? 'mini-brain is-active' : 'mini-brain'} style={{ '--accent': item.color, '--soft': item.soft } as React.CSSProperties} onClick={() => setBrainId(item.id)} aria-pressed={brainId === item.id}>
                      <BrainVisual color={item.id} fill={item.soft} size="sm" /><span><strong>{item.title}</strong><small>{item.name}</small></span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="connection-step connection-step--hats" aria-labelledby="choose-hat-heading">
                <div className="connection-step-heading"><span>2</span><div><h2 id="choose-hat-heading">Choose the thinking you need</h2><p>Every brain can use every hat. Familiar mode feels natural; practice mode may need more effort.</p></div></div>
                <div className="bridge-hats">
                  {HATS.map((item) => {
                    const familiar = brain.comfortableHats.includes(item.id);
                    const selected = hatId === item.id;
                    return (
                      <button key={item.id} type="button" className={`bridge-hat${familiar ? ' is-familiar' : ''}${selected ? ' is-selected' : ''}`} style={{ '--accent': item.color, '--soft': item.soft, '--line': item.line } as React.CSSProperties} onClick={() => setHatId(item.id)} aria-pressed={selected} aria-label={`${item.name}, ${item.shortName}. ${familiar ? 'Familiar mode' : 'Practice mode'}`}>
                        <HatVisual color={item.id} fill={item.soft} size="sm" />
                        <strong>{item.name}</strong>
                        <span>{item.shortName}</span>
                        <small>{familiar ? 'Familiar mode' : 'Practice mode'}</small>
                        {selected && <b>Selected</b>}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="personal-connection-result" style={{ '--brain': brain.color, '--brain-soft': brain.soft, '--hat': hat.color, '--hat-soft': hat.soft } as React.CSSProperties} aria-live="polite" aria-atomic="true">
                <div className="connection-result-visual" aria-hidden="true">
                  <BrainVisual color={brain.id} fill={brain.soft} size="sm" />
                  <span>uses</span>
                  <HatVisual color={hat.id} fill={hat.soft} size="sm" />
                </div>
                <div className="connection-result-copy">
                  <small>3 · Your connection</small>
                  <h2>How {brain.title} uses the {hat.name}</h2>
                  <p>{BRAIN_HAT_BEHAVIORS[hat.id][brain.id]}</p>
                  <span className="mode-note"><strong>{selectedHatIsFamiliar ? 'Familiar mode:' : 'Practice mode:'}</strong> {selectedHatIsFamiliar ? 'this may feel natural, but it still takes intention.' : 'this may feel less automatic, so use the hat as a prompt.'}</span>
                </div>
              </section>
            </div>

            <p className="guardrail-note"><strong>Preference is not ability.</strong> Every brain can use every hat.</p>

            <button className="compare-toggle" type="button" onClick={() => setShowBrainComparison((current) => !current)} aria-expanded={showBrainComparison} aria-controls="brain-comparison">
              {showBrainComparison ? 'Hide the four-brain comparison' : 'Compare how all four brains use this hat'}
              <span aria-hidden="true">{showBrainComparison ? '−' : '+'}</span>
            </button>

            {showBrainComparison && (
              <section className="all-brains-panel" id="brain-comparison">
                <div className="panel-title"><span style={{ background: hat.color }} /><div><small>{hat.name} · {hat.shortName}</small><h2>How each brain preference uses it</h2></div></div>
                <div className="behavior-list">
                  {comparisonBrains.map((item) => (
                    <div key={item.id} className={item.id === brain.id ? 'is-current' : ''}><i style={{ background: item.color }} /><strong>{item.title}</strong><p>{BRAIN_HAT_BEHAVIORS[hat.id][item.id]}</p>{item.id === brain.id && <span>Selected brain</span>}</div>
                  ))}
                </div>
              </section>
            )}
          </section>
        )}

        {stage === 'daily' && (
          <section className="stage stage--daily">
            <StageHeading stage="daily" title="Use the right tool in daily work" text="Choose a situation. Each guide shows when to use Colored Brain, Six Thinking Hats, or both." />
            <div className="context-tabs" role="tablist" aria-label="Daily work situations">
              {DAILY_CONTEXTS.map((item, index) => (
                <button key={item.id} id={`daily-tab-${item.id}`} type="button" role="tab" aria-selected={contextId === item.id} aria-controls={`daily-panel-${item.id}`} tabIndex={contextId === item.id ? 0 : -1} className={contextId === item.id ? 'is-active' : ''} onClick={() => setContextId(item.id)} onKeyDown={(event) => handleDailyContextKey(event, index)}>{item.label}</button>
              ))}
            </div>
            <article className="daily-board" id={`daily-panel-${dailyContext.id}`} role="tabpanel" aria-labelledby={`daily-tab-${dailyContext.id}`} tabIndex={0}>
              <div className="daily-copy">
                <span className="daily-tool-label">Use: {dailyContext.tool}</span>
                <h2>{dailyContext.title}</h2>
                <div className="daily-when"><strong>Use this when</strong><p>{dailyContext.when}</p></div>
                <p>{dailyContext.intro}</p>
              </div>
              <div className="daily-playbook">
                <div className="daily-groups">
                  {dailyContext.groups.map((group) => (
                    <section key={group.label}>
                      <h3>{group.label}</h3>
                      <ol>
                        {group.steps.map((step) => {
                          const stepHat = step.hat ? HATS.find((item) => item.id === step.hat)! : null;
                          return (
                            <li key={step.text}>
                              {stepHat ? <div className="daily-step-visual" style={{ '--accent': stepHat.color, '--soft': stepHat.soft } as React.CSSProperties}><HatVisual color={stepHat.id} fill={stepHat.soft} size="sm" /></div> : <span className="daily-tool-chip">Brain</span>}
                              <div><strong>{stepHat ? `${stepHat.name} · ${stepHat.shortName}` : 'Colored Brain'}</strong><p>{step.text}</p></div>
                            </li>
                          );
                        })}
                      </ol>
                    </section>
                  ))}
                </div>
                <div className="daily-finish">
                  <div><small>Say this</small><blockquote>“{dailyContext.example}”</blockquote></div>
                  <div><small>Finish with</small><p>{dailyContext.outcome}</p></div>
                </div>
              </div>
            </article>
            {contextId === 'boss' && <p className="guardrail-note"><strong>Do not diagnose your boss.</strong> Observe what helps them understand and adapt your message.</p>}
          </section>
        )}

        {stage === 'example' && (
          <section className="stage">
            <StageHeading stage="example" title="A Talent Development decision in action" text="Review the challenge, work through each hat, and finish with a clear decision." />
            <div className="demo-progress" aria-label={`Example step ${demoStep + 1} of ${DEMO_SEQUENCE.length}`}>
              {DEMO_SEQUENCE.map((item, index) => {
                return <button key={item.id} type="button" className={demoStep === index ? 'is-active' : demoStep > index ? 'is-complete' : ''} style={{ '--accent': item.color } as React.CSSProperties} onClick={() => setDemoStep(index)}><span>{index + 1}</span><small>{item.label}</small></button>;
              })}
            </div>
            {demoStage.kind === 'scenario' && (
              <article className="demo-card demo-card--bookend" style={{ '--accent': '#9a5b3e', '--soft': '#f3e7dc', '--line': '#d8b69f' } as React.CSSProperties}>
                <div className="demo-bookend-mark"><BriefcaseBusiness /><strong>Scenario</strong><span>{HR_DEMO_SCENARIO.team}</span></div>
                <div className="demo-prompt"><small>The challenge</small><h2>{HR_DEMO_SCENARIO.title}</h2><p className="scenario-copy">{HR_DEMO_SCENARIO.situation}</p><p className="scenario-copy">{HR_DEMO_SCENARIO.request}</p></div>
                <div className="demo-decision"><small>Question</small><p>{HR_DEMO_SCENARIO.decision}</p></div>
              </article>
            )}
            {demoStage.kind === 'hat' && demoHat && demo && (
              <article className="demo-card" style={{ '--accent': demoHat.color, '--soft': demoHat.soft, '--line': demoHat.line } as React.CSSProperties}>
                <div className="demo-hat"><HatVisual color={demoHat.id} fill={demoHat.soft} size="lg" /><strong>{demoHat.name}</strong><span>{demoHat.shortName}</span></div>
                <div className="demo-prompt"><small>Team question</small><h2>{demo.prompt}</h2><div className="sample-answer"><span>Example</span><p>“{demo.sample}”</p></div></div>
                <div className="demo-why"><small>Why it matters</small><p>{demoHat.purpose}</p></div>
              </article>
            )}
            {demoStage.kind === 'conclusion' && (
              <article className="demo-card demo-card--bookend demo-card--conclusion" style={{ '--accent': '#5f765c', '--soft': '#e8eee5', '--line': '#b4c4b0' } as React.CSSProperties}>
                <div className="demo-bookend-mark"><CheckCircle2 /><strong>Conclusion</strong><span>Recommended pilot</span></div>
                <div className="demo-prompt"><small>Decision</small><h2>{HR_DEMO_CONCLUSION.decision}</h2><ol className="conclusion-actions">{HR_DEMO_CONCLUSION.actions.map((action) => <li key={action}>{action}</li>)}</ol></div>
                <div className="demo-decision"><small>Follow-through</small><p><strong>Owner</strong>{HR_DEMO_CONCLUSION.owner}</p><p><strong>Review</strong>{HR_DEMO_CONCLUSION.review}</p></div>
              </article>
            )}
            <div className="demo-controls">
              <button type="button" onClick={() => setDemoStep(Math.max(0, demoStep - 1))} disabled={demoStep === 0}><ArrowLeft /> Previous step</button>
              {demoStep < DEMO_SEQUENCE.length - 1 ? (
                <button className="primary-action" type="button" onClick={() => setDemoStep(demoStep + 1)}>Next step <ArrowRight /></button>
              ) : (
                <button className="primary-action" type="button" onClick={() => setDemoStep(0)}><RotateCcw /> Run again</button>
              )}
            </div>
          </section>
        )}

        {stage === 'takeaway' && (
          <section className="stage stage-takeaway">
            <StageHeading stage="takeaway" title="Understand the person. Guide the thinking." text="Colored Brain helps us notice preferences. Six Thinking Hats helps us work through one mode together." />
            <div className="takeaway-center">
              <div className="takeaway-brains">{BRAINS.map((item) => <BrainVisual key={item.id} color={item.id} fill={item.soft} size="sm" />)}</div>
              <div className="takeaway-plus">+</div>
              <div className="takeaway-hats">{HATS.map((item) => <HatVisual key={item.id} color={item.id} fill={item.soft} size="sm" />)}</div>
            </div>
            <div className="takeaway-rules">
              <article><span>01</span><h2>Ask before assuming</h2><p>Different processing styles need different information.</p></article>
              <article><span>02</span><h2>Use one hat at a time</h2><p>Keep facts, ideas, feelings, benefits, and risks from colliding.</p></article>
              <article><span>03</span><h2>Challenge the idea</h2><p>Make critique useful without making it personal.</p></article>
              <article><span>04</span><h2>End with action</h2><p>Agree on the next step, owner, and follow-up.</p></article>
            </div>
            <blockquote className="closing-line">Different minds. Shared direction.</blockquote>
          </section>
        )}
      </main>

      <footer className="presentation-footer">
        <button type="button" onClick={() => goTo(stageIndex - 1)} disabled={stageIndex === 0}><ArrowLeft /> Back</button>
        <p><strong>{stageIndex + 1}</strong> / {STAGES.length}<span>Use arrow keys to present</span></p>
        <button type="button" onClick={() => goTo(stageIndex + 1)} disabled={stageIndex === STAGES.length - 1}>Next <ArrowRight /></button>
      </footer>
    </div>
  );
}
