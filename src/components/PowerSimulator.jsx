import React, { useState } from 'react';
import { Gauge, Zap, TrendingUp, ShieldCheck, Flame, ArrowRight, Sparkles, Fuel } from 'lucide-react';
import { VEHICLE_DATABASE, SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound, playValvetronicSound } from '../utils/soundEffects';

export function PowerSimulator({ onBookWithCar }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState('golf-tdi');
  const [stage, setStage] = useState('stage1'); // 'stock' | 'stage1' | 'stage2'
  const [isRevving, setIsRevving] = useState(false);

  const vehicle = VEHICLE_DATABASE.find(v => v.id === selectedVehicleId) || VEHICLE_DATABASE[0];

  const currentHp = stage === 'stock' ? vehicle.stockHp : (stage === 'stage1' ? vehicle.stage1Hp : vehicle.stage2Hp);
  const currentNm = stage === 'stock' ? vehicle.stockNm : (stage === 'stage1' ? vehicle.stage1Nm : vehicle.stage2Nm);
  const gainHp = currentHp - vehicle.stockHp;
  const gainNm = currentNm - vehicle.stockNm;

  const handleStageChange = (newStage) => {
    playClickSound();
    setStage(newStage);
  };

  const handleTestRev = () => {
    setIsRevving(true);
    playValvetronicSound(stage === 'stage2' ? 'open' : 'closed');
    setTimeout(() => setIsRevving(false), 2400);
  };

  const handleBookReprog = () => {
    const text = encodeURIComponent(
      `Bonjour SPEEDMECA Azilal,\nJe souhaite réserver une reprogrammation moteur :\n🚗 Véhicule : *${vehicle.name}*\n⚙️ Configuration : *${stage.toUpperCase()}* (+${gainHp} HP / +${gainNm} Nm)\nMerci de m'indiquer vos disponibilités.`
    );
    window.open(`https://wa.me/${SPEEDMECA_INFO.phoneInternational}?text=${text}`, '_blank');
  };

  // Calculate percentages for SVG gauge meters
  const maxHpMeter = 350;
  const hpPercent = Math.min(100, Math.round((currentHp / maxHpMeter) * 100));
  const maxNmMeter = 600;
  const nmPercent = Math.min(100, Math.round((currentNm / maxNmMeter) * 100));

  return (
    <section id="simulateur" className="section-container" style={{ position: 'relative' }}>
      <div className="section-header">
        <div className="racing-badge">
          <span>SIMULATEUR DE GAIN EN DIRECT</span>
        </div>
        <h2 className="section-title">
          AUGMENTATION DE PUISSANCE <span>STAGE 1 & 2</span>
        </h2>
        <p className="section-desc">
          Calculez instantanément les gains en chevaux (HP) et en couple (Nm) pour votre moteur avec notre cartographie sur-mesure développée selon les normes de tolérance mécanique.
        </p>
        <div style={{
          marginTop: '0.6rem',
          fontSize: '1.15rem',
          color: 'var(--primary-red)',
          fontFamily: 'var(--font-arabic)',
          direction: 'rtl'
        }}>
          محاكي رفع العزم والقدرة الحصانية (+35 حصان / +70 ن.م) مع استجابة فورية وتوفير في الوقود.
        </div>
      </div>

      <div className="glass-panel-glow" style={{
        background: 'linear-gradient(135deg, rgba(17, 20, 29, 0.95) 0%, rgba(10, 12, 16, 0.98) 100%)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(229, 37, 42, 0.35)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Vehicle Selection Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          marginBottom: '2.25rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.45rem'
            }}>
              Sélectionnez votre modèle :
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => { playClickSound(); setSelectedVehicleId(e.target.value); }}
              style={{
                background: '#161922',
                border: '1px solid rgba(229, 37, 42, 0.4)',
                color: '#FFFFFF',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '280px'
              }}
            >
              {VEHICLE_DATABASE.map(v => (
                <option key={v.id} value={v.id} style={{ background: '#161922', color: '#FFFFFF' }}>
                  {v.name} (Stock: {v.stockHp} HP / {v.stockNm} Nm)
                </option>
              ))}
            </select>
          </div>

          {/* Stage Selector Pills */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.45rem'
            }}>
              Niveau de Reprogrammation :
            </label>
            <div style={{
              display: 'inline-flex',
              background: '#0B0D12',
              padding: '4px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {[
                { id: 'stock', label: 'Origine' },
                { id: 'stage1', label: 'Stage 1 (+35 HP / +70 Nm)' },
                { id: 'stage2', label: 'Stage 2 Racing' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => handleStageChange(st.id)}
                  style={{
                    background: stage === st.id ? 'var(--primary-red)' : 'transparent',
                    color: stage === st.id ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Gauges & Curves Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          {/* Gauge 1: Power (HP) */}
          <div style={{
            background: 'rgba(8, 10, 14, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '1.75rem',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              PUISSANCE MOTEUR (CH/HP)
            </div>
            
            <div style={{
              fontFamily: 'var(--font-racing)',
              fontSize: '3.6rem',
              fontWeight: 900,
              color: stage === 'stock' ? '#FFFFFF' : '#FF3B3F',
              margin: '0.5rem 0',
              textShadow: stage !== 'stock' ? '0 0 25px rgba(229, 37, 42, 0.6)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {currentHp} <span style={{ fontSize: '1.5rem', color: '#9CA3AF' }}>HP</span>
            </div>

            {/* Gain Badge */}
            {stage !== 'stock' ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(229, 37, 42, 0.18)',
                color: '#FF4D52',
                border: '1px solid rgba(229, 37, 42, 0.4)',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                <TrendingUp size={15} />
                <span>Gain net : +{gainHp} HP</span>
              </div>
            ) : (
              <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>Configuration constructeur</span>
            )}

            {/* Gauge progress bar */}
            <div style={{
              marginTop: '1.25rem',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${hpPercent}%`,
                background: 'linear-gradient(90deg, #FF3B3F, #FF6B00)',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>

          {/* Gauge 2: Torque (Nm) */}
          <div style={{
            background: 'rgba(8, 10, 14, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '1.75rem',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              COUPLE MAXIMAL (NM)
            </div>

            <div style={{
              fontFamily: 'var(--font-racing)',
              fontSize: '3.6rem',
              fontWeight: 900,
              color: stage === 'stock' ? '#FFFFFF' : '#00E5FF',
              margin: '0.5rem 0',
              textShadow: stage !== 'stock' ? '0 0 25px rgba(0, 229, 255, 0.5)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {currentNm} <span style={{ fontSize: '1.5rem', color: '#9CA3AF' }}>Nm</span>
            </div>

            {/* Torque Gain Badge */}
            {stage !== 'stock' ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(0, 229, 255, 0.15)',
                color: '#00E5FF',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                <Zap size={15} />
                <span>Gain net : +{gainNm} Nm</span>
              </div>
            ) : (
              <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>Configuration constructeur</span>
            )}

            {/* Gauge progress bar */}
            <div style={{
              marginTop: '1.25rem',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${nmPercent}%`,
                background: 'linear-gradient(90deg, #00B4D8, #00E5FF)',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
          </div>

          {/* Extra Highlights & Dyno Summary */}
          <div style={{
            background: 'rgba(8, 10, 14, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(0, 255, 102, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00FF66'
              }}>
                <Fuel size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Économie de Carburant</div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>-0.5L à -0.8L / 100km à vitesse stabilisée</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(229, 37, 42, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-red)'
              }}>
                <Flame size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Réponse Accélérateur</div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Lag turbo réduit de 85% & reprises immédiates</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 230, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFE600'
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Fiabilité Respectée</div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Tolérances constructeur & sauvegarde carto d'origine</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.75rem'
        }}>
          {/* Rev sound test button */}
          <button
            onClick={handleTestRev}
            className="btn-dark"
            style={{
              fontSize: '0.88rem',
              padding: '0.8rem 1.4rem',
              borderColor: isRevving ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <Gauge size={18} color="var(--primary-red)" />
            <span>{isRevving ? "Montée en régime..." : "Écouter l'accélération sonore"}</span>
          </button>

          {/* Book Reprog Button */}
          <button
            onClick={handleBookReprog}
            className="btn-primary-red"
            style={{
              fontSize: '1rem',
              padding: '0.95rem 2rem'
            }}
          >
            <Sparkles size={18} />
            <span>Réserver cette Reprog (+{gainHp} HP) à Azilal</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
