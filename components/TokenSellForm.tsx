'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TokenSellForm() {
	const [amount, setAmount] = useState('');
	const [availableTokens, setAvailableTokens] = useState(0);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			fetchAvailableTokens();
		}
	}, [session]);

	const fetchAvailableTokens = async () => {
		try {
			const response = await fetch('/api/get-available-tokens');
			if (!response.ok) {
				throw new Error('Failed to fetch available tokens');
			}
			const data = await response.json();
			setAvailableTokens(data.availableTokens);
		} catch (error) {
			console.error('Error fetching available tokens:', error);
			toast({
				title: "Error",
				description: "Failed to fetch available tokens. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!session) {
			toast({
				title: "Authentication Required",
				description: "Please log in to sell tokens.",
				variant: "destructive",
			});
			router.push('/login');
			return;
		}

		try {
			const sellAmount = parseFloat(amount);
			if (isNaN(sellAmount) || sellAmount <= 0 || sellAmount > availableTokens) {
				throw new Error('Please enter a valid amount');
			}

			const response = await fetch('/api/sell-tokens', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ amount: sellAmount }),
			});

			if (!response.ok) {
				throw new Error('Failed to sell tokens');
			}

			const result = await response.json();
			console.log('Tokens sold successfully:', result);

			setAmount('');
			fetchAvailableTokens(); // Refresh available tokens
			toast({
				title: "Success",
				description: `Successfully sold ${sellAmount} tokens.`,
			});
		} catch (error) {
			console.error('Error selling tokens:', error);
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : 'An error occurred while selling tokens.',
				variant: "destructive",
			});
		}
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Sell Your Tokens</h2>
			{session ? (
				<>
					{availableTokens > 0 ? (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
								<Input
									type="number"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder={`Enter amount (max ${availableTokens})`}
									className="flex-grow"
									max={availableTokens}
								/>
								<Button 
									type="submit" 
									className="bg-green-600 hover:bg-green-700 text-white font-semibold w-full sm:w-auto"
									disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableTokens}
								>
									Sell Tokens
								</Button>
							</div>
						</form>
					) : (
						<p className="text-gray-600">You don't have any tokens available to sell.</p>
					)}
					<p className="mt-2 text-sm text-gray-600">Available tokens: {availableTokens}</p>
				</>
			) : (
				<div>
					<p className="text-gray-600 mb-2">Please log in to sell tokens.</p>
					<Button onClick={() => router.push('/login')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
						Log In
					</Button>
				</div>
			)}
		</div>
	);
}
