import React, { useState } from 'react';
import { X, Phone, MapPin, Gauge, QrCode, Download, Share2, Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';
import { SPEEDMECA_INFO, SERVICES } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

export function BusinessCardModal({ isOpen, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SPEEDMECA_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:SPEEDMECA Azilal
ORG:SPEEDMECA Performance & Dépannage SOS
TEL;TYPE=CELL,VOICE:${SPEEDMECA_INFO.phone}
ADR;TYPE=WORK:;;Quartier Administratif / الحي الإداري;Azilal;;;Morocco
NOTE:Diagnostic Électronique, Reprogrammation ECU, Stage 1&2, Dépannage SOS 24/7
END:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SPEEDMECA-Azilal.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-glow" 
        style={{
          width: '100%',
          maxWidth: '680px',
          background: '#0B0D12',
          border: '1px solid rgba(229, 37, 42, 0.4)',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '2rem 1.75rem',
          position: 'relative'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
              Carte de Visite Officielle SPEEDMECA
            </h3>
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

        {/* 3D Card Simulation */}
        <div style={{ perspective: '1200px', marginBottom: '1.75rem' }}>
          <div 
            style={{
              width: '100%',
              minHeight: '340px',
              borderRadius: '20px',
              background: !flipped 
                ? 'linear-gradient(135deg, #161922 0%, #0B0C10 50%, #1A0507 100%)'
                : 'linear-gradient(135deg, #141720 0%, #0D0F14 100%)',
              border: '2px solid rgba(229, 37, 42, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(229, 37, 42, 0.25)',
              padding: '2rem',
              color: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Background watermark speed lines */}
            <div style={{
              position: 'absolute',
              right: '-10%',
              bottom: '-20%',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '40px solid rgba(229, 37, 42, 0.06)',
              pointerEvents: 'none'
            }} />

            {!flipped ? (
              /* RECTO OF CARD */
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {/* Brand & Emblem */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(229, 37, 42, 0.6)'
                    }}>
                      <Gauge size={30} color="#FFFFFF" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-racing)',
                        fontSize: '1.9rem',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        lineHeight: 1
                      }}>
                        SPEED<span style={{ color: 'var(--primary-red)' }}>MECA</span>
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginTop: '0.35rem'
                      }}>
                        Auto Performance & High-Tech
                      </div>
                    </div>
                  </div>

                  {/* 24/7 SOS Badge */}
                  <div style={{
                    background: 'rgba(229, 37, 42, 0.2)',
                    border: '1px solid #FF3B3F',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#FF6B6F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FF3B3F',
                      boxShadow: '0 0 8px #FF3B3F'
                    }} />
                    <span>SOS 24/7</span>
                  </div>
                </div>

                {/* Center highlights */}
                <div style={{ margin: '1.5rem 0' }}>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#E5E7EB',
                    marginBottom: '0.35rem'
                  }}>
                    Diagnostic Électronique • Reprogrammation ECU • Stage 1 & 2 • Covering • Valvetronic
                  </div>
                  <div style={{
                    fontSize: '0.92rem',
                    color: 'var(--primary-red)',
                    fontFamily: 'var(--font-arabic)',
                    direction: 'rtl',
                    fontWeight: 700
                  }}>
                    برمجة العقول الإلكترونية • دياكونوستيك • صيانة الهجين • تغليف وتعديل السيارات
                  </div>
                </div>

                {/* Footer of Card with Location & Phone */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.8rem'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.85rem',
                      color: '#D1D5DB',
                      marginBottom: '0.2rem'
                    }}>
                      <MapPin size={15} color="var(--primary-red)" />
                      <span>Quartier Administratif / الحي الإداري</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', paddingLeft: '1.4rem' }}>
                      Azilal - Maroc (أزيلال)
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase' }}>
                      Assistance & Contact Direct
                    </div>
                    <a
                      href={`tel:${SPEEDMECA_INFO.phone}`}
                      style={{
                        fontFamily: 'var(--font-racing)',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <Phone size={18} color="var(--primary-red)" />
                      <span>{SPEEDMECA_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              /* VERSO OF CARD : ALL 10 SERVICES OVERVIEW */
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-red)' }}>
                    CATALOGUE DES 10 PRESTATIONS SPEEDMECA
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'var(--font-arabic)' }}>
                    دليل الخدمات العشر
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem 1rem',
                  fontSize: '0.78rem'
                }}>
                  {SERVICES.map((s) => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{
                        color: 'var(--primary-red)',
                        fontWeight: 800,
                        fontFamily: 'var(--font-racing)',
                        fontSize: '0.75rem'
                      }}>
                        {s.number}.
                      </span>
                      <span style={{ color: '#E5E7EB', fontWeight: 600 }}>{s.titleFr.split(' ')[0]} {s.titleFr.split(' ')[1] || ''}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#9CA3AF'
                }}>
                  <span>Intervention rapide ~15-30 min</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Tél : {SPEEDMECA_INFO.phoneDisplay}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Flip card button */}
          <button
            onClick={() => { playClickSound(); setFlipped(!flipped); }}
            className="btn-dark"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.1rem' }}
          >
            <RotateCw size={16} />
            <span>{flipped ? "Voir Recto (Face)" : "Voir Verso (Les 10 Prestations)"}</span>
          </button>

          {/* Copy phone */}
          <button
            onClick={handleCopyPhone}
            className="btn-dark"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.1rem' }}
          >
            {copied ? <CheckCircle2 size={16} color="#00FF66" /> : <Share2 size={16} />}
            <span>{copied ? "Numéro Copié !" : "Copier Numéro"}</span>
          </button>

          {/* Download vCard */}
          <button
            onClick={handleDownloadVCard}
            className="btn-primary-red"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
          >
            <Download size={16} />
            <span>Enregistrer dans les Contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
