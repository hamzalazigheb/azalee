import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Contact from '../../../../lib/models/Contact';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Check authentication
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    // Count new contacts (status: 'new')
    const newContactsCount = await Contact.countDocuments({ status: 'new' });

    return NextResponse.json({
      success: true,
      count: newContactsCount
    });

  } catch (error) {
    console.error('Error counting contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors du comptage des contacts', count: 0 },
      { status: 500 }
    );
  }
}

