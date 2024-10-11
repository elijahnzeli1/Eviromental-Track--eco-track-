import TokenSellForm from '@/components/TokenSellForm';
import { createClient } from '@/src/lib/supabase';

export default async function MapPage() {
  const supabase = createClient();

  // Fetch available tokens from the database
  const { data: userData, error } = await supabase
    .from('users')
    .select('tokens_earned')
    .single();

  if (error) {
    console.error('Error fetching user data:', error);
    return <div>Error loading user data</div>;
  }

  const availableTokens = userData?.tokens_earned || 0;

  return (
    <div>
      <h1>Sell Tokens</h1>
      <p>Available Tokens: {availableTokens}</p>
      <TokenSellForm />
    </div>
  );
}