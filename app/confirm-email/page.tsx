'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function ConfirmEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const confirmEmail = async () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'USER_UPDATED' && session?.user.email_confirmed_at) {
          toast({
            title: "Email Confirmed",
            description: "Your email has been successfully confirmed.",
          });
          router.push('/dashboard');
        }
      });

      // Handle any errors that might occur during the process
      try {
        await new Promise((resolve) => {
          if (subscription && typeof subscription.unsubscribe === 'function') {
            subscription.unsubscribe();
          }
          resolve(void 0);
        });
      } catch (error) {
        toast({
          title: "Confirmation Failed",
          description: "There was an error confirming your email. Please try again.",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    };

    confirmEmail();
  }, [router, supabase, toast]);

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
