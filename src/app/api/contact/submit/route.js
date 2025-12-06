import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Contact from '../../../../lib/models/Contact';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { nom, email, telephone, ville, profession, patrimoine, message } = body;

    // Validation
    if (!nom || !email || !telephone || !ville) {
      return NextResponse.json(
        { success: false, message: 'Les champs obligatoires sont manquants' },
        { status: 400 }
      );
    }

    // Create new contact
    const contact = new Contact({
      nom,
      email,
      telephone,
      ville,
      profession: profession || '',
      patrimoine: patrimoine || '',
      message: message || '',
      status: 'new'
    });

    await contact.save();

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès !',
      data: contact
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Données invalides: ' + Object.values(error.errors).map(e => e.message).join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi du formulaire. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

