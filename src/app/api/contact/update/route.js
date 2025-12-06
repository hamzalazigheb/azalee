import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Contact from '../../../../lib/models/Contact';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function PUT(request) {
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

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID du contact manquant' },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact mis à jour avec succès',
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour du contact' },
      { status: 500 }
    );
  }
}

