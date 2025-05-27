
'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import ConnectPortfolioDialog from "@/components/connect-portfolio-dialog";


const logoMap: Record<string, string> = {
  "Binance": "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
  "MetaMask": "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  "Coinbase": "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png",
  "Other": "https://cdn-icons-png.flaticon.com/512/565/565547.png"
};

const getLogo = (name: string): string => logoMap[name] || "https://placehold.co/48x48.png";


export default function Home() {
  const [isConnectPortfolioDialogOpen, setIsConnectPortfolioDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-2 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.unsplash.com/photo-1639815666611-94390c6550f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
      <h1 className="text-3xl font-bold mb-5 text-center">Track All Your Wallets &amp; Exchanges From One Place</h1>
      <p className="text-lg mb-8 text-muted-foreground text-center">Connect your entire portfolio to track, buy, swap, and stake your assets.</p>

      <div className="flex justify-center mb-8 flex-wrap gap-4">
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src={getLogo("Binance")} data-ai-hint="binance logo" alt="Binance" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Binance</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src={getLogo("MetaMask")} data-ai-hint="metamask logo ethereum" alt="MetaMask" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">MetaMask</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src={getLogo("Coinbase")} data-ai-hint="coinbase logo" alt="Coinbase" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Coinbase</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
        <div className="flex flex-col items-center rounded-lg p-3 shadow-md transition-transform duration-200 hover:scale-105" style={{backgroundColor: 'hsl(var(--secondary))'}}>
          <img src={getLogo("Other")} data-ai-hint="wallet connect generic" alt="Other" className="w-12 h-12 rounded-md mb-2 object-contain transition-transform duration-200 hover:scale-110"/>
          <span className="text-sm">Other</span>
          <Button variant="outline" size="sm" className="rounded-full mt-2">Connect →</Button>
        </div>
      </div>

      <div className="relative w-full max-w-md group">
        <Input
          type="search"
          placeholder="Search wallet addresses, assets on any blockchain"
          className="py-2 px-4 rounded-full bg-secondary text-secondary-foreground transition-all duration-200 focus:ring-2 focus:ring-ring"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-transform duration-200 group-focus-within:scale-110"/>
      </div>

      <Dialog open={isConnectPortfolioDialogOpen} onOpenChange={setIsConnectPortfolioDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-8 rounded-full">Connect Portfolio</Button>
        </DialogTrigger>
        <ConnectPortfolioDialog onOpenChange={setIsConnectPortfolioDialogOpen} />
      </Dialog>
    </div>
  );
}
