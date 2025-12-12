import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// Force dynamic rendering - don't try to connect to MongoDB during build
export const dynamic = 'force-dynamic';

// Initialize default admin user
export async function GET() {
  try {
    await connectDB();
    
    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'contact@azalee-patrimoine.fr' });
    
    if (adminExists) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists'
      });
    }

    // Create default admin user
    const admin = new User({
      email: 'contact@azalee-patrimoine.fr',
      password: 'admin123', // Will be hashed by pre-save hook
      name: 'Administrator',
      role: 'admin'
    });

    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Default admin user created successfully',
      credentials: {
        email: 'contact@azalee-patrimoine.fr',
        password: 'admin123'
      }
    });

  } catch (error) {
    console.error('Init error:', error);
    return NextResponse.json(
      { success: false, message: 'Error initializing admin user: ' + error.message },
      { status: 500 }
    );
  }
}


