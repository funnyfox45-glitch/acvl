export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Услуги', href: '#services' },
    { label: 'Кейсы', href: '#cases' },
    { label: 'О компании', href: '#why-trust' },
    { label: 'Контакты', href: '#contact' },
  ];

  return (
    <footer style={{ background: '#0f2a05', padding: '48px 0 24px' }}>
      <div className="container-main">
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/images/akcent_logo_PNG.png"
              alt="Акцент"
              style={{ height: 24, width: 'auto' }}
            />
          </div>

          {/* Center nav */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'Onest, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#d9d9d9',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#d9d9d9')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Phone */}
          <a
            href="tel:+74991134028"
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#f5f5f5',
              textDecoration: 'none',
            }}
          >
            +7 (499) 113-40-28
          </a>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(244, 248, 239, 0.2)',
            margin: '24px 0',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              color: '#8a8a8a',
              letterSpacing: '0.5px',
            }}
          >
            © 2025 ООО «Акцент». Все права защищены.
          </span>
          <a
            href="#"
            style={{
              fontFamily: 'Onest, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              color: '#8a8a8a',
              textDecoration: 'none',
              transition: 'color 0.2s',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
