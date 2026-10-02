import { Handshake, ShieldCheck, Workflow } from 'lucide-react';

export function PersonalStrengths() {
  return <section className="personal-strengths" aria-label="DB Inc.에서 발휘할 강점">
    <p className="strengths-kicker">DB Inc.에서 발휘할 강점</p>
    <ol>
      <li><div className="strength-marker"><Handshake aria-hidden="true" /></div><div><h3>고객의 결과까지 확인</h3><p>화면의 요청이 처리 결과로 이어졌는지, 고객의 입장에서 끝까지 확인합니다.</p></div></li>
      <li><div className="strength-marker"><ShieldCheck aria-hidden="true" /></div><div><h3>정확한 상태를 지키는 운영</h3><p>결제와 계약의 상태가 어긋나는 예외를 재현하고 복구 흐름을 검증했습니다.</p></div></li>
      <li><div className="strength-marker"><Workflow aria-hidden="true" /></div><div><h3>함께 개선하는 개발</h3><p>요구사항과 변경 이력을 공유하고, 다음 담당자가 이해할 수 있게 남깁니다.</p></div></li>
    </ol>
  </section>;
}
