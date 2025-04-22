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
import {Input} from "@/components/ui/input";

const SwapDialog = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [payCoin, setPayCoin] = useState('');
  const [receiveCoin, setReceiveCoin] = useState('');
  const [payAmount, setPayAmount] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePayCoinChange = (value: string) => {
    setPayCoin(value);
  };

  const handleReceiveCoinChange = (value: string) => {
    setReceiveCoin(value);
  };

  const handlePayAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayAmount(e.target.value);
  };

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

          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-4 font-medium">Pay</div>
            <Input
              type="number"
              placeholder="Amount"
              className="col-span-4"
              value={payAmount}
              onChange={handlePayAmountChange}
            />
            <Select onValueChange={handlePayCoinChange}>
              <SelectTrigger className="col-span-4">
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

          <div className="grid grid-cols-1 items-center gap-1 justify-center">
            <img
              src="https://picsum.photos/32/32"
              alt="Switch Icon"
              className="rounded-full"
            />
          </div>

          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-4 font-medium">Receive</div>
            <Input
              type="number"
              placeholder="Amount"
              className="col-span-4"
              disabled
            />
            <Select onValueChange={handleReceiveCoinChange}>
              <SelectTrigger className="col-span-4">
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
          <Button variant="secondary" disabled={!payCoin || !receiveCoin || !payAmount}>
            Swap
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
