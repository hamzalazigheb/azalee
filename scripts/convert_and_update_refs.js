const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mongoose = require('mongoose');
const { glob } = require('glob'); // Assume we might not have glob, but we can use fs.readdirSync recursive

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public/images');
const SRC_DIR = path.join(__dirname, '../src');
const MONGODB_URI = 'mongodb://localhost:27017/azalee_db';

// DB Schema
const PageContentSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    published: { type: Boolean, default: true },
}, { timestamps: true });
const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

// Helper to get all files in a directory recursively
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function convertImages() {
    console.log('🚀 Starting Image Conversion & Ref Update...');

    // 1. Identify Images to Convert
    const allImages = fs.readdirSync(PUBLIC_DIR);
    const targets = allImages.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    console.log(`Found ${targets.length} images to convert.`);

    const replacements = {}; // oldName -> newName

    // 2. Convert to WebP
    for (const file of targets) {
        const oldPath = path.join(PUBLIC_DIR, file);
        const fileNameNoExt = path.parse(file).name;
        const newName = `${fileNameNoExt}.webp`;
        const newPath = path.join(PUBLIC_DIR, newName);

        // Convert
        try {
            await sharp(oldPath)
                .webp({ quality: 80 })
                .toFile(newPath);

            replacements[file] = newName;
            replacements['/images/' + file] = '/images/' + newName; // Also match absolute paths common in code

            console.log(`✅ Converted: ${file} -> ${newName}`);

            // Delete original (safe to do after successful conversion)
            fs.unlinkSync(oldPath);

        } catch (err) {
            console.error(`❌ Failed to convert ${file}:`, err);
        }
    }

    if (Object.keys(replacements).length === 0) {
        console.log('No replacements to make.');
        return;
    }

    // 3. Update Source Code
    const srcFiles = getAllFiles(SRC_DIR).filter(f => /\.(js|jsx|css|scss|json)$/.test(f));

    console.log(`Scanning ${srcFiles.length} source files for references...`);

    for (const filePath of srcFiles) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        for (const [oldName, newName] of Object.entries(replacements)) {
            // Simple string replacement - using regex to catch "oldName"
            // Escaping specific chars for regex might be needed but efficient simple replaceAll is safer for strings
            // Since we are looking for explicit filenames/paths

            // We look for just the filename OR the path prefix
            // Strategy: Just replace the exact keys we added to 'replacements' which includes the filename and the /images/filename

            // Actually, just searching for the FILENAME is usually safest if it's unique enough. 
            // Let's iterate filenames.
            const fileOld = oldName.startsWith('/images') ? oldName.replace('/images/', '') : oldName;
            const fileNew = newName.startsWith('/images') ? newName.replace('/images/', '') : newName;

            if (content.includes(fileOld)) {
                content = content.split(fileOld).join(fileNew);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`📝 Updated ref in: ${path.relative(SRC_DIR, filePath)}`);
        }
    }

    // 4. Update Database
    console.log('🔄 Connecting to MongoDB for content updates...');
    await mongoose.connect(MONGODB_URI);

    const pages = await PageContent.find({});
    for (const page of pages) {
        let contentStr = JSON.stringify(page.content);
        let modified = false;

        for (const [oldName, newName] of Object.entries(replacements)) {
            const fileOld = oldName.startsWith('/images') ? oldName.replace('/images/', '') : oldName;
            const fileNew = newName.startsWith('/images') ? newName.replace('/images/', '') : newName;

            if (contentStr.includes(fileOld)) {
                contentStr = contentStr.split(fileOld).join(fileNew);
                modified = true;
            }
        }

        if (modified) {
            page.content = JSON.parse(contentStr);
            page.markModified('content');
            await page.save();
            console.log(`💾 DB Updated: ${page.path}`);
        }
    }

    console.log('✨ All Done!');
    process.exit(0);
}

convertImages();
