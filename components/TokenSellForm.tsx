'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TokenSellForm() {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate input
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Call API to sell tokens
      const response = await fetch('/api/sell-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        throw new Error('Failed to sell tokens');
      }

      const result = await response.json();
      console.log('Tokens sold successfully:', result);

      // Reset form
      setAmount('');

      // TODO: Show success message to user
    } catch (error) {
      console.error('Error selling tokens:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount of tokens to sell"
        className="w-full"
      />
      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold">Sell Tokens</Button>
    </form>
  );
}
