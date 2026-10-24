import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Shield, FileText, Plus, Trash2, Printer, Share2, 
  Save, Eye, Edit3, ArrowLeft, CheckCircle, Search, RefreshCw, 
  Lock, Unlock, DollarSign, Car, Calendar, Phone, Sparkles, X, ChevronRight
} from 'lucide-react';
import { ASSURANCES_MAROC, PRESTATIONS_STANDARDS, TEMPLATES_DEVIS, SPEEDMECA_LEGAL } from '../../data/adminData';
import { PrintableDevis } from './PrintableDevis';
import { playClickSound } from '../../utils/soundEffects';

export function AdminPortal({ isOpen, onClose }) {
  // Authentication PIN state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);

  // View state: 'dashboard' | 'editor' | 'preview'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedDevisList, setSavedDevisList] = useState([]);

  // Current devis state
  const [currentDevis, setCurrentDevis] = useState({
    id: '',
    numeroDevis: '',
    dateEmission: new Date().toISOString().split('T')[0],
    typeClient: 'assurance', // 'assurance' | 'societe'
    clientNom: 'Wafa Assurance',
    numeroSinistre: '',
    nomAssure: '',
    expertNom: '',
    clientICE: '',
    clientTelephone: '',
    vehiculeMarque: '',
    vehiculeMatricule: '',
    vehiculeKilometrage: '',
    vehiculeVIN: '',
    remisePourcent: 0,
    exonereTVA: false,
    observations: "Intervention réalisée selon les normes constructeur. Pièces d'origine et agrément remorquage officiel SPEEDMECA Azilal.",
    statut: 'Brouillon',
    items: [
      { designation: "Dépannage & Remorquage plateau sur route (Azilal & Régions)", quantite: 1, prixHT: 650 },
      { designation: "Diagnostic Électronique complet multi-calculateurs (Scanner DTC)", quantite: 1, prixHT: 350 }
    ]
  });

  const printableRef = useRef(null);

  // Load saved quotes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('speedmeca_saved_devis');
      if (stored) {
        setSavedDevisList(JSON.parse(stored));
      } else {
        // default dummy demo quote
        const initialDemo = [
          {
            id: 'dev-demo-1',
            numeroDevis: 'DEV-2026-0042',
            dateEmission: '2026-10-24',
            typeClient: 'assurance',
            clientNom: 'RMA (Royale Marocaine d\'Assurance)',
            numeroSinistre: 'SIN-88412-AZ',
            nomAssure: 'M. Ahmed Tazi',
            expertNom: 'Cabinet Expertise Atlas',
            vehiculeMarque: 'Dacia Duster 1.5 dCi',
            vehiculeMatricule: '24190 | A | 12',
            totalTTC: 2880,
            statut: 'Validé',
            items: [
              { designation: "Remorquage d'urgence sur plateau région Ouzoud/Azilal", quantite: 1, prixHT: 850 },
              { designation: "Diagnostic Électronique et recherche panne circuit injection", quantite: 1, prixHT: 450 },
              { designation: "Main d'œuvre remplacement capteur rampe et révision", quantite: 1, prixHT: 1100 }
            ]
          }
        ];
        setSavedDevisList(initialDemo);
        localStorage.setItem('speedmeca_saved_devis', JSON.stringify(initialDemo));
      }
    } catch (e) {
      console.warn("Could not load saved quotes:", e);
    }
  }, []);

  // Save devis list to localStorage
  const persistDevisList = (newList) => {
    setSavedDevisList(newList);
    try {
      localStorage.setItem('speedmeca_saved_devis', JSON.stringify(newList));
    } catch (e) {
      console.warn(e);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pinCode === '1234' || pinCode === '0000') {
      setIsAuthenticated(true);
      setPinError(false);
      playClickSound();
    } else {
      setPinError(true);
    }
  };

  const generateNewDevisNumber = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DEV-${new Date().getFullYear()}-${randomNum}`;
  };

  const startNewDevis = (template = null) => {
    playClickSound();
    const newNum = generateNewDevisNumber();
    const newDevis = {
      id: `dev-${Date.now()}`,
      numeroDevis: newNum,
      dateEmission: new Date().toISOString().split('T')[0],
      typeClient: template ? template.typeClient : 'assurance',
      clientNom: template?.typeClient === 'societe' ? 'Société SARL' : 'Wafa Assurance',
      numeroSinistre: '',
      nomAssure: '',
      expertNom: '',
      clientICE: '',
      clientTelephone: '',
      vehiculeMarque: '',
      vehiculeMatricule: '',
      vehiculeKilometrage: '',
      vehiculeVIN: '',
      remisePourcent: 0,
      exonereTVA: false,
      observations: "Devis valable 30 jours. Travaux réalisés selon cahier des charges et pièces d'origine garanties.",
      statut: 'Brouillon',
      items: template ? [...template.items] : [
        { designation: "Dépannage & Remorquage plateau sur route (Azilal)", quantite: 1, prixHT: 650 },
        { designation: "Diagnostic Électronique et lecture codes défauts", quantite: 1, prixHT: 350 }
      ]
    };
    setCurrentDevis(newDevis);
    setActiveTab('editor');
  };

  const handleAddItem = (preset = null) => {
    playClickSound();
    const newItem = preset 
      ? { designation: preset.designation, quantite: 1, prixHT: preset.prixHT }
      : { designation: "Nouvelle prestation / Pièce", quantite: 1, prixHT: 500 };

    setCurrentDevis({
      ...currentDevis,
      items: [...currentDevis.items, newItem]
    });
  };

  const handleUpdateItem = (index, field, value) => {
    const updated = [...currentDevis.items];
    updated[index][field] = value;
    setCurrentDevis({ ...currentDevis, items: updated });
  };

  const handleRemoveItem = (index) => {
    playClickSound();
    const updated = currentDevis.items.filter((_, i) => i !== index);
    setCurrentDevis({ ...currentDevis, items: updated });
  };

  const handleSaveDevis = () => {
    playClickSound();
    const totalHT = currentDevis.items.reduce((sum, item) => sum + (Number(item.prixHT || 0) * Number(item.quantite || 1)), 0);
    const netHT = totalHT - (totalHT * (Number(currentDevis.remisePourcent || 0) / 100));
    const totalTTC = currentDevis.exonereTVA ? netHT : netHT * 1.20;

    const devisToSave = {
      ...currentDevis,
      totalTTC: Math.round(totalTTC)
    };

    const existingIndex = savedDevisList.findIndex(d => d.id === devisToSave.id);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...savedDevisList];
      updatedList[existingIndex] = devisToSave;
    } else {
      updatedList = [devisToSave, ...savedDevisList];
    }

    persistDevisList(updatedList);
    alert(`Devis ${devisToSave.numeroDevis} enregistré avec succès dans l'historique !`);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleShareWhatsApp = () => {
    playClickSound();
    const totalHT = currentDevis.items.reduce((sum, item) => sum + (Number(item.prixHT || 0) * Number(item.quantite || 1)), 0);
    const netHT = totalHT - (totalHT * (Number(currentDevis.remisePourcent || 0) / 100));
    const totalTTC = currentDevis.exonereTVA ? netHT : netHT * 1.20;

    const msg = 
`📄 *DEVIS ESTIMATIF SPEEDMECA AZILAL* 📄
------------------------------------
N° : *${currentDevis.numeroDevis}* du ${currentDevis.dateEmission}
Client / Assurance : *${currentDevis.clientNom}*
${currentDevis.numeroSinistre ? `N° Sinistre : *${currentDevis.numeroSinistre}*\n` : ''}Véhicule : *${currentDevis.vehiculeMarque || "N/A"}* (Matricule: *${currentDevis.vehiculeMatricule || "N/A"}*)

🔧 *Détail des prestations :*
${currentDevis.items.map((it, idx) => `${idx + 1}. ${it.designation} (${it.quantite}x) : ${it.prixHT} MAD HT`).join('\n')}

💰 *TOTAL TTC : ${totalTTC.toFixed(2)} MAD*
------------------------------------
Atelier & Dépannage 24/7 : Quartier Administratif Azilal
Tél : ${SPEEDMECA_LEGAL.telephoneDisplay} • ICE : ${SPEEDMECA_LEGAL.ice}`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleDeleteDevis = (id) => {
    if (window.confirm("Confirmer la suppression de ce devis ?")) {
      const filtered = savedDevisList.filter(d => d.id !== id);
      persistDevisList(filtered);
    }
  };

  const handleEditSavedDevis = (devis) => {
    playClickSound();
    setCurrentDevis(devis);
    setActiveTab('editor');
  };

  const handlePreviewSavedDevis = (devis) => {
    playClickSound();
    setCurrentDevis(devis);
    setActiveTab('preview');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ padding: '1rem', zIndex: 1200 }}>
      <div 
        className="glass-panel-glow" 
        style={{
          width: '100%',
          maxWidth: '1240px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#0B0D12',
          border: '2px solid rgba(229, 37, 42, 0.45)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of Admin Space */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'linear-gradient(90deg, #151822 0%, #0F1118 100%)',
          borderBottom: '1px solid rgba(229, 37, 42, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Shield size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-racing)', fontSize: '1.25rem', fontWeight: 900, color: '#FFFFFF' }}>
                  SPEED<span style={{ color: 'var(--primary-red)' }}>MECA</span> PRO
                </span>
                <span style={{
                  background: 'rgba(229, 37, 42, 0.2)',
                  color: '#FF6B6F',
                  border: '1px solid rgba(229, 37, 42, 0.4)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  ESPACE DEVIS ASSURANCES & SOCIÉTÉS
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                Génération de devis officiels conformes normes marocaines (ICE: {SPEEDMECA_LEGAL.ice})
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => { playClickSound(); setActiveTab('dashboard'); }}
                style={{
                  background: activeTab === 'dashboard' ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Tableau de bord & Historique
              </button>

              <button
                onClick={() => startNewDevis()}
                style={{
                  background: activeTab === 'editor' ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Plus size={16} />
                <span>Nouveau Devis</span>
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('preview'); }}
                style={{
                  background: activeTab === 'preview' ? 'var(--primary-red)' : 'rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Eye size={16} />
                <span>Aperçu Document A4</span>
              </button>
            </div>
          )}

          {/* Close modal */}
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

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#080A0E' }}>
          {/* If NOT Authenticated: Show PIN Login */}
          {!isAuthenticated ? (
            <div style={{
              maxWidth: '420px',
              margin: '5rem auto',
              background: '#12151E',
              border: '1px solid rgba(229, 37, 42, 0.4)',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.7)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(229, 37, 42, 0.15)',
                border: '1px solid var(--primary-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: 'var(--primary-red)'
              }}>
                <Lock size={30} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Accès Direction SPEEDMECA
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '1.75rem' }}>
                Entrez votre code confidentiel pour accéder à l'espace de facturation proforma et devis assurances.
              </p>

              <form onSubmit={handlePinSubmit}>
                <input
                  type="password"
                  autoFocus
                  maxLength={6}
                  placeholder="Code PIN (par défaut : 1234)"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: pinError ? '1px solid #FF3B3F' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    color: '#FFFFFF',
                    letterSpacing: '0.2em',
                    outline: 'none',
                    marginBottom: '1rem'
                  }}
                />

                {pinError && (
                  <div style={{ color: '#FF4D52', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    Code incorrect. Utilisez le code 1234 pour tester.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary-red"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Unlock size={18} />
                  <span>Déverrouiller l'Espace Devis</span>
                </button>
              </form>

              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '1.25rem' }}>
                Accès réservé aux gérants et gestionnaires de sinistres SPEEDMECA
              </div>
            </div>
          ) : (
            /* TAB 1: DASHBOARD & HISTORY */
            activeTab === 'dashboard' && (
              <div>
                {/* Stats Ribbon */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary-red)' }}>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Total Devis Émis</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', marginTop: '0.2rem' }}>
                      {savedDevisList.length}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #00FF66' }}>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Devis Validés</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00FF66', marginTop: '0.2rem' }}>
                      {savedDevisList.filter(d => d.statut === 'Validé').length}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #00E5FF' }}>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Volume Chiffré Global</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00E5FF', marginTop: '0.2rem' }}>
                      {savedDevisList.reduce((acc, curr) => acc + (curr.totalTTC || 0), 0).toLocaleString('fr-FR')} <span style={{ fontSize: '1rem' }}>MAD</span>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #FFB800' }}>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', textTransform: 'uppercase' }}>Dossiers Assurances</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFB800', marginTop: '0.2rem' }}>
                      {savedDevisList.filter(d => d.typeClient === 'assurance').length}
                    </div>
                  </div>
                </div>

                {/* Templates Quick Start Bar */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#FFFFFF', fontSize: '0.95rem' }}>
                      <Sparkles size={18} color="var(--primary-red)" />
                      <span>MODÈLES DE DEVIS PRÉ-CONFIGURÉS (GAIN DE TEMPS)</span>
                    </div>
                    <button
                      onClick={() => startNewDevis()}
                      className="btn-primary-red"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                    >
                      <Plus size={15} />
                      <span>Créer Devis Vierge</span>
                    </button>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                  }}>
                    {TEMPLATES_DEVIS.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => startNewDevis(tmpl)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary-red)';
                          e.currentTarget.style.background = 'rgba(229, 37, 42, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: tmpl.typeClient === 'assurance' ? 'rgba(229, 37, 42, 0.2)' : 'rgba(0, 229, 255, 0.15)',
                            color: tmpl.typeClient === 'assurance' ? '#FF6B6F' : '#00E5FF'
                          }}>
                            {tmpl.typeClient === 'assurance' ? 'ASSURANCE' : 'FLOTTE SOCIÉTÉ'}
                          </span>
                          <ChevronRight size={16} color="#9CA3AF" />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF', margin: '0.5rem 0 0.25rem' }}>
                          {tmpl.nom}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
                          {tmpl.items.length} prestations pré-remplies
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* History Table */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
                      Historique des Devis Générés
                    </h4>

                    {/* Search */}
                    <div style={{ position: 'relative', width: '280px' }}>
                      <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                      <input
                        type="text"
                        placeholder="Rechercher par client, matricule..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.45rem 0.8rem 0.45rem 2.2rem',
                          color: '#FFFFFF',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {savedDevisList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                      Aucun devis enregistré pour le moment. Cliquez sur "Nouveau Devis" pour commencer.
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9CA3AF', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem' }}>N° Devis</th>
                            <th style={{ padding: '0.75rem' }}>Date</th>
                            <th style={{ padding: '0.75rem' }}>Type & Client</th>
                            <th style={{ padding: '0.75rem' }}>Véhicule / Matricule</th>
                            <th style={{ padding: '0.75rem' }}>Montant TTC</th>
                            <th style={{ padding: '0.75rem' }}>Statut</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedDevisList
                            .filter(d => 
                              (d.clientNom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (d.numeroDevis || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (d.vehiculeMatricule || '').toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((devis) => (
                              <tr 
                                key={devis.id} 
                                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#D1D5DB' }}
                              >
                                <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--primary-red)' }}>
                                  {devis.numeroDevis}
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                  {devis.dateEmission}
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{devis.clientNom}</div>
                                  {devis.numeroSinistre && (
                                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Sinistre: {devis.numeroSinistre}</div>
                                  )}
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                  <div>{devis.vehiculeMarque || "N/A"}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#E5252A', fontWeight: 700 }}>{devis.vehiculeMatricule || "N/A"}</div>
                                </td>
                                <td style={{ padding: '0.75rem', fontWeight: 800, color: '#00FF66' }}>
                                  {(devis.totalTTC || 0).toLocaleString('fr-FR')} MAD
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                  <span style={{
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    background: devis.statut === 'Validé' ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                                    color: devis.statut === 'Validé' ? '#00FF66' : '#9CA3AF'
                                  }}>
                                    {devis.statut}
                                  </span>
                                </td>
                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                    <button
                                      onClick={() => handlePreviewSavedDevis(devis)}
                                      title="Aperçu & Impression A4"
                                      style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: 'none',
                                        color: '#FFFFFF',
                                        padding: '0.4rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <Eye size={15} />
                                    </button>
                                    <button
                                      onClick={() => handleEditSavedDevis(devis)}
                                      title="Modifier"
                                      style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: 'none',
                                        color: '#00E5FF',
                                        padding: '0.4rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <Edit3 size={15} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteDevis(devis.id)}
                                      title="Supprimer"
                                      style={{
                                        background: 'rgba(229, 37, 42, 0.15)',
                                        border: 'none',
                                        color: '#FF4D52',
                                        padding: '0.4rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* TAB 2: DEVIS EDITOR FORM */}
          {isAuthenticated && activeTab === 'editor' && (
            <div>
              {/* Action Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1rem'
              }}>
                <button
                  onClick={() => { playClickSound(); setActiveTab('dashboard'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Retour à l'Historique</span>
                </button>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleSaveDevis}
                    className="btn-dark"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
                  >
                    <Save size={16} color="#00FF66" />
                    <span>Enregistrer</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    style={{
                      background: 'rgba(37, 211, 102, 0.15)',
                      border: '1px solid #25D366',
                      color: '#25D366',
                      borderRadius: '8px',
                      padding: '0.55rem 1rem',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Share2 size={16} />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => { playClickSound(); setActiveTab('preview'); }}
                    className="btn-primary-red"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}
                  >
                    <Eye size={16} />
                    <span>Voir Format A4 & Imprimer</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Panel 1: Client & Sinistre Information */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Building2 size={18} color="var(--primary-red)" />
                      <span>DESTINATAIRE DU DEVIS</span>
                    </h4>

                    {/* Toggle Assurance vs Société */}
                    <div style={{
                      display: 'inline-flex',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '2px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <button
                        type="button"
                        onClick={() => setCurrentDevis({ ...currentDevis, typeClient: 'assurance' })}
                        style={{
                          background: currentDevis.typeClient === 'assurance' ? 'var(--primary-red)' : 'transparent',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Assurance
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentDevis({ ...currentDevis, typeClient: 'societe' })}
                        style={{
                          background: currentDevis.typeClient === 'societe' ? 'var(--primary-red)' : 'transparent',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Société / Flotte
                      </button>
                    </div>
                  </div>

                  {/* If Assurance: Quick presets */}
                  {currentDevis.typeClient === 'assurance' && (
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Sélectionner Compagnie d'Assurance :
                      </label>
                      <select
                        value={currentDevis.clientNom}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, clientNom: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#151822',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          padding: '0.6rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      >
                        {ASSURANCES_MAROC.map((ass) => (
                          <option key={ass.id} value={ass.name}>{ass.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {currentDevis.typeClient === 'societe' && (
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Raison Sociale de l'Entreprise :
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Société Transport Atlas SARL"
                        value={currentDevis.clientNom}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, clientNom: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.6rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Sinistre fields if Assurance */}
                  {currentDevis.typeClient === 'assurance' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                          N° Dossier Sinistre :
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: SIN-2026/8941"
                          value={currentDevis.numeroSinistre}
                          onChange={(e) => setCurrentDevis({ ...currentDevis, numeroSinistre: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                            padding: '0.55rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                          Nom de l'Assuré / Conducteur :
                        </label>
                        <input
                          type="text"
                          placeholder="Nom & Prénom"
                          value={currentDevis.nomAssure}
                          onChange={(e) => setCurrentDevis({ ...currentDevis, nomAssure: e.target.value })}
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                            padding: '0.55rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        {currentDevis.typeClient === 'assurance' ? "Cabinet d'Expertise :" : "ICE Entreprise :"}
                      </label>
                      <input
                        type="text"
                        placeholder={currentDevis.typeClient === 'assurance' ? "Ex: Expert Benani" : "001234567000089"}
                        value={currentDevis.typeClient === 'assurance' ? currentDevis.expertNom : currentDevis.clientICE}
                        onChange={(e) => {
                          if (currentDevis.typeClient === 'assurance') {
                            setCurrentDevis({ ...currentDevis, expertNom: e.target.value });
                          } else {
                            setCurrentDevis({ ...currentDevis, clientICE: e.target.value });
                          }
                        }}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Téléphone Contact :
                      </label>
                      <input
                        type="text"
                        placeholder="06 XX XX XX XX"
                        value={currentDevis.clientTelephone}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, clientTelephone: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Panel 2: Véhicule & Document Info */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Car size={18} color="var(--primary-red)" />
                    <span>DONNÉES DU VÉHICULE & DEVIS</span>
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Numéro de Devis :
                      </label>
                      <input
                        type="text"
                        value={currentDevis.numeroDevis}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, numeroDevis: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(229, 37, 42, 0.4)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Date d'Émission :
                      </label>
                      <input
                        type="date"
                        value={currentDevis.dateEmission}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, dateEmission: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Marque & Modèle :
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Dacia Duster 1.5 dCi"
                        value={currentDevis.vehiculeMarque}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, vehiculeMarque: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Immatriculation (Matricule) :
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 12345 | A | 12"
                        value={currentDevis.vehiculeMatricule}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, vehiculeMatricule: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(229, 37, 42, 0.4)',
                          color: '#FF6B6F',
                          fontWeight: 800,
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Kilométrage (km) :
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 145000"
                        value={currentDevis.vehiculeKilometrage}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, vehiculeKilometrage: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        N° Châssis (VIN) :
                      </label>
                      <input
                        type="text"
                        placeholder="17 caractères"
                        value={currentDevis.vehiculeVIN}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, vehiculeVIN: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          outline: 'none',
                          fontFamily: 'monospace'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 3: Prestations & Line Items Table */}
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} color="var(--primary-red)" />
                    <span>LIGNES DE PRESTATIONS, PIÈCES & MAIN D'ŒUVRE</span>
                  </h4>

                  {/* Add Preset Dropdown & Custom Button */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <select
                      onChange={(e) => {
                        const selected = PRESTATIONS_STANDARDS.find(p => p.designation === e.target.value);
                        if (selected) handleAddItem(selected);
                        e.target.value = "";
                      }}
                      style={{
                        background: '#151822',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#D1D5DB',
                        padding: '0.45rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        outline: 'none'
                      }}
                    >
                      <option value="">+ Ajouter tarif standard...</option>
                      {PRESTATIONS_STANDARDS.map((p, i) => (
                        <option key={i} value={p.designation}>
                          [{p.categorie}] {p.designation} ({p.prixHT} DH)
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleAddItem()}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Plus size={14} />
                      <span>Ajouter Ligne Libre</span>
                    </button>
                  </div>
                </div>

                {/* Items Table */}
                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9CA3AF', textAlign: 'left' }}>
                        <th style={{ padding: '0.6rem', width: '30px' }}>#</th>
                        <th style={{ padding: '0.6rem' }}>Désignation Prestation / Pièce</th>
                        <th style={{ padding: '0.6rem', width: '90px', textAlign: 'center' }}>Quantité</th>
                        <th style={{ padding: '0.6rem', width: '140px', textAlign: 'right' }}>P.U. HT (MAD)</th>
                        <th style={{ padding: '0.6rem', width: '130px', textAlign: 'right' }}>Total HT</th>
                        <th style={{ padding: '0.6rem', width: '50px', textAlign: 'center' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDevis.items.map((item, index) => {
                        const lineTotal = Number(item.prixHT || 0) * Number(item.quantite || 1);
                        return (
                          <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '0.6rem', color: '#6B7280', fontWeight: 600 }}>{index + 1}</td>
                            <td style={{ padding: '0.6rem' }}>
                              <input
                                type="text"
                                value={item.designation}
                                onChange={(e) => handleUpdateItem(index, 'designation', e.target.value)}
                                style={{
                                  width: '100%',
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  color: '#FFFFFF',
                                  padding: '0.45rem 0.65rem',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  outline: 'none'
                                }}
                              />
                            </td>
                            <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                              <input
                                type="number"
                                min="1"
                                value={item.quantite}
                                onChange={(e) => handleUpdateItem(index, 'quantite', Number(e.target.value))}
                                style={{
                                  width: '70px',
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  color: '#FFFFFF',
                                  textAlign: 'center',
                                  padding: '0.45rem',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  outline: 'none'
                                }}
                              />
                            </td>
                            <td style={{ padding: '0.6rem', textAlign: 'right' }}>
                              <input
                                type="number"
                                step="10"
                                value={item.prixHT}
                                onChange={(e) => handleUpdateItem(index, 'prixHT', Number(e.target.value))}
                                style={{
                                  width: '110px',
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  color: '#FFFFFF',
                                  textAlign: 'right',
                                  padding: '0.45rem',
                                  borderRadius: '6px',
                                  fontSize: '0.85rem',
                                  outline: 'none'
                                }}
                              />
                            </td>
                            <td style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 700, color: '#00E5FF' }}>
                              {lineTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                            </td>
                            <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  padding: '4px'
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary & Settings Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '1.5rem'
                }}>
                  {/* Left: Notes & Remise */}
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                          Remise Commerciale (%) :
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={currentDevis.remisePourcent}
                          onChange={(e) => setCurrentDevis({ ...currentDevis, remisePourcent: Number(e.target.value) })}
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                            padding: '0.55rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                          Régime TVA :
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#D1D5DB', marginTop: '0.5rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={currentDevis.exonereTVA}
                            onChange={(e) => setCurrentDevis({ ...currentDevis, exonereTVA: e.target.checked })}
                          />
                          <span>Exonéré de TVA (0%)</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', fontWeight: 700 }}>
                        Observations / Notes sur le devis :
                      </label>
                      <textarea
                        rows="2"
                        value={currentDevis.observations}
                        onChange={(e) => setCurrentDevis({ ...currentDevis, observations: e.target.value })}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFFFFF',
                          padding: '0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          outline: 'none',
                          resize: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Right: Calculations Box */}
                  {(() => {
                    const totalHT = currentDevis.items.reduce((sum, item) => sum + (Number(item.prixHT || 0) * Number(item.quantite || 1)), 0);
                    const remiseAmount = (totalHT * (Number(currentDevis.remisePourcent || 0))) / 100;
                    const netHT = totalHT - remiseAmount;
                    const tvaAmount = currentDevis.exonereTVA ? 0 : (netHT * 0.20);
                    const totalTTC = netHT + tvaAmount;

                    return (
                      <div style={{
                        background: 'rgba(15, 18, 26, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                            <span>Total Brut HT :</span>
                            <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{totalHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
                          </div>

                          {Number(currentDevis.remisePourcent || 0) > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00FF66' }}>
                              <span>Remise ({currentDevis.remisePourcent}%) :</span>
                              <span>- {remiseAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                            <span>TVA (20%) :</span>
                            <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{tvaAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
                          </div>
                        </div>

                        <div style={{
                          borderTop: '2px solid var(--primary-red)',
                          paddingTop: '0.75rem',
                          marginTop: '0.75rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline'
                        }}>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>NET À PAYER TTC :</span>
                          <span style={{ fontFamily: 'var(--font-racing)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary-red)' }}>
                            {totalTTC.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span style={{ fontSize: '1rem', color: '#FFFFFF' }}>MAD</span>
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: A4 PREVIEW & DIRECT PRINT */}
          {isAuthenticated && activeTab === 'preview' && (
            <div>
              {/* Action Toolbar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px'
              }}>
                <button
                  onClick={() => { playClickSound(); setActiveTab('editor'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Revenir à l'Éditeur</span>
                </button>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleShareWhatsApp}
                    style={{
                      background: 'rgba(37, 211, 102, 0.15)',
                      border: '1px solid #25D366',
                      color: '#25D366',
                      borderRadius: '8px',
                      padding: '0.55rem 1rem',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Share2 size={16} />
                    <span>Envoyer au Gestionnaire WhatsApp</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="btn-primary-red"
                    style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem' }}
                  >
                    <Printer size={18} />
                    <span>Imprimer / Télécharger en PDF (A4)</span>
                  </button>
                </div>
              </div>

              {/* Printable Component Container */}
              <div style={{
                background: '#1F2430',
                padding: '2rem 1rem',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                overflowX: 'auto'
              }}>
                <PrintableDevis devis={currentDevis} printableRef={printableRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
