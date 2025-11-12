import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

type ParticipantsListProps = {
  participants: string[];
};

export function ParticipantsList({ participants }: ParticipantsListProps) {
  if (participants.length === 0) {
    return <p className="mt-4 text-sm text-muted-foreground">Jadilah yang pertama mendaftar!</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {participants.map((name, index) => (
        <div key={index} className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{name}</span>
        </div>
      ))}
    </div>
  );
}
