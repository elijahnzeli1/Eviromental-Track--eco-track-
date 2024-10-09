'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/Providers';
import ProfileDisplay from './ProfileDisplay';

export default function Navbar() {
  const { session, loading } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Eco-Track</Link>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/map">Map</Link>
          <Link href="/community">Community</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/projects">Projects</Link>
        </div>
        <div>
          {loading ? (
            <span>Loading...</span>
          ) : session ? (
            <ProfileDisplay />
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
