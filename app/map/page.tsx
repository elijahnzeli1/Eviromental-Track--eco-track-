import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/src/lib/supabase';
import { useAuth } from '@/app/Providers';

interface TokenSellFormProps {
  availableTokens: number;
  onSell: () => Promise<void>;
}

const TokenSellForm: React.FC<TokenSellFormProps> = ({ availableTokens, onSell }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseInt(amount) <= 0 || parseInt(amount) > availableTokens) {
      alert('Please enter a valid amount of tokens to sell.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('users').update({
        tokens_earned: availableTokens - parseInt(amount)
      }).eq('id', session?.user.id);

      if (error) throw error;

      alert(`Successfully sold ${amount} tokens!`);
      setAmount('');
      await onSell();
    } catch (error) {
      console.error('Error selling tokens:', error);
      alert('Failed to sell tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount of tokens to sell
        </label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          max={availableTokens}
          required
          className="mt-1"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Processing...' : 'Sell Tokens'}
      </Button>
    </form>
  );
};

export default TokenSellForm;