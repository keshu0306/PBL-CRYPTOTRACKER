
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
import LoginDialog from "@/components/auth/login-dialog"; // Import the LoginDialog component

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const {setTheme, theme} = useTheme();
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [open, setOpen] = useState(false);
  const [isGridDialogOpen, setIsGridDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); // State for login dialog

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback((checked: boolean) => {
      setTheme(checked ? 'dark' : 'light');
  },[setTheme]);


  return (
    <header className="bg-header-background text-header-foreground py-3 px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <img
          src="https://picsum.photos/32/32"
          alt="Logo"
          className="rounded-full transition-transform duration-200 hover:scale-110"
        />
        <Link href="/" className="font-bold text-xl transition-opacity duration-200 hover:opacity-80">
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
             {/* Added transition */}
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 hover:bg-yellow-500 hover:text-gray-900">
              <Grid className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] backdrop-blur-xl bg-secondary/90 border">
            <DialogHeader>
              <DialogTitle>More Options</DialogTitle>
              <DialogDescription>Explore additional features and options.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Products Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                <ul>
                  <li className="flex items-start space-x-2 py-2 group">
                    <LayoutDashboard className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Integrations</a>
                      <p className="text-sm text-muted-foreground">Over 300 platforms supported. Choose your preferred crypto platform and connect.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <File className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Earn</a>
                      <p className="text-sm text-muted-foreground">Don't just hodl. Earn 20% on your crypto.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <ListOrdered className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">NFT</a>
                      <p className="text-sm text-muted-foreground">Track your entire NFT collection right where you track your other crypto assets.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <LineChart className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
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
                  <li className="flex items-start space-x-2 py-2 group">
                    <Newspaper className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">News</a>
                      <p className="text-sm text-muted-foreground">Read the latest crypto news & make better investing decisions.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <Blocks className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Blog</a>
                      <p className="text-sm text-muted-foreground">Learn everything you need to know about the crypto world — in one place.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <BarChart3 className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Widgets</a>
                      <p className="text-sm text-muted-foreground">Set up and add our widgets to your website and attract visitors.</p>
                    </div>
                  </li>
                   <li className="flex items-start space-x-2 py-2 group">
                    <Code2 className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">Open API</a>
                      <p className="text-sm text-muted-foreground">Start integrating CoinStats Public APIs into your applications.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2 py-2 group">
                    <Download className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <a href="#" className="font-medium hover:underline">24h Report</a>
                      <a href="#" className="font-medium hover:underline">Press Kit</a>
                      <a href="#" className="font-medium hover:underline">API Docs</a>
                      {/* Add App Store and Google Play buttons here */}
                       {/* Added transition */}
                      <a href="#" className="block mt-2 transition-opacity duration-200 hover:opacity-80"><img src="https://picsum.photos/50/20" alt="App Store" /></a>
                       {/* Added transition */}
                      <a href="#" className="block mt-1 transition-opacity duration-200 hover:opacity-80"><img src="https://picsum.photos/50/20" alt="Google Play" /></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Industry Best Practices Section */}
            <div className="text-center py-4">
              <Lock className="mx-auto h-6 w-6 text-muted-foreground transition-transform duration-200 hover:scale-110" />
              <h3 className="text-lg font-semibold mt-2">Industry Best Practices</h3>
              <p className="text-sm text-muted-foreground">We take the most advanced security measures to ensure that your account is as safe as possible.</p>
              <Button variant="secondary" className="mt-4">Start Free Trial</Button>
            </div>
          </DialogContent>
        </Dialog>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 group">
        <Input
          type="search"
          placeholder="Assets, Wallets, Domains"
          className="bg-secondary text-secondary-foreground rounded-full py-2 px-4 w-64 transition-all duration-200 focus-within:ring-2 focus-within:ring-ring"
        />
         {/* Added transition */}
        <Search className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-focus-within:scale-110" />
      </div>

      {/* User Authentication */}
      <div className="flex items-center space-x-4">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
             {/* Added transition */}
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-yellow-500 hover:text-gray-900">
              <Settings className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:rotate-45" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="backdrop-blur-xl bg-secondary/90 border rounded-md w-56">
            <DropdownMenuItem className="hover:bg-yellow-500 hover:text-gray-900 rounded-md">Profile</DropdownMenuItem>
             <DropdownMenuItem className="flex items-center justify-between hover:bg-yellow-500 hover:text-gray-900 rounded-md" onSelect={(e) => e.preventDefault()}>
              <span>Theme</span>
                <Switch
                    id="theme-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeToggle}
                    aria-label="Toggle theme"
                  />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-yellow-500 hover:text-gray-900 rounded-md" onSelect={(e) => e.preventDefault()}>
              Language
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[120px] ml-auto rounded-md h-7 text-xs">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-md">
                  {mounted ? (
                    <>
                      {/* Simplified list for example */}
                      <SelectItem value="English" className="rounded-md text-xs">English</SelectItem>
                      <SelectItem value="Spanish" className="rounded-md text-xs">Español</SelectItem>
                       <SelectItem value="French" className="rounded-md text-xs">Français</SelectItem>
                    </>
                  ) : null}
                </SelectContent>
              </Select>
            </DropdownMenuItem>
             <DropdownMenuItem className="hover:bg-yellow-500 hover:text-gray-900 rounded-md" onSelect={(e) => e.preventDefault()}>
              Currency
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-[120px] ml-auto rounded-md h-7 text-xs">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-md">
                  {mounted ? (
                    <>
                      {currencies.sort((a, b) => a.name.localeCompare(b.name)).map((currency) => (
                        <SelectItem key={currency.code} value={currency.code} className="rounded-md text-xs">{currency.name} ({currency.symbol})</SelectItem>
                      ))}
                    </>
                  ) : null}
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-yellow-500 hover:text-gray-900 rounded-md">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Login Button with Dialog Trigger */}
        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full hover:bg-yellow-500 hover:text-gray-900">
              Login
            </Button>
          </DialogTrigger>
          <LoginDialog />
        </Dialog>

        <Button size="sm" className="rounded-full">Get Started</Button>
        <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
          <AvatarImage src="https://picsum.photos/48/48" alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
