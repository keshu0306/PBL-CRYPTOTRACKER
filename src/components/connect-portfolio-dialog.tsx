
'use client';

import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wallet } from 'lucide-react'; // Using a generic wallet icon

interface Platform {
  name: string;
  logoUrl?: string; // Optional: a logo URL may not exist for all
  dataAiHint: string;
  websiteUrl: string;
}

// IMPORTANT: Replace these placeholder URLs with your actual Firebase Storage URLs
// once you have uploaded the logos and configured public access.
// For now, using a mix of CoinGecko assets (which seem to work) and placeholders.
const logoUrls = {
  groww: undefined, // Will be text-only
  upstox: undefined, // Will be text-only
  zerodha: undefined, // Will be text-only
  binance: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png',
  coinbase: 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png', // For Coinbase Wallet
  metamask: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  trustwallet: undefined, // Will be text-only
  ledger: 'https://placehold.co/40x40.png', // Placeholder for Ledger
};

const platforms: Platform[] = [
  { name: 'Groww', logoUrl: logoUrls.groww, dataAiHint: 'groww logo investment', websiteUrl: 'https://groww.in/' },
  { name: 'Upstox', logoUrl: logoUrls.upstox, dataAiHint: 'upstox logo trading', websiteUrl: 'https://upstox.com/' },
  { name: 'Zerodha', logoUrl: logoUrls.zerodha, dataAiHint: 'zerodha kite logo stock', websiteUrl: 'https://zerodha.com/' },
  { name: 'Binance', logoUrl: logoUrls.binance, dataAiHint: 'binance logo crypto exchange coingecko', websiteUrl: 'https://www.binance.com/' },
  { name: 'Coinbase Wallet', logoUrl: logoUrls.coinbase, dataAiHint: 'coinbase wallet logo crypto coingecko', websiteUrl: 'https://www.coinbase.com/wallet' },
  { name: 'MetaMask', logoUrl: logoUrls.metamask, dataAiHint: 'metamask logo ethereum wallet coingecko', websiteUrl: 'https://metamask.io/' },
  { name: 'Trust Wallet', logoUrl: logoUrls.trustwallet, dataAiHint: 'trust wallet logo crypto mobile', websiteUrl: 'https://trustwallet.com/' },
  { name: 'Ledger', logoUrl: logoUrls.ledger, dataAiHint: 'ledger nano logo hardware wallet placeholder', websiteUrl: 'https://www.ledger.com/' },
  // Add more platforms here
];

interface ConnectPortfolioDialogProps {
  onOpenChange?: (open: boolean) => void;
}

const ConnectPortfolioDialog: React.FC<ConnectPortfolioDialogProps> = ({ onOpenChange }) => {
  const handleConnect = (platform: Platform) => {
    console.log(`Attempting to connect with ${platform.name}, opening ${platform.websiteUrl}`);
    if (platform.websiteUrl) {
      window.open(platform.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <DialogContent className="sm:max-w-[450px] backdrop-blur-xl bg-secondary/90 border rounded-md">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-2xl text-center">Connect Your Portfolio</DialogTitle>
        <DialogDescription className="text-center">
          Connect your accounts from various platforms to track all your investments in one place.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[400px] pr-4">
        <div className="grid gap-3">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className="w-full justify-start items-center py-6 rounded-lg hover:bg-accent/70 group"
              onClick={() => handleConnect(platform)}
            >
              {platform.logoUrl && ( // Conditionally render the image
                <img
                  src={platform.logoUrl}
                  alt={`${platform.name} logo`}
                  data-ai-hint={platform.dataAiHint}
                  className="w-8 h-8 mr-3 rounded-md object-contain transition-transform duration-200 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/40.png?text=Error';
                    (e.currentTarget as HTMLImageElement).alt = `${platform.name} logo (Error)`;
                  }}
                />
              )}
              <span className={`text-base font-medium ${!platform.logoUrl ? 'ml-0' : ''}`}>{platform.name}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-accent-foreground">Connect →</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Button
        variant="ghost"
        className="w-full mt-6 rounded-lg py-6 hover:bg-accent/50 group"
        onClick={() => handleConnect({name: 'Other Wallet/Exchange', logoUrl: '', dataAiHint: 'generic wallet', websiteUrl: 'https://www.google.com/search?q=connect+other+wallet+or+exchange'})}
      >
        <Wallet className="w-6 h-6 mr-3 transition-transform duration-200 group-hover:scale-110" />
        <span className="text-base font-medium">Connect Other Wallet/Exchange</span>
      </Button>

    </DialogContent>
  );
};

export default ConnectPortfolioDialog;
