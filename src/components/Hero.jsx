import React from 'react';
import { ShieldAlert, ChevronRight, Zap, PhoneCall, Gauge, CheckCircle2, ArrowDownCircle } from 'lucide-react';
import { SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound, playSosPulse } from '../utils/soundEffects';

export function Hero({ lang, onOpenSos, onOpenCard }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(229, 37, 42, 0.25)'
    }}>
      {/* Background Image with Dark Vignette & Red Neon Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(to right, rgba(8, 9, 12, 0.95) 15%, rgba(8, 9, 12, 0.75) 50%, rgba(8, 9, 12, 0.92) 100%), linear-gradient(to bottom, rgba(8, 9, 12, 0.6) 0%, rgba(8, 9, 12, 0.98) 100%), url('/images/speedmeca_hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        filter: 'contrast(1.08) brightness(0.92)',
        zIndex: 1
      }} />

      {/* Grid line overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* Main Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Top Floating Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(229, 37, 42, 0.12)',
          border: '1px solid rgba(229, 37, 42, 0.45)',
          padding: '0.45rem 1.1rem',
          borderRadius: '9999px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 25px rgba(229, 37, 42, 0.3)',
          marginBottom: '1.75rem'
        }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00FF66',
            boxShadow: '0 0 10px #00FF66'
          }} />
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#FFFFFF',
            textTransform: 'uppercase'
          }}>
            Atelier Officiel & Assistance Route Azilal • 0600825216
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          maxWidth: '1050px',
          marginBottom: '1.25rem',
          textShadow: '0 4px 30px rgba(0,0,0,0.8)'
        }}>
          PERFORMANCE AUTO, REPROG ECU & <span style={{
            background: 'linear-gradient(90deg, #FF3B3F 0%, #E5252A 50%, #FF6B00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            display: 'inline-block'
          }}>SOS DÉPANNAGE 24/7</span>
        </h1>

        {/* Bilingual Subtitle */}
        <div style={{
          maxWidth: '820px',
          marginBottom: '2.5rem'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#D1D5DB',
            lineHeight: 1.6,
            fontWeight: 400,
            marginBottom: '0.5rem'
          }}>
            Du <strong>diagnostic électronique multi-calculateurs</strong> à l'<strong>optimisation Stage 1 & 2 (+35 HP)</strong>,
            en passant par le <strong>covering</strong> et les <strong>clapets Valvetronic</strong>.
          </p>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            color: '#FF6B6F',
            fontFamily: 'var(--font-arabic)',
            fontWeight: 700,
            lineHeight: 1.5,
            direction: 'rtl'
          }}>
            المركز المتكامل بأزيلال لتعديل السيارات، برمجة العقول الإلكترونية، وخدمة الإغاثة السريعة على مدار 24 ساعة.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.2rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem'
        }}>
          {/* Primary SOS Button */}
          <button
            onClick={() => { playSosPulse(); onOpenSos(); }}
            className="btn-primary-red btn-sos-glow"
            style={{
              fontSize: '1.05rem',
              padding: '1.05rem 2rem',
              borderRadius: '12px'
            }}
          >
            <ShieldAlert size={22} />
            <span>URGENCE SOS DÉPANNAGE 24/7</span>
          </button>

          {/* Catalog Button */}
          <a
            href="#services"
            onClick={() => playClickSound()}
            className="btn-outline-red"
            style={{
              fontSize: '1.05rem',
              padding: '1.05rem 1.8rem',
              borderRadius: '12px'
            }}
          >
            <Gauge size={20} color="var(--primary-red)" />
            <span>Catalogue des 10 Services</span>
            <ChevronRight size={18} />
          </a>

          {/* Quick Business Card */}
          <button
            onClick={() => { playClickSound(); onOpenCard(); }}
            className="btn-dark"
            style={{
              fontSize: '0.95rem',
              padding: '0.95rem 1.4rem',
              borderRadius: '12px'
            }}
          >
            <span>Carte SPEEDMECA</span>
          </button>
        </div>

        {/* 4 Key Pillars Highlights Bar */}
        <div style={{
          width: '100%',
          maxWidth: '1180px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          textAlign: 'left'
        }}>
          {[
            {
              title: "10 Prestations Certifiées",
              ar: "10 خدمات متكاملة",
              desc: "De la mécanique lourde au covering thermoformé.",
              color: "#E5252A"
            },
            {
              title: "Intervention SOS ~15-30 min",
              ar: "تدخل سريع 15-30 دقيقة",
              desc: "Dépannage express à Azilal & routes de montagne.",
              color: "#FF6B00"
            },
            {
              title: "Stage 1 & 2 Sur-Mesure",
              ar: "زيادة العزم والقوة",
              desc: "+35 à +65 HP / +70 à +130 Nm garantis.",
              color: "#00E5FF"
            },
            {
              title: "Diagnostic Multi-Marques",
              ar: "سكانير لجميع الماركات",
              desc: "Lecture DTC, FAP, EGR & solutions OBD.",
              color: "#00FF66"
            }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.25rem 1.35rem',
                borderLeft: `4px solid ${stat.color}`,
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '0.2rem'
              }}>
                {stat.title}
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: stat.color,
                fontFamily: 'var(--font-arabic)',
                marginBottom: '0.35rem',
                direction: 'rtl',
                textAlign: 'right'
              }}>
                {stat.ar}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4
              }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
