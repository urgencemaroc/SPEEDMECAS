import React, { useState, useEffect } from 'react';
import { 
  X, Phone, Navigation, AlertTriangle, CheckCircle, ShieldAlert, 
  MapPin, Clock, MessageSquare, Car, RefreshCw, Send 
} from 'lucide-react';
import { SPEEDMECA_INFO } from '../data/servicesData';
import { playSosPulse, playClickSound } from '../utils/soundEffects';

export function SosModal({ isOpen, onClose }) {
  const [gpsCoords, setGpsCoords] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [breakdownType, setBreakdownType] = useState('Panne mécanique moteur');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');

  const breakdownTypes = [
    { id: 'moteur', labelFr: 'Panne moteur / Voyant Rouge', labelAr: 'عطل في المحرك' },
    { id: 'batterie', labelFr: 'Batterie à plat / Démarrage impossible', labelAr: 'نفاد شحن البطارية' },
    { id: 'crevaison', labelFr: 'Crevaison / Problème pneumatique', labelAr: 'ثقب أو انفجار الإطار' },
    { id: 'remorquage', labelFr: 'Remorquage / Treuil sur route', labelAr: 'سحب ونقل السيارة' },
    { id: 'accident', labelFr: 'Sortie de route / Accident', labelAr: 'حادث أو خروج عن الطريق' },
  ];

  // Request GPS position when modal opens
  useEffect(() => {
    if (isOpen) {
      playSosPulse();
      fetchGpsLocation();
    }
  }, [isOpen]);

  const fetchGpsLocation = () => {
    setGpsLoading(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError("La géolocalisation n'est pas supportée par votre navigateur.");
      // Fallback coordinates for Azilal
      setGpsCoords({ lat: SPEEDMECA_INFO.gpsLat, lng: SPEEDMECA_INFO.gpsLng, accuracy: 50, isFallback: true });
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoords({
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6),
          accuracy: Math.round(position.coords.accuracy),
          isFallback: false
        });
        setGpsLoading(false);
      },
      (error) => {
        console.warn("GPS error:", error);
        // Fallback to Azilal center
        setGpsCoords({
          lat: SPEEDMECA_INFO.gpsLat,
          lng: SPEEDMECA_INFO.gpsLng,
          accuracy: 100,
          isFallback: true
        });
        setGpsError("Position estimée par défaut sur la région d'Azilal.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleSendWhatsAppGps = () => {
    playClickSound();
    const mapsLink = gpsCoords 
      ? `https://maps.google.com/?q=${gpsCoords.lat},${gpsCoords.lng}`
      : `Azilal et régions avoisinantes`;

    const message = 
`🚨 *URGENCE SOS DÉPANNAGE ROUTIER SPEEDMECA* 🚨
--------------------------------------
📍 *Position GPS instantanée :* ${mapsLink}
${gpsCoords ? `(Précision ~${gpsCoords.accuracy}m)` : ''}

⚠️ *Type d'urgence :* ${breakdownType}
🚗 *Véhicule :* ${vehicleInfo || "Non spécifié"}
📝 *Message / Remarques :* ${additionalNote || "Intervention requise dès que possible"}

Merci d'envoyer la dépanneuse / équipe mobile d'Azilal en urgence !`;

    const url = `https://wa.me/${SPEEDMECA_INFO.phoneInternational}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-glow" 
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, #180507 0%, #0D0F14 100%)',
          border: '2px solid #FF252C',
          borderRadius: '24px',
          padding: '2rem 1.75rem',
          position: 'relative',
          boxShadow: '0 0 60px rgba(229, 37, 42, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Red Alert Light */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FF1E27',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px #FF1E27',
              animation: 'beaconPulse 1.5s infinite'
            }}>
              <ShieldAlert size={26} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                lineHeight: 1.2
              }}>
                ASSISTANCE D'URGENCE SOS 24/7
              </h2>
              <div style={{
                fontSize: '0.88rem',
                color: '#FF6B6F',
                fontFamily: 'var(--font-arabic)',
                direction: 'rtl',
                fontWeight: 700
              }}>
                طوارئ الإغاثة السريعة على الطريق بأزيلال والنواحي
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Guaranteed Response Time Banner */}
        <div style={{
          background: 'rgba(229, 37, 42, 0.15)',
          border: '1px solid rgba(229, 37, 42, 0.4)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Clock size={22} color="#FFE600" />
          <div style={{ fontSize: '0.88rem', color: '#FFFFFF', lineHeight: 1.4 }}>
            <strong>Intervention Rapide Garantie :</strong> Notre véhicule d'assistance et dépanneuse interviennent en <strong>~15 à 30 minutes</strong> à Azilal et régions limitrophes.
          </div>
        </div>

        {/* GPS Live Geolocation Box */}
        <div style={{
          background: 'rgba(11, 13, 18, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '14px',
          padding: '1.15rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.65rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}>
              <Navigation size={16} color="var(--primary-red)" />
              <span>POSITION GÉOGRAPHIQUE EN DIRECT</span>
            </div>
            <button
              onClick={fetchGpsLocation}
              disabled={gpsLoading}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#D1D5DB',
                borderRadius: '6px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <RefreshCw size={12} className={gpsLoading ? "animate-spin" : ""} />
              <span>Actualiser GPS</span>
            </button>
          </div>

          {gpsLoading ? (
            <div style={{ color: '#FFE600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #FFE600',
                borderTopColor: 'transparent',
                animation: 'radarSweep 1s linear infinite'
              }} />
              <span>Détection satellite GPS en cours...</span>
            </div>
          ) : gpsCoords ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#00FF66',
                fontSize: '0.9rem',
                fontWeight: 700,
                fontFamily: 'monospace'
              }}>
                <MapPin size={16} />
                <span>Lat: {gpsCoords.lat} • Lng: {gpsCoords.lng}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                {gpsCoords.isFallback 
                  ? "Position approximative (Azilal Centre). Vous pouvez préciser le lieu ci-dessous."
                  : `Signal GPS verrouillé avec précision ~${gpsCoords.accuracy}m.`}
              </div>
            </div>
          ) : (
            <div style={{ color: '#FF6B6F', fontSize: '0.85rem' }}>
              Position GPS non disponible. Cliquez sur "Actualiser GPS".
            </div>
          )}
        </div>

        {/* Breakdown Type Selector */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 800,
            color: '#E5E7EB',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Type de panne sur route :
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.5rem'
          }}>
            {breakdownTypes.map(bt => {
              const isSelected = breakdownType === bt.labelFr;
              return (
                <button
                  key={bt.id}
                  type="button"
                  onClick={() => { playClickSound(); setBreakdownType(bt.labelFr); }}
                  style={{
                    background: isSelected ? 'rgba(229, 37, 42, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid #FF3B3F' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.85rem',
                    textAlign: 'left',
                    color: isSelected ? '#FFFFFF' : '#9CA3AF',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{bt.labelFr}</span>
                  {isSelected && <CheckCircle size={15} color="#FF3B3F" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Car and Details Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '0.35rem', fontWeight: 700 }}>
              Marque & Modèle du véhicule :
            </label>
            <input
              type="text"
              placeholder="Ex: Golf 7, Duster, BMW..."
              value={vehicleInfo}
              onChange={(e) => setVehicleInfo(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.6rem 0.8rem',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '0.35rem', fontWeight: 700 }}>
              Repère visuel (ex: km 15 route Ouzoud...) :
            </label>
            <input
              type="text"
              placeholder="Lieu-dit ou kilomètre..."
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.6rem 0.8rem',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* 2 Primary Urgent Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* WhatsApp GPS Dispatch */}
          <button
            onClick={handleSendWhatsAppGps}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem',
              fontWeight: 900,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Navigation size={20} />
            <span>ENVOYER POSITION GPS VIA WHATSAPP (INSTANTANÉ)</span>
          </button>

          {/* Direct Phone Call */}
          <a
            href={`tel:${SPEEDMECA_INFO.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '1rem',
              fontWeight: 900,
              fontSize: '1.05rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(229, 37, 42, 0.5)',
              textAlign: 'center'
            }}
          >
            <Phone size={20} />
            <span>APPELER LE DÉPANNAGE EN 1 CLIC : {SPEEDMECA_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
