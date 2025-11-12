import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function QRTicket() {
  const qrImage = PlaceHolderImages.find(p => p.id === 'qris-demo');

  if (!qrImage) {
    return (
      <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">QR tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 border rounded-lg">
        <div className="relative aspect-square w-full mx-auto bg-muted rounded-lg flex items-center justify-center overflow-hidden">
        <Image
            src={qrImage.imageUrl}
            alt={qrImage.description}
            fill
            className="object-contain"
            data-ai-hint={qrImage.imageHint}
        />
        </div>
    </div>
  );
}
