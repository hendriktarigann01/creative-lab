import { TimelinePhase } from '../types';

export const servicesOverviewHeader: Record<string, { heading: string; gradientWord: string; subheading: string }> = {
  en: {
    heading: 'Our Services',
    gradientWord: 'Services',
    subheading: 'From enterprise-grade platforms to immersive gamification—we deliver the full spectrum of digital innovation.',
  },
  id: {
    heading: 'Layanan Kami',
    gradientWord: 'Layanan',
    subheading: 'Dari platform tingkat perusahaan hingga gamifikasi imersif—kami menghadirkan spektrum penuh inovasi digital.',
  }
};

export const servicesOverviewAccordion: Record<string, Array<{
  title: string;
  slug: string;
  color: string;
  tagline: string;
  description: string;
  highlights: string[];
  stat: string;
  statLabel: string;
}>> = {
  en: [
    {
      title: 'Enterprise & B2G Solutions',
      slug: 'enterprise-b2g-solutions',
      color: '#3b82f6',
      tagline: 'Efficiency, Data Security, and Scalability.',
      description: 'We architect robust, secure, and scalable software ecosystems for enterprises and government institutions. Our solutions are built to handle mission-critical operations with zero compromise on performance or security.',
      highlights: [
        'HRIS, CRM & Project Management',
        'Real-time Command Center Dashboards',
        'Multi-device CMS Networks',
        'QR/RFID Asset Tracking',
      ],
      stat: '12,000+',
      statLabel: 'Devices Managed',
    },
    {
      title: 'Gamification & Games',
      slug: 'gamification-games',
      color: '#8b5cf6',
      tagline: 'Retention, Brand Recall, and ROI.',
      description: 'We create immersive, gamified experiences that drive engagement, boost brand recall, and deliver measurable ROI through interactive play. From motion-sensor games to AR activations, we turn physical spaces into digital playgrounds.',
      highlights: [
        'Kinect/Lidar Motion Games',
        'Augmented Reality Activations',
        'Social Media LED Walls',
        'Phygital Leaderboard Systems',
      ],
      stat: '2M+',
      statLabel: 'User Interactions',
    },
    {
      title: 'Interactive Experiences',
      slug: 'interactive-experiences',
      color: '#ec4899',
      tagline: 'Maximizing MJ Solution Hardware Potential.',
      description: 'We maximize the potential of MJ Solution hardware by creating immersive software that merges the physical and digital worlds. From smart wayfinding to VR simulators, we transform spaces into intelligent environments.',
      highlights: [
        'Smart Wayfinding Kiosks',
        '360° VR Property Tours',
        'Multi-touch Museum Exhibits',
        'IoT Sensor Integration',
      ],
      stat: '50+',
      statLabel: 'Installations',
    },
    {
      title: 'Digital Strategy & Consulting',
      slug: 'digital-strategy',
      color: '#10b981',
      tagline: 'Long-term Partnerships.',
      description: 'We are long-term partners, not just vendors. Our consulting practice helps organizations navigate the digital transformation journey with confidence—from legacy system audits to full-scale UI/UX redesigns.',
      highlights: [
        'Digital Transformation Roadmaps',
        'UI/UX Design Lab',
        'Legacy System Migration',
        'Stakeholder Training',
      ],
      stat: '30+',
      statLabel: 'Transformations',
    },
  ],
  id: [
    {
      title: 'Enterprise & B2G Solutions',
      slug: 'enterprise-b2g-solutions',
      color: '#3b82f6',
      tagline: 'Efisiensi, Keamanan Data, dan Skalabilitas.',
      description: 'Kami membangun ekosistem perangkat lunak yang tangguh, aman, dan skalabel untuk perusahaan dan lembaga pemerintah. Solusi kami dibuat untuk menangani operasi misi kritis tanpa kompromi pada kinerja atau keamanan.',
      highlights: [
        'HRIS, CRM & Manajemen Proyek',
        'Dasbor Pusat Komando Waktu Nyata',
        'Jaringan CMS Multi-Perangkat',
        'Pelacakan Aset QR/RFID',
      ],
      stat: '12.000+',
      statLabel: 'Perangkat Dikelola',
    },
    {
      title: 'Gamification & Games',
      slug: 'gamification-games',
      color: '#8b5cf6',
      tagline: 'Retensi, Ingatan Brand, dan ROI.',
      description: 'Kami menciptakan pengalaman bermain game yang imersif untuk meningkatkan keterlibatan, ingatan brand, dan ROI yang terukur melalui permainan interaktif. Dari game sensor gerak hingga aktivasi AR, kami mengubah ruang fisik menjadi taman bermain digital.',
      highlights: [
        'Game Gerak Kinect/Lidar',
        'Aktivasi Augmented Reality',
        'LED Wall Media Sosial',
        'Sistem Papan Peringkat Phygital',
      ],
      stat: '2Jt+',
      statLabel: 'Interaksi Pengguna',
    },
    {
      title: 'Interactive Experiences',
      slug: 'interactive-experiences',
      color: '#ec4899',
      tagline: 'Memaksimalkan Potensi Perangkat Keras MJ Solution.',
      description: 'Kami memaksimalkan potensi perangkat keras MJ Solution dengan membuat perangkat lunak imersif yang menggabungkan dunia fisik dan digital. Dari navigasi pintar hingga simulator VR, kami mengubah ruang menjadi lingkungan yang cerdas.',
      highlights: [
        'Kios Wayfinding Pintar',
        'Tur Properti VR 360°',
        'Tabel Museum Multi-Sentuh',
        'Integrasi Sensor IoT',
      ],
      stat: '50+',
      statLabel: 'Instalasi',
    },
    {
      title: 'Digital Strategy & Consulting',
      slug: 'digital-strategy',
      color: '#10b981',
      tagline: 'Kemitraan Jangka Panjang.',
      description: 'Kami adalah mitra jangka panjang, bukan sekadar vendor. Praktik konsultasi kami membantu organisasi menavigasi perjalanan transformasi digital dengan percaya diri—dari audit sistem warisan hingga desain ulang UI/UX skala penuh.',
      highlights: [
        'Peta Jalan Transformasi Digital',
        'Lab Desain UI/UX',
        'Migrasi Sistem Warisan',
        'Pelatihan Pemangku Kepentingan',
      ],
      stat: '30+',
      statLabel: 'Transformasi',
    },
  ]
};

export const enterpriseData: Record<string, {
  hero: { title: string; coloredWord: string; desc: string };
  metrics: Array<{ label: string; value: string }>;
  systemStatus: Array<{ label: string; status: string; icon: string }>;
  capabilities: Array<{ title: string; desc: string; icon: string }>;
}> = {
  en: {
    hero: {
      title: 'Enterprise & B2G Solutions',
      coloredWord: 'B2G Solutions',
      desc: 'We architect robust, secure, and scalable software ecosystems for enterprises and government institutions. Our solutions handle mission-critical operations with zero compromise.',
    },
    metrics: [
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Devices Managed', value: '12000+' },
      { label: 'Data Points/Sec', value: '50000' },
      { label: 'Clients Served', value: '85+' },
    ],
    systemStatus: [
      { label: 'API Gateway', status: 'Healthy', icon: 'Server' },
      { label: 'Firewall', status: 'Active', icon: 'Shield' },
      { label: 'CDN Edge', status: '14 Nodes', icon: 'Wifi' },
      { label: 'CPU Load', status: '23%', icon: 'Activity' },
    ],
    capabilities: [
      {
        title: 'Bespoke Web & Mobile Development',
        desc: 'High-performance internal applications (HRIS, CRM, Project Management) tailored to your specific business logic. We build systems that scale from 10 to 10,000 users.',
        icon: 'Globe',
      },
      {
        title: 'Smart Dashboard & Data Visualization',
        desc: 'Transform complex big data into actionable insights with real-time visual dashboards, perfect for Command Centers and Government monitoring.',
        icon: 'BarChart3',
      },
      {
        title: 'Custom CMS',
        desc: 'Centralized control for your entire digital network, allowing seamless content updates across thousands of devices from a single console.',
        icon: 'Database',
      },
      {
        title: 'Asset & Inventory Management',
        desc: 'Digital tracking solutions using QR/RFID integration to secure and monitor high-value corporate assets in real time.',
        icon: 'QrCode',
      },
    ],
  },
  id: {
    hero: {
      title: 'Enterprise & B2G Solutions',
      coloredWord: 'B2G Solutions',
      desc: 'Kami membangun ekosistem perangkat lunak yang tangguh, aman, dan skalabel untuk perusahaan dan lembaga pemerintah. Solusi kami menangani operasi misi kritis tanpa kompromi.',
    },
    metrics: [
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Perangkat Dikelola', value: '12000+' },
      { label: 'Data Points/Detik', value: '50000' },
      { label: 'Klien Dilayani', value: '85+' },
    ],
    systemStatus: [
      { label: 'API Gateway', status: 'Normal', icon: 'Server' },
      { label: 'Firewall', status: 'Aktif', icon: 'Shield' },
      { label: 'CDN Edge', status: '14 Node', icon: 'Wifi' },
      { label: 'Beban CPU', status: '23%', icon: 'Activity' },
    ],
    capabilities: [
      {
        title: 'Pengembangan Web & Seluler Khusus',
        desc: 'Aplikasi internal berkinerja tinggi (HRIS, CRM, Manajemen Proyek) yang disesuaikan dengan logika bisnis spesifik Anda. Kami membangun sistem yang dapat diskalakan dari 10 hingga 10.000 pengguna.',
        icon: 'Globe',
      },
      {
        title: 'Dasbor Pintar & Visualisasi Data',
        desc: 'Ubah big data yang rumit menjadi wawasan yang dapat ditindaklanjuti dengan dasbor visual waktu nyata, sangat cocok untuk Pusat Komando dan pemantauan Pemerintah.',
        icon: 'BarChart3',
      },
      {
        title: 'CMS Khusus',
        desc: 'Kontrol terpusat untuk seluruh jaringan digital Anda, memungkinkan pembaruan konten yang mulus di ribuan perangkat dari satu konsol.',
        icon: 'Database',
      },
      {
        title: 'Manajemen Aset & Inventaris',
        desc: 'Solusi pelacakan digital menggunakan integrasi QR/RFID untuk mengamankan dan memantau aset perusahaan yang bernilai tinggi secara real time.',
        icon: 'QrCode',
      },
    ],
  }
};

export const gamificationPageData: Record<string, {
  hero: { title: string; coloredWord: string; desc: string };
  capabilities: Array<{ title: string; desc: string; icon: string }>;
}> = {
  en: {
    hero: {
      title: 'Gamification & Games',
      coloredWord: 'Games',
      desc: 'We create immersive, gamified experiences that drive engagement, boost brand recall, and deliver measurable ROI through interactive play.',
    },
    capabilities: [
      {
        title: 'Kinetic & Gesture-Based Games',
        desc: 'Interactive experiences driven by motion sensors (Kinect/Lidar), turning lobbies into active brand playgrounds that captivate visitors.',
        icon: 'Gamepad2',
      },
      {
        title: 'Augmented Reality Activation',
        desc: 'Overlaying digital magic onto the real world—perfect for product launches, property marketing (AR Booklets), and retail experiences.',
        icon: 'Smartphone',
      },
      {
        title: 'Social Wall & Live Feeds',
        desc: 'Real-time social media integration that displays audience content on your LED screens, driving organic digital traction and engagement.',
        icon: 'Share2',
      },
      {
        title: 'Phygital Leaderboards',
        desc: 'Competitive gaming hubs that sync visitors\' smartphones with large-scale displays for instant rewards and data collection.',
        icon: 'Trophy',
      },
    ],
  },
  id: {
    hero: {
      title: 'Gamification & Games',
      coloredWord: 'Games',
      desc: 'Kami menciptakan pengalaman bermain game yang imersif untuk meningkatkan keterlibatan, ingatan brand, dan ROI yang terukur melalui permainan interaktif.',
    },
    capabilities: [
      {
        title: 'Game Berbasis Kinetik & Gerakan',
        desc: 'Pengalaman interaktif yang didorong oleh sensor gerak (Kinect/Lidar), mengubah lobi menjadi taman bermain brand yang menawan bagi pengunjung.',
        icon: 'Gamepad2',
      },
      {
        title: 'Aktivasi Augmented Reality',
        desc: 'Menambahkan keajaiban digital ke dunia nyata—sempurna untuk peluncuran produk, pemasaran properti (Buklet AR), dan pengalaman ritel.',
        icon: 'Smartphone',
      },
      {
        title: 'Social Wall & Live Feeds',
        desc: 'Integrasi media sosial waktu nyata yang menampilkan konten audiens di layar LED Anda, mendorong daya tarik dan keterlibatan digital organik.',
        icon: 'Share2',
      },
      {
        title: 'Papan Peringkat Phygital',
        desc: 'Pusat permainan kompetitif yang menyinkronkan smartphone pengunjung dengan tampilan skala besar untuk hadiah instan dan pengumpulan data.',
        icon: 'Trophy',
      },
    ],
  }
};

export const interactivePageData: Record<string, {
  hero: { title: string; coloredWord: string; desc: string };
  hotspots: Array<{ id: number; title: string; desc: string; icon: string }>;
  useCases: Array<{ title: string; desc: string; icon: string }>;
  capabilities: Array<{ title: string; desc: string; icon: string }>;
}> = {
  en: {
    hero: {
      title: 'Interactive Experiences',
      coloredWord: 'Experiences',
      desc: 'We maximize the potential of MJ Solution hardware by creating immersive software experiences that merge the physical and digital worlds.',
    },
    hotspots: [
      {
        id: 1,
        title: 'Wayfinding Kiosk',
        desc: 'Interactive map with route calculation and live directory.',
        icon: 'Search',
      },
      {
        id: 2,
        title: 'AR Activation',
        desc: 'Augmented reality overlay triggered by user presence.',
        icon: 'Eye',
      },
      {
        id: 3,
        title: '360° Camera',
        desc: 'Captures the entire space for digital twin recreation.',
        icon: 'Camera',
      },
    ],
    useCases: [
      {
        title: 'Shopping Malls',
        desc: 'Interactive directory kiosks with real-time promotions displayed on LED videowalls.',
        icon: '🏬',
      },
      {
        title: 'Museums & Galleries',
        desc: 'Multi-touch exhibition tables with gestural zoom, timelines, and audio guides.',
        icon: '🏛️',
      },
      {
        title: 'Corporate Lobbies',
        desc: 'Motion-sensor activated welcome displays with live visitor dashboards.',
        icon: '🏢',
      },
    ],
    capabilities: [
      {
        title: 'Smart Wayfinding & Concierge',
        desc: 'Intelligent navigation systems for malls, hospitals, and government hubs using interactive touchscreen kiosks.',
        icon: 'MapPin',
      },
      {
        title: 'Virtual Reality Simulators',
        desc: 'Immersive training or virtual property tours (360° walkthroughs) that provide a hands-on experience without limits.',
        icon: 'Glasses',
      },
      {
        title: 'Interactive Exhibition Modules',
        desc: 'Multi-touch software designed for museums and galleries, allowing deep exploration of digital archives.',
        icon: 'Monitor',
      },
      {
        title: 'IoT & Hardware Integration',
        desc: 'Custom middleware that connects your software to physical sensors, lighting, or mechanical elements.',
        icon: 'Cpu',
      },
    ],
  },
  id: {
    hero: {
      title: 'Interactive Experiences',
      coloredWord: 'Experiences',
      desc: 'Kami memaksimalkan potensi perangkat keras MJ Solution dengan membuat perangkat lunak imersif yang menggabungkan dunia fisik dan digital.',
    },
    hotspots: [
      {
        id: 1,
        title: 'Kios Navigasi',
        desc: 'Peta interaktif dengan perhitungan rute dan direktori langsung.',
        icon: 'Search',
      },
      {
        id: 2,
        title: 'Aktivasi AR',
        desc: 'Overlay augmented reality yang dipicu oleh kehadiran pengguna.',
        icon: 'Eye',
      },
      {
        id: 3,
        title: 'Kamera 360°',
        desc: 'Menangkap seluruh ruang untuk rekreasi kembar digital.',
        icon: 'Camera',
      },
    ],
    useCases: [
      {
        title: 'Pusat Perbelanjaan',
        desc: 'Kios direktori interaktif dengan promosi waktu nyata yang ditampilkan di videowall LED.',
        icon: '🏬',
      },
      {
        title: 'Museum & Galeri',
        desc: 'Meja pameran multi-sentuh dengan zoom gestur, linimasa, dan panduan audio.',
        icon: '🏛️',
      },
      {
        title: 'Lobi Perusahaan',
        desc: 'Tampilan sambutan yang diaktifkan oleh sensor gerak dengan dasbor pengunjung langsung.',
        icon: '🏢',
      },
    ],
    capabilities: [
      {
        title: 'Navigasi Pintar & Layanan Pramutamu',
        desc: 'Sistem navigasi cerdas untuk mal, rumah sakit, dan pusat pemerintahan menggunakan kios layar sentuh interaktif.',
        icon: 'MapPin',
      },
      {
        title: 'Simulator Virtual Reality',
        desc: 'Pelatihan imersif atau tur properti virtual (walkthrough 360°) yang memberikan pengalaman langsung tanpa batas.',
        icon: 'Glasses',
      },
      {
        title: 'Modul Pameran Interaktif',
        desc: 'Perangkat lunak multi-sentuh yang dirancang untuk museum dan galeri, memungkinkan eksplorasi mendalam dari arsip digital.',
        icon: 'Monitor',
      },
      {
        title: 'Integrasi IoT & Perangkat Keras',
        desc: 'Middleware khusus yang menghubungkan perangkat lunak Anda ke sensor fisik, pencahayaan, atau elemen mekanis.',
        icon: 'Cpu',
      },
    ],
  }
};

export const digitalStrategyPageData: Record<string, {
  hero: { title: string; coloredWord: string; desc: string };
  roadmap: TimelinePhase[];
  capabilities: Array<{ title: string; desc: string; icon: string }>;
}> = {
  en: {
    hero: {
      title: 'Digital Strategy',
      coloredWord: 'Strategy',
      desc: 'We are long-term partners, not just vendors. Our consulting practice helps organizations navigate the digital transformation journey with confidence.',
    },
    roadmap: [
      {
        phase: 'Phase 1',
        title: 'Audit & Discovery',
        desc: 'Deep analysis of existing systems, pain points, and stakeholder interviews.',
        position: 'left',
      },
      {
        phase: 'Phase 2',
        title: 'Strategy & Architecture',
        desc: 'Defining the technology stack, data flow architecture, and migration plan.',
        position: 'right',
      },
      {
        phase: 'Phase 3',
        title: 'Design & Prototype',
        desc: 'High-fidelity UI/UX design, user testing, and interactive prototyping.',
        position: 'left',
      },
      {
        phase: 'Phase 4',
        title: 'Agile Development',
        desc: 'Sprint-based development with transparent progress reporting and demos.',
        position: 'right',
      },
      {
        phase: 'Phase 5',
        title: 'QA & Launch',
        desc: 'Rigorous testing (Whitebox, Blackbox, Bulk), soft launch, and full deployment.',
        position: 'left',
      },
      {
        phase: 'Phase 6',
        title: 'Growth & Support',
        desc: 'Continuous monitoring, feature iteration, and 24/7 SLA maintenance.',
        position: 'right',
      },
    ],
    capabilities: [
      {
        title: 'Digital Transformation Roadmap',
        desc: 'We don\'t just build; we advise. We help institutions transition from manual legacy systems to automated digital workflows with a clear, phased roadmap.',
        icon: 'Route',
      },
      {
        title: 'UI/UX Design Lab',
        desc: 'Crafting user-centric interfaces that are not only beautiful but also intuitive for various demographics—from Gen Z to Government officials.',
        icon: 'Palette',
      },
    ],
  },
  id: {
    hero: {
      title: 'Digital Strategy',
      coloredWord: 'Strategy',
      desc: 'Kami adalah mitra jangka panjang, bukan sekadar vendor. Praktik konsultasi kami membantu organisasi menavigasi perjalanan transformasi digital dengan percaya diri.',
    },
    roadmap: [
      {
        phase: 'Fase 1',
        title: 'Audit & Penemuan',
        desc: 'Analisis mendalam terhadap sistem yang ada, titik masalah, dan wawancara pemangku kepentingan.',
        position: 'left',
      },
      {
        phase: 'Fase 2',
        title: 'Strategi & Arsitektur',
        desc: 'Menentukan tumpukan teknologi, arsitektur aliran data, dan rencana migrasi.',
        position: 'right',
      },
      {
        phase: 'Fase 3',
        title: 'Desain & Prototipe',
        desc: 'Desain UI/UX dengan kesetiaan tinggi, pengujian pengguna, dan pembuatan prototipe interaktif.',
        position: 'left',
      },
      {
        phase: 'Fase 4',
        title: 'Pengembangan Agile',
        desc: 'Pengembangan berbasis sprint dengan pelaporan kemajuan dan demo yang transparan.',
        position: 'right',
      },
      {
        phase: 'Fase 5',
        title: 'QA & Peluncuran',
        desc: 'Pengujian ketat (Whitebox, Blackbox, Bulk), peluncuran awal, dan penerapan penuh.',
        position: 'left',
      },
      {
        phase: 'Fase 6',
        title: 'Pertumbuhan & Dukungan',
        desc: 'Pemantauan terus-menerus, iterasi fitur, dan pemeliharaan SLA 24/7.',
        position: 'right',
      },
    ],
    capabilities: [
      {
        title: 'Peta Jalan Transformasi Digital',
        desc: 'Kami tidak hanya membangun; kami menasihati. Kami membantu lembaga bertransisi dari sistem warisan manual ke alur kerja digital otomatis dengan peta jalan yang jelas dan bertahap.',
        icon: 'Route',
      },
      {
        title: 'Lab Desain UI/UX',
        desc: 'Merancang antarmuka yang berpusat pada pengguna yang tidak hanya indah tetapi juga intuitif untuk berbagai demografi—dari Gen Z hingga pejabat Pemerintah.',
        icon: 'Palette',
      },
    ],
  }
};
