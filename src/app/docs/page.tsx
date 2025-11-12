
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DocsPage() {
    
    const userSchema = [
        { field: 'uid', type: 'string', desc: 'Primary key, dari Firebase Auth' },
        { field: 'email', type: 'string', desc: 'Email, dari Firebase Auth' },
        { field: 'displayName', type: 'string', desc: 'Nama lengkap pengguna' },
        { field: 'nickname', type: 'string', desc: 'Nama panggilan' },
        { field: 'avatarUrl', type: 'string', desc: 'URL ke foto profil' },
        { field: 'points', type: 'number', desc: 'Total poin reward' },
        { field: 'tier', type: "'Bronze' | 'Silver' | 'Gold'", desc: 'Tingkat keanggotaan' },
        { field: 'createdAt', type: 'Timestamp', desc: 'Waktu pembuatan akun' },
    ];

    const eventSchema = [
        { field: 'id', type: 'string', desc: 'ID unik event' },
        { field: 'title', type: 'string', desc: 'Nama event' },
        { field: 'venueId', type: 'string', desc: 'Referensi ke koleksi /venues' },
        { field: 'startsAt', type: 'Timestamp', desc: 'Waktu mulai' },
        { field: 'endsAt', type: 'Timestamp', desc: 'Waktu selesai' },
        { field: 'priceIDR', type: 'number', desc: 'Harga per slot' },
        { field: 'capacity', type: 'number', desc: 'Jumlah maksimal peserta' },
        { field: 'participantCount', type: 'number', desc: 'Jumlah peserta terdaftar' },
        { field: 'status', type: "'OPEN' | 'CLOSED' | 'CANCELED'", desc: 'Status event' },
    ];

    const bookingSchema = [
        { field: 'id', type: 'string', desc: 'ID unik booking' },
        { field: 'userId', type: 'string', desc: 'Referensi ke user' },
        { field: 'eventId', type: 'string', desc: 'Referensi ke event' },
        { field: 'transactionId', type: 'string', desc: 'Referensi ke transaksi' },
        { field: 'participants', type: 'Array<string>', desc: 'Nama-nama peserta dalam booking ini' },
        { field: 'createdAt', type: 'Timestamp', desc: 'Waktu booking dibuat' },
    ];

    const transactionSchema = [
        { field: 'id', type: 'string', desc: 'ID unik transaksi' },
        { field: 'userId', type: 'string', desc: 'Referensi ke user' },
        { field: 'bookingId', type: 'string', desc: 'Referensi ke booking' },
        { field: 'amount', type: 'number', desc: 'Total jumlah pembayaran' },
        { field: 'status', type: "'PENDING' | 'PAID' | 'REJECTED' | 'EXPIRED'", desc: 'Status pembayaran' },
        { field: 'paymentMethod', type: "'MANUAL_BCA' | 'QRIS' | 'MIDTRANS_VA'", desc: 'Metode pembayaran' },
        { field: 'proofUrl', type: 'string', desc: 'URL bukti bayar (jika manual)', optional: true },
        { field: 'createdAt', type: 'Timestamp', desc: 'Waktu transaksi' },
        { field: 'updatedAt', type: 'Timestamp', desc: 'Waktu terakhir status update' },
    ];

  return (
    <div className="container py-16 md:py-24 space-y-16">
      <header className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Backend & Infrastructure Blueprint</h1>
        <p className="text-text-muted mt-4 text-lg max-w-3xl mx-auto">Dokumentasi teknis untuk implementasi backend, mencakup struktur data Firestore dan aturan keamanan yang diusulkan.</p>
        <Badge variant="destructive" className="mt-6">INTERNAL DEVELOPER USE ONLY</Badge>
      </header>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">1. Arsitektur Data Firestore</h2>
        <Card className="bg-surface">
            <CardHeader><CardTitle>Struktur Koleksi</CardTitle><CardDescription>Struktur koleksi dan sub-koleksi yang diusulkan untuk database NoSQL (Firestore).</CardDescription></CardHeader>
            <CardContent className="font-mono text-sm space-y-2">
                <p>/users/{'userId'}</p>
                <p>/events/{'eventId'}</p>
                <p>/bookings/{'bookingId'}</p>
                <p>/transactions/{'transactionId'}</p>
                <p>/venues/{'venueId'}</p>
            </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">2. Skema Data (Data Models)</h2>
        <div className="space-y-8">
            <Card className="bg-surface">
                <CardHeader><CardTitle>Users</CardTitle><CardDescription>Path: <code className="font-mono bg-muted px-2 py-1 rounded">/users/{'userId'}</code></CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead></TableRow></TableHeader>
                        <TableBody>{userSchema.map(f => (<TableRow key={f.field}><TableCell className="font-semibold font-mono">{f.field}</TableCell><TableCell><Badge variant="secondary">{f.type}</Badge></TableCell><TableCell>{f.desc}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="bg-surface">
                <CardHeader><CardTitle>Events</CardTitle><CardDescription>Path: <code className="font-mono bg-muted px-2 py-1 rounded">/events/{'eventId'}</code></CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead></TableRow></TableHeader>
                        <TableBody>{eventSchema.map(f => (<TableRow key={f.field}><TableCell className="font-semibold font-mono">{f.field}</TableCell><TableCell><Badge variant="secondary">{f.type}</Badge></TableCell><TableCell>{f.desc}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Bookings</CardTitle><CardDescription>Path: <code className="font-mono bg-muted px-2 py-1 rounded">/bookings/{'bookingId'}</code></CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead></TableRow></TableHeader>
                        <TableBody>{bookingSchema.map(f => (<TableRow key={f.field}><TableCell className="font-semibold font-mono">{f.field}</TableCell><TableCell><Badge variant="secondary">{f.type}</Badge></TableCell><TableCell>{f.desc}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Transactions</CardTitle><CardDescription>Path: <code className="font-mono bg-muted px-2 py-1 rounded">/transactions/{'transactionId'}</code></CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Field</TableHead><TableHead>Type</TableHead><TableHead>Description</TableHead></TableRow></TableHeader>
                        <TableBody>{transactionSchema.map(f => (<TableRow key={f.field}><TableCell className="font-semibold font-mono">{f.field}{f.optional && ' (opt)'}</TableCell><TableCell><Badge variant="secondary">{f.type}</Badge></TableCell><TableCell>{f.desc}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </section>

       <section>
        <h2 className="font-headline text-3xl font-bold mb-6">3. Aturan Keamanan (Security Rules)</h2>
        <div className="space-y-4">
             <Card className="bg-surface">
                <CardHeader><CardTitle>Prinsip Umum</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-text-muted">
                    <p>1. <strong className="text-foreground">Default Deny:</strong> Akses ditolak secara default kecuali diizinkan secara eksplisit.</p>
                    <p>2. <strong className="text-foreground">Authentication Required:</strong> Hampir semua operasi tulis (create, update, delete) memerlukan user untuk login.</p>
                    <p>3. <strong className="text-foreground">Ownership:</strong> User hanya bisa memodifikasi data mereka sendiri (e.g., profil, booking).</p>
                    <p>4. <strong className="text-foreground">Admin Privileges:</strong> Admin memiliki hak akses lebih luas untuk manajemen data.</p>
                </CardContent>
            </Card>
            <Card className="bg-surface">
                <CardHeader><CardTitle>Contoh Aturan untuk <code className="font-mono text-base">/users/{'userId'}</code></CardTitle></CardHeader>
                <CardContent>
                    <pre className="p-4 bg-muted rounded-lg font-code overflow-x-auto">
{`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // User bisa membaca profilnya sendiri
      allow get: if request.auth.uid == userId;
      // User bisa membuat profilnya saat sign up
      allow create: if request.auth.uid == userId;
      // User bisa mengupdate profilnya sendiri
      allow update: if request.auth.uid == userId;
      // Profil tidak bisa dihapus oleh user
      allow delete: if false;
    }
  }
}
`}
                    </pre>
                </CardContent>
            </Card>
             <Card className="bg-surface">
                <CardHeader><CardTitle>Contoh Aturan untuk <code className="font-mono text-base">/bookings/{'bookingId'}</code></CardTitle></CardHeader>
                <CardContent>
                    <pre className="p-4 bg-muted rounded-lg font-code overflow-x-auto">
{`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      // User bisa membaca booking miliknya
      allow get: if request.auth.uid == resource.data.userId;
      // User bisa membuat booking baru jika login
      allow create: if request.auth.uid != null && request.auth.uid == request.resource.data.userId;
      // Booking tidak bisa diupdate atau dihapus oleh user
      allow update, delete: if false;
    }
  }
}
`}
                    </pre>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
