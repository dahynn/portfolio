/* oxlint-disable next/no-img-element -- 촬영 원본의 비율을 그대로 표시합니다. */
import { ArrowDown, ArrowRight, Check, CircleHelp, Eye, HeartHandshake, MessageCircle } from 'lucide-react';
import { serviceOverviews } from './serviceOverviews';

export function ServiceOverview({ id, name, variant = 'page' }: { id: string; name: string; variant?: 'page' | 'hero' }) {
  const overview = serviceOverviews[id];
  if (variant === 'hero') {
    return <aside className="service-hero-brief" aria-label={`${name} 서비스 한눈에 보기`}>
      <p>서비스 한눈에 보기 <span>{overview.platform}</span></p>
      <dl><div><dt>누구를 위해</dt><dd>{overview.audience}</dd></div><div><dt>어떤 문제를</dt><dd>{overview.problem}</dd></div></dl>
      <ol aria-label={`${name} 이용 순서`}>{overview.journey.map((step, index) => <li key={step.action}><span>0{index + 1}</span>{step.action}</li>)}</ol>
    </aside>;
  }
  return <section className={`service-overview service-overview-${id}`} data-page aria-labelledby={`${id}-overview-title`}>
    <div className="service-overview-layout">
      <div className="service-overview-copy">
        <header className="service-overview-heading"><p>서비스 한눈에 보기 <span>{overview.platform}</span></p><h3 id={`${id}-overview-title`}>{overview.title}</h3></header>
        <dl className="service-context"><div><dt>누구를 위해</dt><dd>{overview.audience}</dd></div><div><dt>어떤 문제를</dt><dd>{overview.problem}</dd></div></dl>
        <p className="service-technical-bridge"><ArrowDown size={16} aria-hidden="true" />{overview.bridge}</p>
      </div>
      <div className="service-overview-visual">
        <ol className="service-journey" aria-label={`${name} 이용 순서`}>{overview.journey.map((step, index) => <li key={step.action}><span className="service-journey-number">0{index + 1}</span><h4>{step.action}</h4><p>{step.result}</p>{index < overview.journey.length - 1 && <ArrowRight aria-hidden="true" size={16} />}</li>)}</ol>
        {id === 'capsure' && <figure className="service-scenes service-scenes-mockup"><div className="service-scenes-heading"><h4>보장을 골라 월 보험료 구성</h4></div><img src="/assets/capsure-coverage-selection.gif" alt="CapSure 보장 선택 상태가 바뀌는 정면 아이폰 목업" width="1280" height="800" loading="lazy" decoding="async" /></figure>}
        {id === 'roundy' && <figure className="service-roundy-concept"><div className="service-concept-steps"><div><CircleHelp size={28} aria-hidden="true" /><span>성향 퀴즈</span></div><ArrowRight size={16} aria-hidden="true" /><div><HeartHandshake size={28} aria-hidden="true" /><span>성향 매칭</span></div><ArrowRight size={16} aria-hidden="true" /><div><MessageCircle size={28} aria-hidden="true" /><span>마스킹 대화</span></div><ArrowRight size={16} aria-hidden="true" /><div><Eye size={28} aria-hidden="true" /><span>상호 선택</span><Check size={14} aria-hidden="true" /></div></div></figure>}
      </div>
    </div>
  </section>;
}
