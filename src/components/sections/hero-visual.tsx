'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/icons';
import '@/styles/product-carousel.css';
import '@/styles/hero-carousel.css';

const examples = [
  { problem: '“Our releases depend on one person and a spreadsheet.”', title: 'Release pipeline', rows: [['Validation', 'Passed'], ['UAT', 'In progress'], ['Production', 'Waiting']], action: 'Promote', chart: 'DEPLOYMENTS' },
  { problem: '“We need to move off ExactTarget without losing our journeys.”', title: 'Migration plan', rows: [['Data extensions', 'Mapped'], ['Journeys', 'In progress'], ['Sends', 'Waiting']], action: 'Cut over', chart: 'PROGRESS' },
  { problem: '“We need Claude built into how our team delivers.”', title: 'AI-assisted delivery', rows: [['Planning', 'Scoped'], ['Building', 'In progress'], ['Review', 'Human review']], action: 'Review', chart: 'WORKFLOW' },
] as const;

export function HeroVisual() {
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChanged = () => setReducedMotion(media.matches);
    const visibilityChanged = () => setPageHidden(document.hidden);
    motionChanged();
    visibilityChanged();
    media.addEventListener('change', motionChanged);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      media.removeEventListener('change', motionChanged);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, []);
  const automatic = !hovered && !focused && !reducedMotion && !pageHidden;
  useEffect(() => {
    if (!automatic || phase !== 'idle') return;
    const timer = window.setTimeout(() => {
      setTarget((index + 1) % examples.length);
      setPhase('exiting');
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [automatic, index, phase]);
  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = window.setTimeout(() => {
      setIndex(target);
      setPhase('entering');
    }, 500);
    return () => window.clearTimeout(timer);
  }, [phase, target]);
  useEffect(() => {
    if (phase !== 'entering') return;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setPhase('idle'));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [phase]);
  function show(next: number) {
    const nextIndex = (next + examples.length) % examples.length;
    if (nextIndex === index || phase !== 'idle') return;
    if (reducedMotion) {
      setIndex(nextIndex);
      return;
    }
    setTarget(nextIndex);
    setPhase('exiting');
  }

  return <div className="hero-carousel" role="region" aria-roledescription="carousel" aria-label="From problem to working software"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    }}>
    <div id="hero-examples" className="hero-visual" data-phase={phase} aria-live={automatic ? 'off' : 'polite'} aria-label="Idea Bulut turns engineering problems into working software">
    <div className="problem-bubble hero-example"><strong>THE PROBLEM</strong><div className="problem-lines">{examples.map((item, itemIndex) => <p key={item.problem} aria-hidden={itemIndex !== index}>{item.problem}</p>)}</div></div>
    <div className="idea-flow"><span className="idea-flow-line" aria-hidden="true" /><span>Idea Bulut designs, builds and delivers</span></div>
    <div className="app-stage">
      {examples.map((item, itemIndex) => <div className="app-window hero-example" key={item.title} aria-hidden={itemIndex !== index}>
        <div className="app-toolbar"><div className="window-title"><span className="dot" /><span className="dot" /><span className="dot" />{item.title}</div><span className="app-action">{item.action}</span></div>
        <div className="app-content"><div className="app-rows">{item.rows.map(([name, status]) => <div className="app-row" key={name}><span className="row-orb" /><span className="row-name">{name}</span><span className={`row-status ${status === 'In progress' ? 'progress' : status === 'Waiting' ? 'waiting' : ''}`}>{status}</span></div>)}</div><div className="app-chart"><strong>{item.chart}</strong><div className="chart-bars" aria-hidden="true"><span /><span /><span /><span /><span /></div></div></div>
      </div>)}
    </div>
    </div>
    <div className="home-product-controls hero-carousel-controls">
      <button type="button" className="home-product-arrow home-product-previous" aria-label="Previous example" aria-controls="hero-examples" onClick={() => show(index - 1)}><Icon name="arrow" /></button>
      <div className="home-product-dots">
        {examples.map((item, itemIndex) => <button type="button" className="home-product-dot" key={item.title}
          aria-label={`Show ${item.title}`} aria-current={itemIndex === index ? 'true' : undefined}
          aria-controls="hero-examples" onClick={() => show(itemIndex)} />)}
      </div>
      <button type="button" className="home-product-arrow" aria-label="Next example" aria-controls="hero-examples" onClick={() => show(index + 1)}><Icon name="arrow" /></button>
    </div>
  </div>;
}