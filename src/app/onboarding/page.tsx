
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Cake, Users, MapPin, Briefcase, Shirt, GitBranch, Sparkles, Star, Camera, ShieldCheck, ArrowRight, ArrowLeft, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const steps = [
  { id: 1, title: 'Identitas Akun', icon: <User className="h-5 w-5" /> },
  { id: 2, title: 'Data Diri', icon: <Users className="h-5 w-5" /> },
  { id: 3, title: 'Gaya Bermain', icon: <Sparkles className="h-5 w-5" /> },
  { id: 4, title: 'Foto & Izin', icon: <Camera className="h-5 w-5" /> },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

// --- Step Components ---

const Step1 = ({ data, setData, setErrors, errors }: any) => {
  const validate = () => {
    const newErrors: any = {};
    if (!data.username || data.username.length < 3 || data.username.length > 16) {
      newErrors.username = 'Username harus 3-16 karakter.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
      newErrors.username = 'Username hanya boleh huruf, angka, dan underscore.';
    }
    if (!data.nickname) {
      newErrors.nickname = 'Nama panggilan wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return {
    component: (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={data.username || ''} onChange={e => setData({ ...data, username: e.target.value })} placeholder="pilih_username_unik" />
          {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="nickname">Nama Panggilan</Label>
          <Input id="nickname" value={data.nickname || ''} onChange={e => setData({ ...data, nickname: e.target.value })} placeholder="Nama panggilanmu" />
          {errors.nickname && <p className="text-sm text-destructive">{errors.nickname}</p>}
        </div>
      </div>
    ),
    validate,
  };
};

const Step2 = ({ data, setData }: any) => {
    const fields = [
        { key: 'fullName', filled: !!data.fullName },
        { key: 'dob', filled: !!data.dob },
        { key: 'gender', filled: !!data.gender },
        { key: 'city', filled: !!data.city },
        { key: 'occupation', filled: !!data.occupation },
        { key: 'shirtSize', filled: !!data.shirtSize },
    ];
    const filledCount = fields.filter(f => f.filled).length;
    const points = (filledCount * 25) + (filledCount === fields.length ? 50 : 0) + (data.referralCode ? 100 : 0);

  return {
    component: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input id="fullName" value={data.fullName || ''} onChange={e => setData({ ...data, fullName: e.target.value })} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dob">Tanggal Lahir</Label>
                <Input id="dob" type="date" value={data.dob || ''} onChange={e => setData({ ...data, dob: e.target.value })} />
            </div>
        </div>
        <div className="space-y-2">
            <Label>Jenis Kelamin</Label>
            <RadioGroup value={data.gender} onValueChange={value => setData({ ...data, gender: value })} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Laki-laki</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Perempuan</Label></div>
            </RadioGroup>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="city">Domisili (Kota)</Label>
                <Input id="city" value={data.city || ''} onChange={e => setData({ ...data, city: e.target.value })} placeholder="cth. Jakarta Selatan" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="occupation">Pekerjaan</Label>
                <Select value={data.occupation} onValueChange={value => setData({ ...data, occupation: value })}>
                    <SelectTrigger><SelectValue placeholder="Pilih pekerjaan..." /></SelectTrigger>
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
            <Select value={data.shirtSize} onValueChange={value => setData({ ...data, shirtSize: value })}>
                <SelectTrigger><SelectValue placeholder="Pilih ukuran..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Separator />
        <div className="space-y-2">
            <Label htmlFor="referralCode">Kode Referral (Opsional)</Label>
            <Input id="referralCode" value={data.referralCode || ''} onChange={e => setData({ ...data, referralCode: e.target.value })} />
        </div>
         <div className="mt-6 text-center">
            <p className="font-bold text-lg text-primary">Kamu akan mendapat +{points} Poin!</p>
        </div>
      </div>
    ),
    points,
  };
};

const Step3 = ({ data, setData }: any) => {
    const fields = [
        { key: 'playGoals', filled: data.playGoals && data.playGoals.length > 0 },
        { key: 'playLevel', filled: !!data.playLevel },
        { key: 'playFrequency', filled: !!data.playFrequency },
        { key: 'otherHobbies', filled: data.otherHobbies && data.otherHobbies.length > 0 },
    ];
    const filledCount = fields.filter(f => f.filled).length;
    const points = (filledCount * 15) + (filledCount === fields.length ? 25 : 0);

    const handleMultiSelect = (key: string, value: string) => {
        const currentValues = data[key] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v: string) => v !== value)
            : [...currentValues, value];
        setData({ ...data, [key]: newValues });
    };

    return {
        component: (
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label>Tujuan utama bermain di TI Sport?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Fun / Cari teman', 'Jaga kebugaran', 'Sparring rutin', 'Kompetitif'].map(goal => (
                            <Button key={goal} variant={data.playGoals?.includes(goal) ? 'default' : 'outline'} onClick={() => handleMultiSelect('playGoals', goal)} className="h-auto py-3 text-wrap">{goal}</Button>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <Label>Level bermain kamu saat ini?</Label>
                     <RadioGroup value={data.playLevel} onValueChange={value => setData({ ...data, playLevel: value })} className="flex flex-wrap gap-2">
                        {['Pemula', 'Newbie+', 'Menengah', 'Lanjut'].map(level => (
                             <Label key={level} htmlFor={level} className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${data.playLevel === level ? 'bg-primary text-primary-foreground border-primary' : ''}`}>
                                <RadioGroupItem value={level} id={level} />
                                <span>{level}</span>
                             </Label>
                        ))}
                    </RadioGroup>
                </div>
                 <div className="space-y-3">
                    <Label>Frekuensi bermain per minggu?</Label>
                     <Select value={data.playFrequency} onValueChange={value => setData({ ...data, playFrequency: value })}>
                        <SelectTrigger><SelectValue placeholder="Pilih frekuensi..." /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1x">1x seminggu</SelectItem>
                            <SelectItem value="2-3x">2-3x seminggu</SelectItem>
                            <SelectItem value="4x+">4x+ seminggu</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-3">
                    <Label>Hobi lain?</Label>
                    <div className="flex flex-wrap gap-2">
                        {['Ngopi', 'Gym', 'Futsal', 'Musik', 'Konten Kreator'].map(hobby => (
                            <Button key={hobby} size="sm" variant={data.otherHobbies?.includes(hobby) ? 'secondary' : 'outline'} onClick={() => handleMultiSelect('otherHobbies', hobby)}>{hobby}</Button>
                        ))}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="font-bold text-lg text-primary">Kamu akan mendapat +{points} Poin!</p>
                </div>
            </div>
        ),
        points
    }
}

const Step4 = ({ data, setData }: any) => {
    const points = (data.profilePic ? 50 : 0) + (data.mediaConsent ? 10 : 0);
    return {
        component: (
            <div className="space-y-8 text-center">
                <div className="flex flex-col items-center gap-4">
                     <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                        {data.profilePic ? (
                            <img src={data.profilePic} alt="Preview" className="h-full w-full object-cover rounded-full" />
                        ) : (
                            <Camera className="h-12 w-12 text-muted-foreground" />
                        )}
                    </div>
                    <input id="profile-pic-upload" type="file" accept="image/*" className="hidden" onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                setData({ ...data, profilePic: event.target?.result });
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    }}/>
                    <Label htmlFor="profile-pic-upload" className="cursor-pointer text-primary font-semibold hover:underline">
                        Pilih Foto
                    </Label>
                </div>
                 <div className="flex items-center space-x-2 justify-center">
                    <Checkbox id="media-consent" checked={data.mediaConsent} onCheckedChange={checked => setData({...data, mediaConsent: checked})} />
                    <Label htmlFor="media-consent" className="text-sm text-muted-foreground">
                        Saya izinkan foto saya digunakan untuk konten TI Sport.
                    </Label>
                </div>
                 <div className="mt-6 text-center">
                    <p className="font-bold text-lg text-primary">Kamu akan mendapat +{points} Poin!</p>
                </div>
            </div>
        ),
        points
    }
}


// --- Main Page Component ---

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [[step, direction], setStep] = useState([1, 0]);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  
  const stepComponents = [
      Step1({ data: formData, setData: setFormData, setErrors, errors }),
      Step2({ data: formData, setData: setFormData }),
      Step3({ data: formData, setData: setFormData }),
      Step4({ data: formData, setData: setFormData }),
  ];

  const currentStepData = stepComponents[step - 1];

  const handleNext = () => {
    if ('validate' in currentStepData && typeof currentStepData.validate === 'function') {
        const isValid = currentStepData.validate();
        if (!isValid) return;
    }

    if (step < 4) {
      setStep([step + 1, 1]);
    } else {
      handleFinish();
    }
  };

  const handleLogout = () => {
    // In a real app, you would call your authentication service's logout method.
    // For this prototype, we'll just redirect to the login page.
    console.log("Logging out...");
    router.push('/login');
  };
  
  const handleSkip = () => {
      if (step < 4) {
          toast({ title: "Langkah dilewati", description: "Kamu bisa melengkapinya nanti di profil."})
          setStep([step + 1, 1]);
      }
  }

  const handleFinish = () => {
    let totalPoints = 0;
    stepComponents.forEach(step => {
        if ('points' in step && typeof step.points === 'number') {
            totalPoints += step.points;
        }
    });
    
    // Perfect Onboarding Bonus
    const isStep2Complete = Object.values(formData).some(v => v);
    if(isStep2Complete) totalPoints += 100;
    
    console.log("Onboarding Data:", formData);
    console.log("Total Points Earned:", totalPoints);

    toast({
        title: "✨ Onboarding Selesai!",
        description: `Selamat! Kamu mendapatkan total +${totalPoints} poin.`,
        duration: 5000,
    });
    // In a real app, here you would save the data to Firestore
    // and then redirect.
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-soft flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10 border-border-soft bg-surface/80 backdrop-blur-sm">
            <CardHeader>
                <div className="w-full space-y-4">
                    <Progress value={(step / 4) * 100} className="h-2" />
                    <div className="flex justify-between">
                        {steps.map(s => (
                            <div key={s.id} className="flex flex-col items-center">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= s.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-muted'}`}>
                                    {s.icon}
                                </div>
                                <p className={`mt-1 text-xs text-center ${step >= s.id ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{s.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center pt-8">
                    <CardTitle className="font-headline text-2xl md:text-3xl">{steps[step - 1].title}</CardTitle>
                    <CardDescription className="mt-2">Langkah {step} dari 4</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                 <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        {currentStepData.component}
                    </motion.div>
                </AnimatePresence>
            </CardContent>
            <div className="p-6 bg-muted/50 rounded-b-lg mt-6">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Keluar
                    </Button>
                    <div className="flex items-center gap-2">
                        {step > 1 && step < 4 && (
                            <Button variant="outline" onClick={handleSkip}>Lewati</Button>
                        )}
                        {step < 4 ? (
                            <Button onClick={handleNext}>Lanjut <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        ) : (
                            <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                                Selesai & Klaim Poin <Star className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
}
