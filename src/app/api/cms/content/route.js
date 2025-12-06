import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import PageContent from '../../../../lib/models/PageContent';

export const dynamic = 'force-dynamic';

// GET - Get content for a specific page path
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { success: false, message: 'Path parameter is required' },
        { status: 400 }
      );
    }

    const page = await PageContent.findOne({ 
      path: path.toLowerCase(),
      published: true 
    });
    
    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page not found or not published' },
        { status: 404 }
      );
    }

    // Log partners count for debugging
    if (page.content && page.content.partners) {
      console.log(`[CMS API] Partners count for ${path}:`, Array.isArray(page.content.partners) ? page.content.partners.length : 'Not an array');
    }

    return NextResponse.json({
      success: true,
      data: page.content
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// POST - Save content for a specific page and section
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { page, section, data } = body;

    // Validation
    if (!page || !section || !data) {
      return NextResponse.json(
        { success: false, message: 'Page, section, and data are required' },
        { status: 400 }
      );
    }

    const path = page.toLowerCase();

    // Find or create the page
    let pageContent = await PageContent.findOne({ path });

    if (!pageContent) {
      // Create new page if it doesn't exist
      pageContent = new PageContent({
        path,
        title: page.split('/').pop().replace(/-/g, ' '), // Extract title from path
        content: {},
        published: true,
        lastModified: new Date()
      });
    }

    // Update the specific section in content
    pageContent.content = {
      ...(pageContent.content || {}),
      [section]: data
    };

    pageContent.lastModified = new Date();
    await pageContent.save();

    return NextResponse.json({
      success: true,
      message: 'Content saved successfully',
      data: {
        path: pageContent.path,
        section,
        content: pageContent.content[section]
      }
    });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

