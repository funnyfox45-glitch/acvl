import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    client: 'Торговая сеть',
    industry: 'Ритейл',
    metric1: '47 филиалов',
    metric2: '99.8% uptime',
    desc: 'Внедрили единую систему мониторинга для 47 магазинов, сократили время простоя на 73%. Автоматизировали развертывание обновлений ПО.',
    bg: '#1a3d0f',
  },
  {
    client: 'Производственный холдинг',
    industry: 'Машиностроение',
    metric1: '120+ рабочих мест',
    metric2: '-40% затрат',
    desc: 'Провели аудит, оптимизировали лицензии Microsoft, внедрили систему резервного копирования. Сократили IT-затраты на 40% за 6 месяцев.',
    bg: '#1a3d0f',
  },
];

export default function CasesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const elements = gridRef.current.children;

    const tween = gsap.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section id="cases" style={{ background: '#0f2a05', padding: '80px 0' }}>
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
          Кейсы клиентов
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
          Реальные проекты, показатели и результаты.
        </p>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
            maxWidth: 1000,
            width: '100%',
            marginTop: 48,
          }}
        >
          {cases.map((c) => (
            <div
              key={c.client}
              style={{
                background: '#152e0a',
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image area */}
              <div
                style={{
                  aspectRatio: '16/9',
                  background: c.bg,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 24,
                }}
              >
                <div>
                  <h5
                    style={{
                      fontFamily: 'Onest, sans-serif',
                      fontSize: 22,
                      fontWeight: 500,
                      color: '#f5f5f5',
                      margin: 0,
                    }}
                  >
                    {c.client}
                  </h5>
                  <span
                    style={{
                      fontFamily: 'Onest, sans-serif',
                      fontSize: 13,
                      fontWeight: 400,
                      color: '#508c1f',
                      marginTop: 4,
                      display: 'inline-block',
                    }}
                  >
                    {c.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Onest, sans-serif',
                        fontSize: 'clamp(20px, 3vw, 28px)',
                        fontWeight: 500,
                        color: '#508c1f',
                      }}
                    >
                      {c.metric1}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Onest, sans-serif',
                        fontSize: 'clamp(20px, 3vw, 28px)',
                        fontWeight: 500,
                        color: '#508c1f',
                      }}
                    >
                      {c.metric2}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: 'Onest, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#d9d9d9',
                    lineHeight: 1.5,
                    marginTop: 16,
                    marginBottom: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
