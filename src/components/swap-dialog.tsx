'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";

const SwapDialog = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Swap</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-3 font-medium">Connect Your Wallet</div>
            <Button variant="secondary" className="col-span-1">
              Connect
            </Button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-2 font-medium">Pay</div>
            <Select>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select Coin"/>
              </SelectTrigger>
              <SelectContent>
                {isMounted ? (
                  <>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </>
                ) : null}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 items-center gap-1">
            <img
              src="https://picsum.photos/32/32"
              alt="Logo"
              className="rounded-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-2 font-medium">Receive</div>
            <Select>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select Coin"/>
              </SelectTrigger>
              <SelectContent>
                {isMounted ? (
                  <>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </>
                ) : null}
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary">
            Select Pay Coin
          </Button>
          <div className="grid grid-cols-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="col-span-1 font-medium">Save on CoinStats Fees</div>
            <Button variant="secondary" className="col-span-1">Go Premium</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwapDialog;
