import React from 'react';
import { SPEEDMECA_LEGAL } from '../../data/adminData';

// Helper to convert number to French words for quotes
function numberToFrenchWords(n) {
  const units = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingts", "quatre-vingt-dix"];
  
  const num = Math.floor(n);
  if (num < 20) return units[num];
  if (num < 100) {
    const unit = num % 10;
    const ten = Math.floor(num / 10);
    if (ten === 7 || ten === 9) {
      return tens[ten - 1] + "-" + units[10 + unit];
    }
    return tens[ten] + (unit === 1 ? "-et-un" : (unit > 0 ? "-" + units[unit] : ""));
  }
  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    const hStr = hundred === 1 ? "cent" : units[hundred] + " cents";
    return hStr + (remainder > 0 ? " " + numberToFrenchWords(remainder) : "");
  }
  if (num < 1000000) {
    const thousand = Math.floor(num / 1000);
    const remainder = num % 1000;
    const tStr = thousand === 1 ? "mille" : numberToFrenchWords(thousand) + " mille";
    return tStr + (remainder > 0 ? " " + numberToFrenchWords(remainder) : "");
  }
  return num.toString();
}

export function PrintableDevis({ devis, printableRef }) {
  if (!devis) return null;

  const totalHT = devis.items.reduce((sum, item) => sum + (Number(item.prixHT || 0) * Number(item.quantite || 1)), 0);
  const remiseAmount = (totalHT * (Number(devis.remisePourcent || 0))) / 100;
  const netHT = totalHT - remiseAmount;
  const tvaAmount = devis.exonereTVA ? 0 : (netHT * 0.20);
  const totalTTC = netHT + tvaAmount;

  const amountInWords = numberToFrenchWords(Math.round(totalTTC)).toUpperCase();

  return (
    <div 
      ref={printableRef}
      id="speedmeca-official-devis"
      style={{
        background: '#FFFFFF',
        color: '#111827',
        fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
        padding: '30px 40px',
        maxWidth: '850px',
        margin: '0 auto',
        borderRadius: '8px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        fontSize: '13px',
        lineHeight: 1.45,
        position: 'relative'
      }}
    >
      {/* Top Red & Black Stripe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #E5252A 0%, #111827 70%, #E5252A 100%)',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }} />

      {/* Header : SPEEDMECA info + Document Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #E5252A', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#E5252A',
              color: '#FFFFFF',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '18px'
            }}>
              S
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', color: '#111827' }}>
              SPEED<span style={{ color: '#E5252A' }}>MECA</span>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600 }}>
            {SPEEDMECA_LEGAL.enseigne}
          </div>
          <div style={{ fontSize: '11px', color: '#6B7280', maxWidth: '340px', marginTop: '4px' }}>
            {SPEEDMECA_LEGAL.siege}
          </div>
          <div style={{ fontSize: '11px', color: '#111827', fontWeight: 600, marginTop: '2px' }}>
            Tél : {SPEEDMECA_LEGAL.telephoneDisplay} • Email : {SPEEDMECA_LEGAL.email}
          </div>
        </div>

        {/* Right Devis Metadata */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            background: '#111827',
            color: '#FFFFFF',
            padding: '6px 16px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 800,
            display: 'inline-block',
            marginBottom: '8px'
          }}>
            DEVIS ESTIMATIF
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#E5252A' }}>
            N° : {devis.numeroDevis || "DEV-2026-001"}
          </div>
          <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
            Date d'émission : <strong>{devis.dateEmission || new Date().toLocaleDateString('fr-FR')}</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>
            Validité de l'offre : <strong>30 Jours</strong>
          </div>
        </div>
      </div>

      {/* Grid: Client / Assurance Info VS Véhicule / Dossier Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '22px' }}>
        {/* Box Client / Assurance */}
        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '12px 14px',
          background: '#F9FAFB'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#E5252A',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '6px',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            {devis.typeClient === 'assurance' ? "COMPAGNIE D'ASSURANCE / EXPERT" : "SOCIÉTÉ / CLIENT"}
          </div>

          <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginBottom: '4px' }}>
            {devis.clientNom || "Client"}
          </div>
          {devis.typeClient === 'assurance' && devis.numeroSinistre && (
            <div style={{ fontSize: '12px', color: '#1F2937', fontWeight: 600 }}>
              N° Sinistre / Dossier : <span style={{ color: '#E5252A' }}>{devis.numeroSinistre}</span>
            </div>
          )}
          {devis.typeClient === 'assurance' && devis.nomAssure && (
            <div style={{ fontSize: '11px', color: '#4B5563' }}>
              Nom de l'assuré : <strong>{devis.nomAssure}</strong>
            </div>
          )}
          {devis.typeClient === 'assurance' && devis.expertNom && (
            <div style={{ fontSize: '11px', color: '#4B5563' }}>
              Cabinet d'Expertise : <strong>{devis.expertNom}</strong>
            </div>
          )}
          {devis.clientICE && (
            <div style={{ fontSize: '11px', color: '#4B5563' }}>
              ICE : <strong>{devis.clientICE}</strong>
            </div>
          )}
          {devis.clientTelephone && (
            <div style={{ fontSize: '11px', color: '#4B5563' }}>
              Contact : <strong>{devis.clientTelephone}</strong>
            </div>
          )}
        </div>

        {/* Box Véhicule */}
        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '12px 14px',
          background: '#F9FAFB'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '6px',
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: '4px'
          }}>
            IDENTIFICATION DU VÉHICULE
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11px' }}>
            <div>
              <span style={{ color: '#6B7280' }}>Marque & Modèle :</span><br />
              <strong style={{ fontSize: '12px', color: '#111827' }}>{devis.vehiculeMarque || "Non renseigné"}</strong>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Immatriculation :</span><br />
              <strong style={{ fontSize: '12px', color: '#E5252A', background: '#FEE2E2', padding: '1px 6px', borderRadius: '3px' }}>
                {devis.vehiculeMatricule || "WW"}
              </strong>
            </div>
            <div style={{ marginTop: '4px' }}>
              <span style={{ color: '#6B7280' }}>Kilométrage :</span><br />
              <strong>{devis.vehiculeKilometrage ? `${devis.vehiculeKilometrage} km` : "N/A"}</strong>
            </div>
            <div style={{ marginTop: '4px' }}>
              <span style={{ color: '#6B7280' }}>N° Châssis (VIN) :</span><br />
              <strong style={{ fontFamily: 'monospace' }}>{devis.vehiculeVIN || "N/A"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Table of Prestations */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        fontSize: '12px'
      }}>
        <thead>
          <tr style={{ background: '#111827', color: '#FFFFFF' }}>
            <th style={{ padding: '8px 10px', textAlign: 'center', width: '35px', borderRadius: '4px 0 0 0' }}>N°</th>
            <th style={{ padding: '8px 10px', textAlign: 'left' }}>Désignation des Prestations / Pièces & Main d'Œuvre</th>
            <th style={{ padding: '8px 10px', textAlign: 'center', width: '60px' }}>Qté</th>
            <th style={{ padding: '8px 10px', textAlign: 'right', width: '110px' }}>P.U. HT (MAD)</th>
            <th style={{ padding: '8px 10px', textAlign: 'right', width: '120px', borderRadius: '0 4px 0 0' }}>Total HT (MAD)</th>
          </tr>
        </thead>
        <tbody>
          {devis.items && devis.items.map((item, index) => {
            const lineTotal = Number(item.prixHT || 0) * Number(item.quantite || 1);
            return (
              <tr 
                key={index} 
                style={{
                  borderBottom: '1px solid #E5E7EB',
                  background: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                }}
              >
                <td style={{ padding: '8px 10px', textAlign: 'center', color: '#6B7280', fontWeight: 600 }}>
                  {index + 1}
                </td>
                <td style={{ padding: '8px 10px', color: '#1F2937', fontWeight: 500 }}>
                  {item.designation}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'center', color: '#1F2937' }}>
                  {item.quantite}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'right', color: '#1F2937' }}>
                  {Number(item.prixHT || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>
                  {lineTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Financial Summary & Amount in Words */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginBottom: '24px' }}>
        {/* Left Notes & Amount in Words */}
        <div>
          <div style={{
            background: '#F3F4F6',
            border: '1px dashed #D1D5DB',
            borderRadius: '6px',
            padding: '10px 12px',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, marginBottom: '2px' }}>
              Arrêté le présent devis estimatif à la somme TTC de :
            </div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#111827' }}>
              {amountInWords} DIRHAMS TTC.
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#4B5563' }}>
            <strong>Observations / Modalités :</strong>
            <p style={{ margin: '3px 0 0', color: '#6B7280' }}>
              {devis.observations || "Intervention réalisée selon les normes constructeur. Pièces d'origine garanties. Dépannage et remorquage agréés avec compte-rendu d'intervention."}
            </p>
          </div>
        </div>

        {/* Right Financial Breakdown */}
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          padding: '12px 14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px', color: '#4B5563' }}>
            <span>Total Brut HT :</span>
            <span style={{ fontWeight: 600 }}>{totalHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
          </div>

          {Number(devis.remisePourcent || 0) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px', color: '#059669' }}>
              <span>Remise ({devis.remisePourcent}%) :</span>
              <span>- {remiseAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px', color: '#4B5563', borderTop: '1px solid #E5E7EB' }}>
            <span>Total Net HT :</span>
            <span style={{ fontWeight: 700 }}>{netHT.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px', color: '#4B5563' }}>
            <span>TVA (20%) {devis.exonereTVA ? "(Exonérée)" : ""} :</span>
            <span style={{ fontWeight: 600 }}>{tvaAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0 4px',
            marginTop: '6px',
            borderTop: '2px solid #E5252A',
            fontSize: '15px',
            fontWeight: 900,
            color: '#111827'
          }}>
            <span>TOTAL TTC :</span>
            <span style={{ color: '#E5252A' }}>{totalTTC.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD</span>
          </div>
        </div>
      </div>

      {/* Signatures & Stamp Block */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', borderTop: '1px solid #E5E7EB', paddingTop: '16px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', border: '1px dashed #D1D5DB', borderRadius: '6px', padding: '10px 10px 45px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#4B5563' }}>
            Bon pour accord / Cachet & Signature du Client / Expert
          </div>
          <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '3px' }}>
            (Précédé de la mention manuscrite "Bon pour accord")
          </div>
        </div>

        {/* Official SPEEDMECA Stamp */}
        <div style={{
          textAlign: 'center',
          border: '1px solid #E5252A',
          borderRadius: '6px',
          padding: '10px',
          background: 'rgba(229, 37, 42, 0.02)',
          position: 'relative'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#E5252A' }}>
            SPEEDMECA - DIRECTION TECHNIQUE
          </div>

          {/* Virtual Cachet Stamp */}
          <div style={{
            display: 'inline-block',
            border: '2px solid #1D4ED8',
            borderRadius: '50%',
            padding: '10px 14px',
            color: '#1D4ED8',
            fontFamily: 'monospace',
            fontWeight: 900,
            fontSize: '10px',
            transform: 'rotate(-7deg)',
            margin: '8px 0 4px',
            boxShadow: 'inset 0 0 4px rgba(29, 78, 216, 0.2)'
          }}>
            ★ SPEEDMECA SARL ★<br />
            ATELIER & DÉPANNAGE 24/7<br />
            AZILAL - MAROC<br />
            ICE: {SPEEDMECA_LEGAL.ice}
          </div>
        </div>
      </div>

      {/* Legal Footer Moroccan Companies Mentions */}
      <div style={{
        borderTop: '1px solid #E5E7EB',
        paddingTop: '10px',
        textAlign: 'center',
        fontSize: '9.5px',
        color: '#6B7280',
        lineHeight: 1.5
      }}>
        <strong>{SPEEDMECA_LEGAL.raisonSociale}</strong> au Capital Social • Siège Social : {SPEEDMECA_LEGAL.siege} • Tél : {SPEEDMECA_LEGAL.telephoneDisplay}<br />
        ICE : <strong>{SPEEDMECA_LEGAL.ice}</strong> • R.C. : <strong>{SPEEDMECA_LEGAL.rc}</strong> • I.F. : <strong>{SPEEDMECA_LEGAL.ifNum}</strong> • Patente : <strong>{SPEEDMECA_LEGAL.patente}</strong> • CNSS : <strong>{SPEEDMECA_LEGAL.cnss}</strong><br />
        RIB Bancaire : {SPEEDMECA_LEGAL.rib}
      </div>
    </div>
  );
}
