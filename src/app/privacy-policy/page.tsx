import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-background-soft">
            <AnimatedSection as="div" className="w-full bg-surface">
                <div className="container py-16 md:py-24 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Kebijakan Privasi</h1>
                <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
                    Privasi Anda penting bagi kami. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.
                </p>
                </div>
            </AnimatedSection>

            <AnimatedSection as="div" className="container py-16 md:py-24 max-w-3xl">
                <div className="prose dark:prose-invert max-w-none text-lg">
                    <h2>1. Informasi yang Kami Kumpulkan</h2>
                    <p>Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti saat Anda membuat akun, melakukan booking, atau berkomunikasi dengan kami. Informasi ini termasuk:</p>
                    <ul>
                        <li><strong>Data Identitas:</strong> Nama lengkap, nama panggilan.</li>
                        <li><strong>Data Kontak:</strong> Alamat email, nomor telepon (WhatsApp).</li>
                        <li><strong>Data Transaksi:</strong> Detail booking, riwayat pembayaran (kami tidak menyimpan detail kartu kredit/debit Anda).</li>
                    </ul>

                    <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                    <p>Kami menggunakan informasi Anda untuk:</p>
                    <ul>
                        <li>Menyediakan, mengoperasikan, dan memelihara layanan kami.</li>
                        <li>Memproses transaksi dan mengelola booking Anda.</li>
                        <li>Mengirimkan notifikasi terkait event, pembayaran, dan pembaruan layanan.</li>
                        <li>Meningkatkan dan mempersonalisasi pengalaman Anda.</li>
                        <li>Mencegah penipuan dan memastikan keamanan platform.</li>
                    </ul>

                    <h2>3. Pembagian Informasi</h2>
                    <p>Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dalam situasi terbatas berikut:</p>
                    <ul>
                        <li>Dengan penyedia layanan yang membantu kami menjalankan bisnis (misalnya, gateway pembayaran), yang terikat oleh kewajiban kerahasiaan.</li>
                        <li>Jika diwajibkan oleh hukum atau untuk melindungi hak dan keamanan TI Sport, pengguna kami, atau publik.</li>
                    </ul>

                    <h2>4. Keamanan Data</h2>
                    <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi internet atau penyimpanan elektronik yang 100% aman.</p>
                    
                    <h2>5. Hak Anda</h2>
                    <p>Anda memiliki hak untuk mengakses, memperbaiki, atau meminta penghapusan data pribadi Anda. Anda dapat mengelola informasi akun Anda melalui halaman Pengaturan di dashboard Anda.</p>

                    <h2>6. Perubahan pada Kebijakan Ini</h2>
                    <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting kebijakan baru di halaman ini. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala.</p>

                    <h2>7. Hubungi Kami</h2>
                    <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan <a href="/contact">hubungi kami</a>.</p>
                </div>
            </AnimatedSection>
        </div>
    )
}
