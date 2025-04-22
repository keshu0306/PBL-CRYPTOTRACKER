'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

const SwapDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Swap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Swap</DialogTitle>
          <DialogDescription>
            This feature is under development. Please check back later.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SwapDialog;
