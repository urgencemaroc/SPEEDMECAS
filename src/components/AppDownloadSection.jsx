import React from 'react';
import { Smartphone, Download, ShieldCheck, Zap, Radio, Bell, CheckCircle2, Play, Apple, QrCode, ArrowRight } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export function AppDownloadSection({ onOpenDownloadModal }) {
  const appFeatures = [
    {
      icon: Radio,
      titleFr: "SOS Dépannage 1-Clic en Arrière-Plan",
      titleAr: "إرسال نداء الإغاثة بضغطة زر واحدة",
      descFr: "Envoi immédiat de vos coordonnées GPS aux dépanneuses SPEEDMECA, optimisé pour les routes de montagne d'Azilal."
    },
    {
      icon: Zap,
      titleFr: "Télémétrie OBD & Diagnostic en Direct",
      titleAr: "دياكونوستيك وبيانات المحرك الحية عبر البلوتوث",
      descFr: "Connexion instantanée à votre prise OBD2 : pression turbo, température d'huile et suppression des voyants au tableau de bord."
    },
    {
      icon: Radio,
      titleFr: "Télécommande Valvetronic & Cartographie",
      titleAr: "التحكم في صوت العادم والخرائط الرياضية",
      descFr: "Ouvrez ou fermez vos clapets d'échappement directement depuis l'écran de votre smartphone en un glissement."
    },
    {
      icon: Bell,
      titleFr: "Carnet d'Entretien & Rappels Vidange",
      titleAr: "سجل الصيانة الرقمي ومواعيد تغيير الزيت",
      descFr: "Historique complet de toutes vos interventions à l'atelier d'Azilal avec alertes périodiques de révision."
    }
  ];

  return (
    <section id="application" className="section-container" style={{ position: 'relative' }}>
      <div className="section-header">
        <div className="racing-badge">
          <span>APPLICATION MOBILE OFFICIELLE</span>
        </div>
        <h2 className="section-title">
          TOUT SPEEDMECA DANS VOTRE <span>SMARTPHONE</span>
        </h2>
        <p className="section-desc">
          Téléchargez gratuitement l'application SPEEDMECA sur Android et iOS : assistance d'urgence SOS 24/7, diagnostic OBD en direct et contrôle connecté de votre véhicule.
        </p>
        <div style={{
          marginTop: '0.6rem',
          fontSize: '1.15rem',
          color: 'var(--primary-red)',
          fontFamily: 'var(--font-arabic)',
          direction: 'rtl'
        }}>
          حمّل تطبيق SPEEDMECA الرسمي مجاناً : طوارئ الإغاثة 24/7، فحص المحرك، والتحكم بالصوت مباشرة من هاتفك.
        </div>
      </div>

      <div className="glass-panel-glow" style={{
        background: 'linear-gradient(135deg, rgba(20, 23, 33, 0.95) 0%, rgba(10, 11, 16, 0.98) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(229, 37, 42, 0.35)',
        padding: '3rem 2rem',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Background glow orb */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 37, 42, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Column : 3D Mockup Image Display */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Ambient Red Glow Frame */}
            <div style={{
              position: 'relative',
              maxWidth: '380px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 45px rgba(229, 37, 42, 0.35)',
              border: '2px solid rgba(229, 37, 42, 0.5)',
              animation: 'floatSlow 4s ease-in-out infinite'
            }}>
              <img
                src="/images/speedmeca_mobile_app.jpg"
                alt="SPEEDMECA Mobile App Interface"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(1.05)'
                }}
              />

              {/* In-image overlay banner */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(10, 12, 16, 0.95) 20%, transparent 100%)',
                padding: '1.25rem 1rem 0.85rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontFamily: 'var(--font-racing)',
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: '#FFFFFF'
                }}>
                  SPEEDMECA MOBILE v2.4
                </div>
                <div style={{ fontSize: '0.75rem', color: '#00FF66', fontWeight: 700, marginTop: '2px' }}>
                  ● Compatible Android & iOS • Télémétrie en Direct
                </div>
              </div>
            </div>
          </div>

          {/* Right Column : Features & Download Badges */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--primary-red)',
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem'
            }}>
              <Smartphone size={16} />
              <span>DISPONIBLE DÈS MAINTENANT</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.25,
              marginBottom: '1.25rem'
            }}>
              L'Assistance d'Urgence et la Télémétrie Toujours avec Vous
            </h3>

            {/* 4 Feature Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {appFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'rgba(229, 37, 42, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-red)'
                    }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#FFFFFF' }}>
                      {feat.titleFr}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9CA3AF', lineHeight: 1.45 }}>
                    {feat.descFr}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              alignItems: 'center'
            }}>
              {/* Primary Download trigger */}
              <button
                onClick={() => { playClickSound(); onOpenDownloadModal(); }}
                className="btn-primary-red"
                style={{
                  fontSize: '0.95rem',
                  padding: '0.95rem 1.6rem',
                  borderRadius: '12px'
                }}
              >
                <Download size={18} />
                <span>Télécharger l'Application (Gratuit)</span>
                <ArrowRight size={16} />
              </button>

              {/* QR Code Quick View */}
              <button
                onClick={() => { playClickSound(); onOpenDownloadModal(); }}
                className="btn-dark"
                style={{
                  fontSize: '0.88rem',
                  padding: '0.95rem 1.3rem',
                  borderRadius: '12px'
                }}
              >
                <QrCode size={18} color="var(--primary-red)" />
                <span>Scanner QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
