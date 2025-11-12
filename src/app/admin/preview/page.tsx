import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { EventCard } from '@/components/public/events/EventCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Edit, Trash } from 'lucide-react';
import type { Event } from '@/lib/types';

const previewEvent: Event = {
  id: "PREVIEW01",
  slug: "preview-event",
  title: "Example Event Card",
  venue: "Preview Venue • Court 1",
  startsAt: "2025-12-31T12:00:00Z",
  endsAt: "2025-12-31T14:00:00Z",
  capacity: 20,
  priceIDR: 150000,
  status: "OPEN",
  participantsMasked: ["p*1**", "p*2**", "p*3**", "p*4**", "p*5**", "p*6**", "p*7**", "p*8**", "p*9**", "p*10**", "p*11**", "p*12**", "p*13**", "p*14**", "p*15**", "p*16**"],
  category: "Badminton",
  imageUrl: "https://picsum.photos/seed/1/600/400",
  imageHint: "badminton people",
  description: "This is a sample event description.",
  details: {
      format: "Fun Games",
      gameType: ["Doubles"],
      includes: ["Shuttlecock", "Court Fee"],
      bring: ["Racket", "Shoes"]
  },
  isMembership: false,
  venueAddress: "Jl. Preview No. 123",
  venueMapUrl: "https://maps.app.goo.gl/12345"
};

export default function AdminPreviewPage() {
    const colors = [
        { name: 'Primary', varName: 'primary', hex: '#3B82F6' },
        { name: 'Secondary', varName: 'secondary', hex: '#F9FAFB' },
        { name: 'Accent', varName: 'accent', hex: '#E5E7EB' },
        { name: 'Background', varName: 'background', hex: '#FFFFFF' },
        { name: 'Foreground', varName: 'foreground', hex: '#111827' },
        { name: 'Muted', varName: 'muted', hex: '#E5E7EB' },
        { name: 'Destructive', varName: 'destructive', hex: '#ef4444' },
    ];


  return (
    <div className="container py-12 space-y-12">
      <header>
        <h1 className="font-headline text-4xl font-bold">Style Guide</h1>
        <p className="text-muted-foreground mt-2">A preview of all UI components for TIC Sport.</p>
      </header>

      {/* Colors */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {colors.map(color => (
            <div key={color.name}>
                <div className={`h-20 w-full rounded-lg bg-${color.varName} border`}></div>
                <div className="mt-2 font-semibold">{color.name}</div>
                <div className="text-sm text-muted-foreground">{color.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
            <h1 className="font-headline text-5xl font-bold">Headline 1 (Poppins)</h1>
            <h2 className="font-headline text-4xl font-bold">Headline 2 (Poppins)</h2>
            <h3 className="font-headline text-3xl font-bold">Headline 3 (Poppins)</h3>
            <p className="text-lg">Body Large (Inter). Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Body Regular (Inter). Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-sm text-muted-foreground">Muted Text. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <pre className="p-4 bg-muted rounded-lg font-code"><code>Code block for payloads.</code></pre>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-start">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button size="lg" className="min-h-12">Large Button (48px tap)</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <StatusBadge status="Tersedia" />
            <StatusBadge status="Hampir Penuh" />
            <StatusBadge status="Penuh" />
            <StatusBadge status="PAID" />
        </div>
      </section>

      {/* Forms */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Form Fields</h2>
        <div className="max-w-sm space-y-4">
            <div className="space-y-2">
                <Label htmlFor="preview-name">Name</Label>
                <Input id="preview-name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="preview-email-disabled">Email (Disabled)</Label>
                <Input id="preview-email-disabled" placeholder="user@example.com" disabled />
            </div>
        </div>
      </section>

      {/* Cards & Components */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Cards & Components</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <EventCard event={previewEvent} />
            </div>
            <Card>
                <CardHeader><CardTitle className="font-headline">Simple Card</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <p>This is a standard card component.</p>
                    <Progress value={66} />
                </CardContent>
            </Card>
        </div>
      </section>

      {/* Table */}
       <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Table</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">EVT001</TableCell>
                <TableCell>Badminton Community Night</TableCell>
                <TableCell><StatusBadge status="OPEN" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash className="h-4 w-4"/></Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Skeletons */}
      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Skeletons</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-[125px] w-full rounded-xl" />
        </div>
      </section>
    </div>
  );
}
