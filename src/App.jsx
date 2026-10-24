import React, { useState } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesCatalog } from './components/ServicesCatalog';
import { PowerSimulator } from './components/PowerSimulator';
import { ValvetronicExhaustDemo } from './components/ValvetronicExhaustDemo';
import { WorkshopLocation } from './components/WorkshopLocation';
import { Footer } from './components/Footer';
import { SosModal } from './components/SosModal';
import { BusinessCardModal } from './components/BusinessCardModal';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { ShieldAlert, FileText } from 'lucide-react';
import { SPEEDMECA_INFO } from './data/servicesData';
import { playSosPulse, playClickSound } from './utils/soundEffects';

export function App() {
  const [lang, setLang] = useState('bilingual'); // 'fr' | 'ar' | 'bilingual'
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);

  const handleOpenSos = () => {
    playSosPulse();
    setIsSosOpen(true);
  };

  const handleOpenCard = () => {
    setIsCardOpen(true);
  };

  const handleOpenAdmin = () => {
    playClickSound();
    setIsAdminOpen(true);
  };

  const handleBookService = (service) => {
    setSelectedServiceForBooking(service);
    setIsAppointmentOpen(true);
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulateur');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToValvetronic = () => {
    const el = document.getElementById('valvetronic');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`app-root ${lang === 'ar' ? 'lang-ar' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 24/7 SOS Emergency Top Banner */}
      <EmergencyBanner 
        lang={lang} 
        onOpenSos={handleOpenSos} 
      />

      {/* Navigation Header with Espace Devis button */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onOpenSos={handleOpenSos} 
        onOpenCard={handleOpenCard} 
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero 
          lang={lang} 
          onOpenSos={handleOpenSos} 
          onOpenCard={handleOpenCard} 
        />

        {/* 10 Services Catalog */}
        <ServicesCatalog 
          lang={lang} 
          onBookService={handleBookService}
          onOpenSimulator={handleScrollToSimulator}
          onOpenValvetronic={handleScrollToValvetronic}
        />

        {/* Interactive Power Simulator (Stage 1 & 2) */}
        <PowerSimulator 
          onBookWithCar={handleBookService} 
        />

        {/* Valvetronic Exhaust Sound Demo */}
        <ValvetronicExhaustDemo 
          onBookService={handleBookService} 
        />

        {/* Workshop Location & Map */}
        <WorkshopLocation />
      </main>

      {/* Footer */}
      <Footer 
        onOpenSos={handleOpenSos} 
        onOpenCard={handleOpenCard} 
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating Action SOS & Admin Quick Buttons (Bottom Right) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        alignItems: 'flex-end'
      }}>
        {/* Quick Espace Devis Admin Float Button */}
        <button
          onClick={handleOpenAdmin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(14, 16, 22, 0.95)',
            border: '1px solid var(--border-glow)',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '0.55rem 1rem',
            fontWeight: 700,
            fontSize: '0.82rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
          title="Ouvrir l'Espace Devis & Assurances"
        >
          <FileText size={16} color="var(--primary-red)" />
          <span>Devis Assurances & Sociétés</span>
        </button>

        {/* SOS 24/7 Red Alert Button */}
        <button
          onClick={handleOpenSos}
          className="btn-sos-glow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'linear-gradient(135deg, #FF1E27 0%, #8A0B10 100%)',
            color: '#FFFFFF',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '9999px',
            padding: '0.85rem 1.4rem',
            fontWeight: 900,
            fontSize: '0.95rem',
            boxShadow: '0 8px 30px rgba(229, 37, 42, 0.65)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          aria-label="SOS 24/7 Dépannage"
        >
          <ShieldAlert size={22} color="#FFFFFF" strokeWidth={2.4} />
          <span>SOS DÉPANNAGE 24/7</span>
        </button>
      </div>

      {/* Modals */}
      <SosModal 
        isOpen={isSosOpen} 
        onClose={() => setIsSosOpen(false)} 
      />

      <BusinessCardModal 
        isOpen={isCardOpen} 
        onClose={() => setIsCardOpen(false)} 
      />

      <AppointmentModal 
        isOpen={isAppointmentOpen} 
        onClose={() => setIsAppointmentOpen(false)} 
        initialService={selectedServiceForBooking} 
      />

      {/* Administration & Quotes Generator for Companies & Insurances */}
      <AdminPortal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}

export default App;
