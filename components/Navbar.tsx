import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Eco-Track</Link>
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
        <Link href="/map">Map</Link>
          <Link href="/community">Community</Link>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/projects">Projects</Link>
        </div>
      </div>
    </nav>
  );
}
