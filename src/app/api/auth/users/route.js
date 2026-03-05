import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';
import { getJWTSecret } from '@/lib/auth';
import { validateUserCreation } from '@/lib/validations/user';

export const dynamic = 'force-dynamic';

// Get all users (only for admin)
export async function GET(request) {
  try {
    await connectDB();

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    let decoded;
    try {
      const jwtSecret = getJWTSecret();
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get all users
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    // Ensure _id is converted to string for each user
    const usersWithStringIds = users.map(user => {
      const userObj = user.toObject();
      userObj._id = userObj._id.toString();
      userObj.id = userObj._id; // Also add 'id' field for convenience
      return userObj;
    });

    return NextResponse.json({
      success: true,
      data: usersWithStringIds
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Get users error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Error fetching users' },
      { status: 500 }
    );
  }
}

// Create new user (only for admin)
export async function POST(request) {
  try {
    await connectDB();

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    let decoded;
    try {
      const jwtSecret = getJWTSecret();
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const admin = await User.findById(decoded.userId);
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate input with Zod
    const validation = validateUserCreation(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.message, errors: validation.errors },
        { status: 400 }
      );
    }
    
    const { email, password, name, role } = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user (password will be hashed by pre-save hook)
    const newUser = new User({
      email,
      password,
      name,
      role
    });

    await newUser.save();

    // Return user without password
    const userResponse = newUser.toJSON();

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Create user error:', error);
    }
    return NextResponse.json(
      { success: false, message: 'Error creating user' },
      { status: 500 }
    );
  }
}

