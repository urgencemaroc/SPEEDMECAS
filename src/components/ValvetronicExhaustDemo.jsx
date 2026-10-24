import React, { useState } from 'react';
import { Volume2, VolumeX, Flame, Zap, Radio, Check, ArrowRight } from 'lucide-react';
import { playValvetronicSound, playClickSound } from '../utils/soundEffects';
import { SPEEDMECA_INFO } from '../data/servicesData';

export function ValvetronicExhaustDemo({ onBookService }) {
  const [mode, setMode] = useState('open'); // 'open' (Sport Racing) | 'closed' (Silencieux)
  const [isPlaying, setIsPlaying] = useState(false);

  const handleModeSwitch = (newMode) => {
    playClickSound();
    setMode(newMode);
    setIsPlaying(true);
    playValvetronicSound(newMode);
    setTimeout(() => setIsPlaying(false), 2400);
  };

  const handleSoundTest = () => {
    setIsPlaying(true);
    playValvetronicSound(mode);
    setTimeout(() => setIsPlaying(false), 2400);
  };

  const handleInquiry = () => {
    const text = encodeURIComponent(
      `Bonjour SPEEDMECA Azilal,\nJe souhaite installer un système d'échappement Valvetronic avec clapets télécommandés.\nMon véhicule : `
    );
    window.open(`https://wa.me/${SPEEDMECA_INFO.phoneInternational}?text=${text}`, '_blank');
  };

  return (
    <section id="valvetronic" className="section-container">
      <div className="section-header">
        <div className="racing-badge">
          <span>SYSTÈME ÉLECTRONIQUE À DOUBLE SONORITÉ</span>
        </div>
        <h2 className="section-title">
          ÉCHAPPEMENT & CLAPETS <span>VALVETRONIC</span>
        </h2>
        <p className="section-desc">
          Contrôlez la mélodie de votre moteur en un clic : passez instantanément d'une sonorité discrète pour la ville à un rugissement rauque et agressif avec retours d'échappement (Pops & Bangs).
        </p>
        <div style={{
          marginTop: '0.6rem',
          fontSize: '1.15rem',
          color: 'var(--primary-red)',
          fontFamily: 'var(--font-arabic)',
          direction: 'rtl'
        }}>
          صمامات العادم فالفترونيك بتحكم عن بعد : تبديل فوري بين الوضع الهادئ والوضع الرياضي مع طلقات صوتية.
        </div>
      </div>

      <div className="glass-panel-glow" style={{
        background: 'linear-gradient(135deg, rgba(18, 19, 27, 0.95) 0%, rgba(9, 10, 14, 0.98) 100%)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(229, 37, 42, 0.35)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Left Interactive Remote Control Mockup */}
        <div style={{
          background: 'linear-gradient(180deg, #151822 0%, #0D0E13 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Top LED Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Radio size={16} color="var(--primary-red)" />
              <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Télécommande Wireless RF 433MHz
              </span>
            </div>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: mode === 'open' ? '#FF1E27' : '#00FF66',
              boxShadow: mode === 'open' ? '0 0 12px #FF1E27' : '0 0 12px #00FF66',
              animation: isPlaying ? 'beaconPulse 1s infinite' : 'none'
            }} />
          </div>

          <div style={{
            fontFamily: 'var(--font-racing)',
            fontSize: '1.25rem',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            letterSpacing: '0.04em'
          }}>
            PILOTAGE DES CLAPETS
          </div>

          {/* 2 Main Push Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            {/* Mode Sport Open */}
            <button
              onClick={() => handleModeSwitch('open')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: mode === 'open' 
                  ? 'linear-gradient(90deg, #B80F14 0%, #E5252A 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: mode === 'open' ? '1px solid #FF4D52' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem 1.4rem',
                borderRadius: '14px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: mode === 'open' ? '0 0 25px rgba(229, 37, 42, 0.5)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                <Flame size={24} color={mode === 'open' ? '#FFE600' : '#FF4D52'} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>MODE SPORT RACING (CLAPETS OUVERTS)</div>
                  <div style={{ fontSize: '0.75rem', color: mode === 'open' ? '#FFE8E8' : '#9CA3AF' }}>
                    Sonorité rauque, flux libéré & Pops/Crackles
                  </div>
                </div>
              </div>
              {mode === 'open' && <Check size={20} color="#FFFFFF" />}
            </button>

            {/* Mode Quiet Closed */}
            <button
              onClick={() => handleModeSwitch('closed')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: mode === 'closed' 
                  ? 'linear-gradient(90deg, #1A4D2E 0%, #2E7D32 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: mode === 'closed' ? '1px solid #00FF66' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem 1.4rem',
                borderRadius: '14px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: mode === 'closed' ? '0 0 25px rgba(0, 255, 102, 0.35)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                <VolumeX size={24} color={mode === 'closed' ? '#FFFFFF' : '#9CA3AF'} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>MODE SILENCIEUX (CLAPETS FERMÉS)</div>
                  <div style={{ fontSize: '0.75rem', color: mode === 'closed' ? '#E8FFE8' : '#9CA3AF' }}>
                    Confort acoustique feutré pour autoroute et ville
                  </div>
                </div>
              </div>
              {mode === 'closed' && <Check size={20} color="#FFFFFF" />}
            </button>
          </div>

          {/* Test Sound Button */}
          <button
            onClick={handleSoundTest}
            className="btn-primary-red"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            <Volume2 size={18} />
            <span>{isPlaying ? "Accélération en cours..." : `Tester le son ${mode === 'open' ? 'SPORT (Open)' : 'SILENCIEUX (Quiet)'}`}</span>
          </button>
        </div>

        {/* Right Info & Technical Highlights */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--primary-red)',
            fontWeight: 800,
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            <Zap size={16} />
            <span>SUR-MESURE & INOX 304L ALIMENTAIRE</span>
          </div>

          <h3 style={{
            fontSize: '1.9rem',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: '1rem'
          }}>
            La Signature Sonore Haute Précision pour Votre Véhicule
          </h3>

          <p style={{
            fontSize: '0.95rem',
            color: '#9CA3AF',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            Nos lignes d'échappement sport et downpipes sont conçues pour libérer les gaz d'échappement sans contre-pression inutile, 
            garantissant un gain de couple sensible et une longévité absolue sous hautes températures.
          </p>

          {/* Features list */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: "Inox 304L soudé au TIG", desc: "Anti-corrosion garanti à vie" },
              { title: "Embouts Carbone & Titane", desc: "Design Akrapovic / M-Sport" },
              { title: "Contrôle à distance", desc: "Télécommande ou bouton OEM" },
              { title: "Homologation & CT", desc: "Passe au contrôle technique sans encombre" }
            ].map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#FFFFFF' }}>{f.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginTop: '0.2rem' }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleInquiry}
            className="btn-outline-red"
            style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
          >
            <span>Demander un Devis Valvetronic</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
