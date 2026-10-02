/* oxlint-disable next/no-img-element -- 사용자 원본 서비스 캡처를 그대로 표시합니다. */
import { ArrowDown, ArrowRight, Check, CircleCheck, CircleX, FileLock2, Layers3, ScanFace } from 'lucide-react';
import type { PortfolioStory, StoryVisual } from './portfolioStories';
import { DiagramLightbox } from './DiagramLightbox';
import { SanTicketWiggle } from './SanTicketWiggle';

function FlowStep({ number, title, detail, status, tone = '' }: { number: string; title: string; detail: string; status: string; tone?: string }) {
  return <li className={`story-flow-step ${tone}`}><span className="story-step-number">{number}</span><h4>{title}</h4><p>{detail}</p><strong>{status}</strong></li>;
}

function SentenceLines({ text }: { text: string }) {
  const sentences = text.match(/.*?(?:[.!?](?=\s|$)|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [text];
  return <>{sentences.map((sentence, index) => <span className="case-sentence-line" key={`${index}-${sentence}`}>{sentence}</span>)}</>;
}

function CaseThreePart({ story }: { story: PortfolioStory }) {
  const summary = story.summary ?? {
    problem: [story.problem],
    approach: [story.decision, story.implementation],
    impact: [story.result],
  };
  return <section className="roundy-race-summary case-three-part" aria-label="문제 해결 요약">
    {(['problem', 'approach', 'impact'] as const).map((part) => <article key={part}>
      <h4>{part[0].toUpperCase() + part.slice(1)}</h4>
      <ul className="roundy-race-summary-list">{summary[part].map((line) => <li key={line}>{line}</li>)}</ul>
      {part === 'impact' && story.scope ? <p className="roundy-race-summary-scope">{story.scope}</p> : null}
    </article>)}
  </section>;
}

function PaymentVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">같은 주문의 복구 과정 <span>합성 PG 예외 주입 시험</span></div>
    <ol className="story-flow">
      <FlowStep number="01" title="외부 승인 완료" detail="PG에서는 이미 승인된 주문" status="승인 결과 존재" />
      <FlowStep number="02" title="내부 저장 실패" detail="증권 저장 예외 → HTTP 500" status="APPROVING · 증권 0건" tone="is-warning" />
      <FlowStep number="03" title="조회 후 복구" detail="새 승인이 아닌 기존 주문 대사" status="PAID / ACTIVE · 증권 1건" tone="is-resolved" />
    </ol>
    <div className="story-rule"><div><small>복구의 기준</small><strong>승인은 반복하지 않고,<br/>끊긴 내부 처리를 이어갑니다.</strong></div></div>
    <div className="story-counts"><span>별도 동일 confirm <b>100회</b></span><ArrowRight aria-hidden="true"/><span>외부 승인 <b>1회</b></span><span>증권·활성화 이벤트 <b>각 1건</b></span></div>
  </div>;
}

function DeadlineVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">입금 시점으로 나눈 동일 정책 <span>합성 상품의 유예 종료 기준</span></div>
    <div className="story-deadline">
      <article><span>유예 마지막 날</span><h4>기한 안에 완납</h4><p>모든 미납 회차 해소</p><strong>ACTIVE</strong><small>계약 활성 상태</small></article>
      <div className="story-deadline-divider"><span>유예 종료</span></div>
      <article className="is-warning"><span>다음 날 · 배치 실행 전</span><h4>DB에는 아직 GRACE</h4><p>수납 직전 만료 기준 재확인</p><strong>LAPSED</strong><small>입금 기록 + 지연 검토 1건</small></article>
    </div>
    <div className="story-rule"><div><small>배치와 수납이 공유하는 판단</small><strong>입금은 기록하되,<br/>계약을 자동으로 되살리지 않습니다.</strong></div></div>
    <p className="story-visual-note">같은 실효 후 출금 결과를 2번 반영한 별도 시험에서도 수납·검토는 각각 1건.</p>
  </div>;
}

function RaceVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">두 요청이 같은 상태에 도착한 순간 <span>REDIS CURRENT ROOM</span></div>
    <div className="story-race-timeline">
      <div className="story-race-spine" aria-hidden="true"><i/><i/><i/></div>
      <article className="story-race-lane story-race-lane-current">
        <span>t0 · REQUEST 01</span><h4>새 세션 B 배정</h4><p>매칭이 끝나 현재 방을 B로 교체합니다.</p><code>SET currentRoom B</code>
      </article>
      <article className="story-race-state">
        <small>SHARED STATE</small><strong>currentRoom</strong><b>B</b><p>새 방으로 덮어쓴 상태</p>
      </article>
      <article className="story-race-lane story-race-lane-late">
        <span>t1 · REQUEST 02</span><h4>늦은 이전 세션 A 정리</h4><p>정리 대상은 A지만, 삭제 요청은 뒤늦게 도착합니다.</p><code>cleanup(roomId: A)</code>
      </article>
      <div className="story-race-guard">
        <div><small>삭제 전 확인</small><strong>currentRoom == roomId?</strong></div><b>A ≠ B</b><div className="is-resolved"><Check aria-hidden="true" size={20}/><strong>삭제하지 않음</strong><small>새 세션 B 유지</small></div>
      </div>
    </div>
    <div className="story-race-proof">
      <div><small>BEFORE</small><strong>100/100</strong><span>새 방 유실</span></div><ArrowRight aria-hidden="true"/><div className="is-resolved"><small>AFTER</small><strong>0/100</strong><span>조건부 정리 적용</span></div>
      <figure className="story-observability-mini"><img src="/assets/roundy-load-observability.svg" alt="Roundy 매칭 부하 테스트 관측 대시보드" loading="lazy"/><figcaption>합성 사용자 9,000명 · 3회 관측</figcaption></figure>
    </div>
  </div>;
}

function VerificationVisual() {
  return <div>
    <figure className="story-service-capture"><img src="/assets/roundy-face-matching-latest.png" alt="등록 사진과 실시간 촬영을 대조하는 라운디 얼굴 인증 화면" width="2880" height="1810" loading="lazy"/><figcaption>프라이버시를 위해 포트폴리오 화면은 모자이크 처리했습니다. 실제 서비스에서는 회원가입 시 등록한 사진과 실시간 촬영을 대조합니다.</figcaption></figure>
    <ol className="story-auth-machine" aria-label="인증 결과 상태 전이">
      <li><span>01</span><strong>PENDING</strong><small>아직 소비하지 않음</small></li>
      <li><span>02</span><strong>VERIFIED</strong><small>본인 요청만 1회 허용</small></li>
      <li><span>03</span><strong>CONSUMED</strong><small>재사용 불가</small></li>
    </ol>
    <div className="story-auth-key"><small>소유권 키</small><code>verify:&#123;userId&#125;:&#123;requestId&#125;</code><span>타인 요청 · 중복 소비 · 늦은 완료 응답 차단</span></div>
    <div className="story-auth-result"><div><span>CONCURRENT CONSUMPTION</span><strong>1<small>/ 16 REQUESTS</small></strong><small>한 번만 소비 승인</small></div><ul><li><Check aria-hidden="true" size={17}/> 소유자의 VERIFIED만 소비</li><li><Check aria-hidden="true" size={17}/> 타인 요청·재소비 차단</li><li><Check aria-hidden="true" size={17}/> 늦은 완료로 재생성하지 않음</li></ul></div>
  </div>;
}

function SearchVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">검색 첫 50건 · p95 <span>낮을수록 빠름 / 같은 축</span></div>
    <div className="story-bars">
      <div><span>전체 목록 → 브라우저 필터</span><div className="story-bar-track"><i style={{ width: '100%' }}/></div><strong>133.67 <small>ms</small></strong></div>
      <div className="is-resolved"><span>서버 검색 → 필요한 결과</span><div className="story-bar-track"><i style={{ width: `${19.040875 / 133.670958 * 100}%` }}/></div><strong>19.04 <small>ms</small></strong></div>
    </div>
    <div className="story-payload"><span>최신 50건의 응답 크기</span><strong>5.09 <small>MB</small><ArrowRight aria-hidden="true"/>26.9 <small>KB</small></strong><p>전체 다운로드 대신 필요한 페이지를 반환합니다.</p></div>
    <div className="story-query-rules"><span>소유자 격리</span><span>태그 조건 집계</span><span>시간 + ID 안정 정렬</span></div>
  </div>;
}

function SnapshotVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">이번 생성의 입력과 현재 원문을 분리 <span>SOURCE SNAPSHOT</span></div>
    <div className="story-snapshot">
      <article><span>01 · REQUEST</span><h4>SOURCE A</h4><p>카드·스크랩 ID<br/>제목 · 원문 · URL · AI 입력</p></article>
      <article className="story-snapshot-lock"><FileLock2 aria-hidden="true" size={35}/><span>02 · SNAPSHOT</span><h4>SNAPSHOT A</h4><p>DailySummary에 보존</p></article>
      <article><span>03 · AI RUN</span><h4>INPUT A</h4><p>저장된 aiInput 사용<br/>현재 카드 재조회 없음</p></article>
    </div>
    <div className="story-source-change"><span>그사이 원문을 수정해도</span><strong>CURRENT SOURCE B</strong><span>이번 요청의 SNAPSHOT A는 유지</span></div>
    <div className="story-rule"><FileLock2 aria-hidden="true"/><div><small>TRACEABLE INPUT</small><strong>최신 원문이 아니라,<br/>생성 당시의 입력을 남깁니다.</strong></div></div>
  </div>;
}

function HealthInputVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">호출 전 검사 → 저장 전 검사 <span>서비스의 진단 처리 경로</span></div>
    <ol className="story-flow">
      <FlowStep number="01" title="얼굴·음성 입력" detail="영상 ≤ 50MB / 음성 ≤ 20MB" status="형식·용량 검사" />
      <FlowStep number="02" title="외부 AI 분석" detail="요청 메모리에서 원본 전달" status="판정값·확률 검사" />
      <FlowStep number="03" title="파생 결과 기록" detail="서비스 저장소에 원본 업로드 안 함" status="허용된 응답만 저장" tone="is-resolved" />
    </ol>
    <div className="story-health-checks"><div><span>호출 전</span><strong>용량 초과 · MIME 불일치</strong><small>AI 호출하지 않음</small></div><div><span>저장 전</span><strong>판정값 2 · 확률 1.3</strong><small>진단 기록 저장하지 않음</small></div></div>
    <div className="story-rule"><div><small>서비스 저장 기준</small><strong>원본 파일 대신,<br/>검사한 파생 결과만 남깁니다.</strong></div></div>
  </div>;
}

function HealthOwnerVisual() {
  return <div className="story-diagram">
    <div className="story-visual-label">기록 ID + 인증 사용자 ID <span>소유권 확인 후 상세 조회</span></div>
    <div className="story-owner-query"><small>이전</small><span>진단 ID만 조회</span><ArrowRight aria-hidden="true"/><small>변경</small><strong>진단 ID AND 사용자 ID</strong></div>
    <div className="story-owner-paths">
      <article><span>기록 소유자와 요청자가 일치</span><h4>본인 기록</h4><strong>상세 조회 진행</strong><p>결과와 연관 정보로 연결</p></article>
      <article><span>기록 소유자와 요청자가 불일치</span><h4>타인 기록</h4><strong>404</strong><p>연관 병원 조회도 중단</p></article>
    </div>
    <div className="story-rule"><FileLock2 aria-hidden="true"/><div><small>상세 조회의 완료 조건</small><strong>“있는 기록인가?”가 아니라<br/>“내 기록인가?”까지 확인합니다.</strong></div></div>
  </div>;
}

function DasibomSourceScreens() {
  return <details className="story-source-screens"><summary>병원 탐색 화면 보기</summary>
    <figure><figcaption>병원 탐색 <a href="/assets/dasibom-map-flow-user.png" target="_blank" rel="noreferrer">원본 크게 보기 ↗</a></figcaption><img src="/assets/dasibom-map-flow-user.png" alt="다시봄 지도, 병원 상세와 검색 목록 원본 캡처" width="7670" height="5112" loading="lazy"/></figure>
  </details>;
}

function SanAuditVisual() {
  return <figure className="san-svg-visual"><img src="/assets/san-async-audit-flow.svg?v=10" alt="Request Snapshot에서 Queue와 Worker Restore를 거쳐 Audit Log로 이어지고, 워커는 finally에서 이전 Context를 복원하는 비동기 감사 흐름" loading="lazy" decoding="async"/></figure>;
}

function SanTicketVisual() {
  return <figure className="san-ticket-flow" aria-label="Dashboard가 서버에 Ticket 발급을 요청하면 서버가 Redis에 저장하고, Dashboard가 메시지로 Chrome Extension에 전달합니다. Extension의 교환 요청을 받은 서버가 Redis에서 Ticket을 한 번만 소비합니다.">
    <div className="san-ticket-flow-node"><span className="san-ticket-flow-icon is-dashboard"><img src="/assets/san-dashboard-browser-icon.png" alt="" width="1604" height="980" loading="lazy" decoding="async"/></span><div><strong>Dashboard</strong><small>access token으로 Ticket 발급 요청</small></div></div>
    <div className="san-ticket-flow-link"><ArrowDown aria-hidden="true"/><span><b>01</b> 서버에서 토큰·출처 검증</span></div>
    <div className="san-ticket-flow-node"><Layers3 aria-hidden="true"/><div><strong>Backend → Redis</strong><small>1회용 Ticket 저장 · TTL 2분</small></div></div>
    <div className="san-ticket-flow-link"><ArrowDown aria-hidden="true"/><span><b>02</b> Dashboard에 Ticket 반환</span></div>
    <SanTicketWiggle/>
    <div className="san-ticket-flow-link"><ArrowDown aria-hidden="true"/><span><b>03</b> Dashboard가 메시지로 전달</span></div>
    <div className="san-ticket-flow-node"><span className="san-ticket-flow-icon is-extension"><img src="/assets/san-chrome-extension-icon.png" alt="" width="1254" height="1254" loading="lazy" decoding="async"/></span><div><strong>Chrome Extension</strong><small>Ticket으로 서버에 교환 요청</small></div></div>
    <div className="san-ticket-result-link"><ArrowDown aria-hidden="true"/><span>서버가 Redis getAndDelete로 1회 소비</span></div>
    <div className="san-ticket-outcomes">
      <div className="is-success"><CircleCheck aria-hidden="true"/><strong>로그인 성공</strong><small>유효 · 최초 소비</small></div>
      <div className="is-failure"><CircleX aria-hidden="true"/><strong>만료 거절</strong><small>유효 시간 경과</small></div>
      <div className="is-failure"><CircleX aria-hidden="true"/><strong>재사용 거절</strong><small>이미 소비한 Ticket</small></div>
    </div>
    <figcaption>반대 방향 로그인은 Ticket TTL 30초를 적용합니다.</figcaption>
  </figure>;
}

function SanTicketCase({ story, caseNumber, id }: { story: PortfolioStory; caseNumber: string; id: string }) {
  return <section className="san-evidence-case san-evidence-san-ticket" id={id} data-page aria-labelledby={`${id}-title`}>
    <div className="san-evidence-canvas san-ticket-canvas">
      <header className="san-evidence-header">
        <div><span>PROBLEM {caseNumber}</span><small>{story.topic}</small></div>
        <h3 id={`${id}-title`}>{story.title}</h3>
        <p><SentenceLines text={story.takeaway}/></p>
      </header>
      <div className="san-ticket-main">
        <SanTicketVisual/>
        <CaseThreePart story={story}/>
      </div>
    </div>
  </section>;
}

function SanBenchmarkVisual() {
  return <figure className="san-svg-visual"><img src="/assets/san-ai-parallel-benchmark.svg?v=10" alt="같은 카드 3개의 순차 처리 17.68초와 동시 처리 6.92초를 비교한 흐름도" loading="lazy" decoding="async"/></figure>;
}

function SanBenchmarkCase({ story, caseNumber, id }: { story: PortfolioStory; caseNumber: string; id: string }) {
  return <section className="san-evidence-case san-evidence-san-benchmark" id={id} data-page aria-labelledby={`${id}-title`}>
    <div className="san-evidence-canvas san-benchmark-canvas">
      <header className="san-evidence-header">
        <div><span>PROBLEM {caseNumber}</span><small>{story.topic}</small></div>
        <h3 id={`${id}-title`}>{story.title}</h3>
        <p><SentenceLines text={story.takeaway}/></p>
      </header>
      <div className="san-benchmark-main">
        <div className="san-evidence-stage"><SanBenchmarkVisual/></div>
        <CaseThreePart story={story}/>
      </div>
    </div>
  </section>;
}

function SanEvidenceCase({ story, index }: { story: PortfolioStory; index: number }) {
  const caseNumber = String(index + 1).padStart(2, '0');
  const id = `san-case-${caseNumber}`;
  if (story.visual === 'san-benchmark') return <SanBenchmarkCase story={story} caseNumber={caseNumber} id={id}/>;
  if (story.visual === 'san-ticket') return <SanTicketCase story={story} caseNumber={caseNumber} id={id}/>;
  const Visual = story.visual === 'san-audit' ? SanAuditVisual : SanBenchmarkVisual;

  return <section className={`san-evidence-case san-evidence-${story.visual}`} id={id} data-page aria-labelledby={`${id}-title`}>
    <div className="san-evidence-canvas">
      <header className="san-evidence-header">
        <div><span>PROBLEM {caseNumber}</span><small>{story.topic}</small></div>
        <h3 id={`${id}-title`}>{story.title}</h3>
        <p><SentenceLines text={story.takeaway}/></p>
      </header>
      <div className="san-evidence-board">
        <div className="san-evidence-stage"><Visual/></div>
        <CaseThreePart story={story}/>
      </div>
    </div>
  </section>;
}

const visuals: Partial<Record<StoryVisual, () => React.JSX.Element>> = { payment: PaymentVisual, deadline: DeadlineVisual, race: RaceVisual, verification: VerificationVisual, search: SearchVisual, snapshot: SnapshotVisual, 'health-input': HealthInputVisual, 'health-owner': HealthOwnerVisual };

function RoundyRaceCase({ story }: { story: PortfolioStory }) {
  return <section className="roundy-race-case" id="roundy-case-01" data-page aria-labelledby="roundy-race-title">
    <div className="roundy-race-canvas roundy-unified-canvas">
      <header className="roundy-unified-header"><div><span>PROBLEM 01</span><small>{story.topic}</small></div><h3 id="roundy-race-title">{story.title}</h3><p>{story.takeaway}</p></header>
      <div className="roundy-unified-board">
        <figure className="roundy-concurrency" aria-label="새 방 B 배정과 이전 방 A 정리 요청이 Redis에서 만나 조건부 삭제로 B를 유지하는 흐름">
          <img className="roundy-race-svg" src="/assets/roundy-race-flow.svg?v=4" alt="새 방 B 배정과 늦은 이전 방 A 정리 요청이 Redis에서 만나, 현재 방 B와 정리 대상 A가 달라 B를 유지하는 흐름" width="620" height="668" loading="lazy" decoding="async"/>
        </figure>
        <section className="roundy-race-summary" aria-label="문제 해결 요약">
          <article>
            <h4>Problem</h4>
            <ul className="roundy-race-summary-list">
              <li>매칭 입장에서 늦은 poll이 이미 배정된 사용자를 다시 큐에 넣는 순서 충돌이 있었습니다.</li>
              <li>새 방 B를 배정한 뒤 이전 방 A의 정리 요청까지 늦게 도착하면, 조건 없는 삭제가 B를 유실시켰습니다.</li>
            </ul>
          </article>
          <article>
            <h4>Approach</h4>
            <ul className="roundy-race-summary-list">
              <li>인증 소비·큐 등록·방 배정을 Redis Lua에서 원자적으로 처리했습니다.</li>
              <li>정리할 때 현재 방과 대상 roomId를 비교해, 일치할 때만 삭제했습니다.</li>
              <li>대상이 A이고 현재 방이 B라면 B를 유지합니다.</li>
            </ul>
          </article>
          <article>
            <h4>Impact</h4>
            <ul className="roundy-race-impact-list">
              <li>늦은 poll로 인한 재큐잉이 <strong>100/100회에서 0/100회</strong>로 줄었습니다.</li>
              <li>원자적 입장만으로는 새 방 유실이 해결되지 않았지만, 조건부 정리를 추가한 뒤 재현되지 않았습니다.</li>
              <li>요청 순서를 제어한 로컬 시험으로 입장 처리와 이전 방 정리의 두 경계를 각각 검증했습니다.</li>
            </ul>
            <p className="roundy-race-summary-scope">{story.scope}</p>
          </article>
        </section>
      </div>
    </div>
  </section>;
}

function RoundyVerificationCase({ story }: { story: PortfolioStory }) {
  return <section className="roundy-verification-case" id="roundy-case-02" data-page aria-labelledby="roundy-verification-title">
    <div className="roundy-verification-canvas roundy-unified-canvas">
      <header className="roundy-unified-header"><div><span>PROBLEM 02</span><small>{story.topic}</small></div><h3 id="roundy-verification-title">{story.title}</h3><p>{story.takeaway}</p></header>
      <div className="roundy-unified-board">
        <figure className="roundy-auth-timeline" aria-label="얼굴 인증 요청에서 Redis 상태 전이를 거쳐 결과를 한 번만 소비하는 흐름">
          <figcaption><strong>얼굴 인증 결과가 소비되기까지</strong></figcaption>
          <ol className="roundy-auth-steps">
            <li><span className="roundy-auth-index">1</span><div className="roundy-auth-step-body"><h4>얼굴 인증 요청</h4><p>사용자가 얼굴을 촬영해 요청합니다.</p><div className="roundy-auth-flow"><div className="roundy-auth-face-icon"><ScanFace aria-hidden="true"/></div><ArrowRight aria-hidden="true"/><span>사용자 얼굴 촬영<br/><b>face-matching 요청</b></span></div></div></li>
            <li><span className="roundy-auth-index">2</span><div className="roundy-auth-step-body"><h4>Redis Gate</h4><p>요청 단위로 결과 상태를 관리합니다.</p><div className="roundy-auth-flow roundy-auth-redis"><img src="/assets/tech-icons/redis.svg" alt="Redis" width="72" height="72" loading="lazy" decoding="async"/><ArrowRight aria-hidden="true"/><span>요청 상태 저장<br/><b>userId + requestId</b></span></div></div></li>
            <li><span className="roundy-auth-index">3</span><div className="roundy-auth-step-body"><h4>상태 전이</h4><p>하나의 요청은 정해진 순서로만 진행됩니다.</p><div className="roundy-auth-states"><span><strong>PENDING</strong><small>요청 접수</small></span><ArrowRight aria-hidden="true"/><span className="is-verified"><strong>VERIFIED</strong><small>얼굴 일치 확인</small></span><ArrowRight aria-hidden="true"/><span><strong>CONSUMED</strong><small>1회만 소비</small></span></div></div></li>
            <li><span className="roundy-auth-index">4</span><div className="roundy-auth-step-body"><h4>16개 중 1개만 성공</h4><p>동시에 16개 요청을 보냈고, 한 건만 통과했습니다.</p><div className="roundy-auth-proof"><div className="roundy-auth-proof-dots" aria-label="16개 요청 중 1개 성공">{Array.from({ length: 16 }, (_, index) => <span key={index} className={index === 6 ? 'is-success' : ''}>{index + 1}</span>)}</div><strong>1개만 성공</strong><small>나머지 15개는 이미 소비됨</small></div></div></li>
          </ol>
        </figure>
        <CaseThreePart story={story}/>
      </div>
    </div>
  </section>;
}

function CapsureBlueprintCase({ story, index }: { story: PortfolioStory; index: number }) {
  const caseNumber = String(index + 1).padStart(2, '0');
  const id = `capsure-case-${caseNumber}`;
  const isPayment = story.visual === 'payment';
  const diagram = isPayment ? '/assets/capsure-payment-blueprint.svg?v=3' : '/assets/capsure-deadline-blueprint.svg?v=3';
  const diagramAlt = isPayment
    ? 'PG 승인 완료 뒤 내부 저장이 실패했을 때 기존 주문을 대사해 계약과 이벤트까지 복구하는 시스템 흐름'
    : '유예 종료 시점을 기준으로 수납과 실효 배치가 동일한 계약 상태를 판단하는 시스템 흐름';

  return <section className={`capsure-blueprint-case capsure-blueprint-${story.visual}`} id={id} data-page aria-labelledby={`${id}-title`}>
    <div className="capsure-blueprint-canvas">
      <header className="capsure-blueprint-header">
        <div className="capsure-blueprint-eyebrow">
          <span>PROBLEM {caseNumber}</span>
          <small>{story.topic}</small>
        </div>
        <h3 id={`${id}-title`}>{story.title}</h3>
        <p>{story.takeaway}</p>
      </header>

      <div className="capsure-blueprint-board">
        <div className="capsure-blueprint-main">
          <figure className="capsure-blueprint-diagram">
            <DiagramLightbox src={diagram} alt={diagramAlt} title={isPayment ? '결제·계약 복구 흐름' : '입금 시점으로 보는 동일 정책'}/>
          </figure>

          <section className="capsure-blueprint-rule" aria-label="핵심 원칙">
            <div><small>{isPayment ? '복구의 기준' : '변하지 않는 원칙'}</small><strong>{isPayment ? '승인은 반복하지 않고, 끊긴 내부 처리를 이어갑니다.' : '입금은 기록하되, 계약을 자동으로 되살리지 않습니다.'}</strong></div>
            <p>{story.application}</p>
          </section>
        </div>

        <CaseThreePart story={story}/>
      </div>
    </div>
  </section>;
}

export function EvidenceCaseSlide({ projectId, projectName, story, index }: { projectId: string; projectName: string; story: PortfolioStory; index: number }) {
  if (projectId === 'roundy' && story.visual === 'race') return <RoundyRaceCase story={story}/>;
  if (projectId === 'roundy' && story.visual === 'verification') return <RoundyVerificationCase story={story}/>;
  if (projectId === 'capsure') return <CapsureBlueprintCase story={story} index={index}/>;
  if (projectId === 'san') return <SanEvidenceCase story={story} index={index}/>;
  const caseNumber = String(index + 1).padStart(2, '0');
  const id = `${projectId}-case-${caseNumber}`;
  const Visual = visuals[story.visual];
  if (!Visual) return null;
  return <section className={`evidence-story evidence-story-${projectId} evidence-story-${story.visual} evidence-story-dark`} id={id} data-page aria-labelledby={`${id}-title`}>
    <div className="story-shell"><div className="story-inner">
      <header className="story-heading"><div className="story-eyebrow"><span className="story-problem-index">PROBLEM {caseNumber}</span><span className="story-project-mark"><img src={`/assets/project-${projectId}-hd.png`} alt="" width="28" height="28" loading="lazy" decoding="async" />{projectName}</span><span>{story.topic}</span></div><h3 id={`${id}-title`}>{story.title}</h3><p>{story.takeaway}</p></header>
      <div className="story-body">
        <div className={`story-visual story-visual-${story.visual}`}><Visual/></div>
        <div className="story-explanation">
          <article><span>01 · PROBLEM</span><p>{story.problem}</p></article>
          <article><span>02 · DECISION</span><p>{story.decision}</p></article>
          <article><span>03 · BUILD</span><p>{story.implementation}</p></article>
        </div>
      </div>
      <footer className="story-footer"><div><span>04 · EVIDENCE</span><strong>{story.result}</strong><p>{story.scope}</p></div><div><span>APPLICATION</span><p>{story.application}</p></div></footer>
      <div className="story-detail-actions">
        <details className="story-evidence-details"><summary>검증 조건과 범위 보기</summary><p>{story.details}</p></details>
        {story.visual === 'health-owner' ? <DasibomSourceScreens/> : null}
      </div>
    </div></div>
  </section>;
}
