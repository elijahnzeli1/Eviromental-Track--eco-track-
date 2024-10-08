'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TokenSellForm from '@/components/TokenSellForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const { data: session, status } = useSession();
  const [availableTokens, setAvailableTokens] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchAvailableTokens();
    }
  }, [session]);

  const fetchAvailableTokens = async () => {
    try {
      const response = await fetch('/api/user-tokens');
      if (response.ok) {
        const data = await response.json();
        setAvailableTokens(data.availableTokens);
      } else {
        console.error('Failed to fetch available tokens');
      }
    } catch (error) {
      console.error('Error fetching available tokens:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Please log in to view and sell your tokens.</p>
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/api/auth/signin')}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Map and Token Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Map</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add your map component here */}
            <p>Map component placeholder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sell Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            {availableTokens > 0 ? (
              <>
                <p className="mb-4">Available tokens: {availableTokens}</p>
                <TokenSellForm
                  availableTokens={availableTokens}
                  onSell={fetchAvailableTokens}
                />
              </>
            ) : (
              <p>You don't have any tokens available to sell.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
