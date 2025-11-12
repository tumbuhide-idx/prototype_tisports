'use client';

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type DonationInputProps = {
  donation: number;
  onDonationChange: (amount: number) => void;
};

const presetAmounts = [5000, 10000, 20000, 50000];

export function DonationInput({ donation, onDonationChange }: DonationInputProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // Sync local state if parent state changes to a non-preset value
    if (donation > 0 && !presetAmounts.includes(donation)) {
        setIsCustom(true);
        setCustomAmount(String(donation));
    } else if (donation === 0) {
        setIsCustom(false);
        setCustomAmount('');
    } else {
        setIsCustom(false);
    }
  }, [donation]);

  const handlePresetClick = (amount: number) => {
    onDonationChange(amount);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    if(customAmount) {
        onDonationChange(Number(customAmount));
    } else {
        onDonationChange(0);
    }
    setTimeout(() => {
      document.getElementById('custom-donation-input')?.focus();
    }, 0);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Numeric only
    setCustomAmount(value);
    onDonationChange(Number(value));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Tambahkan Donasi</Label>
        <p className="text-sm text-muted-foreground">
          Dukung pengembangan komunitas dengan donasi (opsional).
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {presetAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={donation === amount && !isCustom ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(amount)}
            className="px-3 h-9"
          >
            {formatCurrency(amount)}
          </Button>
        ))}
        <Button
            type="button"
            variant={isCustom ? 'default' : 'outline'}
            size="sm"
            onClick={handleCustomClick}
            className="px-3 h-9"
        >
            Nominal Lain
        </Button>
      </div>

      <AnimatePresence>
        {isCustom && (
            <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="relative max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                        id="custom-donation-input"
                        type="text"
                        placeholder="Masukkan nominal"
                        className="pl-9"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
