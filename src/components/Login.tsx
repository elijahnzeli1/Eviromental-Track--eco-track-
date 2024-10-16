'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/src/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { MutatingDots } from 'react-loader-spinner';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch the username from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('username')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        // Store the username in the session
        await supabase.auth.updateUser({
          data: { username: userData.username }
        });

        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.username}!`,
        });
        router.push('/dashboard');
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <MutatingDots height={24} width={24} color="#FFFFFF" secondaryColor="#FFFFFF" radius={8} ariaLabel="mutating-dots-loading" />
    </div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full text-xl bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              'Login'
            )}
          </Button>
        </form>
        <div className="text-center mt-4">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
