'use client';

import React, {useState, useEffect, useCallback} from 'react';
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
import { currencies } from "@/lib/currencies";
import Link from "next/link";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const {setTheme, theme} = useTheme();
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
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
        <Link href="/cryptocurrencies">
          <Button variant="ghost" size="sm">
            Cryptocurrencies
          </Button>
        </Link>
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
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-xl bg-secondary/80">
            <DropdownMenuItem>Profile</DropdownMenuItem>
             <DropdownMenuItem className="flex items-center justify-between">
              Theme
              {mounted ? (
                <label
                  htmlFor="theme-switch"
                  className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Switch
                    id="theme-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeToggle}
                  />
                </label>
              ) : null}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Language
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {mounted ? (
                    <>
                      {currencies.sort((a, b) => a.name.localeCompare(b.name)).map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>{currency.name} ({currency.symbol})</SelectItem>
                      ))}
                    </>
                  ) : null}
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
                      {currencies.sort((a, b) => a.name.localeCompare(b.name)).map((currency) => (
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
