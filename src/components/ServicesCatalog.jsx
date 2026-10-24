import React, { useState } from 'react';
import { 
  Cpu, Binary, Zap, Gauge, Wrench, Layers, ShieldAlert, Sparkles, Sliders, Volume2, 
  Search, CheckCircle, ArrowRight, MessageSquare, ExternalLink, ChevronDown, ChevronUp 
} from 'lucide-react';
import { SERVICES, SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

const ICON_MAP = {
  Cpu, Binary, Zap, Gauge, Wrench, Layers, ShieldAlert, Sparkles, Sliders, Volume2
};

export function ServicesCatalog({ lang, onBookService, onOpenSimulator, onOpenValvetronic }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: 'all', labelFr: 'Tous les 10 Services', labelAr: 'جميع الخدمات العشر (10)' },
    { id: 'performance', labelFr: 'Performance & Reprog', labelAr: 'البرمجة وزيادة القوة' },
    { id: 'electronique', labelFr: 'Électronique & Diag', labelAr: 'الدياكونوستيك' },
    { id: 'esthetique', labelFr: 'Covering & Décor', labelAr: 'التغليف والتزيين' },
    { id: 'mecanique', labelFr: 'Mécanique & Hybride', labelAr: 'الميكانيك والهجين' },
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesCat = activeCategory === 'all' || service.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;

    const matchesSearch = 
      service.titleFr.toLowerCase().includes(query) ||
      service.titleAr.toLowerCase().includes(query) ||
      service.shortDescFr.toLowerCase().includes(query) ||
      service.shortDescAr.toLowerCase().includes(query) ||
      service.featuresFr.some(f => f.toLowerCase().includes(query)) ||
      service.featuresAr.some(f => f.toLowerCase().includes(query));

    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    playClickSound();
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleWhatsAppInquiry = (service) => {
    const text = encodeURIComponent(
      `Bonjour SPEEDMECA Azilal,\nJe souhaite des informations ou un devis concernant votre prestation :\n👉 *${service.titleFr} (${service.titleAr})*.\nMon véhicule : `
    );
    window.open(`https://wa.me/${SPEEDMECA_INFO.phoneInternational}?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="section-container">
      {/* Section Header */}
      <div className="section-header">
        <div className="racing-badge">
          <span>CATALOGUE COMPLET DES 10 PRESTATIONS</span>
        </div>
        <h2 className="section-title">
          L'INGÉNIERIE DE POINTE <span>SPEEDMECA</span>
        </h2>
        <p className="section-desc">
          Toutes les prestations officielles figurant sur la carte SPEEDMECA : diagnostic électronique par scanner, 
          reprogrammation ECU certifiée, mécanique hybride et personnalisation sur-mesure à Azilal.
        </p>
        <div style={{
          marginTop: '0.6rem',
          fontSize: '1.15rem',
          color: 'var(--primary-red)',
          fontFamily: 'var(--font-arabic)',
          direction: 'rtl'
        }}>
          جميع الخدمات العشر المعتمدة : برمجة، دياكونوستيك، ميكانيك دقيق، صيانة الهايبرد وتجهيز السيارات.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2.5rem',
        background: 'rgba(14, 16, 22, 0.7)',
        padding: '0.85rem 1.25rem',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Category Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.45rem'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
                style={{
                  background: isActive ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  border: isActive ? '1px solid var(--primary-red-hover)' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span>{cat.labelFr}</span>
                {isActive && <span style={{ opacity: 0.85, fontSize: '0.75rem' }}>({filteredServices.length})</span>}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div style={{
          position: 'relative',
          minWidth: '260px',
          flex: '1 1 260px',
          maxWidth: '380px'
        }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6B7280'
          }} />
          <input
            type="text"
            placeholder="Rechercher un service (ex: ECU, FAP, Hybride)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '9999px',
              padding: '0.55rem 1rem 0.55rem 2.4rem',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => {
          const IconComponent = ICON_MAP[service.icon] || Wrench;
          const isExpanded = expandedCard === service.id;

          return (
            <div
              key={service.id}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'linear-gradient(180deg, rgba(22, 25, 35, 0.85) 0%, rgba(12, 14, 20, 0.95) 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(229, 37, 42, 0.5)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 15px 35px -10px rgba(0,0,0,0.8), 0 0 25px rgba(229, 37, 42, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Top Banner with Number & Icon */}
              <div style={{
                padding: '1.5rem 1.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(229, 37, 42, 0.14)',
                    border: '1px solid rgba(229, 37, 42, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-red)'
                  }}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-racing)',
                      fontSize: '0.78rem',
                      color: 'var(--primary-red)',
                      fontWeight: 800,
                      letterSpacing: '0.1em'
                    }}>
                      PRESTATION {service.number}
                    </span>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase'
                    }}>
                      {service.category}
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#FFFFFF'
                }}>
                  {service.badgeFr}
                </div>
              </div>

              {/* Title & Descriptions */}
              <div style={{ padding: '1.25rem 1.5rem', flex: 1 }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3
                }}>
                  {service.titleFr}
                </h3>
                
                {/* Arabic title */}
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--primary-red)',
                  fontFamily: 'var(--font-arabic)',
                  direction: 'rtl',
                  marginBottom: '0.85rem'
                }}>
                  {service.titleAr}
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#9CA3AF',
                  lineHeight: 1.55,
                  marginBottom: '0.75rem'
                }}>
                  {service.shortDescFr}
                </p>

                {/* Arabic description snippet */}
                <p style={{
                  fontSize: '0.84rem',
                  color: '#D1D5DB',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-arabic)',
                  direction: 'rtl',
                  marginBottom: '1rem',
                  borderRight: '2px solid var(--primary-red)',
                  paddingRight: '0.6rem'
                }}>
                  {service.shortDescAr}
                </p>

                {/* Interactive shortcut buttons for specific services */}
                {service.id === 'stage-power' && (
                  <button
                    onClick={() => { playClickSound(); onOpenSimulator(); }}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 229, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.35)',
                      color: '#00E5FF',
                      borderRadius: '8px',
                      padding: '0.55rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Gauge size={16} />
                    <span>Lancer le Simulateur de Gain (+35 HP / +70 Nm)</span>
                  </button>
                )}

                {service.id === 'echappement-clapets' && (
                  <button
                    onClick={() => { playClickSound(); onOpenValvetronic(); }}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 107, 0, 0.08)',
                      border: '1px solid rgba(255, 107, 0, 0.35)',
                      color: '#FF6B00',
                      borderRadius: '8px',
                      padding: '0.55rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Volume2 size={16} />
                    <span>Tester la Sonorité Silencieux vs Valvetronic Sport</span>
                  </button>
                )}

                {/* Expanded Details list */}
                {isExpanded && (
                  <div style={{
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    animation: 'fadeIn 0.2s ease-out'
                  }}>
                    <div style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#E5E7EB',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem'
                    }}>
                      Inclus dans cette prestation :
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                      {service.featuresFr.map((feat, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.82rem',
                          color: '#D1D5DB',
                          marginBottom: '0.35rem'
                        }}>
                          <CheckCircle size={14} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Arabic features */}
                    <div style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--primary-red)',
                      fontFamily: 'var(--font-arabic)',
                      direction: 'rtl',
                      marginBottom: '0.4rem'
                    }}>
                      المميزات التقنية :
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, direction: 'rtl' }}>
                      {service.featuresAr.map((feat, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                          color: '#9CA3AF',
                          fontFamily: 'var(--font-arabic)',
                          marginBottom: '0.35rem'
                        }}>
                          <span style={{ color: 'var(--primary-red)' }}>•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Toggle details button */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-red)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0'
                  }}
                >
                  <span>{isExpanded ? "Masquer les détails" : "Voir tous les détails techniques"}</span>
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
              </div>

              {/* Card Footer / Actions */}
              <div style={{
                padding: '1rem 1.5rem',
                background: 'rgba(8, 10, 14, 0.8)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.65rem'
              }}>
                {/* Devis / WhatsApp button */}
                <button
                  onClick={() => handleWhatsAppInquiry(service)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
                >
                  <MessageSquare size={15} color="#25D366" />
                  <span>Devis WhatsApp</span>
                </button>

                {/* Réserver RDV Atelier */}
                <button
                  onClick={() => { playClickSound(); onBookService(service); }}
                  className="btn-primary-red"
                  style={{
                    padding: '0.65rem 1rem',
                    fontSize: '0.82rem',
                    borderRadius: '10px'
                  }}
                >
                  <span>Réserver</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
