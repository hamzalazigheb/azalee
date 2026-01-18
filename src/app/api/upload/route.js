import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request) {
  try {
    // ============================================
    // AUTHENTIFICATION - Vérifier le token JWT
    // ============================================
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé. Token requis.' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Vérifier le token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key-change-in-production'
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Token invalide ou expiré' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur existe et est admin
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Accès admin requis' },
        { status: 403 }
      );
    }

    // ============================================
    // UPLOAD - Traitement du fichier
    // ============================================
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'uploads';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Validate file type
    if (folder === 'pdfs' && file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Le fichier doit être un PDF' },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB for PDFs, 10MB for images)
    const maxSize = folder === 'pdfs' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: `Le fichier est trop volumineux (max ${maxSize / 1024 / 1024}MB)` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalName}`;

    // Determine upload directory
    const uploadDir = join(process.cwd(), 'public', folder);
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return URL
    const url = `/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      message: 'Fichier uploadé avec succès'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Erreur lors de l\'upload' },
      { status: 500 }
    );
  }
}

