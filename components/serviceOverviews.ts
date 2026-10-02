export type ServiceOverview = {
  audience: string;
  problem: string;
  title: string;
  platform: string;
  journey: { action: string; result: string }[];
  bridge: string;
};

export const serviceOverviews: Record<string, ServiceOverview> = {
  capsure: {
    title: '필요한 보장을 골라, 월 단위로 구독합니다.',
    platform: '반응형 웹과 모바일 웹',
    audience: '필요한 보장을 직접 구성하고, 가입 이후 상태까지 확인하고 싶은 사용자',
    problem: '한 번의 가입으로 끝나지 않는 구독형 보험에서는 납입, 청구, 계약 유지 상태가 끊기지 않아야 합니다.',
    journey: [
      { action: '상품 선택', result: '보장 항목과 보험료를 살펴보고 캡슐에 담습니다.' },
      { action: '가입·납입', result: '가입 조건과 결제 정보를 확인하고 계약을 진행합니다.' },
      { action: '계약 확인·청구', result: '가입 내역과 계약 상태를 확인하고 보험금 청구로 이어집니다.' },
    ],
    bridge: '이 흐름에서 결제 결과와 계약 상태가 어긋나지 않도록 설계한 과정을 소개합니다.',
  },
  roundy: {
    title: '실루엣으로 먼저 대화하고, 서로 선택하면 얼굴을 확인합니다.',
    platform: '얼굴 인증 기반 영상 미팅 웹',
    audience: '성향이 맞는 사람과 대화한 뒤 서로를 알아가고 싶은 사용자',
    problem: '얼굴을 먼저 공개하지 않아도 믿을 수 있는 상대와 편하게 대화를 시작할 수 있는 온라인 로테이션 미팅을 만들고 싶었습니다.',
    journey: [
      { action: '성향 퀴즈', result: '짧은 퀴즈로 관심사와 대화 성향을 확인합니다.' },
      { action: '얼굴 인증과 매칭', result: '인증을 마친 사용자 중 성향이 맞는 상대와 연결합니다.' },
      { action: '실루엣 대화', result: '실루엣으로 먼저 대화하며 서로를 알아갑니다.' },
      { action: '상호 선택', result: '두 사람이 모두 선택하면 시간이 흐를수록 마스킹이 풀립니다.' },
    ],
    bridge: '성향 매칭과 상호 선택이 동시에 진행돼도 방 배정이 엇갈리지 않게 만든 기술 사례입니다.',
  },
  san: {
    title: '웹에서 발견한 자료를 저장하고 다시 꺼내봅니다.',
    platform: '크롬 확장 프로그램 + 웹 대시보드',
    audience: '학습 중 찾은 자료를 모으고 다시 활용하려는 개발자와 학습자',
    problem: '여러 탭과 북마크에 흩어진 자료는 필요할 때 다시 찾거나 학습 기록으로 정리하기 어렵습니다.',
    journey: [
      { action: '자료 저장', result: '크롬 확장 프로그램에서 웹 자료를 출처와 함께 저장합니다.' },
      { action: '검색·정리', result: '대시보드에서 지식 카드를 검색하고 분류합니다.' },
      { action: 'TIL 검토', result: 'AI가 정리한 학습 기록을 원문 근거와 함께 확인합니다.' },
    ],
    bridge: '저장한 자료가 많아져도 필요한 결과를 빠짐없이 찾도록 검색 방식을 개선했습니다.',
  },
  dasibom: {
    title: 'AI 분석 결과를 확인하고, 가까운 병원을 찾습니다.',
    platform: 'React Native + AI 분석 API 모바일 앱',
    audience: '뇌졸중 의심 신호를 확인하고, 다음 행동을 안내받고 싶은 사용자',
    problem: '여러 확인 단계를 한 화면 흐름으로 묶고, 결과를 본 뒤 가까운 병원을 찾을 수 있어야 합니다.',
    journey: [
      { action: '얼굴·음성 확인', result: '카메라와 녹음으로 입력을 받아 중간 결과를 먼저 보여줍니다.' },
      { action: '필요 시 추가 설문', result: '추가 확인이 필요할 때 CG-FAST 기준 문항에 답합니다.' },
      { action: '결과·병원 탐색', result: '추가 설문을 했다면 결과를 확인하고, 가까운 병원 정보를 찾습니다.' },
    ],
    bridge: '앱 화면에서 자가 확인, 결과 안내, 병원 탐색이 어떻게 이어지는지 소개합니다.',
  },
};
