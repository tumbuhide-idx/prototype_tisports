
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/shared/AnimatedSection"

const faqs = [
    {
        question: "Bagaimana cara mendaftar event?",
        answer: "Pilih event yang Anda inginkan di halaman Events, lalu klik tombol 'Detail'. Di halaman detail, klik 'Booking Sekarang' dan ikuti langkah-langkah untuk menyelesaikan pembayaran. E-tiket Anda akan langsung terbit setelah pembayaran terkonfirmasi."
    },
    {
        question: "Apakah saya perlu membuat akun?",
        answer: "Anda bisa melakukan booking sebagai tamu tanpa membuat akun. Namun, dengan membuat akun, Anda bisa mendapatkan poin, melacak riwayat booking, dan mendapatkan akses ke fitur-fitur eksklusif lainnya."
    },
    {
        question: "Bagaimana sistem poin bekerja?",
        answer: "Setiap kelipatan Rp 25.000 dari harga tiket yang Anda bayarkan akan dikonversi menjadi 25 poin. Poin ini dapat Anda kumpulkan dan tukarkan dengan berbagai hadiah menarik seperti diskon, merchandise, atau bahkan tiket gratis."
    },
    {
        question: "Apa saja yang termasuk dalam biaya pendaftaran?",
        answer: "Biaya pendaftaran biasanya sudah termasuk biaya sewa lapangan dan shuttlecock. Namun, detail lengkapnya selalu tercantum di bagian 'Detail Tambahan' pada setiap halaman event. Peserta diharapkan membawa raket dan sepatu sendiri."
    },
    {
        question: "Bagaimana jika saya berhalangan hadir?",
        answer: "Sesuai dengan kebijakan kami, pendaftaran yang sudah dibayar tidak dapat dibatalkan atau di-refund. Namun, Anda dapat mengalihkan tiket Anda kepada orang lain dengan menginformasikan kepada admin kami."
    }
]


export default function FAQPage() {
  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Punya pertanyaan? Kami sudah menyiapkan jawaban untuk beberapa pertanyaan yang paling sering diajukan.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection as="div" className="container py-16 md:py-24 max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-surface p-4 rounded-lg border-soft">
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 text-text-muted">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </AnimatedSection>
    </div>
  );
}
