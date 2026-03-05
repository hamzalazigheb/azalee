import { NextResponse } from 'next/server';
import { writeFile, mkdir, chmod } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getJWTSecret } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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
      const jwtSecret = getJWTSecret();
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Token invalide ou expiré' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur existe et est admin
    try {
      await connectDB();
      const user = await User.findById(decoded.userId);
      if (!user || user.role !== 'admin') {
        return NextResponse.json(
          { success: false, message: 'Accès admin requis' },
          { status: 403 }
        );
      }
    } catch (dbError) {
      if (process.env.NODE_ENV === 'development') {
      console.error('Database connection error:', dbError);
      }
      return NextResponse.json(
        { success: false, message: 'Erreur de connexion à la base de données' },
        { status: 500 }
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
    
    // Create directory if it doesn't exist with proper permissions
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true, mode: 0o755 });
    } else {
      // Ensure directory has write permissions
      try {
        await chmod(uploadDir, 0o755);
      } catch (chmodError) {
        console.warn('Could not set directory permissions:', chmodError);
      }
    }

    // Save file with proper error handling
    const filePath = join(uploadDir, filename);
    try {
      await writeFile(filePath, buffer, { mode: 0o644 });
    } catch (writeError) {
      // If permission error, try to fix permissions and retry
      if (writeError.code === 'EACCES' || writeError.code === 'EPERM') {
        console.error('Permission denied, attempting to fix permissions...');
        try {
          await chmod(uploadDir, 0o777);
          await writeFile(filePath, buffer, { mode: 0o644 });
        } catch (retryError) {
          throw new Error(`Impossible d'écrire le fichier. Vérifiez les permissions du dossier ${uploadDir} sur le serveur.`);
        }
      } else {
        throw writeError;
      }
    }

    // Return URL
    const url = `/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      message: 'Fichier uploadé avec succès'
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    console.error('Error uploading file:', error);
    console.error('Error stack:', error.stack);
    }
    
    // Messages d'erreur plus clairs selon le type d'erreur
    let errorMessage = 'Erreur lors de l\'upload';
    if (error.code === 'EACCES' || error.code === 'EPERM') {
      errorMessage = 'Permission refusée. Contactez l\'administrateur pour vérifier les permissions du dossier public/pdfs/';
    } else if (error.code === 'ENOENT') {
      errorMessage = 'Le dossier de destination n\'existe pas. Contactez l\'administrateur.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

