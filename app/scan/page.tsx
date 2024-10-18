'use client';

import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { createClient } from '@/src/lib/supabase';
import { useAuth } from '@/app/Providers';
import { toast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { session } = useAuth();
  const supabase = createClient();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        aspectRatio: 1.0,
        fps: 5,
      },
      false // verbose flag
    );

    scanner.render(success, error);

    function success(result: string) {
      scanner.clear();
      setScanResult(result);
      processQRCode(result);
    }

    function error(err: unknown) {
      console.warn(err);
    }

    return () => {
      scanner.clear();
    };
  }, []);

  useEffect(() => {
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const processQRCode = async (result: string) => {
    try {
      const data = JSON.parse(result);
      if (data.username !== session?.user?.email) {
        toast({
          title: "Invalid QR Code",
          description: "This QR code is not associated with your account.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_stats')
        .update({
          tokens_earned: data.tokensEarned,
          waste_collected: data.kgCollected,
        })
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `You've earned ${data.tokensEarned} tokens for collecting ${data.kgCollected}kg of waste!`,
      });
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast({
        title: "Error",
        description: "Failed to process QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Scan QR Code</h1>
      <div id="reader" className="mb-4"></div>
      {scanResult && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Scan Result:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}
