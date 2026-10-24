import React from 'react';
import { Gauge, Phone, MapPin, ShieldAlert, ArrowUp, MessageSquare, Clock } from 'lucide-react';
import { SPEEDMECA_INFO, SERVICES } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

export function Footer({ onOpenSos, onOpenCard, onOpenAdmin }) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#06070A',
      borderTop: '2px solid rgba(229, 37, 42, 0.4)',
      color: '#FFFFFF',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Carbon fiber subtle pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(229, 37, 42, 0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 5 }}>
        {/* Top Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(229, 37, 42, 0.6)'
              }}>
                <Gauge size={24} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <div style={{ fontFamily: 'var(--font-racing)', fontSize: '1.6rem', fontWeight: 900 }}>
                SPEED<span style={{ color: 'var(--primary-red)' }}>MECA</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Centre d'ingénierie et d'optimisation automobile de référence à Azilal. Reprogrammation ECU, banc d'essai, diagnostic multi-calculateurs et assistance dépannage d'urgence sur route 24/7.
            </p>

            <div style={{
              fontSize: '0.92rem',
              color: 'var(--primary-red)',
              fontFamily: 'var(--font-arabic)',
              fontWeight: 700,
              direction: 'rtl',
              marginBottom: '1.5rem'
            }}>
              برمجة العقول، صيانة السيارات الهجينة، وتعديل الديكور والعادم بأعلى مقاييس الاحترافية.
            </div>

            {/* Business card button & Espace Pro */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => { playClickSound(); onOpenCard(); }}
                className="btn-dark"
                style={{ fontSize: '0.82rem', padding: '0.6rem 1rem' }}
              >
                <span>Ouvrir la Carte de Visite Digitale</span>
              </button>

              <button
                onClick={() => { playClickSound(); onOpenAdmin(); }}
                style={{
                  background: 'rgba(229, 37, 42, 0.15)',
                  border: '1px solid var(--border-glow)',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '0.6rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-red)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-glow)'}
              >
                <ShieldAlert size={15} color="var(--primary-red)" />
                <span>Espace Devis Assurances & Sociétés</span>
              </button>
            </div>
          </div>

          {/* Col 2: Services 1 to 5 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
              borderLeft: '3px solid var(--primary-red)',
              paddingLeft: '0.6rem'
            }}>
              Prestations Moteur & Élec
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SERVICES.slice(0, 5).map(s => (
                <li key={s.id}>
                  <a
                    href="#services"
                    style={{
                      color: '#D1D5DB',
                      textDecoration: 'none',
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    <span style={{ color: 'var(--primary-red)', fontWeight: 700 }}>{s.number}.</span>
                    <span>{s.titleFr}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services 6 to 10 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
              borderLeft: '3px solid var(--primary-red)',
              paddingLeft: '0.6rem'
            }}>
              Esthétique & Personnalisation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SERVICES.slice(5, 10).map(s => (
                <li key={s.id}>
                  <a
                    href="#services"
                    style={{
                      color: '#D1D5DB',
                      textDecoration: 'none',
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    <span style={{ color: 'var(--primary-red)', fontWeight: 700 }}>{s.number}.</span>
                    <span>{s.titleFr}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Urgence SOS 24/7 */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
              borderLeft: '3px solid var(--primary-red)',
              paddingLeft: '0.6rem'
            }}>
              Assistance & Quartier Général
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#D1D5DB' }}>
                <MapPin size={16} color="var(--primary-red)" />
                <span>{SPEEDMECA_INFO.addressFr}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#D1D5DB' }}>
                <Clock size={16} color="var(--primary-red)" />
                <span>{SPEEDMECA_INFO.openingHoursFr}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--primary-red)" />
                <a
                  href={`tel:${SPEEDMECA_INFO.phone}`}
                  style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem', textDecoration: 'none' }}
                >
                  {SPEEDMECA_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* SOS Dispatch button */}
            <button
              onClick={() => { playClickSound(); onOpenSos(); }}
              className="btn-primary-red btn-sos-glow"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              <ShieldAlert size={16} />
              <span>SOS DÉPANNAGE ROUTIER (24/7)</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#6B7280'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>SPEEDMECA</strong>. Tous droits réservés. Quartier Administratif, Azilal (Maroc).
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Intervention ~15-30 min sur route</span>
            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Retour en haut"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
