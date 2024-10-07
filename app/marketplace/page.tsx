import React from 'react';
import TokenSellForm from '@/components/TokenSellForm';
import AvailableTokens from '@/components/AvailableTokens';
import RecentTransactions from '@/components/RecentTransactions';
// import Navbar from '@/components/Navbar';

export default function MarketplacePage() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-600">Eco-Track Marketplace</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold mb-4">Sell Your Tokens</h2>
            <TokenSellForm />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-4">Available Tokens</h2>
            <AvailableTokens />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
