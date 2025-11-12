import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ShuttlecockIcon } from '@/components/shared/ShuttlecockIcon';

export default function ResetPasswordPage() {
  return (
    <div className="w-full min-h-[calc(100vh-var(--header-height,4rem))] flex items-center justify-center bg-background-soft p-4">
      <AnimatedSection className="w-full max-w-md">
        <Card className="shadow-2xl shadow-primary/10 border-border-soft bg-surface/80 backdrop-blur-sm">
          <CardHeader className="text-center">
             <Link href="/" className="flex items-center space-x-2 mx-auto mb-4 w-fit">
                <ShuttlecockIcon className="h-8 w-8 text-primary" />
             </Link>
            <CardTitle className="font-headline text-2xl">Reset Password</CardTitle>
            <CardDescription>Buat password baru untuk akun Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password Baru</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full font-bold">Perbarui Password</Button>
            </form>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
