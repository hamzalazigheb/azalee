import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Contact from '../../../../lib/models/Contact';
import { applyRateLimit, contactLimiter } from '@/lib/rateLimit';
import { validateContactSubmission } from '@/lib/validations/contact';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Apply rate limiting (IP-based)
    const rateCheck = await applyRateLimit(request, contactLimiter, 'contact');
    if (rateCheck.limited) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Contact rate limit exceeded for IP: ${rateCheck.identifier}`);
      }
      return NextResponse.json(
        { success: false, message: 'Trop de demandes. Veuillez réessayer dans quelques minutes.' },
        { status: 429 }
      );
    }
    
    await connectDB();
    
    const body = await request.json();
    
    // Validate and sanitize input
    const validation = validateContactSubmission(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.message, errors: validation.errors },
        { status: 400 }
      );
    }
    
    const { nom, email, telephone, ville, profession, patrimoine, message } = validation.data;

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
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact submission error:', error);
    }
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Données invalides' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi du formulaire. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

