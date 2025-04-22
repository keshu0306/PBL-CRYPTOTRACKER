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
        <div className="flex flex-col items-center">
          <img src="https://picsum.photos/64/64" alt="Binance" className="rounded-md mb-2"/>
          <span className="text-sm">Binance</span>
          <Button variant="outline" size="sm">Connect →</Button>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://picsum.photos/64/64" alt="MetaMask" className="rounded-md mb-2"/>
          <span className="text-sm">MetaMask</span>
          <Button variant="outline" size="sm">Connect →</Button>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://picsum.photos/64/64" alt="Coinbase" className="rounded-md mb-2"/>
          <span className="text-sm">Coinbase (Individ...)</span>
          <Button variant="outline" size="sm">Connect →</Button>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://picsum.photos/64/64" alt="Other" className="rounded-md mb-2"/>
          <span className="text-sm">Other</span>
          <Button variant="outline" size="sm">Connect →</Button>
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


