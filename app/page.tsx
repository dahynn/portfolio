/* oxlint-disable next/no-img-element -- 원본 GIF 애니메이션과 고정 비율 포트폴리오 자산을 그대로 표시합니다. */
import { PageSnap } from '../components/PageSnap';
import { ArrowDown, CheckCircle2, Mail, UserRound, UsersRound } from 'lucide-react';
import { ProjectCaseStudies } from '../components/ProjectCaseStudies';
import { PersonalStrengths } from '../components/PersonalStrengths';
import { SkillCriteria } from '../components/SkillCriteria';
import { projectEvidence } from '../components/projectEvidence';
import './case-studies.css';

const projects = [
  {
    name: 'CapSure', summary: '필요한 보장을 고르고 월 단위로 구독하는 보험 시뮬레이터', icon: '/assets/project-capsure-hd.png', href: '#capsure',
    storeFocus: 'FE Lead 상품 선택·가입 UI · BE 결제 상태 대사·계약 복구',
    stack: [{ name: 'Java 21', icon: '/assets/tech-icons/java.png' }, { name: 'Spring Boot', icon: '/assets/tech-icons/spring.png' }, { name: 'PostgreSQL', icon: '/assets/tech-icons/postgresql.svg' }, { name: 'React', icon: '/assets/tech-icons/react.svg' }],
    evidence: projectEvidence.capsure, role: ['상품 선택과 가입 흐름', '결제 결과와 구독 확정', '반응형 화면 구현'],
  },
  {
    name: 'Roundy', summary: '성향 퀴즈와 얼굴 인증으로 시작하는 온라인 로테이션 미팅', icon: '/assets/project-roundy-hd.png', href: '#roundy',
    storeFocus: 'FE 성향 퀴즈·미팅 화면 · BE Redis Lua 매칭·인증·방 접근 권한',
    stack: [{ name: 'Java 21', icon: '/assets/tech-icons/java.png' }, { name: 'Spring Boot', icon: '/assets/tech-icons/spring.png' }, { name: 'Redis', icon: '/assets/tech-icons/redis.png' }, { name: 'React', icon: '/assets/tech-icons/react.svg' }],
    evidence: projectEvidence.roundy, role: ['성향 퀴즈 흐름 연결', '얼굴 인증과 방 접근', '마스킹 미팅 화면 구현'],
  },
  {
    name: 'SAN', summary: '크롬 확장 프로그램으로 저장한 자료를 다시 찾고 정리하는 서비스', icon: '/assets/project-san-hd.png', href: '#san',
    storeFocus: 'FE 주요 화면·사용자 흐름 구현 · BE 검색 API·로그인 티켓·비동기 감사 추적',
    stack: [{ name: 'Java 21', icon: '/assets/tech-icons/java.png' }, { name: 'Spring Boot', icon: '/assets/tech-icons/spring.png' }, { name: 'PostgreSQL', icon: '/assets/tech-icons/postgresql.svg' }, { name: 'React', icon: '/assets/tech-icons/react.svg' }],
    evidence: projectEvidence.san, role: ['서버 검색 기능 구현', 'AI 입력 보호 설계', '작업 상태 관리'],
  },
  {
    name: '다시봄', summary: '얼굴·음성 결과를 먼저 보고, 필요 시 설문으로 이어지는 모바일 앱', icon: '/assets/project-dasibom-hd.png', href: '#dasibom',
    storeFocus: 'FE React Native 화면·카메라·음성·지도·차트 연동 · PM·UI/UX 디자인',
    stack: [{ name: 'React Native', icon: '/assets/tech-icons/react.svg' }, { name: 'Spring Boot', icon: '/assets/tech-icons/spring.png' }, { name: 'AI 분석 API', icon: '/assets/tech-icons/ai-analysis.svg' }, { name: 'MySQL', icon: '/assets/tech-icons/sql.svg' }],
    evidence: projectEvidence.dasibom, role: ['서비스 기획과 UI/UX', '카메라·음성 입력 연결', '지도·차트 화면 구현'], brief: true,
  },
];

const activities = [
  { date: '2021.03–2025.08', title: '동국대학교', detail: '경영정보학과 · 융합소프트웨어', gpa: '4.11 / 4.5' },
  { date: '2022.03–2022.12', title: '멋쟁이사자처럼 10기', detail: 'HTML · CSS · 자바스크립트 웹 프로젝트' },
  {
    date: '2023.01–2023.02',
    title: '부스트코스 코칭스터디 9기',
    detail: '인공지능 기초 다지기 · 6주 코칭스터디 수료',
    education: true,
    dateDetail: '참여: 2023.01.12–2023.02.23 · 수료: 2023.03.02',
  },
  { date: '2023.03–2023.12', title: "IT 소모임장 'ProMIS'", detail: '40명 규모 소모임 창설·운영 · 신입생 프로그래밍 멘토링' },
  { date: '2023.03–2024.02', title: 'GDSC(Google Developer Student Clubs) 1기', detail: '앱 개발 프로젝트 · 팀 협업' },
  { date: '2024.09–2025.02', title: 'University of Lancashire', detail: '영국 교환학생 · 최우수 성적' },
  { date: '2025.03–2025.06', title: '구름톤 유니브 4기', detail: '개발자 커뮤니케이션' },
  { date: '2025.07–2026.06', title: '삼성청년SW·AI 아카데미 14기', detail: '자바 · 스프링 기반 백엔드 개발' },
  { date: '2026.08', title: '한화금융캠퍼스 15기', detail: '금융 실무 교육 · 현직자 멘토링' },
];
const awards = [
  { date: '2025.11', awardedOn: '2025-11', title: 'AICompS 2025 Best Poster Award', issuer: '한국정보처리학회', description: '뇌졸중 위험 신호 확인 앱의 얼굴·음성 분석과 모바일 이용 흐름을 포스터로 발표' },
  { date: '2025.06', awardedOn: '2025-06-10', title: '2025년도 여름 종합설계 결과발표회 우수상', issuer: '동국대학교', description: '얼굴·음성 분석 결과를 자가 확인과 병원 탐색으로 연결한 모바일 앱' },
];
const certificates = [
  { date: '2026.09', acquiredOn: '2026-09-11', title: '정보처리기사', issuer: '한국산업인력공단' },
  { date: '2026.08', title: 'ADsP(데이터분석 준전문가)', issuer: '한국데이터산업진흥원' },
  { date: '2025.12', title: 'SQL 개발자(SQLD)', issuer: '한국데이터산업진흥원' },
  { date: '2021.09', title: '컴퓨터활용능력 2급', issuer: '대한상공회의소' },
  { date: '2020.02', title: 'ITQ 한글엑셀 A등급', issuer: '한국생산성본부' },
];
const skillGroups = [
  { category: 'Backend', items: [{ name: 'Java', level: 4, icon: '/assets/tech-icons/java.png' }, { name: 'Spring Boot', level: 4, icon: '/assets/tech-icons/spring.png' }, { name: 'JSP', level: 3, icon: '/assets/tech-icons/jsp.svg' }] },
  { category: 'Frontend', items: [{ name: 'React', level: 4, icon: '/assets/tech-icons/react.svg' }, { name: 'Vue.js', level: 3, icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' }, { name: 'Next.js', level: 2, icon: 'https://cdn.simpleicons.org/nextdotjs/343940' }, { name: 'TypeScript', level: 3, icon: '/assets/tech-icons/typescript.svg' }] },
  { category: 'Data', items: [{ name: 'SQL', level: 3, icon: '/assets/tech-icons/sql.svg' }, { name: 'PostgreSQL', level: 3, icon: '/assets/tech-icons/postgresql.svg' }, { name: 'Redis', level: 4, icon: '/assets/tech-icons/redis.svg' }] },
  { category: 'Infrastructure', items: [{ name: 'AWS', level: 3, icon: 'https://api.iconify.design/logos/aws.svg' }, { name: 'Docker', level: 3, icon: 'https://cdn.simpleicons.org/docker/2496ED' }] },
  { category: 'Tools', items: [{ name: 'Jira', level: 2, icon: 'https://cdn.simpleicons.org/jira/0052CC' }, { name: 'Notion', level: 3, icon: 'https://cdn.simpleicons.org/notion/343940' }, { name: 'Harness', level: 2, icon: 'https://api.iconify.design/logos/harness.svg' }] },
];
const skillLevelLabels = ['기초', '초급', '중급', '고급', '전문가'];

function BrandLogo() {
  return (
    <span className="hanwha-logo db-brand">
      <img src="/assets/db-inc-logo.png" alt="DB Inc." />
    </span>
  );
}

export default function Home() {
  return (
    <main className="portfolio">
      <div className="db-intro" aria-hidden="true">
        <div className="db-intro-stage">
          <svg className="db-intro-letters" viewBox="0 0 720 380" aria-hidden="true">
            <defs><linearGradient id="db-intro-gradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#f47721" /><stop offset="48%" stopColor="#0d9bd3" /><stop offset="100%" stopColor="#79c449" /></linearGradient></defs>
            <text className="db-intro-outline" x="52" y="307">DB</text>
            <text className="db-intro-fill" x="52" y="307">DB</text>
          </svg>
          <span className="db-intro-value db-intro-value-one">고객의 결과까지</span>
          <span className="db-intro-value db-intro-value-two">정확한 운영</span>
          <span className="db-intro-value db-intro-value-three">함께하는 개선</span>
        </div>
        <span className="db-intro-line" />
        <p>유다현 · S/W 엔지니어</p>
      </div>
      <PageSnap />
      <nav className="page-navigation" aria-label="포트폴리오 페이지 이동">
        <a href="#introduction" title="프로필"><span>01</span><b>프로필</b></a>
        <a href="#journey" title="S/W 엔지니어의 여정"><span>02</span><b>S/W 엔지니어의 여정</b></a>
        <a href="#profile-record" title="수상과 기술"><span>03</span><b>수상과 기술</b></a>
        <a href="#projects" title="Project Store"><span>04</span><b>Project Store</b></a>
        <a href="#capsure" title="CapSure"><span>05</span><b>CapSure</b></a>
        <a href="#roundy" title="Roundy"><span>08</span><b>Roundy</b></a>
        <a href="#san" title="SAN"><span>11</span><b>SAN</b></a>
        <a href="#dasibom" title="다시봄"><span>14</span><b>다시봄</b></a>
      </nav>
      <section className="cover-page" data-page id="introduction" aria-labelledby="portfolio-title">
        <div className="profile-intro">
          <div className="photo-slot"><img src="/assets/profile.png" alt="유다현 프로필 사진" fetchPriority="high" decoding="async" /></div>
          <p className="profile-name">유다현</p>
          <p className="profile-role">S/W 엔지니어</p>
          <section className="profile-contact" aria-labelledby="profile-contact-title">
            <h2 id="profile-contact-title">Contact</h2>
            <dl>
              <div><dt>이메일</dt><dd><a href="mailto:lyra0720@naver.com"><Mail size={14} strokeWidth={1.9} aria-hidden="true" /><span>lyra0720@naver.com</span></a></dd></div>
              <div><dt>깃허브</dt><dd><a href="https://github.com/dahynn" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/github/33363d" alt="" aria-hidden="true" width="14" height="14" loading="lazy" decoding="async" /><span>github.com/dahynn</span></a></dd></div>
            </dl>
          </section>
        </div>
        <div className="profile-details">
          <h1 id="portfolio-title"><span className="cover-title-line">고객의 요청 한 번부터,</span><span className="cover-title-line">운영 결과의 마지막 숫자까지,</span><span className="cover-title-line cover-title-follow"><span className="cover-title-highlight"><em>끝까지</em> 따라가는</span> <em>S/W 엔지니어</em></span></h1>
          <PersonalStrengths />
        </div>
        <BrandLogo />
        <p className="page-number">01</p>
        <a className="cover-next" href="#journey" aria-label="S/W 엔지니어의 여정으로 이동"><span>SCROLL</span><svg viewBox="0 0 20 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 2v28m-7-7 7 7 7-7" /></svg></a>
      </section>

      <section className="journey-page" data-page id="journey" aria-labelledby="journey-title">
        <BrandLogo />
        <p className="page-number">02</p>
        <div className="journey-heading">
          <p className="eyebrow section-kicker">Development journey</p>
          <h2 id="journey-title">S/W 엔지니어의 여정</h2>
        </div>
        <div className="journey-map">
          <ol className="journey-track">
            {activities.map((activity) => (
              <li className="journey-item" key={activity.title}>
              <button className="journey-trigger" type="button" aria-label={`${activity.title} 활동 강조`} title={activity.dateDetail} />
              <span
                className={`journey-dot ${
                  activity.education || activity.title === '동국대학교' || activity.title === 'University of Lancashire' ? 'education-node'
                    : activity.title === '삼성청년SW·AI 아카데미 14기' ? 'ssafy-node'
                      : activity.title === '한화금융캠퍼스 15기' ? 'hanwha-node'
                        : 'default-node'
                }`}
                aria-hidden="true"
              />
              <p className="journey-date">{activity.date}</p>
              <div className="journey-copy">
                <strong className={
                  activity.title === "IT 소모임장 'ProMIS'" ? 'role-journey-highlight journey-highlight-orange'
                    : activity.title.startsWith('GDSC(') ? 'role-journey-highlight journey-highlight-blue'
                      : activity.title === '삼성청년SW·AI 아카데미 14기' ? 'role-journey-highlight journey-highlight-green'
                        : activity.title === '한화금융캠퍼스 15기' ? 'role-journey-highlight journey-highlight-lime'
                          : undefined
                }>{activity.title}</strong>
                {'gpa' in activity && <span className="journey-gpa" aria-label={`학점 ${activity.gpa}`}>GPA {activity.gpa}</span>}
                <p>{activity.detail}</p>
              </div>
              </li>
            ))}
          </ol>
          <div className="journey-destination">
            <span className="journey-db-brand"><BrandLogo /></span>
            <p>쌓아온 경험을,<br /><strong>DB Inc.의 보험계열사 시스템 개발·운영으로 이어가겠습니다.</strong></p>
          </div>
        </div>
      </section>

      <section className="profile-record-page" data-page id="profile-record" aria-labelledby="profile-record-title">
        <BrandLogo />
        <p className="page-number">03</p>
        <header className="profile-record-heading">
          <p className="eyebrow section-kicker">Profile record</p>
          <h2 id="profile-record-title">화면의 완성도에서 시작해, 금융 서비스의 정확성까지 파고들었습니다.</h2>
          <p>React로 고객이 이해하기 쉬운 화면을 만들었습니다. 이후 Spring Boot로 API를 구현하고, Redis로 요청이 겹칠 때의 상태를 다뤘습니다. 보험 구독 서비스에서는 외부 결제 승인 뒤 내부 계약 저장이 실패하는 상황을 재현하고 복구 흐름을 검증했습니다. DB Inc.에서 고객이 보는 화면과 실제로 남는 처리 결과를 함께 신뢰할 수 있는 시스템을 만들고 싶습니다.</p>
        </header>
        <div className="profile-record-grid">
          <div className="profile-record-history">
            <section aria-labelledby="profile-awards-title">
              <h3 id="profile-awards-title">Awards</h3>
              <ul className="profile-award-list">
                {awards.map((award) => <li key={award.title}>
                  <time dateTime={award.awardedOn}>{award.date}</time>
                  <div><strong>{award.title}</strong><span>{award.issuer}</span><ul className="profile-award-description"><li>{award.description}</li></ul></div>
                </li>)}
              </ul>
            </section>
            <section aria-labelledby="profile-certificates-title">
              <h3 id="profile-certificates-title">Certificates</h3>
              <ul className="profile-certificate-list">
                {certificates.map((certificate) => <li key={certificate.title}>
                  <time dateTime={certificate.acquiredOn ?? certificate.date.replace('.', '-')}>{certificate.date}</time>
                  <strong>{certificate.title}</strong>
                  <span>{certificate.issuer}</span>
                </li>)}
              </ul>
            </section>
          </div>
          <section className="profile-record-skills" aria-labelledby="profile-skills-title">
            <h3 id="profile-skills-title">Tech Stack</h3>
            <div className="profile-skill-explainer">
              <p className="profile-skill-note">프로젝트 경험을 기준으로 한 상대적 자기평가입니다.</p>
              <SkillCriteria />
            </div>
            <div className="profile-skill-groups">
              {skillGroups.map((group) => <div className="profile-skill-group" key={group.category}>
                <h4>{group.category}</h4>
                <ul>{group.items.map((item) => <li key={item.name}>
                  <span className="profile-skill-label"><span>{item.name}</span><img src={item.icon} alt="" aria-hidden="true" width="16" height="16" loading="lazy" decoding="async" /></span>
                  <span className="profile-skill-meter" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => <i className={index < item.level ? 'is-filled' : undefined} key={index} aria-hidden="true" />)}
                  </span>
                  <span className="profile-skill-accessible">{skillLevelLabels[item.level - 1]} · 5단계 중 {item.level}단계, 추정</span>
                </li>)}</ul>
              </div>)}
            </div>
          </section>
        </div>
      </section>

      <section className="project-index-page project-store" data-page id="projects" aria-labelledby="projects-title">
        <BrandLogo />
        <p className="page-number">04</p>
        <div className="index-heading">
          <p className="store-kicker section-kicker">Selected work</p>
          <h2 id="projects-title">Project Store</h2>
          <p>서비스의 핵심 흐름과 제가 맡은 범위를 간략히 정리했습니다.</p>
        </div>
        <ul className="store-list">
          {projects.map((project) => (
            <li className={`store-item${project.brief ? ' store-item-brief' : ''}`} key={project.name}>
              <div className="store-project-intro">
                <img className={`store-icon ${project.name === 'CapSure' ? 'project-icon-capsure' : ''}`} src={project.icon} alt="" width="112" height="112" loading="lazy" decoding="async" />
                <div className="store-copy">
                  <div className="store-eyebrow">
                    <span className="store-number" aria-hidden="true">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
                    {project.brief && <span className="store-brief-label">Project brief</span>}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="store-meta">
                    <span>{project.evidence.team}</span>
                    <p className="store-contribution" aria-label={`${project.name} 담당 역할`}><UserRound className="store-contribution-icon" size={16} strokeWidth={1.9} aria-hidden="true" />{project.storeFocus.split(' · ').map(focus => <span key={focus}>{focus}</span>)}</p>
                  </div>
                </div>
              </div>
              <div className="store-tech" aria-label={`${project.name} 기술 스택`}>
                <p>기술 스택</p>
                <ul>{project.stack.map((tech) => <li key={tech.name}><img src={tech.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />{tech.name}</li>)}</ul>
              </div>
              <div className="store-team" aria-label={`${project.name} 팀 구성`}>
                <p>팀 구성</p>
                <strong><UsersRound size={18} strokeWidth={1.8} aria-hidden="true" />{project.evidence.team.split(' · ')[0]}</strong>
                <span>{project.evidence.team.split(' · ').slice(1).join(' · ')}</span>
              </div>
              <div className="store-role" aria-label={`${project.name} 담당 범위`}>
                <p>담당 범위</p>
                <strong>{project.evidence.responsibility.split(' / ')[0]}</strong>
                <ul>{project.role.map((item) => <li key={item}><CheckCircle2 size={13} strokeWidth={2.1} aria-hidden="true" />{item}</li>)}</ul>
              </div>
              <a className="store-scroll" href={project.href} aria-label={`${project.name} 상세 내용으로 이동`}>
                자세히 보기 <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ProjectCaseStudies />
    </main>
  );
}
