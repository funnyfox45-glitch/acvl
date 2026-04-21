import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);
      if (currentY > 200) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Услуги', href: '#services' },
    { label: 'Кейсы', href: '#cases' },
    { label: 'О компании', href: '#why-trust' },
    { label: 'Контакты', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          transition: 'background 0.3s ease, transform 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled ? 'rgba(15, 42, 5, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
        >
          <img
            src="/images/akcent_logo_PNG.png"
            alt="Акцент"
            style={{ height: 28, width: 'auto' }}
          />
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: '#d9d9d9',
                fontSize: 16,
                fontWeight: 400,
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontFamily: 'Onest, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#d9d9d9')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{
              background: '#508c1f',
              color: '#0a1a05',
              padding: '10px 24px',
              borderRadius: 4,
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
              fontFamily: 'Onest, sans-serif',
              letterSpacing: '0.5px',
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
            Обсудить проект
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} color="#f4f8ef" /> : <Menu size={24} color="#f4f8ef" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: '#0a1a05',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={28} color="#f4f8ef" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: '#f5f5f5',
                fontSize: 32,
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: 'Onest, sans-serif',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary"
          >
            Обсудить проект
          </a>
        </div>
      )}
    </>
  );
}
