import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import { servicesNavigation } from '@/config/navigation';

export function ServiceMenuCards({ onNavigate }: { onNavigate: () => void }) {
  return <>
    {servicesNavigation.links.filter(service => service.showInDesktopMenu !== false).map((service, index) => <Link className="services-mega-link" href={service.href} key={service.href} onClick={onNavigate}>
      <span className="services-mega-icon" aria-hidden="true"><Icon name={service.icon} /></span>
      <span className="services-mega-copy"><span className="services-mega-number">0{index + 1}</span><strong>{service.name}</strong><span className="services-mega-goal">{service.goal}</span></span>
      <Icon name="arrow" className="services-mega-arrow" />
    </Link>)}
  </>;
}
