import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Check if the session exists
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Here you can add additional logic to handle the request
  // For example, fetching user data or performing other operations

  return NextResponse.json({ message: 'Success', user: session.user });
}