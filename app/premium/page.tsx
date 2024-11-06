'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function PremiumPage() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const upgradeToPremium = async () => {
    try {
      const response = await fetch('/api/users/premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast({
        title: "Upgrade Successful",
        description: "You are now a premium user!",
      });
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      toast({
        title: "Upgrade Failed",
        description: "Failed to upgrade to premium. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upgrade to Premium</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Premium Benefits</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Exclusive eco-friendly product discounts</li>
          <li>Priority support</li>
          <li>Advanced analytics and insights</li>
          <li>Ad-free experience</li>
        </ul>
        <Button 
          onClick={upgradeToPremium} 
          className="bg-green-600 text-white hover:bg-green-700"
          disabled={!session}
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}
