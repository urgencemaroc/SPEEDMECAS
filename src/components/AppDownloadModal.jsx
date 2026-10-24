import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, QrCode, ShieldCheck, CheckCircle2, Apple, Play, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export function AppDownloadModal({ isOpen, onClose }) {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [activePlatform, setActivePlatform] = useState('android'); // 'android' | 'ios'

  useEffect(() => {
    if (!isOpen) {
      setDownloadProgress(0);
      setIsDownloading(false);
      setDownloadComplete(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartDownload = () => {
    playClickSound();
    setIsDownloading(true);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadComplete(true);
            // Trigger actual download
            const link = document.createElement('a');
            link.href = '/downloads/speedmeca-v2.4.apk';
            link.setAttribute('download', 'SPEEDMECA-v2.4.0.apk');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="glass-panel-glow" 
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'linear-gradient(135deg, #131620 0%, #0B0C10 60%, #1A0709 100%)',
          border: '2px solid rgba(229, 37, 42, 0.45)',
          borderRadius: '24px',
          padding: '2rem 1.75rem',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(229, 37, 42, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 0 20px rgba(229, 37, 42, 0.5)'
            }}>
              <Smartphone size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF' }}>
                APPLICATION SPEEDMECA MOBILE
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', fontFamily: 'var(--font-arabic)', direction: 'rtl', fontWeight: 700 }}>
                تحميل تطبيق SPEEDMECA الرسمي على الهاتف (Android & iOS)
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

        {/* Platform Selector Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => { playClickSound(); setActivePlatform('android'); }}
            style={{
              flex: 1,
              background: activePlatform === 'android' ? 'var(--primary-red)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Play size={16} />
            <span>Android (APK & Play Store)</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActivePlatform('ios'); }}
            style={{
              flex: 1,
              background: activePlatform === 'ios' ? 'var(--primary-red)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Apple size={18} />
            <span>iPhone / iOS (PWA & App Store)</span>
          </button>
        </div>

        {/* Content Body Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          {/* Left: Interactive QR Code & App Icon */}
          <div style={{
            background: 'rgba(8, 10, 14, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Stylized QR Code Mockup */}
            <div style={{
              background: '#FFFFFF',
              padding: '12px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              {/* SVG QR Code Simulation */}
              <svg width="140" height="140" viewBox="0 0 100 100" fill="#000000">
                <rect x="0" y="0" width="28" height="28" fill="#111827"/>
                <rect x="4" y="4" width="20" height="20" fill="#FFFFFF"/>
                <rect x="8" y="8" width="12" height="12" fill="#E5252A"/>
                
                <rect x="72" y="0" width="28" height="28" fill="#111827"/>
                <rect x="76" y="4" width="20" height="20" fill="#FFFFFF"/>
                <rect x="80" y="8" width="12" height="12" fill="#E5252A"/>
                
                <rect x="0" y="72" width="28" height="28" fill="#111827"/>
                <rect x="4" y="76" width="20" height="20" fill="#FFFFFF"/>
                <rect x="8" y="80" width="12" height="12" fill="#E5252A"/>
                
                {/* Patterns */}
                <rect x="34" y="6" width="8" height="8"/>
                <rect x="48" y="6" width="16" height="8"/>
                <rect x="36" y="20" width="12" height="12"/>
                <rect x="54" y="24" width="8" height="8"/>
                <rect x="6" y="36" width="18" height="8"/>
                <rect x="32" y="40" width="36" height="8" fill="#E5252A"/>
                <rect x="76" y="38" width="16" height="16"/>
                <rect x="12" y="52" width="14" height="12"/>
                <rect x="36" y="56" width="18" height="16"/>
                <rect x="60" y="54" width="12" height="8"/>
                <rect x="36" y="80" width="10" height="14"/>
                <rect x="52" y="78" width="18" height="16"/>
                <rect x="76" y="72" width="18" height="10"/>
              </svg>

              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#E5252A',
                color: '#FFFFFF',
                borderRadius: '4px',
                padding: '2px 4px',
                fontSize: '8px',
                fontWeight: 900,
                letterSpacing: '0.05em'
              }}>
                SPEEDMECA
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.2rem' }}>
              Scannez avec l'appareil photo
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
              Installation directe sur votre téléphone sans passer par le store
            </div>
          </div>

          {/* Right: Details & Direct Download Action */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#00FF66',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem'
            }}>
              <ShieldCheck size={16} />
              <span>Version 2.4.0 Officielle • Certifiée Antivirus</span>
            </div>

            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {activePlatform === 'android' ? "Téléchargement Android (APK Direct & Play)" : "Installation Apple iPhone & iPad (iOS)"}
            </h4>

            {activePlatform === 'android' ? (
              <>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Profitez de l'accès instantané aux télémétries OBD, au déclenchement d'urgence SOS 24/7 en arrière-plan et au pilotage de vos clapets d'échappement.
                </p>

                {/* Download Progress Bar if downloading */}
                {isDownloading && (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                      <span>Téléchargement du fichier APK...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${downloadProgress}%`, background: 'var(--primary-red)', transition: 'width 0.25s ease' }} />
                    </div>
                  </div>
                )}

                {downloadComplete && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(0, 255, 102, 0.15)',
                    border: '1px solid rgba(0, 255, 102, 0.4)',
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    color: '#00FF66',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}>
                    <CheckCircle2 size={18} />
                    <span>Fichier APK téléchargé ! Cliquez pour l'installer sur Android.</span>
                  </div>
                )}

                {/* Primary APK Download Button */}
                <button
                  onClick={handleStartDownload}
                  disabled={isDownloading}
                  className="btn-primary-red"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginBottom: '0.75rem' }}
                >
                  <Download size={18} />
                  <span>{isDownloading ? "Téléchargement en cours..." : "Télécharger APK Android Direct (28 Mo)"}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleStartDownload(); }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '0.6rem',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Play size={16} color="#00FF66" />
                    <span>Google Play Store</span>
                  </a>
                </div>
              </>
            ) : (
              /* iOS INSTRUCTIONS */
              <div>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Sur iPhone / iPad, vous pouvez installer l'application SPEEDMECA directement en <strong>Web App (PWA)</strong> sans passer par l'App Store :
                </p>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontSize: '0.82rem',
                  color: '#D1D5DB',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary-red)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '11px', fontWeight: 800 }}>1</span>
                    <span>Ouvrez le site dans <strong>Safari</strong> sur votre iPhone.</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary-red)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '11px', fontWeight: 800 }}>2</span>
                    <span>Appuyez sur le bouton <strong>Partager</strong> <Share2 size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> en bas de l'écran.</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--primary-red)', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '11px', fontWeight: 800 }}>3</span>
                    <span>Sélectionnez <strong>"Sur l'écran d'accueil"</strong> (+).</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("L'icône SPEEDMECA a été configurée pour votre écran d'accueil iPhone !")}
                  className="btn-primary-red"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Apple size={18} />
                  <span>Installer sur l'écran d'accueil iOS</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#6B7280',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span>Compatibilité : Android 8.0+ & iOS 14.0+</span>
          <span>SPEEDMECA Auto Technologies • Azilal</span>
        </div>
      </div>
    </div>
  );
}
