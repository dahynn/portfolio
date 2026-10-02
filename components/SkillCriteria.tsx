'use client';

import { ChevronDown, CircleHelp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const criteria = [
  { name: '기초', description: '튜토리얼을 따라 할 수 있음' },
  { name: '초급', description: '예제 코드를 참고해 구현할 수 있음' },
  { name: '중급', description: '문서를 보며 독립적으로 개발할 수 있음' },
  { name: '고급', description: '프로젝트에서 주도적으로 활용할 수 있음' },
  { name: '전문가', description: '코드 리뷰와 멘토링을 할 수 있음' },
];

export function SkillCriteria() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="profile-skill-criteria" data-open={open} ref={containerRef}>
      <button type="button" aria-expanded={open} aria-controls="profile-skill-levels" onClick={() => setOpen((value) => !value)}>
        <CircleHelp size={15} strokeWidth={2} aria-hidden="true" />
        <span>5단계 기준 보기</span>
        <ChevronDown className="profile-skill-criteria-chevron" size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      {open && <ol id="profile-skill-levels">
        {criteria.map((criterion, index) => <li key={criterion.name}>
          <strong>{index + 1} · {criterion.name}</strong>
          <span className="profile-skill-criteria-meter" aria-hidden="true">
            {Array.from({ length: 5 }, (_, segment) => <i className={segment <= index ? 'is-filled' : undefined} key={segment} />)}
          </span>
          <span className="profile-skill-criteria-description">{criterion.description}</span>
        </li>)}
      </ol>}
    </div>
  );
}
