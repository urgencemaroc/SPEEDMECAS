export const SPEEDMECA_INFO = {
  name: "SPEEDMECA",
  taglineFr: "Performance Automobile, Diagnostic Électronique & SOS Dépannage 24/7",
  taglineAr: "برمجة العقول، الصيانة الدقيقة وخدمات إغاثة السيارات 24/7",
  phone: "0600825216",
  phoneInternational: "+212600825216",
  phoneDisplay: "06 00 82 52 16",
  addressFr: "Quartier Administratif, Azilal (Maroc)",
  addressAr: "الحي الإداري، أزيلال (المغرب)",
  gpsLat: 31.9619,
  gpsLng: -6.5658,
  openingHoursFr: "Lun - Sam : 08h30 - 20h00 | Urgence SOS : 24h/24 & 7j/7",
  openingHoursAr: "الإثنين - السبت: 08:30 - 20:00 | طوارئ الإغاثة: 24/24 و 7/7",
  interventionTime: "15 à 30 min",
  serviceZones: ["Azilal Centre", "Ouzoud", "Demnate", "Afourer", "Beni Mellal", "Ait Bouguemez", "Bin El Ouidane"]
};

export const SERVICES = [
  {
    id: "diagnostic-electronique",
    number: "01",
    titleFr: "Diagnostic Électronique",
    titleAr: "دياكونوستيك شامل",
    category: "electronique",
    shortDescFr: "Scanner multi-calculateurs de pointe, lecture & suppression des codes défauts (DTC) pour toutes marques.",
    shortDescAr: "فحص إلكتروني شامل بأحدث أجهزة السكانير متعددة الأنظمة لقراءة ومسح الأعطال لجميع أنواع السيارات.",
    featuresFr: [
      "Scanner multi-calculateurs (Moteur, ABS, Airbag, BVA, Confort)",
      "Lecture des flux de données en temps réel (Live Data)",
      "Réinitialisation vidange & étalonnage capteurs (Angle volant, injecteurs)",
      "Analyse sondes Lambda, filtre à particules (FAP) et vanne EGR"
    ],
    featuresAr: [
      "فحص العقول الإلكترونية المتعددة (محرك، فرامل ABS، وسائد هوائية، علبة سرعات)",
      "قراءة البيانات الحية والمعايير اللحظية بدقة متناهية",
      "إعادة ضبط مؤشرات الصيانة ومعايرة الحساسات والبخاخات",
      "فحص حساسات الشكمان، دبة البيئة (FAP) ونظام EGR"
    ],
    icon: "Cpu",
    badgeFr: "Précision 100%",
    badgeAr: "دقة 100%",
    image: "/images/speedmeca_tuning.jpg",
    highlight: "Compatible tous véhicules européens, asiatiques et américains."
  },
  {
    id: "reprogrammation-ecu",
    number: "02",
    titleFr: "Reprogrammation ECU & Solutions OBD",
    titleAr: "برمجة العقول الإلكترونية (ECU)",
    category: "performance",
    shortDescFr: "Cartographie moteur sur-mesure développée sur banc, optimisation des paramètres d'injection et suppression électronique.",
    shortDescAr: "تعديل خريطة المحرك بدقة عالية عبر منفذ OBD، تحسين الاستجابة وبرمجة الحلول الإلكترونية المتقدمة.",
    featuresFr: [
      "Cartographie sur mesure adaptée au carburant et moteur",
      "Solutions logicielles DPF/FAP, EGR, AdBlue/SCR off",
      "Suppression limiteur de vitesse & Vmax unlock",
      "Optimisation de la consommation de carburant (-0.5L à -1L/100km)"
    ],
    featuresAr: [
      "برمجة خرائط مخصصة متوافقة مع نوع المحرك والوقود",
      "حلول برمجية لإلغاء مشاكل الفلتر FAP، صمام EGR ومحلول AdBlue",
      "فك محدد السرعة القصوى V-Max وتفعيل خيارات رياضية",
      "تقليل استهلاك الوقود مع تحسين عزم الدوران وسلاسة القيادة"
    ],
    icon: "Binary",
    badgeFr: "Sur-mesure",
    badgeAr: "تعديل خاص",
    image: "/images/speedmeca_tuning.jpg",
    highlight: "Lecture & écriture sécurisée par OBD ou Boot/Bench sans risque."
  },
  {
    id: "mecanique-hybride",
    number: "03",
    titleFr: "Mécanique & Diagnostic Hybride",
    titleAr: "ميكانيك السيارات الهجينة (Hybride)",
    category: "mecanique",
    shortDescFr: "Expertise certifiée haute tension : contrôle de santé des batteries lithium/NiMH, onduleurs et circuits régénératifs.",
    shortDescAr: "خبرة معتمدة في صيانة الأنظمة الكهربائية عالية التوتر، فحص صحة البطاريات والمحولات وأنظمة الشحن الذاتي.",
    featuresFr: [
      "Diagnostic de santé et équilibrage des cellules de batterie HT",
      "Contrôle de l'onduleur (Inverter) et du générateur électrique",
      "Maintenance du circuit de refroidissement liquide haute tension",
      "Entretien du système de freinage régénératif by-wire"
    ],
    featuresAr: [
      "فحص كفاءة وتوازن خلايا بطارية الجهد العالي (SOH test)",
      "مراقبة أداء المحول الكهربائي ونظام إدارة الشحن",
      "صيانة دورات التبريد الخاصة بالبطاريات والمحركات الكهربائية",
      "صيانة دورة الفرامل الذكية واستعادة الطاقة الحركية"
    ],
    icon: "Zap",
    badgeFr: "Haute Tension",
    badgeAr: "جهد عالي",
    image: "/images/speedmeca_hero.jpg",
    highlight: "Équipements isolés 1000V conformes aux normes de sécurité électrique."
  },
  {
    id: "stage-power",
    number: "04",
    titleFr: "Augmentation de Puissance Stage 1 & 2",
    titleAr: "زيادة القوة والعزم (Stage 1 & 2)",
    category: "performance",
    shortDescFr: "Boostez les performances de votre véhicule : +35 à +65 chevaux et +70 à +140 Nm de couple instantané en toute fiabilité.",
    shortDescAr: "رفع قوة وعزم المحرك بشكل ملحوظ (+35 إلى +65 حصان و +70 إلى +140 نيوتن.متر) مع الحفاظ على سلامة المحرك.",
    featuresFr: [
      "Stage 1 : Gain moyen +35 HP / +70 Nm sans modification mécanique",
      "Stage 2 : Jusqu'à +65 HP / +130 Nm avec admission & downpipe",
      "Réponse accélérateur immédiate sans temps de latence turbo",
      "Option Pop & Bang, Crackle map, Launch control & Hard cut"
    ],
    featuresAr: [
      "المرحلة الأولى (Stage 1): زيادة قياسية +35 حصان / +70 ن.م بدون أي قطع غيار",
      "المرحلة الثانية (Stage 2): زيادة تصل إلى +65 حصان / +130 ن.م مع تعديل العادم والفلتر",
      "استجابة فورية لدواسة الوقود وإلغاء تأخر التيربو (Turbo Lag)",
      "إمكانية تفعيل أصوات الطرقعة الرياضية (Pop & Bang) والإنطلاق السريع (Launch Control)"
    ],
    icon: "Gauge",
    badgeFr: "+35HP / +70Nm",
    badgeAr: "+35 حصان / +70 ن.م",
    image: "/images/speedmeca_tuning.jpg",
    highlight: "Respect scrupuleux des tolérances constructeur moteur et boîte de vitesses."
  },
  {
    id: "mecanique-entretien",
    number: "05",
    titleFr: "Mécanique & Entretien Rapide",
    titleAr: "الميكانيك الخفيف والصيانة السريعة",
    category: "mecanique",
    shortDescFr: "Entretien périodique méticuleux, vidange huiles de synthèse certifiées, freinage et révision générale immédiate.",
    shortDescAr: "صيانة دورية دقيقة، تغيير الزيوت التخليقية المعتمدة، فرامل، فلاتر، وأحزمة المحرك بأعلى جودة وسرعة.",
    featuresFr: [
      "Vidange avec huiles synthétiques 100% homologuées (Castrol, Motul, Liqui Moly)",
      "Changement filtres (Huile, Air, Carburant, Habitacle)",
      "Système de freinage haute sécurité (Plaquettes, Disques, Liquide DOT4/5.1)",
      "Kit courroie de distribution, pompe à eau & courroie d'accessoires"
    ],
    featuresAr: [
      "تغيير الزيوت التخليقية 100% المعتمدة لأعلى حماية للمحرك",
      "استبدال الفلاتر الأصلية (فلتر الزيت، الهواء، الوقود، والمكيف)",
      "صيانة وتغيير منظومة الفرامل (تيل الفرامل، الأقراص وزيت الفرامل)",
      "تغيير حزام التوقيت (Courroie Distribution) ومضخة الماء"
    ],
    icon: "Wrench",
    badgeFr: "Service Express",
    badgeAr: "خدمة سريعة",
    image: "/images/speedmeca_hero.jpg",
    highlight: "Vérification systématique de 30 points de contrôle de sécurité offerte."
  },
  {
    id: "covering-habillage",
    number: "06",
    titleFr: "Covering & Habillage Véhicules",
    titleAr: "تغليف وتجليد السيارات (Covering)",
    category: "esthetique",
    shortDescFr: "Transformation visuelle haut de gamme : covering complet ou partiel, films vinyle thermoformables (Mat, Satin, Carbone).",
    shortDescAr: "تغيير مظهر السيارة بالكامل بأحدث أفلام الفينيل المقاومة (مات، ساتان، لمعة فائقة أو كربون فايبر 3D/4D).",
    featuresFr: [
      "Total Covering & Semi-Covering (Toit noir brillant, rétroviseurs, calandre)",
      "Films vinyles premium 3M, Avery Dennison & Hexis",
      "Protection de la peinture d'origine contre rayures et éclats de pierre",
      "Dépose facile et garantie sans aucun résidu de colle"
    ],
    featuresAr: [
      "تجليد كلي أو جزئي (سقف أسود بانورامي، مرايا، خطوط رياضية)",
      "أفلام فينيل عالمية مقاومة للعوامل الجوية وأشعة الشمس الحارقة",
      "حماية دهان السيارة الأصلي من الخدوش وتطاير الحصى في الطريق",
      "إمكانية إزالة التغليف بسهولة دون ترك أي أثر على الصباغة الأصلية"
    ],
    icon: "Layers",
    badgeFr: "Design Premium",
    badgeAr: "مظهر فاخر",
    image: "/images/speedmeca_covering.jpg",
    highlight: "Finitions millimétrées dans notre cabine antipoussière dédiée."
  },
  {
    id: "vitres-teintees",
    number: "07",
    titleFr: "Vitres Teintées Anti-UV",
    titleAr: "تظليل الزجاج الحراري (Anti-UV)",
    category: "esthetique",
    shortDescFr: "Films solaires nano-céramiques haute performance : réjection de la chaleur jusqu'à 85% et blocage 99% des rayons UV.",
    shortDescAr: "أفلام نانو سيراميك عازلة للحرارة بنسبة تفوق 85% وحاجبة للأشعة فوق البنفسجية بنسبة 99% لحماية الركاب والفرش.",
    featuresFr: [
      "Réjection thermique ultra-efficace pour un habitacle frais en été",
      "Protection anti-UV 99% préservant cuirs et tableau de bord",
      "Renfort anti-effraction retardateur de bris de glace",
      "Différentes teintes homologuées selon vos préférences"
    ],
    featuresAr: [
      "عزل حراري فائق يخفف حرارة المقصورة ويقلل من استهلاك المكيف",
      "حماية كاملة من الأشعة فوق البنفسجية للحفاظ على الجلد والديكور",
      "خاصية الأمان ضد الكسر والسرقة لتماسك الزجاج عند الصدمات",
      "درجات تعتيم متعددة ومطابقة لمعايير السلامة المرورية"
    ],
    icon: "ShieldAlert",
    badgeFr: "Nano-Céramique",
    badgeAr: "نانو سيراميك",
    image: "/images/speedmeca_covering.jpg",
    highlight: "Garantie anti-bulles et anti-décoloration longue durée."
  },
  {
    id: "personnalisation-interieure",
    number: "08",
    titleFr: "Personnalisation Intérieure",
    titleAr: "تعديل الديكور والتجهيز الداخلي",
    category: "esthetique",
    shortDescFr: "Élevez le standing de votre habitacle : volants sport Alcantara/Carbone avec LED Shift, éclairage d'ambiance RGB connecté.",
    shortDescAr: "ترقية مقصورة القيادة : مقود رياضي كربون وألكنتارا مع مؤشر LED، إضاءة محيطية RGB ذكية تمنح فخامة استثنائية.",
    featuresFr: [
      "Volants sport personnalisés (Carbone véritable, cuir perforé, Alcantara)",
      "Volants à affichage LED Shift & télémétrie en temps réel",
      "Éclairage d'ambiance Ambient Light RGB multi-couleurs pilotable par smartphone",
      "Habillage inserts tableau de bord en carbone véritable ou noir laqué"
    ],
    featuresAr: [
      "مقود رياضي مخصص (كربون حقيقي، جلد مخرم، ألكنتارا ألماني)",
      "شاشات LED مدمجة بالمقود لعرض دورات المحرك وسرعة النقلات",
      "إضاءة داخلية محيطية Ambient Light متعددة الألوان عبر تطبيق الهاتف",
      "تزيين لوحة القيادة بألياف الكربون ولمسات رياضية مميزة"
    ],
    icon: "Sparkles",
    badgeFr: "Sport & Confort",
    badgeAr: "فخامة ورياضة",
    image: "/images/speedmeca_covering.jpg",
    highlight: "Intégration invisible respectant l'électronique de bord d'origine."
  },
  {
    id: "kits-decor-exterieur",
    number: "09",
    titleFr: "Kits & Décor Extérieur",
    titleAr: "تعديل الديكور الخارجي والكتات الرياضية",
    category: "esthetique",
    shortDescFr: "Lames avant aérodynamiques, diffuseurs sport avec doubles sorties, becquets carbone et calandres sportives type Black Edition.",
    shortDescAr: "تجهيز السيارة بكتات رياضية هوائية : سبويلرات كربون، مشتتات هواء خلفية، شبك رياضي ولمسات هجومية لافتة.",
    featuresFr: [
      "Lames de pare-chocs avant & jupes latérales sportives",
      "Diffuseurs arrière racing adaptés pour sorties d'échappement sport",
      "Ailerons & becquets de coffre en véritable fibre de carbone",
      "Calandres sportives (Panamericana, M-Performance, RS-Honeycomb)"
    ],
    featuresAr: [
      "شفة أمامية رياضية (Front Lip) وتنانير جانبية ديناميكية",
      "مشتت هواء خلفي رياضي (Diffuser) بتصاميم تنافسية",
      "جناح خلفي (Spoiler) من ألياف الكربون لمظهر هجومي وثبات أعلى",
      "شبكات تهوية رياضية (Panamericana, M-Performance, RS-Honeycomb)"
    ],
    icon: "Sliders",
    badgeFr: "Aéro & Style",
    badgeAr: "مظهر رياضي",
    image: "/images/speedmeca_covering.jpg",
    highlight: "Fixation rigide et calibrée pour résister aux hautes vitesses."
  },
  {
    id: "echappement-clapets",
    number: "10",
    titleFr: "Échappement & Clapets Valvetronic",
    titleAr: "تعديل العادم والأنظمة الصوتية (Valvetronic)",
    category: "performance",
    shortDescFr: "Lignes d'échappement sport en acier inoxydable avec clapets pilotés par télécommande : alternez entre discrétion et sonorité agressive.",
    shortDescAr: "أنظمة عادم رياضية متطورة من الستانلس ستيل مع صمامات كهربائية ذكية للتحكم بالصوت (هادئ للمدينة أو رياضي صاخب).",
    featuresFr: [
      "Clapets d'échappement Valvetronic commandés par télécommande ou bouton cabine",
      "Fabrication et soudure TIG de lignes inox 304L haute température",
      "Embouts d'échappement sur-mesure (Carbone Akrapovic, Titane bleui, Inox brossé)",
      "Optimisation de l'écoulement des gaz pour un gain de puissance et son rauque"
    ],
    featuresAr: [
      "صمامات فالفترونيك Valvetronic لاسلكية للتبديل الفوري بين صوت الوكالة والصوت الرياضي",
      "تصنيع وتلحيم أنابيب الستانلس ستيل 304L المقاوم للحرارة العالية والصدمات",
      "مخارج عادم مخصصة (كربون أكرافوفيتش، تيتانيوم أزرق أو ستانلس مصقول)",
      "تحسين تدفق غازات العادم لزيادة عزم المحرك واستخراج نغمة محرك أصيلة"
    ],
    icon: "Volume2",
    badgeFr: "Son Double Mode",
    badgeAr: "تحكم بالصوت",
    image: "/images/speedmeca_hero.jpg",
    highlight: "Passez du mode 'Silencieux Confort' au mode 'Sport Race' en un clic."
  }
];

export const VEHICLE_DATABASE = [
  { id: "golf-tdi", name: "Volkswagen Golf 7 / 8 2.0 TDI", stockHp: 150, stockNm: 340, stage1Hp: 195, stage1Nm: 420, stage2Hp: 220, stage2Nm: 460 },
  { id: "bmw-320d", name: "BMW Série 3 320d / 330d (G20/F30)", stockHp: 190, stockNm: 400, stage1Hp: 230, stage1Nm: 480, stage2Hp: 260, stage2Nm: 530 },
  { id: "audi-a3-tfsi", name: "Audi A3 / A4 2.0 TFSI", stockHp: 190, stockNm: 320, stage1Hp: 245, stage1Nm: 420, stage2Hp: 285, stage2Nm: 470 },
  { id: "mercedes-c220d", name: "Mercedes-Benz Classe C 220d", stockHp: 194, stockNm: 400, stage1Hp: 235, stage1Nm: 480, stage2Hp: 265, stage2Nm: 530 },
  { id: "dacia-duster", name: "Dacia Duster / Sandero 1.5 dCi", stockHp: 110, stockNm: 260, stage1Hp: 145, stage1Nm: 330, stage2Hp: 160, stage2Nm: 360 },
  { id: "hyundai-tucson", name: "Hyundai Tucson / Kia Sportage 1.6 CRDi / T-GDi", stockHp: 136, stockNm: 320, stage1Hp: 175, stage1Nm: 400, stage2Hp: 195, stage2Nm: 430 }
];
