'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from '@/components/ui/icons';

const stages: { name: string; label: string; icon: IconName }[] = [
  { name: 'Commit', label: 'Git branch', icon: 'commit' },
  { name: 'Validate', label: 'CI / CD checks', icon: 'shield' },
  { name: 'Promote', label: 'Copado pipeline', icon: 'layers' },
  { name: 'Test', label: 'UAT environment', icon: 'check' },
  { name: 'Release', label: 'Production', icon: 'upload' },
];

export function PipelineDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActivated(true); observer.disconnect(); }
    }, { threshold: .25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div className={`pipeline-panel ${activated ? 'activated' : ''}`} ref={ref} aria-label="Salesforce release process from commit through validate, promote, test and release">
    <div className="pipeline-stages">{stages.map((stage, i) => <div className="pipeline-stage" key={stage.name} style={{ '--stage': i } as React.CSSProperties}>
      <span className={`pipeline-node ${stage.name === 'Promote' ? 'promote' : ''}`}><Icon name={stage.icon} /></span><strong>{stage.name}</strong><small>{stage.label}</small>
      {i === 0 && <span className="pipeline-traveller" aria-hidden="true" />}
    </div>)}</div>
    <div className="pipeline-tags">{['Copado', 'GitHub Actions', 'Environment strategy', 'Release management'].map(tag => <span key={tag}>{tag}</span>)}</div>
  </div>;
}