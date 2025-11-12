'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type BookingFormProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  participants: string[];
  onParticipantChange: (index: number, name: string) => void;
};

export function BookingForm({ quantity, onQuantityChange, participants, onParticipantChange }: BookingFormProps) {
  const handleIncrement = () => {
    onQuantityChange(Math.min(10, quantity + 1));
  };

  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>Jumlah Tiket</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-bold w-10 text-center">{quantity}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AnimatePresence>
        <motion.div
            key={quantity}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            {Array.from({ length: quantity }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <Label htmlFor={`participant-${index}`}>Nama Peserta {index + 1}</Label>
                    <Input 
                        id={`participant-${index}`} 
                        placeholder={`Nama Peserta ${index + 1}`}
                        value={participants[index] || ''}
                        onChange={(e) => onParticipantChange(index, e.target.value)}
                    />
                </div>
            ))}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
