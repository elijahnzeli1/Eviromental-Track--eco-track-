import React from 'react';

// Mock data - replace with actual data fetching logic
const transactions = [
  { id: 1, type: 'Sell', amount: 100, token: 'EcoToken', date: '2023-04-15' },
  { id: 2, type: 'Buy', amount: 50, token: 'GreenCoin', date: '2023-04-14' },
];

export default function RecentTransactions() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Token</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="border px-4 py-2">{tx.type}</td>
              <td className="border px-4 py-2">{tx.amount}</td>
              <td className="border px-4 py-2">{tx.token}</td>
              <td className="border px-4 py-2">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
