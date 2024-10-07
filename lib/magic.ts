import { Magic } from 'magic-sdk';

const createMagic = (key: string | undefined) => {
  if (typeof window === 'undefined') return null;
  if (!key) throw new Error('Magic publishable key is undefined');
  return new Magic(key);
};

const magicPublishableKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;

if (!magicPublishableKey) {
  console.error('Magic publishable key is not set in environment variables');
}

export const magic = createMagic(magicPublishableKey);
