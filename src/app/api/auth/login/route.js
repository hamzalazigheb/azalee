import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Wait for MongoDB connection to be fully established
    await connectDB();
    
    // Small delay to ensure connection is ready (Mongoose needs a moment)
    await new Promise(resolve => setTimeout(resolve, 100));

    // Initialize admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'contact@azalee-patrimoine.fr' });
    if (!adminExists) {
      try {
        // Hash password manually before creating user to avoid hook issues
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const admin = new User({
          email: 'contact@azalee-patrimoine.fr',
          password: hashedPassword, // Already hashed
          name: 'Administrator',
          role: 'admin'
        });
        await admin.save();
        console.log('✅ Default admin user created: contact@azalee-patrimoine.fr / admin123');
      } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        // Continue anyway - user might already exist or there was an error
      }
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email.toLowerCase());
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log('❌ Login failed: Invalid password for user:', user.email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('✅ Login successful for user:', user.email);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
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
    console.error('Login error:', error);
    
    // Provide more helpful error messages
    let errorMessage = 'Server error. Please try again later.';
    
    if (error.message.includes('timeout') || error.message.includes('ETIMEOUT')) {
      errorMessage = 'Connection timeout. Please check MongoDB Atlas Network Access settings.';
    } else if (error.message.includes('Network Access')) {
      errorMessage = 'MongoDB connection failed. Please configure Network Access in MongoDB Atlas.';
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

