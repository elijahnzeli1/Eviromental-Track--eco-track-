'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/Providers';
import ProfileDisplay from './ProfileDisplay';
import { Home, Users, ShoppingBag, Folder, QrCode } from 'lucide-react';

export default function Navbar() {
  const { session, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/community', icon: Users, label: 'Community' },
    { href: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { href: '/projects', icon: Folder, label: 'Projects' },
    { href: '/scan', icon: QrCode, label: 'Scan QR' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-green-600 text-white p-4 sticky top-0 z-10 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Eco-Track</Link>
          <div className="space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
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

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-2 flex justify-around items-center md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center">
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
