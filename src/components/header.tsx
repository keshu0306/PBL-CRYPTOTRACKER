'use client';

import React, {useState, useEffect} from 'react';
import {Search, Settings} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Switch} from '@/components/ui/switch';
import {useTheme} from 'next-themes';
import {SunIcon, MoonIcon} from '@radix-ui/react-icons';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import SwapDialog from "@/components/swap-dialog";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    setMounted(true);
  }, []);

 useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);

    setIsDarkMode(initialDarkMode);
    if (mounted) {
      setTheme(initialDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', initialDarkMode);
    }
  }, [mounted, setTheme]);

  const toggleTheme = (newMode: boolean) => {
    setIsDarkMode(newMode);
    setTheme(newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header className="bg-header-background text-header-foreground py-3 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <img
          src="https://picsum.photos/32/32"
          alt="Logo"
          className="rounded-full"
        />
        <span className="font-bold text-xl">CryptoFolio</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          Portfolio Tracker
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">Swap</Button>
          </DialogTrigger>
          <SwapDialog/>
        </Dialog>
        <Button variant="ghost" size="sm">
          Cryptocurrencies
        </Button>
        <Button variant="ghost" size="sm">
          Pricing
        </Button>
        <Button variant="ghost" size="sm">
          ...
        </Button>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Assets, Wallets, Domains"
          className="bg-secondary text-secondary-foreground rounded-full py-2 px-4 w-64"
        />
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* User Authentication */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-xl bg-secondary/80">
            <DropdownMenuItem>Profile</DropdownMenuItem>
             <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
              Theme
              {mounted ? (
                <Switch checked={isDarkMode} onCheckedChange={(e) => toggleTheme(e.target.checked)} />
              ) : null}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Language
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Currency
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {mounted ? (
                    <>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.symbol})</SelectItem>
                      ))}
                    </>
                  ) : null}
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>Appearance</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          Login
        </Button>
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
import { currencies } from "@/lib/currencies";
