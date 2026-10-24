import React, { useState, useEffect } from 'react';
import { PhoneCall, Navigation, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { SPEEDMECA_INFO } from '../data/servicesData';
import { playSosPulse } from '../utils/soundEffects';

export function EmergencyBanner({ lang, onOpenSos }) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleSosClick = () => {
    playSosPulse();
    onOpenSos();
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #660508 0%, #B80F14 25%, #E5252A 50%, #B80F14 75%, #660508 100%)',
      borderBottom: '2px solid #FF4D52',
      boxShadow: '0 4px 25px rgba(229, 37, 42, 0.45)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      color: '#FFFFFF'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Left SOS Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: '#B80F14',
            boxShadow: pulse ? '0 0 16px #FFFFFF' : '0 0 4px rgba(255,255,255,0.5)',
            transition: 'all 0.3s ease'
          }}>
            <AlertTriangle size={18} strokeWidth={2.6} />
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 900,
              letterSpacing: '0.04em',
              fontSize: '0.95rem'
            }}>
              <span style={{ color: '#FFE600', animation: 'sirenFlash 1s infinite' }}>● EN DIRECT 24/7 :</span>
              <span>طوارئ الإغاثة / SOS DÉPANNAGE ROUTIER</span>
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Clock size={12} />
              <span>Intervention rapide Azilal & Régions : <strong>~15 à 30 min</strong></span>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Direct Call Button */}
          <a
            href={`tel:${SPEEDMECA_INFO.phone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              color: '#B80F14',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s ease'
            }}
          >
            <PhoneCall size={16} />
            <span>Appel SOS : {SPEEDMECA_INFO.phoneDisplay}</span>
          </a>

          {/* Instant GPS Rescue Trigger */}
          <button
            onClick={handleSosClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              padding: '0.45rem 0.95rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Navigation size={15} style={{ color: '#FFE600' }} />
            <span>Position GPS Instantanée</span>
          </button>
        </div>
      </div>
    </div>
  );
}
