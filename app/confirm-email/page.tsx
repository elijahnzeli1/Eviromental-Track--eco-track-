'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const token = searchParams ? searchParams.get('token') : null;

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        toast({
          title: "Error",
          description: "Invalid confirmation link.",
          variant: "destructive",
        });
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/confirm-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        toast({
          title: "Email Confirmed",
          description: "Your email has been successfully confirmed.",
        });
        router.push('/dashboard');
      } catch (error) {
        toast({
          title: "Confirmation Failed",
          description: error instanceof Error ? error.message : "There was an error confirming your email.",
          variant: "destructive",
        });
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [router, toast, token]);

  if (isLoading) {
    return <div>Confirming your email...</div>;
  }

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>Please check your email to confirm your account.</p>
    </div>
  );
}
