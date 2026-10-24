import React, { useState } from 'react';
import { X, Calendar, Clock, Car, User, Phone, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { SERVICES, SPEEDMECA_INFO } from '../data/servicesData';
import { playClickSound } from '../utils/soundEffects';

export function AppointmentModal({ isOpen, onClose, initialService }) {
  const [selectedServiceId, setSelectedServiceId] = useState(initialService?.id || SERVICES[0].id);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [prefDate, setPrefDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();

    const msg = 
`Bonjour SPEEDMECA Azilal,
Je souhaite prendre rendez-vous pour :
🛠️ *Prestation :* ${currentService.titleFr} (${currentService.titleAr})
🚗 *Véhicule :* ${carModel || "Non précisé"}
👤 *Nom :* ${clientName || "Client"}
📞 *Tél :* ${clientPhone || "Non renseigné"}
📅 *Date souhaitée :* ${prefDate || "Dès que possible"}
📝 *Remarques :* ${notes || "Aucune"}

Merci de me confirmer la disponibilité à l'atelier du Quartier Administratif Azilal.`;

    const url = `https://wa.me/${SPEEDMECA_INFO.phoneInternational}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-glow" 
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#0D0F14',
          border: '1px solid rgba(229, 37, 42, 0.4)',
          borderRadius: '24px',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF' }}>
              RÉSERVER UNE PRESTATION EN ATELIER
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-red)', fontFamily: 'var(--font-arabic)', direction: 'rtl' }}>
              حجز موعد أو طلب استفسار في ورشة أزيلال
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
              Prestation choisie :
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{
                width: '100%',
                background: '#161922',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                padding: '0.7rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.number}. {s.titleFr} ({s.titleAr})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
                Votre Nom :
              </label>
              <input
                type="text"
                required
                placeholder="Votre nom complet"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
                Téléphone :
              </label>
              <input
                type="tel"
                placeholder="06 XX XX XX XX"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
                Véhicule (Marque / Modèle / Année) :
              </label>
              <input
                type="text"
                placeholder="Ex: BMW 320d 2021"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
                Date souhaitée :
              </label>
              <input
                type="date"
                value={prefDate}
                onChange={(e) => setPrefDate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 700, marginBottom: '0.35rem' }}>
              Détails ou symptômes particuliers :
            </label>
            <textarea
              rows="3"
              placeholder="Ex: Voyant moteur allumé, recherche gain couple, covering partiel noir mat..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary-red"
            style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            <MessageSquare size={18} />
            <span>Envoyer la Demande sur WhatsApp ({SPEEDMECA_INFO.phoneDisplay})</span>
          </button>
        </form>
      </div>
    </div>
  );
}
