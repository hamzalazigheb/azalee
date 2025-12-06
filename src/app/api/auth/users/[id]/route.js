import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

// Update user
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

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
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
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

    const { email, name, role, password } = await request.json();

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update fields
    if (email) user.email = email.toLowerCase();
    if (name) user.name = name;
    if (role) user.role = role;
    if (password && password.length >= 6) {
      user.password = password; // Will be hashed by pre-save hook
    }

    await user.save();

    // Return user without password
    const userResponse = user.toJSON();

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating user: ' + error.message },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

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
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
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

    // Prevent deleting yourself
    if (decoded.userId === id) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting user: ' + error.message },
      { status: 500 }
    );
  }
}

