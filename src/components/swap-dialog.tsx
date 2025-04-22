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
import { currencies } from "@/lib/currencies";

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
    // In a real app, this would involve connecting to a web3 provider like Metamask
    // and checking if the user is already connected.
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
    if (!amount) {
      setReceiveAmount('');
      return;
    }
    // Placeholder for calculation logic based on selected coins and amount
    // In a real app, this would involve fetching exchange rates and performing the calculation
    try {
      // Simulate fetching exchange rate
      const exchangeRate = await simulateExchangeRate(payCurrency, receiveCurrency);
      const receive = parseFloat(amount) * exchangeRate;
      setReceiveAmount(receive.toString());
      toast({
        title: "Calculation Done",
        description: `Calculated amount ${amount} ${payCurrency} to ${receive} ${receiveCurrency}.`,
      });
    } catch (error: any) {
      console.error("Error calculating receive amount:", error);
      toast({
        title: "Error",
        description: `Could not calculate receive amount. ${error.message}`,
        variant: "destructive",
      });
      setReceiveAmount('');
    }
  };

  // Simulate fetching exchange rate from an external API
  const simulateExchangeRate = async (payCurrency: string, receiveCurrency: string) => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (payCurrency === receiveCurrency) {
          reject(new Error("Cannot swap same currencies."));
          return;
        }

        // Simulate different rates for different currencies
        const rateMap: { [key: string]: { [key: string]: number } } = {
          'USD': { 'EUR': 0.85, 'GBP': 0.72 },
          'EUR': { 'USD': 1.18, 'GBP': 0.85 },
          'GBP': { 'USD': 1.39, 'EUR': 1.18 },
        };

        const rate = rateMap[payCurrency]?.[receiveCurrency];

        if (rate !== undefined) {
          resolve(rate);
        } else {
          reject(new Error(`Exchange rate not available for ${payCurrency} to ${receiveCurrency}`));
        }
      }, 500); // Simulate network delay
    });
  };

  const handleSwap = async () => {
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

    if (parseFloat(payAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to pay.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate the swap operation
      await simulateSwap(payCoin, receiveCoin, parseFloat(payAmount), parseFloat(receiveAmount));

      toast({
        title: "Swap Successful!",
        description: `Swapped ${payAmount} ${payCoin} for ${receiveAmount} ${receiveCoin}.`,
      });
    } catch (error: any) {
      console.error("Swap failed:", error);
      toast({
        title: "Swap Failed",
        description: `Failed to complete the swap. ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Simulate the actual swap operation
  const simulateSwap = async (
    payCurrency: string,
    receiveCurrency: string,
    payAmount: number,
    receiveAmount: number
  ) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success or failure
        const success = Math.random() > 0.1; // 90% chance of success
        if (success) {
          resolve(true);
        } else {
          reject(new Error("Simulated swap failed due to slippage or insufficient liquidity."));
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px] backdrop-blur-md bg-secondary/90 border">
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
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.symbol})</SelectItem>
                  ))}
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
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.symbol})</SelectItem>
                  ))}
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
