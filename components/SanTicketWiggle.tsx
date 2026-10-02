'use client';

/* oxlint-disable next/no-img-element -- 사용자 제공 1회용 티켓 이미지를 그대로 표시합니다. */
import { useEffect, useRef, useState } from 'react';

export function SanTicketWiggle() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ticket = ticketRef.current;
    if (!ticket) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.6 });

    observer.observe(ticket);
    return () => observer.disconnect();
  }, []);

  return <div ref={ticketRef} className={`san-ticket-token${isVisible ? ' is-wiggling' : ''}`}>
    <img src="/assets/san-one-time-ticket.png?v=2" alt="1회용 Ticket" width="2156" height="729" loading="lazy" decoding="async"/>
  </div>;
}
