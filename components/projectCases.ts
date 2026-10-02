export type CaseStep = { label: string; state: string; title: string; body: string };
export type ProjectCase = {
  id: string; number: string; name: string; category: string; headline: string;
  summary: string; role: string; mechanism: string; steps: CaseStep[];
  result: string; conditions: string; source: string; sourceLabel: string;
  supporting: { title: string; problem: string; body: string; proof: string }[];
};

export const projectCases: ProjectCase[] = [
  {
    id: 'capsure', number: '01', name: 'CapSure', category: '구독형 보험 프로세스 시뮬레이터',
    headline: '결제와 계약의 상태를 끝까지 맞추다.',
    summary: '월 단위로 보험을 구성하고 구독하는 서비스입니다. 납입, 청구, 지급, 계약 유지가 한 흐름으로 이어지도록 설계했습니다.',
    role: '팀 프로젝트. FE Lead · BE로 상품 선택 흐름과 결제·계약 복구를 맡았습니다.',
    mechanism: '응답이 끊겨도 결제와 계약이 어긋나지 않게 만든 과정',
    steps: [
      { label: '문제 상황', state: '응답 유실', title: '결제는 됐는데 응답이 없는 상황이 있었습니다.', body: '승인 요청 뒤 통신이 끊기면 PG의 결제 결과를 알 수 없습니다. 실패로 간주해 다시 승인하면 중복 결제가 발생할 수 있었습니다.' },
      { label: '제가 판단한 기준', state: 'UNKNOWN', title: '확인 전에는 계약을 활성화하지 않기로 했습니다.', body: '타임아웃을 UNKNOWN으로 보존하고 계약 활성화를 보류했습니다. 같은 멱등 키의 요청은 기존 결과를 반환하고, 외부 승인 호출을 반복하지 않습니다.' },
      { label: '제가 구현한 방식', state: '조회·대사', title: '조회와 대사로 최종 상태를 확인했습니다.', body: 'PG 조회 결과를 주문·금액과 대조해 상태를 확정합니다. 행 잠금으로 대사 대상을 선점하고, Outbox에 후속 이벤트를 남겨 중단된 작업도 추적할 수 있게 했습니다.' },
      { label: '확인한 결과', state: 'PAID · ACTIVE', title: '불확실한 결제를 끝까지 확정했습니다.', body: '로컬 합성 UNKNOWN 주문·결제 시도 1만 건을 실제 저장소와 대사 경로로 실행했습니다. 최종 확정 1만 건, 누락과 중복 대사는 모두 0건으로 확인했습니다.' },
    ],
    result: '합성 UNKNOWN 결제 10,000건 → 최종 확정 10,000건',
    conditions: '로컬 Postgres 16·Fake provider 기반 합성 검증입니다. 실제 PG, 사용자 트래픽, 운영 SLA를 의미하지 않습니다.',
    source: 'https://github.com/dahynn/CapSure/blob/6721f4f/Backend/src/test/java/com/capsule/insurance/payment/api/PaymentPolicyIntegrationTest.java',
    sourceLabel: '결제 통합 테스트 · 6721f4f',
    supporting: [
      { title: '납입 실패 뒤에도 계약 상태를 섣불리 바꾸지 않았습니다.', problem: '납입 실패, 독촉, 유예 종료를 한 상태로 처리하면 청구 가능 여부가 잘못 판단될 수 있었습니다.', body: '확정 미수, 독촉 성공, 유예 종료를 각각 확인하고 청구는 사고일의 보장 상태를 기준으로 판단했습니다. 실효 뒤 입금도 자동 부활시키지 않고 검토 대상으로 남겼습니다.', proof: '합성 계약 45건에서 23번째 예외를 주입한 뒤 같은 실행을 재개해 누락과 중복 없이 마쳤습니다.' },
      { title: 'AI의 답변은 지급 판단이 아닌 검토 초안으로 남겼습니다.', problem: 'AI가 만든 문장이 근거 없이 보험금 지급 판단으로 이어지면 안 된다고 봤습니다.', body: '청구별 약관 ID, 버전, 증빙 유형만 전달하고 응답의 근거 ID를 다시 검사했습니다. 결과는 담당자가 확인하는 초안으로만 남겼습니다.', proof: '민감 형식 차단, 근거 혼입 검사, 담당자 검토 상태를 서비스 테스트로 확인했습니다.' },
    ],
  },
  {
    id: 'roundy', number: '02', name: 'Roundy', category: '얼굴 인증과 마스킹 기반 미팅',
    headline: '얼굴 인증으로 신뢰를 더한 온라인 로테이션 매칭 서비스.',
    summary: '실시간으로 상대를 만나고, 실루엣으로 먼저 대화합니다. 서로 선택하면 시간이 흐를수록 마스킹이 풀리며 얼굴을 확인합니다.',
    role: '팀 프로젝트. FE · BE로 매칭, 인증, 방 접근 권한을 보강했습니다.',
    mechanism: '늦은 요청이 와도 한 사람을 한 번만 매칭하게 만든 과정',
    steps: [
      { label: '문제 상황', state: '늦은 요청', title: '이미 매칭된 사용자가 다시 대기열에 들어가는 상황이 있었습니다.', body: '요청마다 큐 확인과 삭제, 방 저장을 따로 처리하면 늦은 poll이 사용자를 다시 등록할 수 있었습니다. 이전 방의 정리 작업이 새 방 매핑을 지우는 문제도 있었습니다.' },
      { label: '제가 판단한 기준', state: 'Lua 원자 처리', title: '같이 바뀌는 상태는 한 번에 처리하기로 했습니다.', body: '인증 소비·큐 등록·참가자 선택·방 매핑을 Redis Lua에서 원자적으로 처리했습니다. 여러 요청이 같은 중간 상태를 보고 서로 다른 결정을 내리지 않도록 묶었습니다.' },
      { label: '제가 구현한 방식', state: '현재 방 확인', title: '오래된 정리가 새 상태를 지우지 않게 했습니다.', body: 'cleanup-room.lua는 사용자의 현재 roomId가 정리 대상과 같은지 검사한 뒤 삭제합니다. 새로운 방에 들어간 사용자의 매핑은 그대로 보존합니다.' },
      { label: '확인한 결과', state: '매핑 보존', title: '늦은 요청을 고정해 다시 확인했습니다.', body: '지연 poll 재등록과 오래된 정리의 매핑 손실을 별도로 시험했습니다. 두 시나리오에서 재등록 없이 현재 방 매핑이 유지되는 것을 확인했습니다.' },
    ],
    result: '고정 경쟁 시나리오에서 재등록·매핑 손실 없이 확인',
    conditions: '로컬 Controller + 실제 Redis 실험입니다. HTTP·DB·실제 영상 통신은 제외했습니다.',
    source: 'https://github.com/dahynn/Roundy/blob/b960772/Backend/src/main/resources/lua/cleanup-room.lua',
    sourceLabel: '조건부 방 정리 코드 · b960772',
    supporting: [
      { title: '인증 결과는 본인만 한 번 쓰게 했습니다.', problem: '같은 인증 결과가 여러 요청에서 재사용되거나 다른 사람에게 쓰이면 안 됐습니다.', body: '사용자 ID에 귀속된 키로 인증 결과를 저장하고 VERIFIED만 조건부로 소비했습니다. PENDING을 지우지 않아 타인 사용과 재사용을 제한했습니다.', proof: '실제 Redis에서 동시 16회 소비 요청 중 1회만 성공하고 타인 소비는 거절되는 것을 확인했습니다.' },
      { title: '로그인 후에도 현재 방 권한을 다시 확인했습니다.', problem: '로그인 여부만으로 이전 방이나 다른 사용자의 방에 접근할 수 있으면 안 됐습니다.', body: 'JWT 확인 뒤에도 현재 roomId와 멤버 정보를 다시 검사해 조회, 입장, 영상 토큰 발급의 권한을 맞췄습니다.', proof: 'HTTP, WebSocket, OpenVidu mock 관련 29개 테스트로 권한 흐름을 확인했습니다.' },
    ],
  },
  {
    id: 'san', number: '03', name: 'SAN', category: '크롬 확장 프로그램 기반 지식 관리',
    headline: '흩어진 자료를, 다시 쓰는 지식으로.',
    summary: '크롬 확장 프로그램으로 저장한 자료를 검색, TIL, 지식 카드로 연결하는 서비스입니다. AI 정리 기능도 원문 근거를 남긴 상태에서 검토할 수 있도록 설계했습니다.',
    role: '팀 프로젝트. FE · BE로 비동기 감사 추적, 로그인 브리지, AI 요약 병렬화를 다뤘습니다.',
    mechanism: '자료가 많아져도 빠르고 빠짐없이 찾게 만든 과정',
    steps: [
      { label: '문제 상황', state: '전체 다운로드', title: '자료가 쌓일수록 첫 조회가 무거워지는 상황이 있었습니다.', body: '전체 카드 목록을 받은 뒤 브라우저에서 검색·필터하면 불필요한 데이터 전송이 늘어납니다. 검색·페이지·사용자 격리가 따로 움직이면 결과 누락이나 노출 오류도 생길 수 있었습니다.' },
      { label: '제가 판단한 기준', state: '검색 계약', title: '속도와 결과가 함께 맞아야 한다고 봤습니다.', body: '검색어·태그·카테고리·기간·페이지 조건을 서버 요청 계약으로 옮겼습니다. 전후 검색 결과가 같고 사용자별 데이터가 섞이지 않는 것을 완료 조건으로 잡았습니다.' },
      { label: '제가 구현한 방식', state: '필터·페이지', title: '필요한 범위만 서버에서 찾게 했습니다.', body: '프런트는 서버 파라미터로 검색합니다. 복수 태그 AND, 기간 경계, LIKE 특수문자와 페이지 정렬을 검증하고, 인자 없는 기존 호출은 전체 목록 계약을 유지했습니다.' },
      { label: '확인한 결과', state: '결과 대조', title: '1만 건에서 응답과 결과를 함께 비교했습니다.', body: '합성 데이터의 검색 첫 페이지 p95는 133.67ms에서 19.04ms로 측정됐습니다. 검색 결과 59건의 집합 일치와 사용자 격리·페이지 정렬도 같은 기록에서 확인했습니다.' },
    ],
    result: '검색 첫 페이지 p95 133.67 → 19.04ms',
    conditions: '1만 건 로컬 합성 데이터 · 워밍업 3회, 반복 20회. 데이터 규모별 측정이며 실제 사용자 응답 시간은 아닙니다.',
    source: '/evidence/san-search.json', sourceLabel: '검색 측정 발췌 · 1c8c252',
    supporting: [
      { title: 'AI가 읽은 원문을 나중에도 확인할 수 있게 남겼습니다.', problem: '카드 내용이 바뀐 뒤에는 AI가 어떤 원문을 바탕으로 정리했는지 혼동될 수 있었습니다.', body: '생성 시점의 입력을 스냅샷으로 고정하고 개인정보 패턴 마스킹, 입력 상한, 작업 소유자 검사를 적용했습니다.', proof: 'Mock 모델과 합성 fixture로 관련 AI 테스트 42개를 통과했습니다. 외부 네트워크 2개는 제외했습니다.' },
      { title: '재시도와 검토에도 순서를 만들었습니다.', problem: '실패 중인 작업이 여러 번 생성되거나 원시 오류가 그대로 보이면 학습 기록을 믿기 어려웠습니다.', body: 'FAILED인 TIL 생성만 새 작업으로 등록하고 활성 작업의 중복 요청은 거절했습니다. 본문을 수정하면 기존 검토 표시도 초기화했습니다.', proof: '작업 재시도, 원시 오류 비노출, 소유자 검토 저장을 단위 테스트로 확인했습니다.' },
    ],
  },
  {
    id: 'dasibom', number: '04', name: '다시봄', category: 'AI 기반 뇌졸중 위험 신호 확인 앱',
    headline: 'AI 분석 뒤, 결과와 가까운 병원 정보를 바로 확인합니다.',
    summary: '얼굴·음성 결과를 먼저 확인하고, 필요할 때 CG-FAST 기준 설문과 병원 탐색으로 이어지는 모바일 앱입니다.',
    role: '팀 프로젝트. FE · PM · UI/UX 디자인을 맡아 React Native 화면과 카메라·음성·지도·차트 흐름을 연결했습니다.',
    mechanism: '중간 결과에 따라 추가 설문으로 이어지는 화면 흐름',
    steps: [
      { label: '입력', state: '얼굴·음성', title: '얼굴과 음성을 확인합니다.', body: '카메라와 녹음 화면으로 두 입력을 안내합니다.' },
      { label: '중간 결과', state: '먼저 확인', title: '분석 뒤 중간 결과를 보여줍니다.', body: '얼굴·음성 확인 결과를 먼저 살펴봅니다.' },
      { label: '추가 확인', state: '필요할 때만', title: 'CG-FAST 기준 문항으로 이어집니다.', body: '추가 확인이 필요하면 문항에 답하고 설문 결과를 봅니다.' },
      { label: '다음 행동', state: '병원 탐색', title: '가까운 병원을 찾습니다.', body: '결과 뒤 지도와 병원 목록으로 이어집니다.' },
    ],
    result: '얼굴·음성 → 중간 결과 → 필요 시 설문 → 결과·병원 탐색',
    conditions: '앱 화면 예시입니다. 의료적 진단 성능을 검증한 자료는 아닙니다.',
    source: '#dasibom-case-01',
    sourceLabel: '다시봄 서비스 브리프',
    supporting: [
      { title: '결과 확인 뒤 병원 탐색으로 이어집니다.', problem: '자가 확인만으로 끝나면 다음 행동을 찾기 어렵습니다.', body: '결과 화면과 지도·병원 정보 화면을 하나의 앱 흐름으로 연결했습니다.', proof: '프로젝트 화면 목업으로 흐름을 보여줍니다.' },
    ],
  },
];
