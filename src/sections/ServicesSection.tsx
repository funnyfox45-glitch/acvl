import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Абонентское обслуживание',
    desc: 'Полное сопровождение IT-инфраструктуры: компьютеры, серверы, сети, программное обеспечение.',
    features: [
      'Удаленная и выездная поддержка',
      'Мониторинг 24/7',
      'Обновление ПО и лицензий',
      'Резервное копирование',
    ],
  },
  {
    num: '02',
    title: 'IT-аутстаффинг',
    desc: 'Выделенный системный администратор или команда на вашей территории. Полный контроль, как над штатным сотрудником.',
    features: [
      'Подбор под ваш стек технологий',
      'Замена при отпуске и больничном',
      'Отчетность по задачам',
      'Масштабирование команды',
    ],
  },
  {
    num: '03',
    title: 'IT-аудит и консалтинг',
    desc: 'Независимая экспертиза инфраструктуры, оптимизация затрат, подготовка к тендерам и проверкам.',
    features: [
      'Аудит безопасности',
      'Оптимизация лицензий',
      'Разработка IT-стратегии',
      'Подготовка документации',
    ],
  },
];

export default function ServicesSection() {
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
    <section id="services" style={{ background: '#0f2a05', padding: '80px 0' }}>
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
          Услуги IT-аутсорсинга
        </h2>
        <p
          style={{
            fontFamily: 'Onest, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            color: '#d9d9d9',
            textAlign: 'center',
            maxWidth: 640,
            lineHeight: 1.5,
            marginTop: 16,
          }}
        >
          Комплексное обслуживание IT-инфраструктуры под ключ. Масштабируем команду под задачи вашего бизнеса.
        </p>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16,
            width: '100%',
            marginTop: 48,
          }}
        >
          {services.map((service) => (
            <div
              key={service.num}
              style={{
                background: '#152e0a',
                borderRadius: 8,
                padding: 32,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#508c1f',
                  letterSpacing: '0.5px',
                }}
              >
                {service.num}
              </span>
              <h5
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 20,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  lineHeight: 1.3,
                  marginTop: 12,
                  marginBottom: 0,
                }}
              >
                {service.title}
              </h5>
              <p
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 15,
                  fontWeight: 400,
                  color: '#d9d9d9',
                  lineHeight: 1.5,
                  marginTop: 12,
                  marginBottom: 0,
                }}
              >
                {service.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                {service.features.map((f) => (
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
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#508c1f',
                  textDecoration: 'none',
                  marginTop: 24,
                  transition: 'text-decoration 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Подробнее →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
