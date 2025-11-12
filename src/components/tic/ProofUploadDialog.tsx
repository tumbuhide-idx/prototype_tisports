'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

export function ProofUploadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Bukti Bayar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Upload Bukti Pembayaran</DialogTitle>
          <DialogDescription>
            Pilih atau seret file gambar bukti transfer Anda ke sini.
          </DialogDescription>
        </DialogHeader>
        <div className="py-8">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-background">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, atau JPEG</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Selesai</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
