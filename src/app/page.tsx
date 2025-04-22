'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Welcome to CryptoFolio!</h1>
      <p className="text-lg">Explore the world of cryptocurrencies.</p>
    </div>
  );
}


