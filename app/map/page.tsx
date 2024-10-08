'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import TokenSellForm from '@/components/TokenSellForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Please log in to view and sell your tokens.</p>
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/login')}>Log In</Button>
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
