
'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-2"> {/* Adjust min-height if header height changes */}
      <h1 className="text-3xl font-bold mb-5 text-center">Track All Your Wallets &amp; Exchanges From One Place</h1>
      <p className="text-lg mb-8 text-muted-foreground text-center">Connect your entire portfolio to track, buy, swap, and stake your assets.</p>

      <div className="flex justify-center mb-8 flex-wrap gap-4"> {/* Adjusted class: removed space-x-4, using gap-4 */}
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
           {/* Added transition */}
          <img src="https://assets.coingecko.com/coins/images/1344/small/binance.png?1547034769" alt="Binance" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Binance</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
           {/* Added transition */}
          <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" alt="MetaMask" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">MetaMask</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
           {/* Added transition */}
          <img src="https://assets.coingecko.com/coins/images/444/small/coinbase-512.png?1618389649" alt="Coinbase" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Coinbase (Individ...)</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
           {/* Added transition, updated image src and added data-ai-hint */}
          <img src="https://placehold.co/48x48.png" data-ai-hint="wallet connect" alt="Other" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Other</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
      </div>

      <div className="relative w-full max-w-md group"> {/* Added group for focus-within */}
        <Input
          type="search"
          placeholder="Search wallet addresses, assets on any blockchain"
          className="py-2 px-4 rounded-full bg-secondary text-secondary-foreground transition-all duration-200 focus:ring-2 focus:ring-ring"
        />
         {/* Added transition */}
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-transform duration-200 group-focus-within:scale-110"/>
      </div>

      <Button className="mt-8">Connect Portfolio</Button>
    </div>
  );
}
