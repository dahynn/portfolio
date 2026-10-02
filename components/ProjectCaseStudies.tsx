'use client';

/* oxlint-disable next/no-img-element -- 원본 캡처의 비율을 유지합니다. */
import { ArrowRight, Braces, ChevronDown, CreditCard, Database, FileText, Image as ImageIcon, Link2, Sparkles, type LucideIcon, Video } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { projectCases, type ProjectCase } from './projectCases';
import { projectEvidence } from './projectEvidence';
import { ServiceOverview } from './ServiceOverview';
import { EvidenceCaseSlide } from './EvidenceCaseSlides';
import { portfolioStories } from './portfolioStories';

const stackIcons: Record<string, string> = {
  'Java 21': '/assets/tech-icons/java.png',
  'Java 17': '/assets/tech-icons/java.png',
  'Spring Boot 3.4.4': '/assets/tech-icons/spring.png',
  'Spring Boot': '/assets/tech-icons/spring.png',
  'Spring Boot 3.5.11': '/assets/tech-icons/spring.png',
  'Spring Boot 3.5.9': '/assets/tech-icons/spring.png',
  'Spring Boot 3.5.14': '/assets/tech-icons/spring.png',
  'Spring Data JPA': '/assets/tech-icons/spring.png',
  PostgreSQL: '/assets/tech-icons/postgresql.svg',
  Redis: '/assets/tech-icons/redis.png',
  'Redis와 Lua': '/assets/tech-icons/redis.png',
  'React 19': '/assets/tech-icons/react.svg',
  'React Native': '/assets/tech-icons/react.svg',
  'React 18.3': '/assets/tech-icons/react.svg',
  'TypeScript 5.9': '/assets/tech-icons/typescript.svg',
};

const stackFallbackIcons: Record<string, LucideIcon> = {
  'MyBatis 3.0.5': Database,
  'Toss Payments SDK 2': CreditCard,
  MySQL: Database,
  'OpenVidu 2.32': Video,
};

function SanHeroFlow() {
  const figureRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= .25);
    }, { threshold: .25 });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return <figure ref={figureRef} className="case-hero-media project-hero-san-flow" aria-label="자료를 익스텐션에 저장하면 지식 나무로 정리되는 SAN 서비스 흐름">
    <div key={replay} className={`san-flow-sequence${visible ? ' is-playing' : ''}`}>
      <div className="san-flow-heading">
        <div className="san-flow-heading-row">
          <span className="san-flow-step san-flow-step-ingest"><b>01</b> 자료를 익스텐션에 넣고</span>
          <ArrowRight aria-hidden="true" />
          <span className="san-flow-step san-flow-step-tree"><b>02</b> 지식 나무로 모아보기</span>
        </div>
        <div className="san-flow-heading-row">
          <span className="san-flow-step san-flow-step-til"><b>03</b> TIL로 정리하고</span>
          <ArrowRight aria-hidden="true" />
          <span className="san-flow-step san-flow-step-profile"><b>04</b> 유사 지식을 확인하며 지식 성장하기</span>
        </div>
      </div>
      <div className="san-flow-viewport">
        <div className="san-extension-stage">
          <img src="/assets/san-extension-ingest-latest.png" alt="텍스트, 이미지, 링크를 드래그해 지식을 저장하는 SAN 크롬 확장 프로그램 화면" width="630" height="1218" loading="lazy" decoding="async" />
          <div className="san-drop-target" aria-hidden="true" />
          <div className="san-source-tokens" aria-hidden="true">
            <span className="san-source-token san-source-token-text"><FileText /></span>
            <span className="san-source-token san-source-token-link"><Link2 /></span>
            <span className="san-source-token san-source-token-image"><ImageIcon /></span>
          </div>
        </div>
        <div className="san-tree-stage">
          <img className="san-raw-screen san-raw-screen-main" src="/assets/san-knowledge-tree-latest.png" alt="저장한 자료가 카테고리별 지식 나무로 모인 SAN 화면" width="2880" height="1832" loading="lazy" decoding="async" />
          <p className="san-tree-caption"><Sparkles aria-hidden="true" /> 흩어진 자료가 하나의 지식 나무로</p>
        </div>
        <div className="san-til-stage">
          <img className="san-raw-screen san-raw-screen-main" src="/assets/san-til-latest.png" alt="저장한 지식을 바탕으로 오늘의 학습을 정리하는 SAN TIL 화면" width="2880" height="1839" loading="lazy" decoding="async" />
          <p className="san-tree-caption"><Sparkles aria-hidden="true" /> 저장한 지식을 오늘의 TIL로</p>
        </div>
        <div className="san-profile-stage">
          <img className="san-raw-screen san-raw-screen-main" src="/assets/san-profile-latest.png" alt="학습 기록과 활동을 한눈에 보는 SAN 마이페이지 화면" width="2880" height="1839" loading="lazy" decoding="async" />
          <p className="san-tree-caption"><Sparkles aria-hidden="true" /> 쌓인 기록을 마이페이지에서</p>
        </div>
      </div>
    </div>
    <button className="san-flow-replay" type="button" onClick={() => setReplay(value => value + 1)} aria-label="자료가 익스텐션에 들어가 지식 나무로 정리되는 흐름 다시 보기">다시 보기 <span aria-hidden="true">↻</span></button>
  </figure>;
}

const roundyHeroStages = [
  {
    number: '01',
    label: '회원가입 취향 분석',
    source: '/assets/roundy-preference-analysis-latest.png',
    alt: '회원가입 과정에서 연애 목표와 데이트 스타일을 선택하는 Roundy 취향 분석 화면',
  },
  {
    number: '02',
    label: '얼굴 인증',
    source: '/assets/roundy-face-matching-latest.png',
    alt: '회원가입 때 등록한 왼쪽 사진과 실시간 촬영을 대조하는 Roundy 얼굴 인증 화면',
  },
  {
    number: '03',
    label: '마스킹 대화',
    source: '/assets/roundy-silhouette-meeting-latest.png',
    alt: '서로의 얼굴을 가린 상태에서 취향 태그를 보며 대화하는 Roundy 마스킹 미팅 화면',
  },
  {
    number: '04',
    label: '취향 투표',
    source: '/assets/roundy-first-impression-latest.png',
    alt: '대화 뒤 상대의 첫인상을 선택하는 Roundy 취향 투표 화면',
  },
  {
    number: '05',
    label: '최종 얼굴 공개',
    source: '/assets/roundy-final-reveal-generated.png',
    alt: '서로의 선택이 확인된 뒤 얼굴을 공개하는 Roundy 최종 화면 예시',
  },
] as const;

function RoundyHeroFlow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActiveIndex(current => (current + 1) % roundyHeroStages.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const positions = ['is-current', 'is-next', 'is-far-next', 'is-far-prev', 'is-prev'] as const;

  return <figure className="case-hero-media project-hero-roundy-flow" aria-label="회원가입 취향 분석부터 최종 얼굴 공개까지 이어지는 Roundy 서비스 흐름">
    <div className="roundy-flow-stage">
      {roundyHeroStages.map((stage, index) => {
        const relativeIndex = (index - activeIndex + roundyHeroStages.length) % roundyHeroStages.length;
        return <figure className={`roundy-flow-frame ${positions[relativeIndex]}`} aria-hidden={relativeIndex !== 0} key={stage.number}>
        <img src={stage.source} alt={stage.alt} width="2880" height="1839" loading="lazy" decoding="async" />
        <figcaption><b>{stage.number}</b><span>{stage.label}</span></figcaption>
      </figure>;
      })}
    </div>
    <ol className="roundy-flow-progress" aria-label="Roundy 서비스 단계">
      {roundyHeroStages.map((stage, index) => <li className={index === activeIndex ? 'is-current' : ''} key={stage.number}><button type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? 'step' : undefined}><b>{stage.number}</b><span>{stage.label}</span></button></li>)}
    </ol>
    <p className="roundy-flow-note">등록 사진과 실시간 촬영을 대조한 뒤, 마스킹 대화와 상호 선택을 거쳐 얼굴을 공개합니다.</p>
  </figure>;
}

function CaseHeroMedia({ id }: Pick<ProjectCase, 'id'>) {
  if (id === 'capsure') {
    return <figure className="case-hero-media project-hero-capsure-live" aria-label="CapSure 실제 가입 흐름 화면">
      <div className="capsure-live-devices">
        <figure className="capsure-live-device"><img src="/assets/capsure-search-live.gif" alt="CapSure 월 보험료 입력과 캡슐 구성이 움직이는 애니메이션 화면" width="654" height="1432" loading="lazy" decoding="async" /></figure>
        <figure className="capsure-live-device"><img src="/assets/capsure-dashboard-live.gif" alt="CapSure 대시보드가 표시되는 애니메이션 화면" width="654" height="1432" loading="lazy" decoding="async" /></figure>
      </div>
    </figure>;
  }

  if (id === 'dasibom') {
    return <figure className="case-hero-media project-hero-dasibom" aria-label="다시봄의 모바일 자가 확인과 병원 탐색 흐름">
      <img className="dasibom-hero-capture dasibom-hero-capture-home" src="/assets/dasibom-home-mockup-user.png" alt="하루 한 번 자가 진단을 시작하는 다시봄 iPhone 목업 화면" width="451" height="934" loading="lazy" decoding="async" />
      <img className="dasibom-hero-capture dasibom-hero-capture-face" src="/assets/dasibom-final-result-mockup-user.png" alt="다시봄 앱의 최종 진단 결과와 가까운 병원 안내 화면" width="908" height="1840" loading="lazy" decoding="async" />
      <img className="dasibom-hero-capture dasibom-hero-capture-map" src="/assets/dasibom-map-mockup-user.png" alt="가까운 병원 정보를 지도에 표시한 다시봄 iPhone 목업 화면" width="900" height="1840" loading="lazy" decoding="async" />
    </figure>;
  }

  if (id === 'roundy') {
    return <RoundyHeroFlow />;
  }

  if (id === 'san') {
    return <SanHeroFlow />;
  }

  return null;
}

const dasibomBriefScreens: { number: string; label: string; detail: string; source: string; alt: string; width: number; height: number; crop?: 'left' | 'center' }[] = [
  {
    number: '01',
    label: '얼굴 확인',
    detail: '카메라 앞에서 표정과 눈 움직임을 안내합니다.',
    source: '/assets/dasibom-simulator-face-guide.png',
    alt: '정면을 바라보고 눈을 감았다 뜨도록 안내하는 다시봄 얼굴 확인 화면',
    width: 1206,
    height: 2622,
  },
  {
    number: '02',
    label: '음성 확인',
    detail: '화면의 문장을 읽고 음성을 녹음합니다.',
    source: '/assets/dasibom-simulator-voice-recording.png',
    alt: '문장을 읽고 녹음하도록 안내하는 다시봄 음성 확인 화면',
    width: 1206,
    height: 2622,
  },
  {
    number: '03',
    label: '중간 결과',
    detail: '얼굴·음성 확인 뒤 먼저 결과를 확인합니다.',
    source: '/assets/dasibom-interim-result-user.png',
    alt: '얼굴과 음성 확인 뒤 정상 범위라는 중간 결과와 자가 확인 진입 버튼을 보여주는 다시봄 화면',
    width: 2358,
    height: 5112,
  },
  {
    number: '04',
    label: '추가 설문',
    detail: '필요할 때만 CG-FAST 기준 문항으로 이어집니다.',
    source: '/assets/dasibom-cg-fast-question-user.png',
    alt: '팔마비 여부를 묻는 CG-FAST 자가 확인 문항 화면',
    width: 2358,
    height: 5112,
  },
  {
    number: '05',
    label: '설문 결과',
    detail: '문항 응답 뒤 최종 결과와 안내를 봅니다.',
    source: '/assets/dasibom-result-flow-user.png',
    alt: '자가 확인 점수와 결과 안내를 보여주는 다시봄 화면 목업의 첫 화면',
    width: 7594,
    height: 5112,
    crop: 'left',
  },
  {
    number: '06',
    label: '병원 정보',
    detail: '가까운 병원의 위치와 상세 정보를 봅니다.',
    source: '/assets/dasibom-map-flow-user.png',
    alt: '가까운 병원의 거리와 상세 정보를 표시한 다시봄 화면 목업',
    width: 7670,
    height: 5112,
    crop: 'center',
  },
] as const;

function DasibomBrief() {
  return <section className="dasibom-brief" id="dasibom-case-01" data-page aria-labelledby="dasibom-brief-title">
    <header className="dasibom-brief-heading">
      <p><strong>PROJECT BRIEF</strong><span>다시봄</span></p>
      <h3 id="dasibom-brief-title">얼굴·음성 확인에서 병원 탐색까지</h3>
      <span>먼저 얼굴·음성 결과를 보고, 추가 확인이 필요할 때 CG-FAST 기준 설문으로 이어집니다.</span>
    </header>
    <ol className="dasibom-brief-gallery" aria-label="다시봄 앱 화면 흐름">
      {dasibomBriefScreens.map(screen => <li key={screen.number}>
        <figure>
          <div className="dasibom-brief-image">
            <div className="dasibom-brief-device">
              <img className={screen.crop ? `dasibom-brief-crop-${screen.crop}` : undefined} src={screen.source} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" decoding="async" />
            </div>
          </div>
          <figcaption><b>{screen.number}</b><strong>{screen.label}</strong><span>{screen.detail}</span></figcaption>
        </figure>
      </li>)}
    </ol>
    <DasibomTechnicalReference />
  </section>;
}

const dasibomTechnicalViews = [
  { key: 'flow', label: '처리 구조', source: '/assets/dasibom-self-check-flow.png', alt: '영상과 음성 분석 결과를 받고 필요 시 설문 응답을 더해 결과를 반환하는 처리 흐름', width: 1864, height: 926 },
  { key: 'face', label: '얼굴 분석 과정', source: '/assets/dasibom-face-analysis.png', alt: '다시봄 얼굴 분석 과정 발표 자료', width: 1868, height: 924 },
  { key: 'voice', label: '음성 분석 과정', source: '/assets/dasibom-voice-analysis.png', alt: '다시봄 음성 분석 과정 발표 자료', width: 1870, height: 926 },
  { key: 'architecture', label: '전체 기술 구성', source: '/assets/dasibom-architecture.png', alt: '다시봄 전체 기술 구성 발표 자료', width: 580, height: 507 },
] as const;

function DasibomTechnicalReference() {
  const [activeKey, setActiveKey] = useState<(typeof dasibomTechnicalViews)[number]['key']>('flow');
  const [isOpen, setIsOpen] = useState(false);
  const activeView = dasibomTechnicalViews.find(view => view.key === activeKey) ?? dasibomTechnicalViews[0];

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return <section className="dasibom-technical-reference" aria-label="다시봄 기술 자료">
    <div className="dasibom-technical-toolbar">
      <div className="dasibom-technical-summary-copy"><strong>기술 구성과 처리 흐름</strong><small>얼굴·음성 → 중간 결과 → 필요 시 설문</small></div>
      <fieldset className="dasibom-technical-sources" aria-label="표시할 기술 자료 선택">
        {dasibomTechnicalViews.map(view => <button type="button" key={view.key} className={isOpen && activeKey === view.key ? 'is-active' : undefined} aria-pressed={isOpen && activeKey === view.key} aria-controls="dasibom-technical-panel" onClick={() => { setActiveKey(view.key); setIsOpen(true); }}><ImageIcon aria-hidden="true" size={15}/>{view.label}</button>)}
      </fieldset>
    </div>
    {isOpen && <div className="dasibom-technical-overlay">
      <button type="button" className="dasibom-technical-backdrop" onClick={() => setIsOpen(false)} aria-label="기술 자료 닫기" />
      <dialog open className="dasibom-technical-inner" id="dasibom-technical-panel" aria-modal="true" aria-label={`${activeView.label} 상세 보기`}>
        <button type="button" className="dasibom-technical-close" onClick={() => setIsOpen(false)} aria-label="기술 자료 닫기">닫기 <ChevronDown aria-hidden="true" size={15}/></button>
        <figure className="dasibom-technical-flow">
          <div className="dasibom-technical-image"><img key={activeView.key} src={activeView.source} alt={activeView.alt} width={activeView.width} height={activeView.height} decoding="async" /></div>
          <figcaption>{activeView.label} · 팀 발표 자료</figcaption>
        </figure>
        <p className="dasibom-technical-note">프로젝트 구조를 설명하는 자료이며, 의료적 진단 성능을 검증한 자료는 아닙니다.</p>
      </dialog>
    </div>}
  </section>;
}

type CaseSlide = {
  title: string;
  problem: string;
  approach: string;
  implementation: string;
  result: string;
  reflection: string;
  primary?: boolean;
};

const portfolioResults: Record<string, string[]> = {
  capsure: [
    '중단된 결제도 조회와 대사를 거쳐 계약 상태까지 확인할 수 있게 했습니다.',
    '납입과 계약 효력을 같은 상태로 뭉치지 않고, 판단에 필요한 조건을 나눠 관리했습니다.',
    'AI의 응답을 검토 초안으로 제한해 지급 판단과 분리했습니다.',
  ],
  roundy: [
    '동시에 도착한 요청과 늦게 도착한 요청 모두에서 한 사람의 현재 방 매핑을 지켰습니다.',
    '인증 결과를 사용자에게 귀속하고 한 번만 소비하도록 만들어 재사용을 막았습니다.',
    '로그인 여부가 아니라 현재 방의 멤버인지까지 확인하도록 접근 경계를 맞췄습니다.',
  ],
  san: [
    '검색 조건과 결과를 서버에서 함께 다뤄, 필요한 자료를 빠짐없이 다시 찾게 했습니다.',
    'AI가 읽은 원문과 생성 시점을 남겨 나중에도 근거를 확인할 수 있게 했습니다.',
    '실패한 작업만 다시 시작하고 검토 상태를 분리해, 다음 행동이 흐려지지 않게 했습니다.',
  ],
  dasibom: [
    '얼굴 영상과 음성 원본을 저장하지 않고, 서비스에 필요한 파생 결과만 남겼습니다.',
    '결과를 확인한 뒤 가까운 병원을 바로 탐색할 수 있도록 연결했습니다.',
  ],
};

const portfolioApproaches: Record<string, string[]> = {
  capsure: [
    '타임아웃은 UNKNOWN으로 남기고, PG 조회 결과를 주문·금액과 대조한 뒤에만 계약을 확정했습니다.',
    '미수, 독촉, 유예 종료를 따로 확인하고 청구는 사고일의 보장 상태로 판단했습니다.',
    '약관 ID와 증빙 유형만 전달하고, 응답의 근거를 다시 확인한 뒤 담당자 검토 초안으로 남겼습니다.',
  ],
  roundy: [
    '인증 소비부터 대기열, 방 매핑까지 Redis Lua에서 한 번에 처리하고, 오래된 정리는 현재 방인지 확인하게 했습니다.',
    '인증 결과를 사용자 ID에 귀속하고 VERIFIED 상태만 한 번 소비하도록 만들었습니다.',
    'JWT 확인 뒤에도 현재 roomId와 멤버 정보를 다시 확인해 조회·입장·영상 토큰의 권한을 맞췄습니다.',
  ],
  san: [
    '검색어, 태그, 기간, 페이지 조건을 서버 요청으로 옮기고 사용자별 결과와 정렬을 함께 확인했습니다.',
    '생성 시점의 입력을 고정하고 개인정보 형식 마스킹, 입력 상한, 작업 소유자 검사를 적용했습니다.',
    '실패한 TIL만 새 작업으로 등록하고, 수정 뒤에는 기존 검토 상태를 초기화했습니다.',
  ],
  dasibom: [
    '분석에 쓰이지 않는 객체 저장소 업로드를 없애고, 요청 메모리에서만 외부 분석 서비스로 전달했습니다.',
    '진단 상세는 사용자 ID와 함께 조회하고, 결과 화면에서 가까운 병원을 탐색할 수 있게 했습니다.',
  ],
};

const reflections: Record<string, string[]> = {
  capsure: [
    '응답이 없다는 이유만으로 결제를 실패 처리하면 고객과 계약 상태 모두가 흔들릴 수 있었습니다. 그래서 재시도보다 먼저 확인하고, 확인 뒤에만 다음 상태로 넘기게 했습니다.',
    '납입 실패는 한 번의 이벤트지만 계약 효력은 여러 조건을 거쳐 판단됩니다. 상태를 한 줄로 줄이지 않고, 판단에 필요한 조건을 나눠 두는 편이 안전했습니다.',
    'AI가 빠르게 정리해도 지급 판단까지 대신하면 안 됩니다. 근거와 검토자를 남기는 경계가 서비스 신뢰를 지킨다고 봤습니다.',
  ],
  roundy: [
    '실시간 서비스에서는 늦게 도착한 요청도 현재 상태를 바꿀 수 있습니다. 함께 바뀌는 값은 한 번에 다루는 쪽이 더 예측 가능했습니다.',
    '인증 완료라는 결과만으로는 충분하지 않았습니다. 누구의 결과인지와 한 번만 쓸 수 있는지를 같이 확인해야 신뢰할 수 있었습니다.',
    '로그인했다는 사실은 방 권한을 보장하지 않습니다. 사용자가 지금 속한 방인지 다시 확인해야 대화 공간의 경계가 지켜집니다.',
  ],
  san: [
    '검색은 빨라지는 것만으로 끝나지 않습니다. 같은 조건에서 같은 결과를 돌려주는지까지 함께 확인해야 다시 찾을 수 있었습니다.',
    'AI가 정리한 문장보다 어떤 원문을 읽었는지가 더 중요할 때가 있습니다. 입력을 남기고 범위를 제한해야 나중에도 검토할 수 있었습니다.',
    '실패한 작업을 다시 누르는 순간에도 규칙이 필요했습니다. 같은 작업이 겹치지 않고, 사용자가 다음 행동을 알 수 있게 만드는 데 집중했습니다.',
  ],
  dasibom: [
    '민감한 입력은 저장 이후에 지우는 것보다, 애초에 저장하지 않을 때 노출 경계를 더 분명하게 만들 수 있었습니다.',
    '건강 관련 결과는 위험도를 보여주는 데서 끝나지 않고, 사용자가 다음 행동을 선택할 수 있게 해야 합니다.',
  ],
};

function getCaseSlides(project: ProjectCase): CaseSlide[] {
  const [problem, decision, implementation, outcome] = project.steps;
  return [
    {
      title: project.mechanism,
      problem: problem.body,
      approach: portfolioApproaches[project.id][0] ?? `${decision.body} ${implementation.body}`,
      implementation: implementation.body,
      result: portfolioResults[project.id][0] ?? outcome.body,
      reflection: reflections[project.id][0],
      primary: true,
    },
    ...project.supporting.map((supporting, index) => ({
      title: supporting.title,
      problem: supporting.problem,
      approach: portfolioApproaches[project.id][index + 1] ?? supporting.body,
      implementation: supporting.body,
      result: portfolioResults[project.id][index + 1] ?? supporting.proof,
      reflection: reflections[project.id][index + 1],
    })),
  ];
}

type DiagramNode = { title: string; detail: string; x: number; y: number; tone?: 'accent' | 'data' | 'external' };
type DiagramEdge = { from: number; to: number; label: string };
type DiagramSpec = { eyebrow: string; title: string; nodes: DiagramNode[]; edges: DiagramEdge[] };

const diagrams: Record<string, DiagramSpec[]> = {
  capsure: [
    { eyebrow: 'Transaction reconciliation', title: '결제 응답이 끊겨도 계약을 바로 확정하지 않는 구조', nodes: [
      { title: 'Client', detail: '결제 승인 요청', x: 38, y: 142 }, { title: 'Payment API', detail: '멱등 키 확인', x: 205, y: 142, tone: 'accent' }, { title: 'PostgreSQL', detail: 'UNKNOWN 보존', x: 385, y: 142, tone: 'data' }, { title: 'Reconcile Worker', detail: '행 잠금 · Outbox', x: 575, y: 142, tone: 'accent' }, { title: 'Fake PG', detail: '주문·금액 조회', x: 765, y: 54, tone: 'external' }, { title: 'Subscription', detail: 'PAID → ACTIVE', x: 765, y: 230, tone: 'data' },
    ], edges: [{ from: 0, to: 1, label: 'POST /payments' }, { from: 1, to: 2, label: 'attempt = UNKNOWN' }, { from: 2, to: 3, label: 'unresolved only' }, { from: 3, to: 4, label: 'status inquiry' }, { from: 3, to: 5, label: 'matched only' }] },
    { eyebrow: 'Policy state boundary', title: '납입 이벤트와 계약 효력 판단을 분리한 상태 흐름', nodes: [
      { title: '납입 실패', detail: '미수 기록', x: 42, y: 142, tone: 'external' }, { title: 'Receivable', detail: '확정 미수', x: 220, y: 142, tone: 'data' }, { title: 'Notice', detail: '독촉 성공 확인', x: 398, y: 142, tone: 'accent' }, { title: 'Grace Period', detail: '유예 종료 확인', x: 576, y: 142, tone: 'accent' }, { title: 'Claim Check', detail: '사고일 보장 상태', x: 754, y: 142, tone: 'data' },
    ], edges: [{ from: 0, to: 1, label: 'record' }, { from: 1, to: 2, label: 'confirmed' }, { from: 2, to: 3, label: 'notice sent' }, { from: 3, to: 4, label: 'policy at incident date' }] },
    { eyebrow: 'AI review boundary', title: 'AI 답변이 지급 판단으로 넘어가지 않도록 둔 검토 경계', nodes: [
      { title: 'Claim', detail: '약관 ID · 증빙 유형', x: 42, y: 142 }, { title: 'Input Policy', detail: '민감 형식 차단', x: 220, y: 142, tone: 'accent' }, { title: 'AI Draft', detail: '검토 초안 생성', x: 398, y: 142, tone: 'external' }, { title: 'Evidence Check', detail: '근거 ID 재검사', x: 576, y: 142, tone: 'accent' }, { title: 'Reviewer', detail: '담당자 검토', x: 754, y: 142, tone: 'data' },
    ], edges: [{ from: 0, to: 1, label: 'restricted input' }, { from: 1, to: 2, label: 'prompt' }, { from: 2, to: 3, label: 'draft + source id' }, { from: 3, to: 4, label: 'review only' }] },
  ],
  roundy: [
    { eyebrow: 'Atomic matching', title: '대기열과 방 매핑을 Redis Lua에서 함께 바꾼 구조', nodes: [
      { title: 'Verified User', detail: '인증 완료 사용자', x: 40, y: 142 }, { title: 'match.lua', detail: '원자 실행', x: 210, y: 142, tone: 'accent' }, { title: 'Redis Queue', detail: '대기열 선택', x: 382, y: 70, tone: 'data' }, { title: 'Room Mapping', detail: 'user → roomId', x: 382, y: 220, tone: 'data' }, { title: 'Cleanup', detail: '현재 roomId 비교', x: 600, y: 220, tone: 'accent' }, { title: 'Meeting Room', detail: '현재 방 유지', x: 774, y: 142, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'match request' }, { from: 1, to: 2, label: 'pop partner' }, { from: 1, to: 3, label: 'set mapping' }, { from: 3, to: 4, label: 'old cleanup' }, { from: 4, to: 5, label: 'same room only' }] },
    { eyebrow: 'One-time verification', title: '인증 결과를 사용자에게 귀속하고 한 번만 소비한 구조', nodes: [
      { title: 'Face Result', detail: 'VERIFIED', x: 42, y: 142, tone: 'external' }, { title: 'User Key', detail: 'userId scoped', x: 220, y: 142, tone: 'data' }, { title: 'consume.lua', detail: '조건부 소비', x: 398, y: 142, tone: 'accent' }, { title: 'Success', detail: '1개 요청만 통과', x: 576, y: 70, tone: 'data' }, { title: 'Rejected', detail: '재사용 · 타인 거절', x: 576, y: 220, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'bind result' }, { from: 1, to: 2, label: 'consume request' }, { from: 2, to: 3, label: 'first request' }, { from: 2, to: 4, label: 'otherwise' }] },
    { eyebrow: 'Room authorization', title: '로그인 뒤에도 현재 방 접근 권한을 다시 확인한 구조', nodes: [
      { title: 'JWT', detail: '로그인 확인', x: 42, y: 142, tone: 'external' }, { title: 'Room API', detail: '조회·입장 요청', x: 220, y: 142 }, { title: 'Current roomId', detail: 'Redis 매핑 조회', x: 398, y: 142, tone: 'data' }, { title: 'Member Check', detail: '현재 멤버 비교', x: 576, y: 142, tone: 'accent' }, { title: 'OpenVidu Token', detail: '통과 시 발급', x: 754, y: 142, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'authenticated' }, { from: 1, to: 2, label: 'lookup' }, { from: 2, to: 3, label: 'room + member' }, { from: 3, to: 4, label: 'authorized only' }] },
  ],
  san: [
    { eyebrow: 'Search contract', title: '브라우저 필터가 아닌 서버 검색 계약으로 옮긴 구조', nodes: [
      { title: 'Dashboard', detail: '검색어·태그·기간', x: 40, y: 142 }, { title: 'GET /cards', detail: 'page · sort', x: 210, y: 142, tone: 'accent' }, { title: 'Search Service', detail: '조건 조합', x: 382, y: 142, tone: 'accent' }, { title: 'PostgreSQL', detail: '사용자 격리·정렬', x: 554, y: 142, tone: 'data' }, { title: 'Result Compare', detail: '59건 집합 대조', x: 726, y: 142, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'query params' }, { from: 1, to: 2, label: 'request contract' }, { from: 2, to: 3, label: 'filtered query' }, { from: 3, to: 4, label: 'page result' }] },
    { eyebrow: 'AI provenance', title: 'AI가 읽은 원문과 생성 시점을 함께 남긴 구조', nodes: [
      { title: 'Knowledge Card', detail: '원문 수정 가능', x: 42, y: 142 }, { title: 'Snapshot', detail: '생성 시점 고정', x: 220, y: 142, tone: 'data' }, { title: 'Input Guard', detail: '마스킹 · 입력 상한', x: 398, y: 142, tone: 'accent' }, { title: 'AI Job', detail: '소유자 확인', x: 576, y: 142, tone: 'external' }, { title: 'TIL Draft', detail: '근거와 함께 검토', x: 754, y: 142, tone: 'data' },
    ], edges: [{ from: 0, to: 1, label: 'freeze source' }, { from: 1, to: 2, label: 'sanitize' }, { from: 2, to: 3, label: 'create job' }, { from: 3, to: 4, label: 'source retained' }] },
    { eyebrow: 'Retry and review', title: '실패한 작업만 다시 시작하고 검토 상태를 분리한 구조', nodes: [
      { title: 'TIL Request', detail: '작업 생성 요청', x: 42, y: 142 }, { title: 'Job Status', detail: 'PENDING · FAILED', x: 220, y: 142, tone: 'data' }, { title: 'Retry Gate', detail: 'FAILED만 허용', x: 398, y: 142, tone: 'accent' }, { title: 'Review State', detail: '본문 수정 시 초기화', x: 576, y: 142, tone: 'accent' }, { title: 'Owner', detail: '검토 저장', x: 754, y: 142, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'start' }, { from: 1, to: 2, label: 'retry condition' }, { from: 2, to: 3, label: 'new job only' }, { from: 3, to: 4, label: 'review' }] },
  ],
  dasibom: [
    { eyebrow: 'Data minimization', title: '얼굴·음성 원본을 저장하지 않고 파생 결과만 남긴 구조', nodes: [
      { title: 'Mobile App', detail: '얼굴 · 음성 입력', x: 40, y: 142 }, { title: 'Input Guard', detail: '크기 · 형식 확인', x: 210, y: 142, tone: 'accent' }, { title: 'AI Analysis', detail: '요청 메모리 전달', x: 382, y: 142, tone: 'external' }, { title: 'Result Contract', detail: '0/1 · 0~1 검증', x: 554, y: 142, tone: 'accent' }, { title: 'Diagnosis', detail: '판정 · 확률만 저장', x: 726, y: 142, tone: 'data' },
    ], edges: [{ from: 0, to: 1, label: 'multipart' }, { from: 1, to: 2, label: 'valid media only' }, { from: 2, to: 3, label: 'prediction' }, { from: 3, to: 4, label: 'derived data only' }] },
    { eyebrow: 'Media boundary', title: '외부 분석 전에 파일별 제한을 확인한 입력 경계', nodes: [
      { title: 'Face Video', detail: 'mp4 · mov', x: 42, y: 58, tone: 'external' }, { title: 'Voice Audio', detail: 'wav · pcm · m4a', x: 42, y: 226, tone: 'external' }, { title: 'Media Validator', detail: '빈 파일 · 타입 · 크기', x: 252, y: 142, tone: 'accent' }, { title: 'Request Limit', detail: '총 요청 75MB', x: 472, y: 142, tone: 'data' }, { title: 'External AI', detail: '검증된 파일만 전달', x: 704, y: 142, tone: 'external' },
    ], edges: [{ from: 0, to: 2, label: '≤ 50MB' }, { from: 1, to: 2, label: '≤ 20MB' }, { from: 2, to: 3, label: 'pass only' }, { from: 3, to: 4, label: 'multipart' }] },
    { eyebrow: 'Ownership and safe failure', title: '건강 기록의 소유자 확인과 외부 오류 경계를 맞춘 구조', nodes: [
      { title: 'Authenticated User', detail: 'userId', x: 42, y: 142 }, { title: 'GET /diagnosis/:id', detail: '진단 상세 요청', x: 220, y: 142 }, { title: 'Repository', detail: 'diagnosisId + userId', x: 398, y: 142, tone: 'data' }, { title: 'Safe Error', detail: '내부 오류 비노출', x: 576, y: 70, tone: 'accent' }, { title: 'Diagnosis Detail', detail: '소유자만 반환', x: 576, y: 220, tone: 'external' },
    ], edges: [{ from: 0, to: 1, label: 'authenticated' }, { from: 1, to: 2, label: 'two-key lookup' }, { from: 2, to: 3, label: 'not found · upstream error' }, { from: 2, to: 4, label: 'owned record' }] },
  ],
};

function TechnicalDiagram({ project, index }: { project: ProjectCase; index: number }) {
  const diagram = diagrams[project.id][index];
  const nodeWidth = 190;
  const nodeHeight = 82;
  const ranks = Array.from({ length: diagram.nodes.length }, () => 0);
  for (let pass = 0; pass < diagram.nodes.length; pass += 1) {
    diagram.edges.forEach(({ from, to }) => { ranks[to] = Math.max(ranks[to], ranks[from] + 1); });
  }
  const maxRank = Math.max(...ranks);
  const nodesByRank = Array.from({ length: maxRank + 1 }, (_, rank) => diagram.nodes
    .map((node, nodeIndex) => ({ node, nodeIndex }))
    .filter(({ nodeIndex }) => ranks[nodeIndex] === rank));
  const layout = new Map<number, { x: number; y: number }>();
  nodesByRank.forEach((nodes, rank) => {
    const gap = 780 / (nodes.length + 1);
    nodes.forEach(({ nodeIndex }, position) => {
      layout.set(nodeIndex, { x: 85 + gap * (position + 1) - nodeWidth / 2, y: 32 + (maxRank - rank) * 120 });
    });
  });
  const viewHeight = maxRank * 120 + 146;
  const layoutPositions = [...layout.values()];
  const minNodeX = Math.min(...layoutPositions.map(position => position.x));
  const maxNodeX = Math.max(...layoutPositions.map(position => position.x + nodeWidth));
  const viewPaddingX = 48;
  const viewX = Math.max(0, minNodeX - viewPaddingX);
  const viewWidth = Math.min(950 - viewX, maxNodeX - minNodeX + viewPaddingX * 2);
  return <figure className={`technical-diagram technical-diagram-${project.id}`}>
    <figcaption><span>{diagram.eyebrow}</span><strong>{diagram.title}</strong><small>아래에서 위로 읽습니다.</small></figcaption>
    <svg viewBox={`${viewX} 0 ${viewWidth} ${viewHeight}`} aria-label={diagram.title}>
      <defs><marker id={`arrow-${project.id}-${index}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" /></marker></defs>
      {diagram.edges.map(edge => {
        const from = layout.get(edge.from)!; const to = layout.get(edge.to)!;
        const fromCenterX = from.x + nodeWidth / 2; const toCenterX = to.x + nodeWidth / 2;
        const movesUp = to.y < from.y;
        const fromY = movesUp ? from.y : from.y + nodeHeight;
        const toY = movesUp ? to.y + nodeHeight : to.y;
        const midpointY = (fromY + toY) / 2;
        const labelX = (fromCenterX + toCenterX) / 2; const labelY = midpointY - 7;
        return <g className="technical-diagram-edge" key={`${edge.from}-${edge.to}`}><path d={`M ${fromCenterX} ${fromY} C ${fromCenterX} ${midpointY}, ${toCenterX} ${midpointY}, ${toCenterX} ${toY}`} markerEnd={`url(#arrow-${project.id}-${index})`} /><text x={labelX} y={labelY} textAnchor="middle">{edge.label}</text></g>;
      })}
      {diagram.nodes.map((node, nodeIndex) => {
        const position = layout.get(nodeIndex)!;
        return <g className={`technical-diagram-node ${node.tone ?? ''}`} transform={`translate(${position.x} ${position.y})`} key={node.title}>
        <rect width={nodeWidth} height={nodeHeight} rx="10" /><text className="technical-diagram-index" x="16" y="22">0{nodeIndex + 1}</text><text className="technical-diagram-title" x="16" y="47">{node.title}</text><text className="technical-diagram-detail" x="16" y="68">{node.detail}</text>
      </g>;
      })}
    </svg>
  </figure>;
}

function DasibomResultCapture() {
  return <figure className="technical-diagram dasibom-result-capture">
    <figcaption>
      <span>Result handoff</span>
      <strong>위험 신호 안내 뒤, 즉시 행동과 가까운 병원 탐색으로 이어지는 실제 결과 화면</strong>
      <small>원본 결과 화면을 별도 목업 없이 그대로 사용했습니다.</small>
    </figcaption>
    <img src="/assets/dasibom-result-flow-user.png" alt="뇌졸중 위험도와 가까운 병원을 안내하는 다시봄 결과 화면 흐름" width="7594" height="5112" loading="lazy" decoding="async" />
  </figure>;
}

function DasibomMapCapture() {
  return <figure className="technical-diagram dasibom-map-capture">
    <figcaption>
      <span>Nearby care</span>
      <strong>결과 안내에서 가까운 병원 탐색으로 이어지는 실제 지도 화면</strong>
      <small>원본 지도 흐름을 별도 목업 없이 그대로 사용했습니다.</small>
    </figcaption>
    <img src="/assets/dasibom-map-flow-user.png" alt="병원 검색과 상세 정보, 검색 목록을 보여주는 다시봄 원본 지도 화면 흐름" width="7670" height="5112" loading="lazy" decoding="async" />
  </figure>;
}

type ScreenExplainer = {
  eyebrow: string;
  title: string;
  frame: 'phone' | 'web';
  mockup?: string | string[];
  shots: { source: string; alt: string; label: string }[];
  notes: [string, string];
  flowLabel?: string;
};

const screenExplainers: Record<'capsure' | 'roundy' | 'san', ScreenExplainer[]> = {
  capsure: [
    { eyebrow: 'Contract & claim', title: '활성 계약에서 보험금 청구로 이어지는 최신 화면', frame: 'phone', mockup: '/assets/capsure-policy-claim-user-mockup.png', shots: [
      { source: '/assets/capsure-latest-policy.png', alt: 'CapSure 최신 활성 보험증권 화면', label: '계약 상태' },
      { source: '/assets/capsure-latest-claim.png', alt: 'CapSure 최신 보험금 청구 화면', label: '보험금 청구' },
    ], notes: ['활성 증권과 보장 확인', '심사 시나리오 선택'] },
    { eyebrow: 'Application & payment', title: '고지 입력부터 결제 대기, 자동 인수심사까지 이어지는 가입 화면', frame: 'phone', mockup: [
      '/assets/capsure-application-user-mockup.png',
      '/assets/capsure-payment-user-mockup.png',
      '/assets/capsure-approval-user-mockup.png',
    ], shots: [
      { source: '/assets/capsure-latest-application.png', alt: 'CapSure 최신 고지 입력 화면', label: '고지 입력' },
      { source: '/assets/capsure-latest-approval.png', alt: 'CapSure 최신 자동 인수심사 승인 화면', label: '자동 승인' },
    ], notes: ['실제 의료정보 미저장', '판정 상태와 사유 기록'] },
  ],
  roundy: [
    { eyebrow: 'Verification', title: '등록 사진과 실시간 촬영을 대조해 본인인증을 완료하는 화면', frame: 'web', shots: [
      { source: '/assets/roundy-face-matching-latest.png', alt: '등록 사진과 실시간 촬영을 대조하는 Roundy AI 페이스매칭 화면', label: 'AI 본인인증' },
    ], notes: ['등록 사진과 실시간 촬영 대조', '인증 완료'] },
    { eyebrow: 'Preference to meeting', title: '선택한 취향이 상대 실루엣의 프로필 태그로 이어지는 화면', frame: 'web', shots: [
      { source: '/assets/roundy-preference-analysis-latest.png', alt: '연애 목표와 데이트 스타일을 선택하는 Roundy 취향 분석 화면', label: '취향 분석' },
      { source: '/assets/roundy-silhouette-meeting-latest.png', alt: '상대 실루엣 위에 취향 태그가 표시되는 Roundy 미팅 화면', label: '실루엣 미팅' },
      { source: '/assets/roundy-first-impression-latest.png', alt: '상대의 첫인상을 선택하는 Roundy 투표 화면', label: '첫인상 투표' },
    ], notes: ['연애 목표와 데이트 스타일 선택', '상대 실루엣에 취향 태그 표시'], flowLabel: '취향 선택값을 미팅 상대 프로필로 연결' },
  ],
  san: [
    { eyebrow: 'Archive to TIL', title: '분류한 지식을 TIL과 복습 기록으로 다시 꺼내는 화면', frame: 'web', shots: [
      { source: '/assets/san-archive-latest.png', alt: '카테고리별 지식 카드를 찾는 SAN Archive 화면', label: '카테고리 아카이브' },
      { source: '/assets/san-til-latest.png', alt: '초안을 작성하고 복습 기록을 확인하는 SAN TIL 화면', label: 'TIL 작성·복습' },
    ], notes: ['카테고리별 지식 탐색', 'TIL 작성과 복습 기록'], flowLabel: 'Archive에서 TIL 복습으로 연결' },
    { eyebrow: 'Install and preference', title: '프로필 알림 설정과 Chrome 확장 프로그램 설치 화면', frame: 'web', shots: [
      { source: '/assets/san-chrome-store-latest.png', alt: 'SAN Scrap and Notify Chrome 웹스토어 화면', label: 'Chrome 웹스토어' },
      { source: '/assets/san-profile-latest.png', alt: '단축키와 리마인더를 설정하는 SAN 프로필 화면', label: '프로필·알림 설정' },
    ], notes: ['단축키와 알림 설정', 'Chrome 확장 프로그램 설치'], flowLabel: '설치 후 알림·단축키 설정' },
  ],
};

function CaseScreenExplainer({ project, index }: { project: ProjectCase; index: number }) {
  const visual = screenExplainers[project.id as keyof typeof screenExplainers]?.[index - 1];
  if (!visual) return <TechnicalDiagram project={project} index={index} />;
  if (visual.frame === 'web') {
    return <div className={`raw-png-stack raw-png-stack-${project.id} raw-png-stack-${project.id}-${visual.shots.length}`} aria-label={visual.title}>
      {visual.shots.map(shot => <img key={shot.source} src={shot.source} alt={shot.alt} width="2880" height="1839" loading="lazy" decoding="async" />)}
    </div>;
  }
  return <figure className={`screen-explainer screen-explainer-${visual.frame} screen-explainer-${project.id}-${index}`}>
    <figcaption><span>{visual.eyebrow}</span><strong>{visual.title}</strong></figcaption>
    <div className="screen-explainer-frame">
      {visual.mockup
        ? Array.isArray(visual.mockup)
          ? <div className="screen-explainer-mockup-sequence">{visual.mockup.map((source, mockupIndex) => <img key={source} className="screen-explainer-mockup" src={source} alt={`${visual.title} ${mockupIndex + 1}번째 아이폰 목업`} width="3420" height="6920" loading="lazy" decoding="async" />)}</div>
          : <img className="screen-explainer-mockup" src={visual.mockup} alt={`${visual.title} 아이폰 목업`} width="8000" height="6000" loading="lazy" decoding="async" />
        : <div className="screen-explainer-gallery">
          {visual.shots.map((shot, shotIndex) => <figure className={`screen-explainer-shot screen-explainer-shot-${shotIndex + 1}`} key={shot.source + shot.label}>
            <img src={shot.source} alt={shot.alt} width={visual.frame === 'phone' ? 390 : 1920} height={visual.frame === 'phone' ? 844 : 1080} loading="lazy" decoding="async" />
            <figcaption>{shot.label}</figcaption>
          </figure>)}
        </div>}
      {!visual.mockup && !visual.flowLabel && <><span className="screen-explainer-note screen-explainer-note-first">{visual.notes[0]}<i aria-hidden="true" /></span>
      <span className="screen-explainer-note screen-explainer-note-second">{visual.notes[1]}<i aria-hidden="true" /></span></>}
      {visual.flowLabel && <div className="screen-explainer-flow-link"><span>{visual.flowLabel}</span><ArrowRight aria-hidden="true" /></div>}
    </div>
  </figure>;
}

function CaseSlideVisual({ project, index }: { project: ProjectCase; index: number }) {
  if (project.id === 'dasibom' && index === 0) return <DasibomResultCapture />;
  if (project.id === 'dasibom' && index === 1) return <DasibomMapCapture />;
  if (project.id === 'dasibom') return <TechnicalDiagram project={project} index={index} />;
  if (project.id === 'capsure' && index === 0) return <CaseScreenExplainer project={project} index={2} />;
  if (project.id === 'capsure' && index === 2) return <TechnicalDiagram project={project} index={index} />;
  if (index === 0) return <TechnicalDiagram project={project} index={index} />;
  return <CaseScreenExplainer project={project} index={index} />;
}

function ProjectCaseSlide({ project, slide, index }: { project: ProjectCase; slide: CaseSlide; index: number }) {
  const caseNumber = String(index + 1).padStart(2, '0');
  const layout = index === 0 ? 'product' : index === 1 ? 'system' : 'outcome';
  return <section className={`case-slide case-slide-${project.id} case-slide-${layout}`} id={`${project.id}-case-${caseNumber}`} data-page aria-labelledby={`${project.id}-case-${caseNumber}-title`}>
    <header className="case-slide-heading"><p>Case {caseNumber}</p><h3 id={`${project.id}-case-${caseNumber}-title`}>{slide.title}</h3><div className="case-slide-project"><img src={`/assets/project-${project.id}-hd.png`} alt="" width="30" height="30" loading="lazy" decoding="async" /><span>{project.name}</span></div></header>
    <div className="case-slide-top">
      <CaseSlideVisual project={project} index={index} />
      <article className="case-slide-brief">
        <div><p>문제 상황</p><h4>{slide.problem}</h4></div>
        <div><p>제가 정한 기준</p><span>{slide.approach}</span></div>
        <div><p>제가 구현한 방식</p><span>{slide.implementation}</span></div>
      </article>
    </div>
    <footer className="case-slide-bottom">
      <article><p>성과 및 결과</p><strong>{slide.result}</strong></article>
      <article><p>프로젝트를 하며 알게 된 점</p><strong>{slide.reflection}</strong></article>
    </footer>
  </section>;
}

function CaseStudy({ project }: { project: ProjectCase }) {
  const evidence = projectEvidence[project.id];
  const slides = getCaseSlides(project);
  const stories = portfolioStories[project.id];
  const chromeStoreUrl = project.id === 'san'
    ? 'https://chromewebstore.google.com/detail/san-scrap-and-notify/ladkflfemhhaiimhcpfpockdgjfcnflh?utm_source=item-share-cp'
    : null;
  return <section className={`technical-case technical-case-${project.id}`} id={project.id} aria-labelledby={`${project.id}-title`}>
    <div className="case-hero" data-page>
      <div className="case-hero-inner">
        <CaseHeroMedia id={project.id} />
        <header className="case-heading">
          <div className="case-identity"><img src={`/assets/project-${project.id}-hd.png`} alt="" width="68" height="68" loading="lazy" decoding="async" /><div><p>{project.category}</p><strong>{project.name}</strong></div><span className="case-number">{project.number} / {String(projectCases.length).padStart(2, '0')}</span></div>
          <h2 id={`${project.id}-title`}>{project.headline}</h2>
          <p className="case-intro-text">{project.summary}</p>
          <ul className="case-stack" aria-label={`${project.name} 기술 스택`}>{evidence.stack.map(tech => {
            const FallbackIcon = stackFallbackIcons[tech] ?? Braces;
            return <li key={tech}>{stackIcons[tech] ? <img src={stackIcons[tech]} alt="" width="18" height="18" loading="lazy" decoding="async" /> : <FallbackIcon aria-hidden="true" size={17} strokeWidth={2} />}<span>{tech}</span></li>;
          })}</ul>
          <dl className="case-project-meta"><div><dt>팀 구성</dt><dd>{evidence.team}</dd></div><div><dt>담당 범위</dt><dd>{evidence.responsibility}</dd></div></dl>
          {chromeStoreUrl && <a className="case-external-link" href={chromeStoreUrl} target="_blank" rel="noreferrer">Chrome Web Store에서 SAN 보기 <span aria-hidden="true">↗</span></a>}
          <ServiceOverview id={project.id} name={project.name} variant="hero" />
        </header>
      </div>
    </div>
    <div className={`case-container${stories ? ' case-container-evidence' : ''}`}>
      <div className="case-slide-deck" id={`${project.id}-detail`}>
        {project.id === 'dasibom' ? <DasibomBrief /> : stories ? stories.map((story, index) => <EvidenceCaseSlide key={story.visual} projectId={project.id} projectName={project.name} story={story} index={index}/>) : slides.map((slide, index) => <ProjectCaseSlide key={slide.title} project={project} slide={slide} index={index} />)}
      </div>
    </div>
  </section>;
}

export function ProjectCaseStudies() {
  return <>{projectCases.map(project => <CaseStudy key={project.id} project={project} />)}</>;
}
