import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Базовый',
    price: 'от 25 000 ₽/мес',
    featured: false,
    features: [
      'До 10 рабочих мест',
      'Удаленная поддержка',
      'Мониторинг серверов',
      'Резервное копирование',
      'Ежемесячный отчет',
    ],
  },
  {
    name: 'Стандарт',
    price: 'от 55 000 ₽/мес',
    featured: true,
    features: [
      'До 30 рабочих мест',
      'Удаленная + выездная поддержка',
      'Мониторинг 24/7',
      'Администрирование сетей',
      'Управление лицензиями',
      'SLA — 4 часа',
    ],
  },
  {
    name: 'Корпоративный',
    price: 'от 120 000 ₽/мес',
    featured: false,
    features: [
      'Без ограничения рабочих мест',
      'Выделенная команда',
      'IT-директор на аутсорсе',
      'Полная ответственность',
      'SLA — 1 час',
      'Индивидуальные условия',
    ],
  },
];

export default function PricingSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const elements = gridRef.current.children;

    const tween = gsap.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: gridRef.current,
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
          Тарифы на IT-аутсорсинг
        </h2>
        <p
          style={{
            fontFamily: 'Onest, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            color: '#d9d9d9',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 1.5,
            marginTop: 16,
          }}
        >
          Фиксированная стоимость без скрытых платежей. Первый месяц со скидкой 30%.
        </p>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            maxWidth: 1000,
            width: '100%',
            marginTop: 48,
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: '#152e0a',
                borderRadius: 12,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.featured ? '2px solid #508c1f' : '1px solid transparent',
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#508c1f',
                    color: '#0a1a05',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '4px 16px',
                    borderRadius: 4,
                    fontFamily: 'Onest, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Популярный
                </div>
              )}

              <h5
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 20,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  margin: 0,
                }}
              >
                {plan.name}
              </h5>

              <div
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 500,
                  color: '#508c1f',
                  marginTop: 8,
                }}
              >
                {plan.price}
              </div>

              <div
                style={{
                  height: 1,
                  background: 'rgba(244, 248, 239, 0.2)',
                  margin: '20px 0',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Check size={16} color="#508c1f" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span
                      style={{
                        fontFamily: 'Onest, sans-serif',
                        fontSize: 14,
                        fontWeight: 400,
                        color: '#d9d9d9',
                        lineHeight: 1.4,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px 24px',
                  background: '#508c1f',
                  color: '#0a1a05',
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 4,
                  textDecoration: 'none',
                  marginTop: 24,
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3a6b1f';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#508c1f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Выбрать тариф
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
