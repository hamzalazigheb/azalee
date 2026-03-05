import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { filename } = params;
    
    // Sécuriser le nom de fichier (empêcher path traversal)
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { error: 'Nom de fichier invalide' },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), 'public', 'pdfs', filename);
    
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Fichier non trouvé' },
        { status: 404 }
      );
    }

    const fileBuffer = await readFile(filePath);

    // Retourner le PDF avec les headers pour l'ouvrir dans le navigateur
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`, // 'inline' = ouvrir dans le navigateur
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture du fichier' },
      { status: 500 }
    );
  }
}

