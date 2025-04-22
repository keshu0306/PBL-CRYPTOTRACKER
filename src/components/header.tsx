'use client';

import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-header-background text-header-foreground py-3 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
      <img src="https://picsum.photos/32/32" alt="Logo" className="rounded-full" />
        <span className="font-bold text-xl">CryptoFolio</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">Portfolio Tracker</Button>
        <Button variant="ghost" size="sm">Swap</Button>
        <Button variant="ghost" size="sm">Cryptocurrencies</Button>
        <Button variant="ghost" size="sm">Pricing</Button>
        <Button variant="ghost" size="sm">...</Button>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <Input type="search" placeholder="Assets, Wallets, Domains" className="bg-secondary text-secondary-foreground rounded-full py-2 px-4 w-64" />
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* User Authentication */}
      <div className="flex items-center space-x-4">
        <Settings className="h-5 w-5 text-muted-foreground" />
        <Button variant="outline" size="sm">Login</Button>
        <Button size="sm">Get Started</Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/48/48" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </div>
    </header>
  );
};

export default Header;
