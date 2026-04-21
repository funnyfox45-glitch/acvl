import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '1',
    title: 'Аудит инфраструктуры',
    desc: 'Бесплатный выезд, оценка состояния, выявление рисков',
  },
  {
    num: '2',
    title: 'Коммерческое предложение',
    desc: 'Фиксированная стоимость, сроки, SLA',
  },
  {
    num: '3',
    title: 'Запуск обслуживания',
    desc: 'Подписание договора, назначение команды, настройка мониторинга',
  },
  {
    num: '4',
    title: 'Ежемесячная поддержка',
    desc: 'Профилактика, отчетность, оптимизация',
  },
];

export default function HowWeWorkSection() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepsRef.current) return;
    const elements = stepsRef.current.children;

    const tween = gsap.from(elements, {
      opacity: 0,
      scale: 0.8,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: stepsRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section style={{ background: '#0a1a05', padding: '80px 0' }}>
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          style={{
            fontFamily: 'Onest, sans-serif',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 500,
            color: '#f5f5f5',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '-1px',
            margin: 0,
          }}
        >
          Как мы работаем
        </h2>
        <p
          style={{
            fontFamily: 'Onest, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            color: '#d9d9d9',
            textAlign: 'center',
            maxWidth: 500,
            lineHeight: 1.5,
            marginTop: 16,
          }}
        >
          Четыре этапа от первой встречи до стабильной эксплуатации.
        </p>

        <div
          ref={stepsRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0,
            maxWidth: 1000,
            width: '100%',
            marginTop: 48,
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 200px',
                maxWidth: 220,
                position: 'relative',
                padding: '0 8px',
              }}
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: -20,
                    width: 40,
                    height: 1,
                    borderTop: '1px dashed rgba(80, 140, 31, 0.3)',
                    display: 'block',
                  }}
                  className="hidden md:block"
                />
              )}

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '2px solid #508c1f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Onest, sans-serif',
                    fontSize: 18,
                    fontWeight: 500,
                    color: '#508c1f',
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h6
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  lineHeight: 1.4,
                  marginTop: 16,
                  textAlign: 'center',
                  marginBottom: 0,
                }}
              >
                {step.title}
              </h6>
              <p
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#d9d9d9',
                  lineHeight: 1.4,
                  marginTop: 8,
                  textAlign: 'center',
                  maxWidth: 200,
                  marginBottom: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
