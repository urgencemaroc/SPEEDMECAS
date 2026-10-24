export const SPEEDMECA_LEGAL = {
  raisonSociale: "SPEEDMECA SARL-AU",
  enseigne: "SPEEDMECA PERFORMANCE & DÉPANNAGE",
  activite: "Mécanique générale, Diagnostic Électronique, Reprogrammation ECU, Carrosserie, Dépannage et Remorquage 24/7",
  siege: "Quartier Administratif / الحي الإداري, Azilal 22000 (Maroc)",
  telephone: "0600825216",
  telephoneDisplay: "06 00 82 52 16",
  email: "contact@speedmeca.ma",
  ice: "002984712000084",
  rc: "4892 / Azilal",
  ifNum: "52891423",
  patente: "36291480",
  cnss: "7419823",
  rib: "007 050 0001234567890123 45 (Attijariwafa Bank - Agence Azilal)",
};

export const ASSURANCES_MAROC = [
  { id: "wafa", name: "Wafa Assurance", address: "Boulevard Abdelmoumen, Casablanca", telephone: "0522 54 55 55" },
  { id: "rma", name: "RMA (Royale Marocaine d'Assurance)", address: "Boulevard Mohamed V, Casablanca", telephone: "0522 43 60 00" },
  { id: "sanlam", name: "Sanlam Maroc (Ex Saham)", address: "Boulevard d'Anfa, Casablanca", telephone: "0522 42 06 06" },
  { id: "atlantasanad", name: "AtlantaSanad Assurance", address: "Route d'El Jadida, Casablanca", telephone: "0522 95 76 76" },
  { id: "axa", name: "AXA Assurance Maroc", address: "120-122 Avenue Hassan II, Casablanca", telephone: "0522 88 92 92" },
  { id: "mamda", name: "MAMDA - MCMA", address: "Boulevard Zerktouni, Casablanca / Agence Azilal", telephone: "0523 45 12 80" },
  { id: "allianz", name: "Allianz Maroc", address: "Boulevard Brahim Roudani, Casablanca", telephone: "0522 46 80 00" },
  { id: "autre_assurance", name: "Autre Compagnie / Cabinet d'Expertise", address: "Azilal / Béni Mellal", telephone: "" }
];

export const PRESTATIONS_STANDARDS = [
  { designation: "Dépannage & Remorquage plateau sur route (Azilal & Régions)", categorie: "Depannage", prixHT: 650, quantite: 1 },
  { designation: "Remorquage d'urgence de nuit / jour férié avec treuillage", categorie: "Depannage", prixHT: 950, quantite: 1 },
  { designation: "Diagnostic Électronique complet multi-calculateurs (Scanner DTC)", categorie: "Diagnostic", prixHT: 350, quantite: 1 },
  { designation: "Recherche de panne approfondie & Test actionneurs", categorie: "Diagnostic", prixHT: 450, quantite: 1 },
  { designation: "Reprogrammation / Remplacement calculateur moteur (ECU/BSI)", categorie: "Electronique", prixHT: 1800, quantite: 1 },
  { designation: "Main d'œuvre mécanique générale T1 (Heure)", categorie: "Mecanique", prixHT: 250, quantite: 1 },
  { designation: "Main d'œuvre mécanique spécialisée & Haute Tension T2 (Heure)", categorie: "Mecanique", prixHT: 350, quantite: 1 },
  { designation: "Remplacement kit de distribution et pompe à eau", categorie: "Mecanique", prixHT: 1400, quantite: 1 },
  { designation: "Remplacement système de freinage complet (Disques + Plaquettes)", categorie: "Mecanique", prixHT: 850, quantite: 1 },
  { designation: "Vidange moteur synthèse 100% avec pack 4 filtres", categorie: "Entretien", prixHT: 900, quantite: 1 },
  { designation: "Réparation carrosserie & Redressage élément tôlerie", categorie: "Carrosserie", prixHT: 600, quantite: 1 },
  { designation: "Peinture et traitement apprêt cabine (par élément)", categorie: "Carrosserie", prixHT: 750, quantite: 1 },
  { designation: "Réglage géométrie et parallélisme laser train roulant", categorie: "Mecanique", prixHT: 300, quantite: 1 },
  { designation: "Nettoyage & régénération forcée FAP / Décalaminage hydrogène", categorie: "Mecanique", prixHT: 700, quantite: 1 }
];

export const TEMPLATES_DEVIS = [
  {
    id: "sinistre-remorquage-assurance",
    nom: "Assurance : Sinistre Remorquage & Diagnostic",
    typeClient: "assurance",
    items: [
      { designation: "Dépannage & Remorquage plateau d'urgence sur route (Région Azilal)", prixHT: 850, quantite: 1 },
      { designation: "Diagnostic Électronique et lecture mémoire défauts post-sinistre", prixHT: 350, quantite: 1 },
      { designation: "Contrôle géométrie train roulant et inspection soubassement", prixHT: 300, quantite: 1 }
    ]
  },
  {
    id: "flotte-entretien-societe",
    nom: "Société : Entretien & Révision Flotte Véhicules",
    typeClient: "societe",
    items: [
      { designation: "Vidange complète huile de synthèse certifiée 5W30 + 4 filtres", prixHT: 850, quantite: 1 },
      { designation: "Diagnostic électronique de santé préventif multi-systèmes", prixHT: 300, quantite: 1 },
      { designation: "Remplacement plaquettes de frein avant & arrière", prixHT: 650, quantite: 1 },
      { designation: "Contrôle 35 points de sécurité & rapport de visite", prixHT: 200, quantite: 1 }
    ]
  },
  {
    id: "sinistre-choc-reparation",
    nom: "Assurance : Réparation Mécanique & Carrosserie Choc",
    typeClient: "assurance",
    items: [
      { designation: "Dépannage & Remorquage plateau vers atelier SPEEDMECA", prixHT: 650, quantite: 1 },
      { designation: "Dépose / Repose face avant, bouclier et éléments mécaniques", prixHT: 900, quantite: 1 },
      { designation: "Redressage tôlerie & alignement longerons / berceau", prixHT: 1500, quantite: 1 },
      { designation: "Peinture cabine avec vernis anti-rayures (2 éléments)", prixHT: 1500, quantite: 1 },
      { designation: "Contrôle géométrie laser et essai sur route", prixHT: 300, quantite: 1 }
    ]
  }
];
