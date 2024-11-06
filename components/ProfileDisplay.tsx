import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/Providers';

const ProfileDisplay = () => {
  const { session } = useAuth();

  if (!session || !session.user) {
    return null;
  }

  const { user } = session;
  const initials = user.email ? user.email[0].toUpperCase() : '';

  return (
    <div className="flex items-center">
      {user.user_metadata?.avatar_url ? (
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.email || 'User'}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>
      )}
      {/* <span className="ml-2">{user.name}</span> */}
    </div>
  );
};

export default ProfileDisplay;
