import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import { getJWTSecret } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const jwtSecret = getJWTSecret();
      const decoded = jwt.verify(token, jwtSecret);

      await connectDB();
      
      // Verify user still exists
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        }
      });

    } catch (jwtError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('JWT verification error:', jwtError.message);
      }
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Verify error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}


