'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-5">Track All Your Wallets &amp; Exchanges From One Place</h1>
      <p className="text-lg mb-8 text-muted-foreground">Connect your entire portfolio to track, buy, swap, and stake your assets.</p>

      <div className="flex justify-center space-x-4 mb-8">
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src="https://assets.coingecko.com/coins/images/1344/small/binance.png?1547034769" alt="Binance" className="w-12 h-12 rounded-md mb-2 object-contain"/>
          <span className="text-sm">Binance</span>
          <Button variant="outline" size="sm" className="rounded-full">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" alt="MetaMask" className="w-12 h-12 rounded-md mb-2 object-contain"/>
          <span className="text-sm">MetaMask</span>
          <Button variant="outline" size="sm" className="rounded-full">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src="https://assets.coingecko.com/coins/images/444/small/coinbase-512.png?1618389649" alt="Coinbase" className="w-12 h-12 rounded-md mb-2 object-contain"/>
          <span className="text-sm">Coinbase (Individ...)</span>
          <Button variant="outline" size="sm" className="rounded-full">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src="https://i.imgur.com/jhkbaqQ.png" alt="Other" className="w-12 h-12 rounded-md mb-2 object-contain"/>
          <span className="text-sm">Other</span>
          <Button variant="outline" size="sm" className="rounded-full">Connect →</Button>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <Input
          type="search"
          placeholder="Search wallet addresses, assets on any blockchain"
          className="py-2 px-4 rounded-full bg-secondary text-secondary-foreground"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
      </div>

      <Button className="mt-8">Connect Portfolio</Button>
    </div>
  );
}

