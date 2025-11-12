
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const { toast } = useToast();

    const handleSave = (section: string) => {
        toast({
            title: 'Berhasil Disimpan',
            description: `Pengaturan ${section} Anda telah diperbarui.`
        })
    }

    return (
        <AnimatedSection>
            <div className="space-y-8">
                <header>
                    <h1 className="font-headline text-3xl md:text-4xl font-bold">Profil Saya</h1>
                    <p className="text-text-muted mt-1">Kelola informasi personal, minat, dan preferensi akun Anda.</p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Informasi Personal</CardTitle>
                        <CardDescription>Perbarui detail personal dan kontak Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarFallback className="text-3xl">AP</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Ubah Avatar</Button>
                        </div>
                        <div className="space-y-4">
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="andipratama" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nickname">Nama Panggilan</Label>
                                    <Input id="nickname" defaultValue="Andi" />
                                </div>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nama Lengkap</Label>
                                    <Input id="fullName" defaultValue="Andi Pratama" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Tanggal Lahir</Label>
                                    <Input id="dob" type="date" defaultValue="1995-05-10" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label>Jenis Kelamin</Label>
                                <RadioGroup defaultValue="male" className="flex gap-4">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Laki-laki</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Perempuan</Label></div>
                                </RadioGroup>
                            </div>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">Domisili (Kota)</Label>
                                    <Input id="city" defaultValue="Jakarta Selatan" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="occupation">Pekerjaan</Label>
                                    <Select defaultValue="karyawan">
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pelajar">Pelajar</SelectItem>
                                            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                                            <SelectItem value="karyawan">Karyawan</SelectItem>
                                            <SelectItem value="wirausaha">Wirausaha</SelectItem>
                                            <SelectItem value="freelancer">Freelancer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="shirtSize">Ukuran Kaos/Jersey</Label>
                                <Select defaultValue="L">
                                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="S">S</SelectItem>
                                        <SelectItem value="M">M</SelectItem>
                                        <SelectItem value="L">L</SelectItem>
                                        <SelectItem value="XL">XL</SelectItem>
                                        <SelectItem value="XXL">XXL</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={() => handleSave("Informasi Personal")}>Simpan Perubahan</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Minat & Gaya Bermain</CardTitle>
                        <CardDescription>Bantu kami mengenal Anda lebih baik untuk memberikan rekomendasi yang lebih sesuai.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label>Tujuan utama bermain di TI Sport?</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Fun / Cari teman', 'Jaga kebugaran', 'Sparring rutin', 'Kompetitif'].map(goal => (
                                    <Button key={goal} variant={goal === 'Jaga kebugaran' ? 'default' : 'outline'} className="h-auto py-3 text-wrap">{goal}</Button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Level bermain kamu saat ini?</Label>
                            <RadioGroup defaultValue="Menengah" className="flex flex-wrap gap-2">
                                {['Pemula', 'Newbie+', 'Menengah', 'Lanjut'].map(level => (
                                    <Label key={level} htmlFor={`level-${level}`} className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${level === 'Menengah' ? 'bg-primary text-primary-foreground border-primary' : ''}`}>
                                        <RadioGroupItem value={level} id={`level-${level}`} />
                                        <span>{level}</span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="space-y-3">
                            <Label>Hobi lain?</Label>
                            <div className="flex flex-wrap gap-2">
                                {['Ngopi', 'Gym', 'Futsal', 'Musik', 'Konten Kreator'].map(hobby => (
                                    <Button key={hobby} size="sm" variant={['Ngopi', 'Konten Kreator'].includes(hobby) ? 'secondary' : 'outline'}>{hobby}</Button>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-start space-x-2">
                            <Checkbox id="media-consent" defaultChecked/>
                            <div className="grid gap-1.5 leading-none">
                                <label
                                htmlFor="media-consent"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                Izin Penggunaan Media
                                </label>
                                <p className="text-sm text-muted-foreground">
                                Saya mengizinkan foto/video saya yang diambil saat event digunakan untuk materi promosi TI Sport.
                                </p>
                            </div>
                        </div>
                         <Button onClick={() => handleSave("Minat & Gaya Bermain")}>Simpan Preferensi</Button>
                    </CardContent>
                </Card>

            </div>
        </AnimatedSection>
    );
}
