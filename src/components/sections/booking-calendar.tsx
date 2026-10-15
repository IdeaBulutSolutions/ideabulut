'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandButton } from '@/components/ui/brand-button';

const SCHEDULE = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1SIHHaTUMg-0q2bDX3ltRWA0QMTJa_VNpsW0BwctBHuc8fQSFZQLP2jtVjnOVQsKW-QMhsypHD';
const EMBED = `${SCHEDULE}?gv=true`;

// Desktop embeds Google's booking calendar. On phones (CSS, ≤700px) the embed is hidden and a
// button opens Google's own full-screen booking page instead: the embed's height changes as you
// pick a date, which forces scrolling inside the frame. A hidden frame never intersects, so the
// iframe and Google's scripts are not loaded on phones at all.
export function BookingCalendar() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '200px' });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <>
    <div className="booking-frame" ref={container}>
      {visible && <iframe
        src={EMBED}
        title="Book a free 15-minute discovery call with Idea Bulut"
        loading="lazy"
        frameBorder="0"
        width="100%"
        style={{ border: 0 }}
      />}
      <noscript><p><a href={SCHEDULE} target="_blank" rel="noopener noreferrer">Open the discovery-call booking calendar</a></p></noscript>
    </div>
    <div className="booking-mobile">
      <p>Opens our Google Calendar booking page, where you pick a slot and confirm. You get a Google Meet link straight away.</p>
      <BrandButton href={SCHEDULE} external arrow className="booking-open">Choose a time</BrandButton>
    </div>
  </>;
}
