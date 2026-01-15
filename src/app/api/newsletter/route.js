import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NewsletterSubscriber from '@/lib/models/NewsletterSubscriber';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ 
      email: email.toLowerCase().trim() 
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
      email: email.toLowerCase().trim(),
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
    console.error('Newsletter subscription error:', error);
    
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
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

