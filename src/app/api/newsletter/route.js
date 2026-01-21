import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber';
import { applyRateLimit, newsletterLimiter } from '@/lib/rateLimit';
import { validateNewsletterSubscription } from '@/lib/validations/newsletter';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Apply rate limiting (IP-based)
    const rateCheck = await applyRateLimit(request, newsletterLimiter, 'newsletter');
    if (rateCheck.limited) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Newsletter rate limit exceeded for IP: ${rateCheck.identifier}`);
      }
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer plus tard.' },
        { status: 429 }
      );
    }
    
    await connectDB();

    const body = await request.json();

    // Validate input
    const validation = validateNewsletterSubscription(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.message },
        { status: 400 }
      );
    }
    
    const { email } = validation.data;

    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ 
      email 
    });

    if (existingSubscriber) {
      // If already subscribed but inactive, reactivate
      if (!existingSubscriber.active) {
        existingSubscriber.active = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        return NextResponse.json(
          { message: 'Successfully resubscribed to newsletter', subscriber: existingSubscriber },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: 'Email already subscribed', subscriber: existingSubscriber },
        { status: 200 }
      );
    }

    // Create new subscriber
    const subscriber = new NewsletterSubscriber({
      email,
      source: 'homepage',
      active: true
    });

    await subscriber.save();

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        subscriber: {
          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    console.error('Newsletter subscription error:', error);
    }
    
    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all subscribers (for admin)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const query = {};
    if (active !== null) {
      query.active = active === 'true';
    }

    const subscribers = await NewsletterSubscriber.find(query)
      .sort({ subscribedAt: -1 })
      .select('email subscribedAt source active')
      .lean();

    return NextResponse.json(
      { 
        subscribers,
        total: subscribers.length
      },
      { status: 200 }
    );

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    console.error('Error fetching newsletter subscribers:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

