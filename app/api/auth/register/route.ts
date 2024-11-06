import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/src/lib/mongodb';
import User, { cleanupIndexes } from '@/src/models/user';
import mongoose from 'mongoose';

interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
  keyValue?: { [key: string]: any };
}

export async function POST(request: Request) {
  try {
    console.log('Starting registration process');

    const body = await request.json();
    console.log('Request body:', { ...body, password: '***' });

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Clean up old indexes if they exist
    await cleanupIndexes();

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      tokensEarned: 0,
      wasteCollected: 0,
      rank: 0
    });

    console.log('User created successfully');

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Registration error:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    // Handle MongoDB duplicate key error
    const mongoError = error as MongoError;
    if (mongoError.code === 11000) {
      const field = Object.keys(mongoError.keyPattern || {})[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}