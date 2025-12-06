import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../lib/models/User';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

// Update user
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // In Next.js 14, params might be a Promise
    const resolvedParams = await params || params;
    let { id } = resolvedParams;
    
    // Decode the ID if it was encoded
    if (id) {
      try {
        id = decodeURIComponent(id);
      } catch (e) {
        // If decoding fails, use the original id
        console.warn('Failed to decode ID, using original:', id);
      }
    }

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
    // decoded might have 'id' or 'userId' depending on how token was created
    const userId = decoded.id || decoded.userId;
    const admin = await User.findById(userId);
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    const { email, name, role, password } = await request.json();

    // Find user - try multiple methods to find by ID
    let user = await User.findById(id);
    
    // If not found, try to find by string ID converted to ObjectId
    if (!user && id && id.length === 24) {
      try {
        const mongoose = require('mongoose');
        const ObjectId = mongoose.Types.ObjectId;
        if (ObjectId.isValid(id)) {
          user = await User.findById(new ObjectId(id));
        }
      } catch (e) {
        console.error('Error converting ID to ObjectId:', e);
      }
    }
    
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

    // In Next.js 14, params might be a Promise
    const resolvedParams = await params || params;
    let { id } = resolvedParams;
    
    // Decode the ID if it was encoded
    if (id) {
      try {
        id = decodeURIComponent(id);
      } catch (e) {
        // If decoding fails, use the original id
        console.warn('Failed to decode ID, using original:', id);
      }
    }
    
    console.log('DELETE user - ID received:', id);
    console.log('DELETE user - ID type:', typeof id);
    console.log('DELETE user - ID length:', id?.length);
    console.log('DELETE user - Params:', resolvedParams);

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
    // decoded might have 'id' or 'userId' depending on how token was created
    const userId = decoded.id || decoded.userId;
    const admin = await User.findById(userId);
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Prevent deleting yourself
    if (userId === id) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Find and delete user
    console.log('DELETE user - Searching for user with ID:', id);
    console.log('DELETE user - ID length:', id?.length);
    
    // Try to find user by ID (MongoDB ObjectId)
    let user = await User.findById(id);
    
    // If not found, try to find by string ID
    if (!user && id && id.length === 24) {
      // MongoDB ObjectId is 24 hex characters
      try {
        const mongoose = require('mongoose');
        const ObjectId = mongoose.Types.ObjectId;
        if (ObjectId.isValid(id)) {
          user = await User.findById(new ObjectId(id));
        }
      } catch (e) {
        console.error('Error converting ID to ObjectId:', e);
      }
    }
    
    if (!user) {
      console.log('DELETE user - User not found with ID:', id);
      // Try to find the user to see what IDs exist
      const allUsers = await User.find({}, '_id email');
      console.log('DELETE user - Available users:', allUsers.map(u => ({ id: u._id.toString(), email: u.email })));
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete the user
    await User.findByIdAndDelete(user._id);
    console.log('DELETE user - Successfully deleted:', user.email);

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

