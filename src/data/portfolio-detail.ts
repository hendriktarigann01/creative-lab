export interface ProjectDetail {
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  overview: string;
  client: string;
  role: string;
  timeline: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  stats: { label: string; value: string };
}

export const portfolioDetails: Record<string, Record<string, ProjectDetail>> = {
  en: {
    pipely: {
      slug: 'pipely',
      title: 'Pipely',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'An all-in-one Sales Management System that helps businesses manage point of sale, stock, and purchases.',
      overview:
        'Pipely is an all-in-one Sales Management System built to simplify how businesses handle daily transactions, stock movement, and purchasing — all from a single connected platform.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Businesses needed a single system to manage sales, stock, and purchasing instead of juggling disconnected tools.',
      solution:
        'Built an integrated sales management platform combining point of sale, stock and purchase tracking, and multi payment support in one interface.',
      features: ['Point of Sale (POS)', 'Stock & Purchase Management', 'Multi Payment Integration'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Business Operations' },
    },
    stockflow: {
      slug: 'stockflow',
      title: 'StockFlow',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Warehouse Management System that provides better visibility and control over inventory operations.',
      overview:
        'StockFlow gives warehouse teams better visibility and control over inventory operations, from check-in to stock opname, in one streamlined system.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Warehouse operations needed clearer visibility over stock movement and a reliable way to reconcile inventory.',
      solution:
        'Developed a Warehouse Management System covering check-in/check-out flows and stock opname processes to keep inventory data accurate.',
      features: ['Warehouse Management', 'Check In & Check Out', 'Stock Opname'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Business Operations' },
    },
    plannr: {
      slug: 'plannr',
      title: 'PlannR',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Project Management System that helps teams organize projects and monitor performance on one platform.',
      overview:
        'PlannR helps teams organize projects, manage clients, and monitor profit and loss performance from a single connected platform.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Teams needed a unified way to track tasks, manage client relationships, and monitor project profitability.',
      solution:
        'Built a project management platform combining task tracking, client management, and profit & loss monitoring in one workspace.',
      features: ['Task & Project Tracking', 'Client Management', 'Profit & Loss Monitoring'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Business Operations' },
    },
    kruu: {
      slug: 'kruu',
      title: 'Kruu',
      category: 'Workforce & Human Capital',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Human Resource Management System (HRMS) that simplifies employee administration and streamlines payroll.',
      overview:
        'Kruu is a Human Resource Management System (HRMS) that simplifies employee administration, payroll, and leave management for growing teams.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'HR teams needed to streamline employee administration, payroll processing, and leave management in one system.',
      solution:
        'Developed an HRMS covering employee management, payroll processing, and leave management to simplify HR operations.',
      features: ['Employee Management', 'Payroll Management', 'Leave Management'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Workforce & Human Capital' },
    },
    jipies: {
      slug: 'jipies',
      title: 'Jipies',
      category: 'Workforce & Human Capital',
      image:
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Fleet Management GPS platform that provides real-time visibility into vehicle operations and driver behavior.',
      overview:
        'Jipies is a Fleet Management GPS platform giving businesses real-time visibility into vehicle operations, geo-fencing, and driver behavior.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Field operations teams needed real-time visibility into vehicle location and driver behavior across their fleet.',
      solution:
        'Built a GPS fleet management platform with real-time tracking, geo-fence alerts, and driver behavior monitoring.',
      features: ['GPS Real-Time Tracking', 'Geo-Fence & Alerts', 'Driver Behavior Monitoring'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      stats: { label: 'Category', value: 'Workforce & Human Capital' },
    },
    classix: {
      slug: 'classix',
      title: 'Classix',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'An integrated ERP platform for educational institutions that simplifies administration and learning management.',
      overview:
        'Classix is an integrated ERP platform for educational institutions, simplifying administration, attendance, and e-learning in one system.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Educational institutions needed a single platform to manage administration, attendance, and digital learning.',
      solution:
        'Developed an education ERP combining smart administration, smart attendance, and smart e-learning modules.',
      features: ['Smart Administration', 'Smart Attendance Management', 'Smart E-Learning'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Industry-Specific Solutions' },
    },
    diggit: {
      slug: 'diggit',
      title: 'Diggit',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Mining ERP System that helps companies monitor production, logistics, and financial operations.',
      overview:
        'Diggit is a Mining ERP System that helps companies monitor production, logistics, and financial operations from the field to the back office.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Mining operations needed better monitoring of stock, logistics, and field vehicle activity across remote sites.',
      solution:
        'Built a mining ERP system covering stock & inventory management, geo-fence alerts, and driver behavior monitoring.',
      features: [
        'Stock & Inventory Management',
        'Geo-Fence & Alerts',
        'Driver Behavior Monitoring',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Industry-Specific Solutions' },
    },
    sailoo: {
      slug: 'sailoo',
      title: 'Sailoo',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Voyage Management System built to optimize maritime operations, fleet scheduling, and supply chain.',
      overview:
        'Sailoo is a Voyage Management System built to optimize maritime operations, vessel scheduling, and port logistics.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Maritime operators needed centralized visibility over voyage orders, vessel propulsion, and port operations.',
      solution:
        'Developed a voyage management system with voyage order management, vessel propulsion monitoring, and port management.',
      features: ['Voyage Order Management', 'Vessel Propulsion Monitoring', 'Port Management'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Industry-Specific Solutions' },
    },
    registr: {
      slug: 'registr',
      title: 'RegistR.',
      category: 'Event & Registration',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'An Event Management System (EMS) that helps organizers manage registrations, ticketing, and attendee experiences.',
      overview:
        'RegistR. is an Event Management System (EMS) that streamlines every touchpoint of an event, from registration to on-site check-in.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Event organizers needed a centralized platform to manage ticketing, attendee check-in, and seating from one place.',
      solution:
        'Built an event management system with ticketing, self-service check-in, seat reservation, and ticket customization.',
      features: [
        'Ticketing System',
        'Self-Service Check-In',
        'Seat Reservation',
        'Ticket Customization',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Event & Registration' },
    },
    converra: {
      slug: 'converra',
      title: 'Converra',
      category: 'Smart CMS',
      image:
        'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A Smart Content Management System built to simplify screen management and content delivery at scale.',
      overview:
        'Converra is a Smart Content Management System (CMS) that enables businesses to distribute, schedule, and monitor content across multiple displays from one centralized platform.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Businesses with multiple digital displays needed centralized control over device pairing, content scheduling, and screen health.',
      solution:
        'Developed a smart CMS with device pairing & screen management, screen status monitoring, and content upload tools.',
      features: [
        'Device Pairing & Screen Management',
        'Screen Status Monitoring',
        'Content Upload',
      ],
      technologies: ['React', 'Electron', 'Node.js', 'Prisma', 'MySQL'],
      stats: { label: 'Category', value: 'Smart CMS' },
    },
    'interactive-gamifications': {
      slug: 'interactive-gamifications',
      title: 'Interactive Gamifications',
      category: 'Gamifications',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'A suite of interactive games designed for events, exhibitions, and brand activations.',
      overview:
        'Interactive Gamifications is a suite of engaging mini-games — Shio, Spinwheel, PAP, Scream, Catch, Memory Card, Puzzle, and Whack a Mole — designed to turn interactions into memorable experiences at events, exhibitions, and brand activations.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Product Development',
      timeline: 'Ongoing',
      challenge:
        'Brands needed engaging, easy-to-deploy interactive games to drive participation at events and exhibitions.',
      solution:
        'Built a suite of interactive web-based games covering spin, memory, reaction, and puzzle mechanics, ready to deploy on kiosks and booths.',
      features: [
        'Shio',
        'Spinwheel',
        'PAP',
        'Scream',
        'Catch',
        'Memory Card',
        'Puzzle',
        'Whack a Mole',
      ],
      technologies: ['React', 'Canvas API', 'Framer Motion', 'Tailwind CSS'],
      stats: { label: 'Category', value: 'Gamifications' },
    },
  },
  id: {
    pipely: {
      slug: 'pipely',
      title: 'Pipely',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Penjualan all-in-one yang membantu bisnis mengelola point of sale, stok, dan pembelian.',
      overview:
        'Pipely adalah Sistem Manajemen Penjualan all-in-one yang dirancang untuk menyederhanakan cara bisnis menangani transaksi harian, pergerakan stok, dan pembelian — semua dari satu platform yang terhubung.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Bisnis membutuhkan satu sistem untuk mengelola penjualan, stok, dan pembelian alih-alih menggunakan banyak alat yang terpisah.',
      solution:
        'Membangun platform manajemen penjualan terintegrasi yang menggabungkan point of sale, pelacakan stok dan pembelian, serta dukungan multi pembayaran dalam satu antarmuka.',
      features: ['Point of Sale (POS)', 'Stock & Purchase Management', 'Multi Payment Integration'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Business Operations' },
    },
    stockflow: {
      slug: 'stockflow',
      title: 'StockFlow',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Gudang yang memberikan visibilitas dan kontrol lebih baik atas operasi inventaris.',
      overview:
        'StockFlow memberikan tim gudang visibilitas dan kontrol lebih baik atas operasi inventaris, mulai dari check-in hingga stock opname, dalam satu sistem yang ringkas.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Operasi gudang membutuhkan visibilitas yang lebih jelas atas pergerakan stok dan cara yang andal untuk merekonsiliasi inventaris.',
      solution:
        'Mengembangkan Sistem Manajemen Gudang yang mencakup alur check-in/check-out dan proses stock opname agar data inventaris tetap akurat.',
      features: ['Warehouse Management', 'Check In & Check Out', 'Stock Opname'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Business Operations' },
    },
    plannr: {
      slug: 'plannr',
      title: 'PlannR',
      category: 'Business Operations',
      image:
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Proyek yang membantu tim mengorganisir proyek dan memantau kinerja dalam satu platform.',
      overview:
        'PlannR membantu tim mengorganisir proyek, mengelola klien, dan memantau kinerja laba rugi dari satu platform yang terhubung.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Tim membutuhkan cara terpadu untuk melacak tugas, mengelola hubungan klien, dan memantau profitabilitas proyek.',
      solution:
        'Membangun platform manajemen proyek yang menggabungkan pelacakan tugas, manajemen klien, dan pemantauan laba rugi dalam satu ruang kerja.',
      features: ['Task & Project Tracking', 'Client Management', 'Profit & Loss Monitoring'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Business Operations' },
    },
    kruu: {
      slug: 'kruu',
      title: 'Kruu',
      category: 'Workforce & Human Capital',
      image:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Sumber Daya Manusia (HRMS) yang menyederhanakan administrasi karyawan dan penggajian.',
      overview:
        'Kruu adalah Sistem Manajemen Sumber Daya Manusia (HRMS) yang menyederhanakan administrasi karyawan, penggajian, dan manajemen cuti untuk tim yang berkembang.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Tim HR membutuhkan cara untuk menyederhanakan administrasi karyawan, pemrosesan penggajian, dan manajemen cuti dalam satu sistem.',
      solution:
        'Mengembangkan HRMS yang mencakup manajemen karyawan, pemrosesan penggajian, dan manajemen cuti untuk menyederhanakan operasional HR.',
      features: ['Employee Management', 'Payroll Management', 'Leave Management'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Workforce & Human Capital' },
    },
    jipies: {
      slug: 'jipies',
      title: 'Jipies',
      category: 'Workforce & Human Capital',
      image:
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Platform GPS Manajemen Armada yang memberikan visibilitas real-time atas operasi kendaraan dan perilaku pengemudi.',
      overview:
        'Jipies adalah platform GPS Manajemen Armada yang memberikan bisnis visibilitas real-time atas operasi kendaraan, geo-fencing, dan perilaku pengemudi.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Tim operasional lapangan membutuhkan visibilitas real-time atas lokasi kendaraan dan perilaku pengemudi di seluruh armada mereka.',
      solution:
        'Membangun platform manajemen armada GPS dengan pelacakan real-time, peringatan geo-fence, dan pemantauan perilaku pengemudi.',
      features: ['GPS Real-Time Tracking', 'Geo-Fence & Alerts', 'Driver Behavior Monitoring'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      stats: { label: 'Kategori', value: 'Workforce & Human Capital' },
    },
    classix: {
      slug: 'classix',
      title: 'Classix',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Platform ERP terintegrasi untuk institusi pendidikan yang menyederhanakan administrasi dan manajemen pembelajaran.',
      overview:
        'Classix adalah platform ERP terintegrasi untuk institusi pendidikan, menyederhanakan administrasi, absensi, dan e-learning dalam satu sistem.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Institusi pendidikan membutuhkan satu platform untuk mengelola administrasi, absensi, dan pembelajaran digital.',
      solution:
        'Mengembangkan ERP pendidikan yang menggabungkan modul administrasi pintar, absensi pintar, dan e-learning pintar.',
      features: ['Smart Administration', 'Smart Attendance Management', 'Smart E-Learning'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Industry-Specific Solutions' },
    },
    diggit: {
      slug: 'diggit',
      title: 'Diggit',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem ERP Pertambangan yang membantu perusahaan memantau produksi, logistik, dan operasi keuangan.',
      overview:
        'Diggit adalah Sistem ERP Pertambangan yang membantu perusahaan memantau produksi, logistik, dan operasi keuangan dari lapangan hingga kantor pusat.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Operasi pertambangan membutuhkan pemantauan yang lebih baik atas stok, logistik, dan aktivitas kendaraan lapangan di lokasi terpencil.',
      solution:
        'Membangun sistem ERP pertambangan yang mencakup manajemen stok & inventaris, peringatan geo-fence, dan pemantauan perilaku pengemudi.',
      features: [
        'Stock & Inventory Management',
        'Geo-Fence & Alerts',
        'Driver Behavior Monitoring',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Industry-Specific Solutions' },
    },
    sailoo: {
      slug: 'sailoo',
      title: 'Sailoo',
      category: 'Industry-Specific Solutions',
      image:
        'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Pelayaran yang dibangun untuk mengoptimalkan operasi maritim, penjadwalan armada, dan rantai pasokan.',
      overview:
        'Sailoo adalah Sistem Manajemen Pelayaran yang dibangun untuk mengoptimalkan operasi maritim, penjadwalan kapal, dan logistik pelabuhan.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Operator maritim membutuhkan visibilitas terpusat atas pesanan pelayaran, propulsi kapal, dan operasi pelabuhan.',
      solution:
        'Mengembangkan sistem manajemen pelayaran dengan manajemen pesanan pelayaran, pemantauan propulsi kapal, dan manajemen pelabuhan.',
      features: ['Voyage Order Management', 'Vessel Propulsion Monitoring', 'Port Management'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Industry-Specific Solutions' },
    },
    registr: {
      slug: 'registr',
      title: 'RegistR.',
      category: 'Event & Registration',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Acara (EMS) yang membantu penyelenggara mengelola pendaftaran, tiket, dan pengalaman peserta.',
      overview:
        'RegistR. adalah Sistem Manajemen Acara (EMS) yang menyederhanakan setiap titik sentuh acara, mulai dari pendaftaran hingga check-in di lokasi.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Penyelenggara acara membutuhkan platform terpusat untuk mengelola tiket, check-in peserta, dan tempat duduk dari satu tempat.',
      solution:
        'Membangun sistem manajemen acara dengan tiket, check-in mandiri, reservasi kursi, dan kustomisasi tiket.',
      features: [
        'Ticketing System',
        'Self-Service Check-In',
        'Seat Reservation',
        'Ticket Customization',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Event & Registration' },
    },
    converra: {
      slug: 'converra',
      title: 'Converra',
      category: 'Smart CMS',
      image:
        'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Sistem Manajemen Konten Pintar yang dibangun untuk menyederhanakan manajemen layar dan distribusi konten dalam skala besar.',
      overview:
        'Converra adalah Sistem Manajemen Konten Pintar (CMS) yang memungkinkan bisnis mendistribusikan, menjadwalkan, dan memantau konten di berbagai layar dari satu platform terpusat.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Bisnis dengan banyak layar digital membutuhkan kontrol terpusat atas pemasangan perangkat, penjadwalan konten, dan kesehatan layar.',
      solution:
        'Mengembangkan CMS pintar dengan pemasangan & manajemen layar, pemantauan status layar, dan alat unggah konten.',
      features: [
        'Device Pairing & Screen Management',
        'Screen Status Monitoring',
        'Content Upload',
      ],
      technologies: ['React', 'Electron', 'Node.js', 'Prisma', 'MySQL'],
      stats: { label: 'Kategori', value: 'Smart CMS' },
    },
    'interactive-gamifications': {
      slug: 'interactive-gamifications',
      title: 'Interactive Gamifications',
      category: 'Gamifications',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Rangkaian permainan interaktif yang dirancang untuk acara, pameran, dan aktivasi merek.',
      overview:
        'Interactive Gamifications adalah rangkaian mini-game menarik — Shio, Spinwheel, PAP, Scream, Catch, Memory Card, Puzzle, dan Whack a Mole — yang dirancang untuk mengubah interaksi menjadi pengalaman yang berkesan di acara, pameran, dan aktivasi merek.',
      client: 'CreativeLAB by MJ Solution Indonesia',
      role: 'Pengembangan Produk',
      timeline: 'Berkelanjutan',
      challenge:
        'Merek membutuhkan permainan interaktif yang menarik dan mudah diterapkan untuk mendorong partisipasi di acara dan pameran.',
      solution:
        'Membangun rangkaian permainan berbasis web interaktif yang mencakup mekanisme putar, memori, reaksi, dan puzzle, siap diterapkan di kiosk dan booth.',
      features: [
        'Shio',
        'Spinwheel',
        'PAP',
        'Scream',
        'Catch',
        'Memory Card',
        'Puzzle',
        'Whack a Mole',
      ],
      technologies: ['React', 'Canvas API', 'Framer Motion', 'Tailwind CSS'],
      stats: { label: 'Kategori', value: 'Gamifications' },
    },
  },
};
