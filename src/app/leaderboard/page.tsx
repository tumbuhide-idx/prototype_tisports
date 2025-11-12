import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Shield, Zap } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const leaderboardData = [
  { rank: 1, name: 'Andi "The Wall" S.', points: 1250, matches: 25, avatar: 'AS' },
  { rank: 2, name: 'Budi "Smash" K.', points: 1180, matches: 24, avatar: 'BK' },
  { rank: 3, name: 'Citra "Deceiver" A.', points: 1150, matches: 26, avatar: 'CA' },
  { rank: 4, name: 'Dewi "Flash" P.', points: 1090, matches: 22, avatar: 'DP' },
  { rank: 5, name: 'Eko "Rocket" W.', points: 1050, matches: 21, avatar: 'EW' },
  { rank: 6, name: 'Fitri "Net" L.', points: 980, matches: 20, avatar: 'FL' },
  { rank: 7, name: 'Gilang "Stamina" M.', points: 950, matches: 28, avatar: 'GM' },
];

export default function LeaderboardPage() {
  const topPlayer = leaderboardData[0];

  return (
    <div className="bg-background-soft">
      <AnimatedSection as="div" className="w-full bg-surface">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Papan Peringkat</h1>
          <p className="mt-4 max-w-3xl mx-auto text-text-muted md:text-lg [text-wrap:balance]">
            Lihat peringkat para pemain di komunitas TI Sport. Poin dihitung berdasarkan partisipasi, kemenangan, dan sportivitas.
          </p>
        </div>
      </AnimatedSection>

      <div className="container py-16 md:py-24">
        {/* Top Player Highlight */}
        <AnimatedSection as="div" className="mb-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-tr from-accent/10 to-secondary/10 border-2 border-accent/50 shadow-2xl shadow-accent/10">
            <CardHeader className="text-center">
              <Trophy className="h-12 w-12 mx-auto text-accent" />
              <CardTitle className="font-headline text-3xl mt-4">Peringkat #1</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-accent">
                <AvatarFallback className="text-4xl font-bold">{topPlayer.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold font-headline">{topPlayer.name}</h3>
              <p className="text-4xl font-bold text-primary my-2">{topPlayer.points} PTS</p>
              <div className="flex justify-center gap-6 text-text-muted mt-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>{topPlayer.matches} Pertandingan</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Full Leaderboard Table */}
        <AnimatedSection as="div" delay={0.2}>
          <Card className="bg-surface">
            <CardHeader>
                <CardTitle className="font-headline">Peringkat Umum</CardTitle>
                <CardDescription>Top 50 Pemain</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Pemain</TableHead>
                    <TableHead className="text-right">Poin</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Pertandingan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((player) => (
                    <TableRow key={player.rank} className={player.rank === 1 ? 'bg-accent/10' : ''}>
                      <TableCell className="font-bold text-lg">{player.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{player.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">{player.points}</TableCell>
                      <TableCell className="text-right hidden sm:table-cell">{player.matches}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
