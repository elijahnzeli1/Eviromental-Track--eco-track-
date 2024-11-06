'use client';

import { useEffect, useState } from 'react';
import TokenSellForm from '@/components/TokenSellForm';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export default function MapPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [availableTokens, setAvailableTokens] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const response = await fetch('/api/user-stats');
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
        setAvailableTokens(data.tokensEarned);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch token balance",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchUserTokens();
    }
  }, [session, toast]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Sell Tokens</h1>
      <p>Available Tokens: {availableTokens}</p>
      <TokenSellForm initialAvailableTokens={availableTokens} />
    </div>
  );
}