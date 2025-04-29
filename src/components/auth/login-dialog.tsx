'use client';

import React, { useState } from 'react';
import {
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Mail, X, Eye, EyeOff } from 'lucide-react'; // Using Mail for Email/Password, X for close, Eye/EyeOff for password visibility
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder SVGs for icons not in lucide-react - Added transitions
const CoinbaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-110">
    <circle cx="12" cy="12" r="10" fill="#0052FF"/>
    <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z" fill="white"/>
  </svg>
);

const XIconSocial = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-110">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-110">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-110">
   <path d="M17.86 17.11a4.28 4.28 0 0 1-1.1.43 4.53 4.53 0 0 1-1.28.18 3.82 3.82 0 0 1-2.83-1.15 3.7 3.7 0 0 1-1.15-2.75c0-1.11.34-2.14 1.05-3.07s1.7-1.4 2.93-1.4a3.58 3.58 0 0 1 2.74 1.18 3.3 3.3 0 0 1 1.06 2.5.79.79 0 0 1-.05.26 1.23 1.23 0 0 1-.13.28h-5.6a2.51 2.51 0 0 0 .79 1.65 2.42 2.42 0 0 0 1.61.62 4.06 4.06 0 0 0 2-.51 4.74 4.74 0 0 0 1.3-.95zM15.15 8.6a2.69 2.69 0 0 0-1.86-.68 2.73 2.73 0 0 0-2.15.95 2.82 2.82 0 0 0-.85 2.13h4.8a2.52 2.52 0 0 0-.94-2.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.61 6.13a3.86 3.86 0 0 0-2.87-1.7c-1.48 0-2.7.57-3.65 1.72s-1.43 2.6-1.43 4.34c0 1.75.48 3.18 1.44 4.3s2.17 1.68 3.65 1.68a4.14 4.14 0 0 0 3-1.27 4.08 4.08 0 0 0 1.2-2.96c0-.23-.01-.46-.04-.69s-.06-.45-.11-.65H12v-1.48h6.78c.04.25.06.51.06.78a5.44 5.44 0 0 1-1.64 4.15 5.74 5.74 0 0 1-4.2 1.78c-2.13 0-3.87-.77-5.23-2.3s-2.04-3.48-2.04-5.85c0-2.37.68-4.33 2.04-5.88S9.87 4.4 12 4.4a5.59 5.59 0 0 1 4.18 1.73z"/>
  </svg>
);

const WalletIcon = () => ( // Placeholder for the "Continue with Wallet" icon - Added transition
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-110">
        <path d="M19 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v13.5a1.5 1.5 0 0 0 1.5 1.5h11.5a1 1 0 0 0 1-1V11"/>
        <path d="M17.5 9.5a1.5 1.5 0 0 1 0 3h-6a1.5 1.5 0 0 1 0-3h6z"/>
    </svg>
);

interface LoginDialogProps {
  defaultTab?: 'login' | 'signup';
  onOpenChange?: (open: boolean) => void; // Add onOpenChange prop
}

const LoginDialog: React.FC<LoginDialogProps> = ({ defaultTab = 'login', onOpenChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Placeholder for actual login logic
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login attempt...');
    // Add Firebase Authentication logic here
     if (onOpenChange) onOpenChange(false); // Close dialog on submit
  };

    // Placeholder for signup logic
  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Signup attempt...');
    // Add Firebase Authentication logic here for signup
     if (onOpenChange) onOpenChange(false); // Close dialog on submit
  };


  const handleGoogleLogin = () => {
    console.log('Google Login attempt...');
    // Add Firebase Google Auth logic here
     if (onOpenChange) onOpenChange(false); // Close dialog on social login
  };

  const handleWalletLogin = () => {
    console.log('Wallet Login attempt...');
    // Add Wallet connection logic here (e.g., using ethers.js, web3modal)
     if (onOpenChange) onOpenChange(false); // Close dialog on wallet login
  };

   const handleSocialLogin = (provider: string) => {
    console.log(`${provider} Login attempt...`);
    // Add Firebase Social Auth logic here based on provider
     if (onOpenChange) onOpenChange(false); // Close dialog on social login
  };

  return (
    // Added default padding back, removed p-0
    <DialogContent className="sm:max-w-[400px] backdrop-blur-xl bg-secondary/90 border rounded-md">
       {/* Removed the redundant DialogClose component here */}

      <Tabs defaultValue={defaultTab} className="w-full">
         {/* Adjusted padding for TabsList */}
        <TabsList className="grid w-full grid-cols-2 bg-transparent px-6 pt-6 pb-2">
          <TabsTrigger value="login" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none pb-2 text-lg font-semibold transition-colors duration-200">Log In</TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none pb-2 text-lg font-semibold transition-colors duration-200">Sign Up</TabsTrigger>
        </TabsList>

        {/* Adjusted padding for TabsContent */}
        <TabsContent value="login" className="px-6 pb-6 pt-0">
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              {/* Increased gap here */}
              <div className="grid gap-2">
                <Label htmlFor="email-login">Email or Username</Label>
                <Input
                  id="email-login"
                  type="text" // Changed to text to allow username
                  placeholder="user@mail.com"
                  className="rounded-md transition-shadow duration-200 focus:shadow-outline" // Added focus transition
                  required
                />
              </div>
               {/* Increased gap here */}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-login">Password</Label>
                  <Button variant="link" type="button" className="p-0 h-auto text-xs">
                    Forgot Password?
                  </Button>
                </div>
                <div className="relative group"> {/* Added group for icon transition */}
                 <Input
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="rounded-md pr-10 transition-shadow duration-200 focus:shadow-outline" // Add padding for the icon and transition
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                     {/* Added transition */}
                    {showPassword ? <EyeOff className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> : <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
                    <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" className="rounded-lg h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold">Log In</Button>
              <div className="relative my-2">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>
              <Button variant="outline" className="w-full rounded-lg h-12 flex items-center justify-center gap-2 border-border group" onClick={handleWalletLogin} type="button">
                 <WalletIcon /> Continue with Wallet
              </Button>
              <div className="flex justify-center space-x-3 pt-2">
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Coinbase')} type="button"><CoinbaseIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('X')} type="button"><XIconSocial /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Facebook')} type="button"><FacebookIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Apple')} type="button"><AppleIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={handleGoogleLogin} type="button"><Chrome className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" /></Button>
              </div>
            </div>
          </form>
        </TabsContent>

         {/* Adjusted padding for TabsContent */}
        <TabsContent value="signup" className="px-6 pb-6 pt-0">
           <form onSubmit={handleSignup}>
             <div className="grid gap-4 py-4">
                {/* Increased gap here */}
               <div className="grid gap-2">
                 <Label htmlFor="email-signup">Email</Label>
                 <Input
                   id="email-signup"
                   type="email"
                   placeholder="you@example.com"
                   className="rounded-md transition-shadow duration-200 focus:shadow-outline" // Added focus transition
                   required
                 />
               </div>
                {/* Increased gap here */}
               <div className="grid gap-2">
                 <Label htmlFor="password-signup">Password</Label>
                  <div className="relative group"> {/* Added group for icon transition */}
                   <Input
                      id="password-signup"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="rounded-md pr-10 transition-shadow duration-200 focus:shadow-outline" // Add padding for the icon and transition
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-transparent hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                       {/* Added transition */}
                      {showPassword ? <EyeOff className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> : <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
                      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Use 8 or more characters with a mix of letters, numbers & symbols.</p>
               </div>
                {/* Increased gap here */}
               <div className="grid gap-2">
                 <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                 <Input
                   id="confirm-password-signup"
                   type="password"
                   placeholder="Confirm your password"
                   className="rounded-md transition-shadow duration-200 focus:shadow-outline" // Added focus transition
                   required
                 />
               </div>
             </div>
             <div className="flex flex-col space-y-4">
               <Button type="submit" className="rounded-lg h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold">Sign Up</Button>
               <div className="relative my-2">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>
              <Button variant="outline" className="w-full rounded-lg h-12 flex items-center justify-center gap-2 border-border group" onClick={handleWalletLogin} type="button">
                 <WalletIcon /> Continue with Wallet
              </Button>
              <div className="flex justify-center space-x-3 pt-2">
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Coinbase')} type="button"><CoinbaseIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('X')} type="button"><XIconSocial /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Facebook')} type="button"><FacebookIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={() => handleSocialLogin('Apple')} type="button"><AppleIcon /></Button>
                <Button variant="outline" size="icon" className="rounded-full border-border group" onClick={handleGoogleLogin} type="button"><Chrome className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" /></Button>
              </div>
             </div>
           </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default LoginDialog;
