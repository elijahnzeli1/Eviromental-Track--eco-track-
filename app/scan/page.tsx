'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function ScanPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const processQRCode = useCallback(async (result: string) => {
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

      const response = await fetch('/api/user-stats/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokensEarned: data.tokensEarned,
          wasteCollected: data.kgCollected,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stats');
      }

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
  }, [session?.user?.email, toast]);

  const onScanSuccess = useCallback((decodedText: string) => {
    setScanResult(decodedText);
    processQRCode(decodedText);
  }, [processQRCode]);

  const onScanError = useCallback((error: unknown) => {
    console.warn('QR Scan error:', error);
  }, []);

  useEffect(() => {
    // Initialize scanner
    const initializeScanner = () => {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner(
          'reader',
          {
            qrbox: {
              width: 250,
              height: 250,
            },
            aspectRatio: 1.0,
            fps: 5,
          },
          false
        );

        scannerRef.current.render(onScanSuccess, onScanError);
        setIsLoading(false);
      }
    };

    initializeScanner();

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
          .catch(error => console.error('Failed to clear scanner:', error));
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, onScanError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Scan QR Code</h1>
        <div 
          id="reader" 
          className="mb-4 overflow-hidden rounded-lg shadow-lg"
        ></div>
        {scanResult && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-green-800">
              Scan Successful!
            </h2>
            <p className="text-green-700">
              Your waste collection has been recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
