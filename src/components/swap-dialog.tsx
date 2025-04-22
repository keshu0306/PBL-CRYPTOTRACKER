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
import {ArrowDown, ArrowUp} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

const SwapDialog = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [payCoin, setPayCoin] = useState('');
  const [receiveCoin, setReceiveCoin] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const connectWallet = () => {
    // Placeholder for wallet connection logic
    setIsConnected(true);
    toast({
      title: "Wallet Connected!",
      description: "Your wallet is now connected.",
    });
  };

  const handlePayCoinChange = async (value: string) => {
    setPayCoin(value);
    if (payAmount && receiveCoin) {
      await calculateReceiveAmount(value, receiveCoin, payAmount);
    }
  };

  const handleReceiveCoinChange = async (value: string) => {
    setReceiveCoin(value);
    if (payAmount && payCoin) {
      await calculateReceiveAmount(payCoin, value, payAmount);
    }
  };

  const handlePayAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setPayAmount(amount);
    if (payCoin && receiveCoin) {
      await calculateReceiveAmount(payCoin, receiveCoin, amount);
    }
  };

  const calculateReceiveAmount = async (
    payCurrency: string,
    receiveCurrency: string,
    amount: string
  ) => {
    // Placeholder for calculation logic based on selected coins and amount
    // In a real app, this would involve fetching exchange rates and performing the calculation
    try {
      const rate = 0.5; // example of the rate
      const receive = parseFloat(amount) * rate;
      setReceiveAmount(receive.toString());
    } catch (error) {
      console.error("Error calculating receive amount:", error);
      toast({
        title: "Error",
        description: "Could not calculate receive amount.",
        variant: "destructive",
      });
      setReceiveAmount('');
    }
  };

  const handleSwap = () => {
    // Placeholder for swap logic
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!payCoin || !receiveCoin || !payAmount) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all the required fields.",
        variant: "destructive",
      });
      return;
    }

    // Perform swap
    toast({
      title: "Swap Successful!",
      description: `Swapped ${payAmount} ${payCoin} for ${receiveAmount} ${receiveCoin}.`,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Swap</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-3 font-medium">Connect Your Wallet</div>
          <Button variant="secondary" className="col-span-1" onClick={connectWallet} disabled={isConnected}>
            {isConnected ? 'Connected' : 'Connect'}
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
        <div className="grid grid-cols-4 items-center gap-1 justify-center">
          <ArrowUp className="col-span-2 justify-self-end"/>
          <ArrowDown className="col-span-2 justify-self-start"/>
        </div>

        <div className="grid grid-cols-12 items-center gap-4">
          <div className="col-span-4 font-medium">Receive</div>
          <Input
            type="number"
            placeholder="Amount"
            className="col-span-4"
            disabled
            value={receiveAmount}
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
        <Button variant="secondary" onClick={handleSwap} disabled={!payCoin || !receiveCoin || !payAmount}>
          Swap
        </Button>
        <div className="grid grid-cols-2 items-center gap-4 bg-secondary rounded-lg">
          <div className="col-span-1 font-medium">Save on CoinStats Fees</div>
          <Button variant="secondary" className="col-span-1">Go Premium</Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default SwapDialog;
