import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

export function WorkshopLocation() {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Check if workshop is open (Mon - Sat 08:30 - 20:00)
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeVal = hour + minute / 60;

    // Sunday closed for workshop, but SOS is 24/7
    if (day === 0) {
      setIsOpenNow(false);
    } else {
      setIsOpenNow(timeVal >= 8.5 && timeVal <= 20);
    }
  }, []);

  const handleOpenGoogleMaps = () => {
    playClickSound();
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Quartier Administratif Azilal Maroc")}`;
    window.open(url, '_blank');
  };

  return (
    <section id="atelier" className="section-container">
      <div className="section-header">
        <div className="racing-badge">
          <span>ATELIER DE PRÉCISION & QG AZILAL</span>
        </div>
        <h2 className="section-title">
          LOCALISATION DE L'ATELIER <span>SPEEDMECA</span>
        </h2>
        <p className="section-desc">
          Idéalement situé au cœur d'Azilal pour accueillir vos véhicules en atelier ou dépêcher nos équipes mobiles d'intervention routière en montagne.
        </p>
        <div style={{
          marginTop: '0.6rem',
          fontSize: '1.15rem',
          color: 'var(--primary-red)',
          fontFamily: 'var(--font-arabic)',
          direction: 'rtl'
        }}>
          المقر الرسمي بالحي الإداري أزيلال : ورشة مجهزة بأحدث المعدات وفريق إغاثة متنقل.
        </div>
      </div>

      <div className="glass-panel-glow" style={{
        background: 'linear-gradient(135deg, rgba(17, 19, 27, 0.95) 0%, rgba(9, 10, 14, 0.98) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(229, 37, 42, 0.35)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Left Info Panel */}
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Live Open / Closed Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: isOpenNow ? 'rgba(0, 255, 102, 0.12)' : 'rgba(255, 107, 0, 0.15)',
              border: isOpenNow ? '1px solid rgba(0, 255, 102, 0.4)' : '1px solid rgba(255, 107, 0, 0.4)',
              color: isOpenNow ? '#00FF66' : '#FF9900',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 800,
              marginBottom: '1.5rem'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isOpenNow ? '#00FF66' : '#FF9900',
                boxShadow: isOpenNow ? '0 0 10px #00FF66' : '0 0 10px #FF9900'
              }} />
              <span>{isOpenNow ? "Atelier Ouvert Actuellement (08:30 - 20:00)" : "Atelier Fermé (Réouverture 08:30)"}</span>
              <span style={{ color: '#E5E7EB', opacity: 0.6 }}>|</span>
              <span style={{ color: '#FF4D52' }}>SOS 24/7 Actif</span>
            </div>

            {/* Official Address */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--primary-red)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.35rem'
              }}>
                ADRESSE OFFICIELLE (CARTE DE VISITE)
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '0.3rem'
              }}>
                {SPEEDMECA_INFO.addressFr}
              </h3>
              <div style={{
                fontSize: '1.3rem',
                color: '#FF6B6F',
                fontFamily: 'var(--font-arabic)',
                fontWeight: 800,
                direction: 'rtl'
              }}>
                {SPEEDMECA_INFO.addressAr}
              </div>
            </div>

            {/* Details list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={18} color="var(--primary-red)" />
                <span style={{ fontSize: '0.9rem', color: '#D1D5DB' }}>
                  {SPEEDMECA_INFO.openingHoursFr}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="var(--primary-red)" />
                <a 
                  href={`tel:${SPEEDMECA_INFO.phone}`} 
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', textDecoration: 'none' }}
                >
                  {SPEEDMECA_INFO.phoneDisplay}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <ShieldCheck size={18} color="var(--primary-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  <strong>Zones d'intervention express :</strong> {SPEEDMECA_INFO.serviceZones.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          {/* Action Route Buttons */}
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenGoogleMaps}
              className="btn-primary-red"
              style={{ flex: 1, minWidth: '200px' }}
            >
              <Navigation size={18} />
              <span>Itinéraire GPS Google Maps</span>
              <ExternalLink size={15} />
            </button>

            <a
              href={`https://wa.me/${SPEEDMECA_INFO.phoneInternational}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.4)',
                color: '#25D366',
                padding: '0.85rem 1.4rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              <MessageSquare size={18} />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Right Interactive Visual Map Mockup */}
        <div style={{
          position: 'relative',
          minHeight: '380px',
          background: '#0B0D12',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Stylized Dark Grid Map Representation of Azilal Region */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(229, 37, 42, 0.15) 0%, transparent 65%),
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px'
          }} />

          {/* Radar Circles */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '1px solid rgba(229, 37, 42, 0.25)',
            animation: 'radarSweep 8s linear infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px dashed rgba(229, 37, 42, 0.35)'
          }} />

          {/* Central Workshop Pin */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
              border: '3px solid #FFFFFF',
              boxShadow: '0 0 30px rgba(229, 37, 42, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              animation: 'beaconPulse 2s infinite'
            }}>
              <MapPin size={34} color="#FFFFFF" />
            </div>

            <div style={{
              background: 'rgba(8, 9, 12, 0.95)',
              border: '1px solid var(--primary-red)',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.8)'
            }}>
              <div style={{
                fontFamily: 'var(--font-racing)',
                fontSize: '1rem',
                fontWeight: 900,
                color: '#FFFFFF'
              }}>
                SPEEDMECA AZILAL
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                Quartier Administratif • الحي الإداري
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--primary-red)', fontWeight: 700, marginTop: '2px' }}>
                GPS: 31.9619° N, 6.5658° W
              </div>
            </div>
          </div>

          {/* Surrounding zone markers */}
          <div style={{ position: 'absolute', top: '15%', left: '15%', fontSize: '0.75rem', color: '#6B7280' }}>
            ● Ouzoud (~25 min)
          </div>
          <div style={{ position: 'absolute', bottom: '15%', right: '15%', fontSize: '0.75rem', color: '#6B7280' }}>
            ● Demnate (~35 min)
          </div>
          <div style={{ position: 'absolute', top: '20%', right: '20%', fontSize: '0.75rem', color: '#6B7280' }}>
            ● Bin El Ouidane (~20 min)
          </div>
        </div>
      </div>
    </section>
  );
}
