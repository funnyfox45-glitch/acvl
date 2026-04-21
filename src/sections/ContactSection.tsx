import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    size: 'До 10',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (leftRef.current) {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
    if (rightRef.current) {
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#152e0a',
    border: '1px solid rgba(244, 248, 239, 0.2)',
    borderRadius: 4,
    color: '#f5f5f5',
    fontFamily: 'Onest, sans-serif',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="laser-section" style={{ padding: '80px 0' }}>
      <div className="laser-grid" />
      <div className="laser-beam" />
      <div className="laser-trail" />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48,
        }}
      >
        {/* Left column */}
        <div ref={leftRef}>
          <h2
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 500,
              color: '#f5f5f5',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Обсудить ваш проект
          </h2>
          <p
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 16,
              fontWeight: 400,
              color: '#d9d9d9',
              lineHeight: 1.5,
              marginTop: 16,
            }}
          >
            Расскажите о вашей инфраструктуре и задачах. Проведем бесплатный аудит и подготовим предложение.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Phone size={20} color="#508c1f" />
              <a
                href="tel:+74991134028"
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  textDecoration: 'none',
                }}
              >
                +7 (499) 113-40-28
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={20} color="#508c1f" />
              <a
                href="mailto:msk@acvl.ru"
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  textDecoration: 'none',
                }}
              >
                msk@acvl.ru
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <MapPin size={20} color="#508c1f" style={{ flexShrink: 0, marginTop: 2 }} />
              <span
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#d9d9d9',
                  lineHeight: 1.5,
                }}
              >
                Москва, б-р Генерала Карбышева, 8
              </span>
            </div>
          </div>
        </div>

        {/* Right column — Form */}
        <div
          ref={rightRef}
          style={{
            background: 'rgba(244, 248, 239, 0.1)',
            border: '1px solid rgba(244, 248, 239, 0.2)',
            borderRadius: 12,
            padding: 32,
          }}
        >
          {submitted ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 300,
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#508c1f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={24} color="#0a1a05" />
              </div>
              <p
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#f5f5f5',
                  textAlign: 'center',
                }}
              >
                Заявка отправлена!
              </p>
              <p
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 14,
                  color: '#d9d9d9',
                  textAlign: 'center',
                }}
              >
                Мы свяжемся с вами в течение 30 минут
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Компания"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={inputStyle}
                required
              />
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d9d9d9' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                <option value="До 10">До 10 рабочих мест</option>
                <option value="10-50">10-50 рабочих мест</option>
                <option value="50-200">50-200 рабочих мест</option>
                <option value="Более 200">Более 200 рабочих мест</option>
              </select>
              <textarea
                placeholder="Комментарий"
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: '#508c1f',
                  color: '#0a1a05',
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
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
                Получить предложение
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
