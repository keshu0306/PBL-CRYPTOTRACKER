'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {Search, Settings, Grid} from 'lucide-react';
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { currencies } from "@/lib/currencies";
import Link from "next/link";
import {X} from "lucide-react";
import {
  LucideIcon,
  LayoutDashboard,
  File,
  ListOrdered,
  LineChart,
  BarChart3,
  Newspaper,
  Blocks,
  Code2,
  Download,
  Lock,
} from "lucide-react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const {setTheme, theme} = useTheme();
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [open, setOpen] = useState(false);
  const [isGridDialogOpen, setIsGridDialogOpen] = useState(false);

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
        <Link href="/" className="font-bold text-xl">
          Crypto Tracker
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="rounded-full hover:bg-yellow-500 hover:text-gray-900">
          Portfolio Tracker
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-yellow-500 hover:text-gray-900">Swap</Button>
          </DialogTrigger>
          <SwapDialog/>
        </Dialog>
        <Link href="/cryptocurrencies">
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-yellow-500 hover:text-gray-900">
            Cryptocurrencies
          </Button>
        </Link>
        <Dialog open={isGridDialogOpen} onOpenChange={setIsGridDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full hover:bg-yellow-500 hover:text-gray-900">
              <Grid className="h-4 w-4"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] backdrop-blur-xl bg-secondary/80 border">
            <DialogHeader>
              <DialogTitle>More Options</DialogTitle>
              <DialogDescription>Explore additional features and options.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Products Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                <ul>
                  <li className="flex items-start space-x-2 py-2">
                    <LayoutDashboard className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Integrations</a>
                      <p className="text-sm text-muted-foreground">Over 300 platforms supported. Choose your preferred crypto platform and connect.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <File className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Earn</a>
                      <p className="text-sm text-muted-foreground">Don't just hodl. Earn 20% on your crypto.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <ListOrdered className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">NFT</a>
                      <p className="text-sm text-muted-foreground">Track your entire NFT collection right where you track your other crypto assets.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <LineChart className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">DeFi Portfolio Tracker</a>
                      <p className="text-sm text-muted-foreground">Track more than 90 DeFi wallets across 10 different networks.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Other Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Other</h3>
                <ul>
                  <li className="flex items-start space-x-2 py-2">
                    <Newspaper className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">News</a>
                      <p className="text-sm text-muted-foreground">Read the latest crypto news & make better investing decisions.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <Blocks className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Blog</a>
                      <p className="text-sm text-muted-foreground">Learn everything you need to know about the crypto world — in one place.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <BarChart3 className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Widgets</a>
                      <p className="text-sm text-muted-foreground">Set up and add our widgets to your website and attract visitors.</p>
                    </div>
                  </li>
                   <li className="flex items-start space-x-2 py-2">
                    <Code2 className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Open API</a>
                      <p className="text-sm text-muted-foreground">Start integrating CoinStats Public APIs into your applications.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2">
                    <Download className="h-5 w-5 mt-1 text-muted-foreground" />
                    <div>
                      <a href="#" className="font-medium hover:underline">24h Report</a>
                      <a href="#" className="font-medium hover:underline">Press Kit</a>
                      <a href="#" className="font-medium hover:underline">API Docs</a>
                      {/* Add App Store and Google Play buttons here */}
                      <a href="#" className="block mt-2"><img src="https://picsum.photos/50/20" alt="App Store" /></a>
                      <a href="#" className="block mt-1"><img src="https://picsum.photos/50/20" alt="Google Play" /></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Industry Best Practices Section */}
            <div className="text-center py-4">
              <Lock className="mx-auto h-6 w-6 text-muted-foreground" />
              <h3 className="text-lg font-semibold mt-2">Industry Best Practices</h3>
              <p className="text-sm text-muted-foreground">We take the most advanced security measures to ensure that your account is as safe as possible.</p>
              <Button variant="secondary" className="mt-4">Start Free Trial</Button>
            </div>
          </DialogContent>
        </Dialog>
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
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-yellow-500 hover:text-gray-900">
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
                    onCheckedChange={(checked) => {
                      handleThemeToggle(checked);
                      setOpen(false); // Keep the settings open after theme change
                    }}
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
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm" className="rounded-full">
          Login
        </Button>
        <Button size="sm" className="rounded-full">Get Started</Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://picsum.photos/48/48" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;

