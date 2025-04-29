'use client';

import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Mail } from 'lucide-react'; // Using Mail for Email/Password

const LoginDialog = () => {
  // Placeholder for actual login logic
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login attempt...');
    // Add Firebase Authentication logic here
  };

  const handleGoogleLogin = () => {
    console.log('Google Login attempt...');
    // Add Firebase Google Auth logic here
  };

  return (
    <DialogContent className="sm:max-w-[425px] backdrop-blur-xl bg-secondary/90 border rounded-md">
      <DialogHeader>
        <DialogTitle>Login to Crypto Tracker</DialogTitle>
        <DialogDescription>
          Enter your credentials or use a provider to access your account.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleLogin}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="col-span-3 rounded-md"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3 rounded-md"
              required
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col space-y-2">
          <Button type="submit" className="rounded-full">Login</Button>
          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
          <Button variant="outline" className="w-full rounded-full" onClick={handleGoogleLogin} type="button">
            <Chrome className="mr-2 h-4 w-4" /> Google
          </Button>
           {/* Optionally add other providers like Email/Password button if needed */}
          {/* <Button variant="outline" className="w-full rounded-full" type="button">
             <Mail className="mr-2 h-4 w-4" /> Email/Password
          </Button> */}
          <DialogClose asChild>
             <Button type="button" variant="ghost" className="rounded-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Button variant="link" className="p-0 h-auto" onClick={() => console.log('Navigate to signup')}>
          Sign up
        </Button>
      </div>
    </DialogContent>
  );
};

export default LoginDialog;
