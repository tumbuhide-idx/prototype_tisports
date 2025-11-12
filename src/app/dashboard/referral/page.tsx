
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Gift, Copy, Check, Users } from 'lucide-react';

export default function ReferralPage() {
  const referralCode = "ANDI-TIS-24";

  return (
    <AnimatedSection>
        <div className="space-y-8">
            <header className="text-center">
                <Gift className="h-16 w-16 mx-auto text-primary" />
                <h1 className="font-headline text-3xl md:text-4xl font-bold mt-4">Ajak Teman, Dapat Hadiah</h1>
                <p className="text-text-muted mt-2 max-w-2xl mx-auto">
                    Bagikan keseruan bermain! Saat temanmu bergabung dan booking event pertama, kalian berdua dapat bonus 500 poin.
                </p>
            </header>

            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-xl">Kode Referral Anda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
                        <p className="text-2xl font-bold font-mono tracking-widest">{referralCode}</p>
                        <Button variant="ghost" size="icon">
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button className="w-full">Bagikan Kode</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Users className="h-5 w-5" /> Status Referral</CardTitle>
                    <CardDescription>Lacak undangan dan hadiah Anda.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="text-center py-12 bg-muted rounded-lg">
                        <p className="text-text-muted">Anda belum mengajak siapa pun.</p>
                        <p className="text-sm text-text-muted mt-1">Bagikan kodemu untuk mulai dapat hadiah!</p>
                   </div>
                </CardContent>
            </Card>
        </div>
    </AnimatedSection>
  );
}
