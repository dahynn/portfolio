'use client';

import { useEffect } from 'react';

export function PageSnap() {
  useEffect(() => {
    const pages = Array.from(document.querySelectorAll<HTMLElement>('[data-page]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const visibleHeight = Math.min(entry.boundingClientRect.height, window.innerHeight);
        if (entry.isIntersecting && entry.intersectionRect.height >= visibleHeight * 0.5) {
          entry.target.classList.add('is-active');
        }
      });
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.65] });

    pages.forEach((page) => observer.observe(page));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
