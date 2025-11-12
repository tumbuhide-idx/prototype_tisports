'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import type { PaymentMethod } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QrCode, Landmark, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';

type PaymentPanelProps = {
  methods: PaymentMethod[];
};

export function PaymentPanel({ methods }: PaymentPanelProps) {
  const [activeTab, setActiveTab] = useState(methods.find(m => m.isActive)?.id || '');
  const [isCopied, setIsCopied] = useState(false);
  const qrisImage = PlaceHolderImages.find(p => p.id === 'qris-demo');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-auto">
        {methods.filter(m => m.isActive).map(method => (
          <TabsTrigger key={method.id} value={method.id} className="py-3 data-[state=active]:shadow-md">
            {method.type === 'QRIS' && <QrCode className="mr-2 h-4 w-4" />}
            {method.type === 'BANK' && <Landmark className="mr-2 h-4 w-4" />}
            {method.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
      {methods.map(method => (
        <TabsContent key={method.id} value={method.id}>
          <Card className="mt-4 rounded-2xl">
            <CardContent className="p-6">
              {method.type === 'QRIS' && qrisImage && (
                <div className="text-center space-y-4">
                  <p className="font-semibold">{method.displayName} a/n {method.accountName}</p>
                  <div className="relative w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <Image 
                      src={qrisImage.imageUrl} 
                      alt={qrisImage.description} 
                      width={180} 
                      height={180} 
                      className="rounded-md"
                      data-ai-hint={qrisImage.imageHint}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Scan QR code di atas menggunakan aplikasi bank atau e-wallet Anda.</p>
                </div>
              )}
              {method.type === 'BANK' && method.accountNumber && (
                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">Transfer ke {method.displayName}</p>
                    <div className="p-4 bg-muted rounded-lg inline-flex items-center gap-4">
                        <p className="text-xl font-bold font-mono tracking-wider">{method.accountNumber}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(method.accountNumber!)}>
                            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                    <p className="font-semibold">a/n {method.accountName}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
