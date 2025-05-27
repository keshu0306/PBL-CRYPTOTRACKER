
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
  logoUrl: string;
  dataAiHint: string;
}

// IMPORTANT: Replace these placeholder URLs with your actual Firebase Storage URLs
// after uploading the logo images to the 'logos/' directory in Firebase Storage.
// Example format: "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/logos%2Fgroww.png?alt=media"
const logoUrls = {
  groww: 'https://placehold.co/40x40.png', // REPLACE with your Firebase Storage URL for groww.png
  upstox: 'https://placehold.co/40x40.png', // REPLACE with your Firebase Storage URL for upstox.png
  zerodha: 'https://placehold.co/40x40.png', // REPLACE with your Firebase Storage URL for zerodha.png
  binance: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png', // This CoinGecko URL seems to work
  coinbase: 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png', // This CoinGecko URL seems to work
  metamask: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', // This CoinGecko URL seems to work
  trustwallet: 'https://placehold.co/40x40.png', // REPLACE with your Firebase Storage URL for trustwallet.png
  ledger: 'https://placehold.co/40x40.png', // REPLACE with your Firebase Storage URL for ledger.png
};

const platforms: Platform[] = [
  { name: 'Groww', logoUrl: logoUrls.groww, dataAiHint: 'groww logo investment' },
  { name: 'Upstox', logoUrl: logoUrls.upstox, dataAiHint: 'upstox logo trading' },
  { name: 'Zerodha', logoUrl: logoUrls.zerodha, dataAiHint: 'zerodha kite logo stock' },
  { name: 'Binance', logoUrl: logoUrls.binance, dataAiHint: 'binance logo crypto exchange' },
  { name: 'Coinbase Wallet', logoUrl: logoUrls.coinbase, dataAiHint: 'coinbase wallet logo crypto' },
  { name: 'MetaMask', logoUrl: logoUrls.metamask, dataAiHint: 'metamask logo ethereum wallet' },
  { name: 'Trust Wallet', logoUrl: logoUrls.trustwallet, dataAiHint: 'trust wallet logo crypto mobile' },
  { name: 'Ledger', logoUrl: logoUrls.ledger, dataAiHint: 'ledger nano logo hardware wallet' },
  // Add more platforms here
];

interface ConnectPortfolioDialogProps {
  onOpenChange?: (open: boolean) => void;
}

const ConnectPortfolioDialog: React.FC<ConnectPortfolioDialogProps> = ({ onOpenChange }) => {
  const handleConnect = (platformName: string) => {
    console.log(`Attempting to connect with ${platformName}`);
    // Placeholder for actual connection logic
    // In a real app, this would initiate an OAuth flow or similar
    if (onOpenChange) onOpenChange(false); // Close dialog on action
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
              onClick={() => handleConnect(platform.name)}
            >
              <img
                src={platform.logoUrl}
                alt={`${platform.name} logo`}
                data-ai-hint={platform.dataAiHint}
                className="w-8 h-8 mr-3 rounded-md object-contain transition-transform duration-200 group-hover:scale-110"
              />
              <span className="text-base font-medium">{platform.name}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-accent-foreground">Connect →</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Button
        variant="ghost"
        className="w-full mt-6 rounded-lg py-6 hover:bg-accent/50 group"
        onClick={() => handleConnect('Other Wallet/Exchange')}
      >
        <Wallet className="w-6 h-6 mr-3 transition-transform duration-200 group-hover:scale-110" />
        <span className="text-base font-medium">Connect Other Wallet/Exchange</span>
      </Button>

    </DialogContent>
  );
};

export default ConnectPortfolioDialog;
