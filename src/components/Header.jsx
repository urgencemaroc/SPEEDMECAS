import React, { useState } from 'react';
import { Phone, MapPin, Gauge, ShieldAlert, CreditCard, Menu, X, Languages } from 'lucide-react';
import { SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

export function Header({ lang, setLang, onOpenSos, onOpenCard, onOpenAdmin, onOpenDownload }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", labelFr: "10 Prestations", labelAr: "الخدمات العشر" },
    { href: "#simulateur", labelFr: "Simulateur Stage 1/2", labelAr: "محاكي القوة" },
    { href: "#valvetronic", labelFr: "Échappement Valvetronic", labelAr: "أنظمة فالفترونيك" },
    { href: "#application", labelFr: "App Mobile", labelAr: "تطبيق الهاتف" },
    { href: "#atelier", labelFr: "Atelier Azilal", labelAr: "مقر أزيلال" },
  ];

  const handleNavClick = (e, href) => {
    playClickSound();
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      background: 'rgba(11, 13, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: '49px', // right under emergency banner
      zIndex: 40,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <a 
          href="#"
          onClick={() => playClickSound()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(229, 37, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Gauge size={24} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.2rem',
              fontFamily: 'var(--font-racing)',
              fontSize: '1.45rem',
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: '#FFFFFF'
            }}>
              <span>SPEED</span>
              <span style={{ color: 'var(--primary-red)' }}>MECA</span>
            </div>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontWeight: 600
            }}>
              Performance & Diagnostics • Azilal
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                color: '#D1D5DB',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.92rem',
                transition: 'color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-red)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
            >
              <span>{lang === 'ar' ? item.labelAr : item.labelFr}</span>
              {lang === 'bilingual' && (
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{item.labelAr}</span>
              )}
            </a>
          ))}

          {/* Business card button */}
          <button
            onClick={() => { playClickSound(); onOpenCard(); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#E5E7EB',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-red)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
          >
            <CreditCard size={15} color="var(--primary-red)" />
            <span>Carte de Visite</span>
          </button>

          {/* Espace Devis Assurances & Sociétés */}
          <button
            onClick={() => { playClickSound(); onOpenAdmin(); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'linear-gradient(135deg, rgba(229, 37, 42, 0.2) 0%, rgba(138, 11, 16, 0.3) 100%)',
              border: '1px solid var(--border-glow)',
              color: '#FFFFFF',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 15px rgba(229, 37, 42, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF3B3F';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(229, 37, 42, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-glow)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(229, 37, 42, 0.2)';
            }}
          >
            <ShieldAlert size={15} color="#FF3B3F" />
            <span>Espace Devis Pro</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Switcher */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: '3px',
            gap: '2px'
          }}>
            {[
              { id: 'fr', label: 'FR' },
              { id: 'bilingual', label: 'FR/عربي' },
              { id: 'ar', label: 'عربي' }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => { playClickSound(); setLang(l.id); }}
                style={{
                  background: lang === l.id ? 'var(--primary-red)' : 'transparent',
                  color: lang === l.id ? '#FFFFFF' : '#9CA3AF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Direct Phone Call Button */}
          <a
            href={`tel:${SPEEDMECA_INFO.phone}`}
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(229, 37, 42, 0.15)',
              border: '1px solid var(--border-glow)',
              color: '#FFFFFF',
              padding: '0.5rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
            className="phone-quick-btn"
          >
            <Phone size={15} color="var(--primary-red)" />
            <span>{SPEEDMECA_INFO.phoneDisplay}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#0D0F14',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>{item.labelFr}</span>
              <span style={{ color: 'var(--primary-red)', fontFamily: 'var(--font-arabic)' }}>{item.labelAr}</span>
            </a>
          ))}

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCard(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 700
            }}
          >
            <CreditCard size={18} color="var(--primary-red)" />
            <span>Voir Carte de Visite Officielle</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'linear-gradient(135deg, rgba(229, 37, 42, 0.25) 0%, rgba(138, 11, 16, 0.4) 100%)',
              border: '1px solid #FF3B3F',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 700
            }}
          >
            <ShieldAlert size={18} color="#FF3B3F" />
            <span>Espace Devis Assurances & Sociétés</span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenSos(); }}
            className="btn-primary-red btn-sos-glow"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <ShieldAlert size={18} />
            <span>SOS DÉPANNAGE ROUTIER AZILAL 24/7</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .phone-quick-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
