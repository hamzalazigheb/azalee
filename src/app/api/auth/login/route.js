import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';
import { getJWTSecret } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/user';
import { applyRateLimit, loginLimiter } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // TEMPORARILY DISABLED - Rate limiting to prevent brute force attacks (IP-based)
    // TODO: Re-enable after fixing the limiter
    /*
    const rateCheck = await applyRateLimit(request, loginLimiter, 'login');
    if (rateCheck.limited) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Rate limit exceeded for IP: ${rateCheck.identifier}`);
      }
      return NextResponse.json(
        { success: false, message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.' },
        { status: 429 }
      );
    }
    */
    
    // Get JWT secret with validation
    const jwtSecret = getJWTSecret();
    
    // Wait for MongoDB connection to be fully established
    await connectDB();
    
    // Parse and validate request body
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const { email, password } = validation.data;

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ Login failed: User not found for email:', email);
      }
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ Login failed: Invalid password for user:', user.email);
      }
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Login successful for user:', user.email);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role 
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Login error:', error);
    }
    
    // Provide more helpful error messages in development only
    let errorMessage = 'Server error. Please try again later.';
    
    if (process.env.NODE_ENV === 'development') {
      if (error.message.includes('timeout') || error.message.includes('ETIMEOUT')) {
        errorMessage = 'Connection timeout. Please check MongoDB connection.';
      } else if (error.message.includes('JWT_SECRET')) {
        errorMessage = error.message; // JWT secret error
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

