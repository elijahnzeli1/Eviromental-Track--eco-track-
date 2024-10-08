import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const ProfileDisplay = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return null;
  }

  const { user } = session;
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  return (
    <div className="flex items-center">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || 'User'}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
          {initials}
        </div>
      )}
      <span className="ml-2">{user.name}</span>
    </div>
  );
};

export default ProfileDisplay;
