import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function TermsOfServicePage() {
    return (
        <div className="bg-background-soft">
            <AnimatedSection as="div" className="w-full bg-surface">
                <div className="container py-16 md:py-24 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Syarat & Ketentuan</h1>
                <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
                    Dengan menggunakan platform TI Sport, Anda setuju untuk mematuhi syarat dan ketentuan berikut.
                </p>
                </div>
            </AnimatedSection>

            <AnimatedSection as="div" className="container py-16 md:py-24 max-w-3xl">
                <div className="prose dark:prose-invert max-w-none text-lg">
                    <h2>1. Akun Pengguna</h2>
                    <p>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan password Anda. Semua aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda. Anda setuju untuk segera memberitahu kami jika ada penggunaan akun Anda yang tidak sah.</p>

                    <h2>2. Booking dan Pembayaran</h2>
                    <p>Semua booking dianggap final setelah pembayaran berhasil dikonfirmasi. Slot akan dialokasikan berdasarkan sistem "siapa cepat, dia dapat".</p>
                    <p>Pembayaran harus diselesaikan dalam batas waktu yang ditentukan. Jika tidak, booking akan secara otomatis dibatalkan.</p>

                    <h2>3. Kebijakan Pembatalan dan Refund</h2>
                    <p>Sesuai dengan kebijakan kami, semua pembayaran yang telah dilakukan untuk booking event <strong>tidak dapat dikembalikan (non-refundable)</strong>. Namun, Anda diizinkan untuk mengalihkan tiket Anda kepada orang lain. Anda wajib memberitahukan pengalihan ini kepada admin kami setidaknya 6 jam sebelum event dimulai.</p>
                    
                    <h2>4. Perilaku Pengguna</h2>
                    <p>Anda setuju untuk tidak menggunakan platform untuk tujuan ilegal atau tidak sah. Anda harus menjunjung tinggi sportivitas dan berperilaku sopan selama mengikuti event. TI Sport berhak untuk menonaktifkan akun atau melarang partisipasi pengguna yang melanggar aturan ini.</p>

                    <h2>5. Poin dan Hadiah</h2>
                    <p>Poin yang diperoleh dari transaksi tidak memiliki nilai tunai dan tidak dapat ditransfer. Poin hanya dapat ditukarkan dengan hadiah yang tersedia di katalog kami. Aturan perolehan dan penukaran poin dapat berubah sewaktu-waktu sesuai kebijakan TI Sport.</p>
                    
                    <h2>6. Batasan Tanggung Jawab</h2>
                    <p>TI Sport tidak bertanggung jawab atas cedera pribadi, kehilangan, atau kerusakan properti yang terjadi selama partisipasi dalam event. Peserta diharapkan untuk bermain dengan aman dan bertanggung jawab.</p>

                    <h2>7. Perubahan pada Ketentuan</h2>
                    <p>Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja. Perubahan akan efektif segera setelah diposting di situs kami. Penggunaan platform secara berkelanjutan setelah perubahan merupakan penerimaan Anda terhadap ketentuan yang baru.</p>
                </div>
            </AnimatedSection>
        </div>
    )
}
