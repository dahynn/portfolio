'use client';

/* oxlint-disable next/no-img-element -- 정적 SVG를 확대 화면에서도 원본 선명도로 표시합니다. */

import { Expand, X } from 'lucide-react';
import { useRef } from 'react';

export function DiagramLightbox({ src, alt, title }: { src: string; alt: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => dialogRef.current?.close();

  return <>
    <button className="diagram-zoom-trigger" type="button" ref={triggerRef} onClick={() => dialogRef.current?.showModal()} aria-label={`${title} 크게 보기`}>
      <img src={src} alt={alt} loading="lazy" decoding="async"/>
      <span className="diagram-zoom-hint" aria-hidden="true"><Expand size={14}/>크게 보기</span>
    </button>
    <dialog className="diagram-zoom-dialog" ref={dialogRef} aria-label={title} onClose={() => triggerRef.current?.focus()}>
      <button className="diagram-zoom-dismiss" type="button" onClick={close} aria-label="확대 이미지 바깥 영역 닫기"/>
      <div className="diagram-zoom-panel">
        <div className="diagram-zoom-toolbar"><strong>{title}</strong><button type="button" onClick={close} aria-label="확대 이미지 닫기"><X size={20} aria-hidden="true"/></button></div>
        <div className="diagram-zoom-scroll"><img src={src} alt={alt} decoding="async"/></div>
      </div>
    </dialog>
  </>;
}
