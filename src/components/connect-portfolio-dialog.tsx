
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

const platforms: Platform[] = [
  { name: 'Groww', logoUrl: 'https://placehold.co/40x40.png', dataAiHint: 'groww logo' },
  { name: 'Upstox', logoUrl: 'https://placehold.co/40x40.png', dataAiHint: 'upstox logo' },
  { name: 'Zerodha', logoUrl: 'https://placehold.co/40x40.png', dataAiHint: 'zerodha kite logo' },
  { name: 'Binance', logoUrl: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png', dataAiHint: 'binance logo' },
  { name: 'Coinbase Wallet', logoUrl: 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png', dataAiHint: 'coinbase logo' },
  { name: 'MetaMask', logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', dataAiHint: 'metamask logo ethereum' },
  { name: 'Trust Wallet', logoUrl: 'https://placehold.co/40x40.png', dataAiHint: 'trust wallet logo' },
  { name: 'Ledger', logoUrl: 'https://placehold.co/40x40.png', dataAiHint: 'ledger nano logo' },
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
                className="w-7 h-7 mr-3 rounded-md object-contain transition-transform duration-200 group-hover:scale-110"
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

      {/* DialogClose is handled by the parent DialogContent component */}
    </DialogContent>
  );
};

export default ConnectPortfolioDialog;
