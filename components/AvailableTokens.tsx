import React from 'react';

// Mock data - replace with actual data fetching logic
const tokens = [
  { id: 1, name: 'EcoToken', price: 0.1, available: 1000 },
  { id: 2, name: 'GreenCoin', price: 0.2, available: 500 },
];

export default function AvailableTokens() {
  return (
    <div className="space-y-4">
      {tokens.map((token) => (
        <div key={token.id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">{token.name}</h3>
          <p>Price: ${token.price}</p>
          <p>Available: {token.available}</p>
        </div>
      ))}
    </div>
  );
}