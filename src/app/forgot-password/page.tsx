import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ShuttlecockIcon } from '@/components/shared/ShuttlecockIcon';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full min-h-[calc(100vh-var(--header-height,4rem))] flex items-center justify-center bg-background-soft p-4">
      <AnimatedSection className="w-full max-w-md">
        <Card className="shadow-2xl shadow-primary/10 border-border-soft bg-surface/80 backdrop-blur-sm">
          <CardHeader className="text-center">
             <Link href="/" className="flex items-center space-x-2 mx-auto mb-4 w-fit">
                <ShuttlecockIcon className="h-8 w-8 text-primary" />
             </Link>
            <CardTitle className="font-headline text-2xl">Lupa Password</CardTitle>
            <CardDescription>Masukkan email Anda dan kami akan mengirimkan link untuk reset password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@anda.com" required />
              </div>
              <Button type="submit" className="w-full font-bold">Kirim Link Reset</Button>
            </form>
            <div className="text-center">
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
