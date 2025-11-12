import type { NewsItem } from './types';

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: 'mini-tournament-kemerdekaan',
    title: 'Mini Tournament Edisi Kemerdekaan Akan Datang!',
    category: 'Pengumuman',
    date: '1 Agustus 2024',
    description: 'Sambut bulan kemerdekaan dengan semangat kompetisi! TI Sport akan mengadakan mini tournament dengan total hadiah jutaan rupiah.',
    content: `
      <p>Dalam rangka menyambut Hari Kemerdekaan Republik Indonesia, TI Sport dengan bangga akan menyelenggarakan <strong>Mini Tournament Bulu Tangkis Edisi Kemerdekaan!</strong></p>
      <p>Ini adalah kesempatan emas bagi para pemain di komunitas untuk unjuk gigi, berkompetisi secara sehat, dan memperebutkan total hadiah jutaan rupiah. Acara ini terbuka untuk semua level, dari pemula hingga mahir, dengan sistem pertandingan yang adil.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">Detail Acara:</h3>
      <ul>
        <li><strong>Tanggal:</strong> 17 Agustus 2024</li>
        <li><strong>Lokasi:</strong> GOR Cendekia</li>
        <li><strong>Kategori:</strong> Ganda Putra & Ganda Campuran</li>
        <li><strong>Pendaftaran:</strong> Akan dibuka pada 5 Agustus 2024</li>
      </ul>
      <br/>
      <p>Siapkan pasanganmu dan jangan lewatkan kesempatan untuk menjadi bagian dari sejarah TI Sport. Informasi lebih lanjut mengenai pendaftaran dan peraturan akan diumumkan segera. Merdeka!</p>
    `,
    categoryVariant: 'destructive'
  },
  {
    id: 2,
    slug: '5-teknik-dasar-bulutangkis',
    title: '5 Teknik Dasar Bulu Tangkis untuk Pemula',
    category: 'Artikel',
    date: '28 Juli 2024',
    description: 'Baru mulai main bulu tangkis? Simak 5 teknik dasar yang wajib kamu kuasai agar permainanmu makin solid dan menyenangkan.',
    content: `
      <p>Selamat datang di dunia bulu tangkis! Olahraga ini sangat menyenangkan, tapi bisa sedikit menantang di awal. Untuk membantumu, kami telah merangkum 5 teknik dasar yang perlu kamu latih.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">1. Cara Memegang Raket (Grip)</h3>
      <p>Pegangan yang benar adalah kunci. Pegangan <em>forehand</em> seperti berjabat tangan dengan raket. Untuk <em>backhand</em>, posisikan ibu jari menekan gagang raket untuk kekuatan ekstra.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">2. Servis</h3>
      <p>Ada dua jenis servis utama: servis tinggi (untuk mengulur waktu) dan servis pendek (untuk menyerang). Latihlah keduanya agar bisa kamu gunakan sesuai situasi.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">3. Footwork (Langkah Kaki)</h3>
      <p>Bulu tangkis adalah tentang pergerakan. Latih langkah dasarmu untuk bergerak ke depan, belakang, dan samping lapangan secara efisien tanpa membuang banyak energi.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">4. Pukulan Dasar (Strokes)</h3>
      <p>Pelajari pukulan dasar seperti clear/lob (pukulan jauh ke belakang), drop shot (pukulan dekat net), dan smash (pukulan menukik tajam).</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">5. Posisi Siap (Stance)</h3>
      <p>Selalu kembali ke posisi siap di tengah lapangan setelah memukul. Tekuk lutut sedikit, buka kaki selebar bahu, dan angkat raket di depan tubuh.</p>
      <br/>
      <p>Dengan melatih kelima teknik ini secara konsisten, permainanmu dijamin akan meningkat pesat. Selamat berlatih!</p>
    `,
    categoryVariant: 'secondary'
  },
  {
    id: 3,
    slug: 'jadwal-agustus-2024',
    title: 'Jadwal Main Bareng Agustus 2024 Telah Rilis',
    category: 'Jadwal',
    date: '25 Juli 2024',
    description: 'Cek jadwal main bareng terbaru untuk bulan Agustus. Amankan slotmu lebih awal dan jangan sampai ketinggalan keseruannya.',
    content: `
      <p>Halo, para penggila bulu tangkis! Kami sangat antusias mengumumkan jadwal main bareng (mabar) untuk bulan Agustus 2024. Bulan ini, kami menambah sesi di beberapa venue baru untuk mengakomodasi antusiasme kalian semua.</p>
      <p>Pastikan kamu mengecek halaman <strong><a href="/events">Events</a></strong> secara berkala untuk melihat slot yang tersedia. Seperti biasa, slot sangat terbatas dan menggunakan sistem siapa cepat dia dapat.</p>
      <br/>
      <h3 class="font-headline text-xl font-bold">Highlight Jadwal Agustus:</h3>
      <ul>
        <li><strong>Setiap Rabu Malam:</strong> Sesi Reguler di GOR Cendekia.</li>
        <li><strong>Setiap Sabtu Pagi:</strong> Sesi Pagi di Arena Pro.</li>
        <li><strong>Jumat (Minggu ke-2 & ke-4):</strong> Sesi Latihan Khusus & Sparring.</li>
      </ul>
      <br/>
      <p>Jangan lupa untuk selalu mematuhi protokol kesehatan dan menjunjung tinggi sportivitas di lapangan. Sampai jumpa di lapangan!</p>
    `,
    categoryVariant: 'default'
  },
    {
    id: 4,
    slug: 'partnership-gor-cendekia',
    title: 'Partnership Baru dengan GOR Cendekia',
    category: 'Pengumuman',
    date: '20 Juli 2024',
    description: 'Dengan bangga kami mengumumkan kerjasama baru dengan GOR Cendekia sebagai salah satu venue partner resmi TI Sport.',
    content: `
      <p>Kabar gembira untuk seluruh komunitas TI Sport! Kami secara resmi telah menjalin kerjasama strategis dengan <strong>GOR Cendekia</strong>, salah satu GOR terbaik di kota ini.</p>
      <p>Kerjasama ini memungkinkan kami untuk menyediakan jadwal bermain yang lebih banyak dan fasilitas yang lebih baik untuk kalian semua. GOR Cendekia memiliki 4 lapangan karpet standar internasional, pencahayaan yang terang, dan area parkir yang luas.</p>
      <br/>
      <p>Sesi reguler pertama kami di GOR Cendekia akan dimulai pada awal Agustus. Nantikan pengumuman jadwal lengkapnya dan mari kita ramaikan venue baru kita!</p>
    `,
    categoryVariant: 'destructive'
  },
];
