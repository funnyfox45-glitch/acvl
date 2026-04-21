import { useEffect, useRef } from 'react';
import { ShieldCheck, Users, Clock, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: ShieldCheck,
    title: 'SLA с финансовой ответственностью',
    text: 'Прописываем время реакции и штрафы за сбои в договоре. Несем реальную ответственность за результат.',
  },
  {
    icon: Users,
    title: 'Команда сертифицированных инженеров',
    text: 'В штате 12+ специалистов с сертификатами Microsoft, Cisco, Kaspersky, 1С. Регулярное повышение квалификации.',
  },
  {
    icon: Clock,
    title: 'Работаем 24/7/365',
    text: 'Поддержка в рабочие и выходные дни, праздники. Мониторинг инфраструктуры круглосуточно. Никаких больничных и отпусков.',
  },
  {
    icon: FileText,
    title: 'Прозрачная отчетность',
    text: 'Ежемесячный отчет по всем работам, затраченным часам и рекомендациям. Полный контроль над IT-затратами.',
  },
];

export default function WhyTrustSection() {
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
        start: 'top 80%',
        once: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section id="why-trust" style={{ background: '#0a1a05', padding: '80px 0' }}>
      <div className="container-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          style={{
            fontFamily: 'Onest, sans-serif',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 500,
            color: '#f5f5f5',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.2,
            letterSpacing: '-1px',
            margin: 0,
          }}
        >
          Почему бизнес доверяет нам IT-инфраструктуру
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
          Работаем по международным стандартам ITIL и COBIT. Гарантируем стабильность, предсказуемость и прозрачность расходов.
        </p>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            maxWidth: 900,
            width: '100%',
            marginTop: 48,
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                style={{
                  background: 'rgba(244, 248, 239, 0.1)',
                  border: '1px solid rgba(244, 248, 239, 0.2)',
                  borderRadius: 12,
                  padding: 32,
                }}
              >
                <Icon size={32} color="#508c1f" />
                <h5
                  style={{
                    fontFamily: 'Onest, sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#f5f5f5',
                    lineHeight: 1.3,
                    marginTop: 16,
                    marginBottom: 0,
                  }}
                >
                  {card.title}
                </h5>
                <p
                  style={{
                    fontFamily: 'Onest, sans-serif',
                    fontSize: 15,
                    fontWeight: 400,
                    color: '#d9d9d9',
                    lineHeight: 1.5,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
