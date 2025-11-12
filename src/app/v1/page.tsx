
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function V1DocumentationPage() {
    const colors = [
        { mode: 'Light', name: 'Primary', hex: '#00AEEF', usage: 'CTA, Links, Icons, Rings', var: '--primary' },
        { mode: 'Light', name: 'Secondary', hex: '#7E57C2', usage: 'Accent elements', var: '--secondary' },
        { mode: 'Light', name: 'Accent', hex: '#FFD600', usage: 'CTA buttons, highlights', var: '--accent' },
        { mode: 'Light', name: 'Background', hex: '#F9FAFB', usage: 'Page background', var: '--background' },
        { mode: 'Light', name: 'Card/Surface', hex: '#FFFFFF', usage: 'Card backgrounds', var: '--card' },
        { mode: 'Dark', name: 'Primary', hex: '#00AEEF', usage: 'CTA, Links, Icons', var: '--primary' },
        { mode: 'Dark', name: 'Secondary', hex: '#A38AD9', usage: 'Lighter accent', var: '--secondary' },
        { mode: 'Dark', name: 'Accent', hex: '#FFDE33', usage: 'Brighter highlights', var: '--accent' },
        { mode: 'Dark', name: 'Background', hex: '#13151A', usage: 'Deep navy page background', var: '--background' },
        { mode: 'Dark', name: 'Card/Surface', hex: '#1C1F26', usage: 'Dark slate card backgrounds', var: '--card' },
    ];

    const typography = [
        { element: 'Headline', font: 'Poppins (Bold/SemiBold)', usage: 'Judul utama halaman dan seksi. Memberikan dampak dan energi.' },
        { element: 'Body', font: 'Inter (Regular/Medium)', usage: 'Teks utama, paragraf, dan deskripsi. Sangat mudah dibaca.' },
        { element: 'Code/Mono', font: 'Monospace', usage: 'Untuk menampilkan data teknis seperti ID transaksi atau kode.' },
    ];
    
    const pages = [
        { name: 'Home', url: '/', desc: 'Landing page utama yang memperkenalkan ekosistem TI Sport secara sinematik dan interaktif.' },
        { name: 'About', url: '/about', desc: 'Visi, misi, roadmap, dan profil TI Sport.' },
        { name: 'Events', url: '/events', desc: 'Daftar semua event yang akan datang dengan fitur pencarian dan filter.' },
        { name: 'Event Detail', url: '/e/example-event', desc: 'Halaman detail untuk setiap event, menampilkan info lengkap, peserta, dan tombol booking.', cta: true },
        { name: 'Sponsorship', url: '/sponsorship', desc: 'Detail paket sponsorship untuk brand dan partner.' },
        { name: 'Collaboration', url: '/collaboration', desc: 'Peluang kolaborasi untuk komunitas atau brand lain.' },
        { name: 'Community', url: '/community', desc: 'Profil komunitas, nilai-nilai, dan cara bergabung.' },
        { name: 'Contact', url: '/contact', desc: 'Formulir kontak untuk semua keperluan.' },
        { name: 'Gallery', url: '/gallery', desc: 'Galeri foto sinematik dari semua event.' },
        { name: 'Gallery Detail', url: '/gallery/fun-match-rabu-malam', desc: 'Tampilan lightbox untuk galeri foto per event.', cta: true },
        { name: 'Leaderboard', url: '/leaderboard', desc: 'Papan peringkat pemain dalam komunitas.' },
        { name: 'News', url: '/news', desc: 'Berita, pengumuman, dan artikel dengan layout majalah modern.' },
        { name: 'FAQ', url: '/faq', desc: 'Jawaban untuk pertanyaan yang sering diajukan.' },
        { name: 'Privacy Policy', url: '/privacy-policy', desc: 'Kebijakan privasi platform.' },
        { name: 'Terms of Service', url: '/terms-of-service', desc: 'Syarat dan ketentuan penggunaan.' },
    ];
    
    const flows = [
        { name: 'Login', url: '/login', desc: 'Halaman untuk pengguna masuk.', cta: true },
        { name: 'Sign Up', url: '/signup', desc: 'Halaman pendaftaran pengguna baru.', cta: true },
        { name: 'Forgot Password', url: '/forgot-password', desc: 'Alur untuk meminta reset password.', cta: true },
        { name: 'Reset Password', url: '/reset-password', desc: 'Halaman untuk memasukkan password baru.', cta: true },
        { name: 'Onboarding', url: '/onboarding', desc: 'Alur perkenalan setelah pengguna mendaftar, untuk melengkapi profil dan mendapatkan poin bonus.', cta: true },
        { name: 'Booking', url: '/book/TIC-BDM-2408-001', desc: 'Alur booking multi-step: pilih jumlah tiket, isi nama peserta, dan tambah donasi.', cta: true },
        { name: 'Checkout', url: '/checkout/TIC-BDM-2408-001', desc: 'Halaman rincian pesanan, pemilihan voucher, dan konfirmasi total biaya.', cta: true },
        { name: 'Payment', url: '/pay/TIC-BDM-2408-001', desc: 'Alur pembayaran multi-step: pilih metode, lihat instruksi, dan upload bukti bayar.', cta: true },
        { name: 'Status Page (Success)', url: '/status/PAID', desc: 'Halaman dinamis yang menampilkan status pembayaran berhasil dengan e-tiket.', cta: true },
        { name: 'Status Page (Pending)', url: '/status/REVIEW', desc: 'Halaman dinamis yang menampilkan status pembayaran sedang direview.', cta: true },
    ];

    const dashboardPages = [
      { name: 'User Dashboard', url: '/dashboard', desc: 'Halaman utama setelah user login. Menampilkan ringkasan akun dan event berikutnya.' },
      { name: 'My Orders', url: '/dashboard/pesanan', desc: 'Daftar semua pesanan event dan membership pengguna.' },
      { name: 'Order Detail', url: '/dashboard/pesanan/EVT001', desc: 'Halaman detail untuk setiap pesanan.', cta: true },
      { name: 'My Transactions', url: '/dashboard/transaksi', desc: 'Riwayat semua transaksi pembayaran.' },
      { name: 'Transaction Detail', url: '/dashboard/transaksi/TXN003', desc: 'Rincian detail untuk setiap transaksi.', cta: true },
      { name: 'Membership', url: '/dashboard/membership', desc: 'Info mengenai status membership aktif dan batch yang akan datang.' },
      { name: 'Rewards', url: '/dashboard/rewards', desc: 'Katalog hadiah, saldo poin, dan riwayat perolehan poin.' },
      { name: 'Referral', url: '/dashboard/referral', desc: 'Halaman program referral untuk mengajak teman.' },
      { name: 'Profile', url: '/dashboard/profile', desc: 'Halaman lengkap untuk mengelola informasi personal dan minat.' },
      { name: 'Settings', url: '/dashboard/settings', desc: 'Layout utama untuk pengaturan, dengan sub-halaman (Profil Akun, Keamanan, Notifikasi).' },
    ];
    
    const adminPages = [
        { name: 'Admin Overview', url: '/admin', desc: 'Dashboard utama untuk admin dengan statistik kunci.' },
        { name: 'Event Management', url: '/admin/events', desc: 'Halaman CRUD untuk mengelola semua event.' },
        { name: 'Booking Management', url: '/admin/bookings', desc: 'Lihat dan kelola semua data booking peserta.' },
        { name: 'Transactions', url: '/admin/transactions', desc: 'Daftar semua transaksi keuangan dari pengguna.' },
        { name: 'User Management', url: '/admin/users', desc: 'Halaman untuk mengelola semua pengguna terdaftar.' },
        { name: 'Reports', url: '/admin/reports', desc: 'Hasilkan dan unduh laporan dalam format CSV.' },
        { name: 'Announcements', url: '/admin/announcements', desc: 'Buat dan siarkan pengumuman ke semua pengguna.' },
        { name: 'Support', url: '/admin/support', desc: 'Kelola tiket dukungan dan pertanyaan dari pengguna.' },
        { name: 'Admin Settings', url: '/admin/settings', desc: 'Pengaturan global aplikasi, pembayaran, dan peran tim.' },
        { name: 'Style Guide', url: '/admin/preview', desc: 'Live preview semua komponen UI untuk konsistensi desain.', cta: true },
    ];


  return (
    <div className="container py-16 md:py-24 space-y-16">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Dokumentasi Proyek TI Sport v1.0</h1>
        <p className="text-text-muted mt-4 text-lg max-w-3xl mx-auto">Referensi internal yang merangkum konsep, sistem visual, arsitektur, dan semua fitur yang telah dibangun.</p>
        <Badge variant="destructive" className="mt-6">INTERNAL USE ONLY</Badge>
      </header>

      {/* Core Concept */}
      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">1. Konsep & Visi Inti</h2>
        <Card className="bg-surface">
            <CardHeader><CardTitle>Visi & Misi</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-text-muted text-base">
                <p><strong className="text-foreground">Visi:</strong> Menciptakan wadah olahraga yang seru, profesional, dan kreatif, di mana olahraga bukan hanya aktivitas fisik — tapi juga media sosial, networking, dan konten digital.</p>
                <p><strong className="text-foreground">Misi:</strong> Menyatukan komunitas muda (18–35 tahun), menghubungkan komunitas, venue, dan brand dalam satu ekosistem, dan menjadi platform olahraga berbasis teknologi.</p>
                <p><strong className="text-foreground">Konsep Visual:</strong> Olahraga modern dengan sentuhan sinematik. Gaya: bersih, energik, kontras tinggi, dengan spotlight biru dan aksen netral yang hangat.</p>
            </CardContent>
        </Card>
      </section>
      
      {/* Color Scheme */}
      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">2. Sistem Desain</h2>
         <div className="space-y-8">
            <Card className="bg-surface">
                <CardHeader><CardTitle>Palet Warna</CardTitle><CardDescription>Dibangun dengan HSL-based CSS Variables untuk light & dark mode yang konsisten.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mode</TableHead>
                                <TableHead>Color Name</TableHead>
                                <TableHead>Hex</TableHead>
                                <TableHead>Penggunaan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {colors.map(color => (
                                <TableRow key={`${color.mode}-${color.name}`}>
                                    <TableCell><Badge variant={color.mode === 'Light' ? 'outline' : 'secondary'}>{color.mode}</Badge></TableCell>
                                    <TableCell className="font-semibold">{color.name}</TableCell>
                                    <TableCell className="font-mono flex items-center gap-2">
                                        <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: `hsl(var(${color.var}))` }}></div>
                                        {color.hex}
                                    </TableCell>
                                    <TableCell>{color.usage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Tipografi</CardTitle><CardDescription>Kombinasi Poppins dan Inter untuk hierarki visual yang jelas antara judul dan isi.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Elemen</TableHead>
                                <TableHead>Font</TableHead>
                                <TableHead>Deskripsi Penggunaan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {typography.map(t => (
                                <TableRow key={t.element}>
                                    <TableCell className="font-semibold">{t.element}</TableCell>
                                    <TableCell>{t.font}</TableCell>
                                    <TableCell>{t.usage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
         </div>
      </section>

      {/* Page Structure */}
      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">3. Arsitektur & Fitur</h2>
        <div className="space-y-8">
            <Card className="bg-surface">
                <CardHeader><CardTitle>Halaman Publik</CardTitle><CardDescription>Halaman yang dapat diakses oleh semua pengunjung.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Halaman</TableHead><TableHead>URL</TableHead><TableHead>Deskripsi</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                        <TableBody>{pages.map(p => (<TableRow key={p.name}><TableCell className="font-semibold">{p.name}</TableCell><TableCell><code className="font-mono bg-muted px-2 py-1 rounded">{p.url}</code></TableCell><TableCell>{p.desc}</TableCell><TableCell className="text-right"><Button variant="outline" size="sm" asChild><Link href={p.url} target="_blank">Lihat <ExternalLink className="ml-2 h-3 w-3"/></Link></Button></TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="bg-surface">
                <CardHeader><CardTitle>Alur Fungsional & Halaman Terproteksi</CardTitle><CardDescription>Alur multi-step dan halaman yang memerlukan autentikasi atau state tertentu.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Alur</TableHead><TableHead>Contoh URL</TableHead><TableHead>Deskripsi</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                        <TableBody>{flows.map(p => (<TableRow key={p.name}><TableCell className="font-semibold">{p.name}</TableCell><TableCell><code className="font-mono bg-muted px-2 py-1 rounded">{p.url}</code></TableCell><TableCell>{p.desc}</TableCell><TableCell className="text-right"><Button variant="outline" size="sm" asChild><Link href={p.url} target="_blank">Lihat <ExternalLink className="ml-2 h-3 w-3"/></Link></Button></TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Dasbor Pengguna</CardTitle><CardDescription>Area pribadi untuk pengguna terdaftar setelah login.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader><TableRow><TableHead>Halaman</TableHead><TableHead>URL</TableHead><TableHead>Deskripsi</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                        <TableBody>{dashboardPages.map(p => (<TableRow key={p.name}><TableCell className="font-semibold">{p.name}</TableCell><TableCell><code className="font-mono bg-muted px-2 py-1 rounded">{p.url}</code></TableCell><TableCell>{p.desc}</TableCell><TableCell className="text-right"><Button variant="outline" size="sm" asChild><Link href={p.url} target="_blank">Lihat <ExternalLink className="ml-2 h-3 w-3"/></Link></Button></TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Dasbor Admin</CardTitle><CardDescription>Panel kontrol khusus untuk administrator.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                         <TableHeader><TableRow><TableHead>Halaman</TableHead><TableHead>URL</TableHead><TableHead>Deskripsi</TableHead><TableHead className="text-right">Aksi</TableHead></TableRow></TableHeader>
                        <TableBody>{adminPages.map(p => (<TableRow key={p.name}><TableCell className="font-semibold">{p.name}</TableCell><TableCell><code className="font-mono bg-muted px-2 py-1 rounded">{p.url}</code></TableCell><TableCell>{p.desc}</TableCell><TableCell className="text-right"><Button variant="outline" size="sm" asChild><Link href={p.url} target="_blank">Lihat <ExternalLink className="ml-2 h-3 w-3"/></Link></Button></TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}

    