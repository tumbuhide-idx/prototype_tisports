'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type DonationInputProps = {
  donation: number;
  onDonationChange: (amount: number) => void;
};

const presetAmounts = [5000, 10000, 20000];

export function DonationInput({ donation, onDonationChange }: DonationInputProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handlePresetClick = (amount: number) => {
    onDonationChange(amount);
    setCustomAmount('');
    setShowCustomInput(false);
  };

  const handleCustomClick = () => {
    setShowCustomInput(true);
    // Focus the input after it's rendered
    setTimeout(() => {
      document.getElementById('custom-donation-input')?.focus();
    }, 0);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    onDonationChange(Number(value));
  };
  
  const isCustomActive = showCustomInput || (customAmount !== '' && !presetAmounts.includes(donation));

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
            variant={donation === amount && !showCustomInput ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(amount)}
            className="px-3 h-9"
          >
            {formatCurrency(amount)}
          </Button>
        ))}
        <Button
            type="button"
            variant={isCustomActive ? 'default' : 'outline'}
            size="sm"
            onClick={handleCustomClick}
            className="px-3 h-9"
        >
            Nominal Lain
        </Button>
      </div>

      <AnimatePresence>
        {showCustomInput && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="relative pt-2 max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pt-2">Rp</span>
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
