// Script to apply LMNP theme to all brochure pages
const fs = require('fs');
const path = require('path');

const brochures = [
  'athena-ia-robotique-2025',
  'energie-degressive-2025',
  'ambition-pharma-2026',
  'autocall-credit-agricole-2025',
];

const applyTheme = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add SectionHeader import
  if (!content.includes('SectionHeader')) {
    content = content.replace(
      /import Link from "next\/link";/,
      'import Link from "next/link";\nimport SectionHeader from "../../../../components/common/SectionHeader";'
    );
  }

  // Replace "Informations principales" section
  content = content.replace(
    /<div className="mb-12">\s*<div className="bg-gradient-to-br from-\[#253F60\]\/10 to-\[#B99066\]\/10 rounded-xl p-8 border-l-4 border-\[#253F60\] mb-8">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Informations du produit\s*<\/h2>/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Informations du produit"
              subtitle="Découvrez les caractéristiques essentielles de ce produit structuré"
            />
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10">`
  );

  // Update grid items to use white/10 backdrop
  content = content.replace(
    /<div>\s*<p className="text-sm text-gray-600 mb-1">([^<]+)<\/p>\s*<p className="text-\[#253F60\] font-semibold text-lg">([^<]+)<\/p>\s*<\/div>/g,
    `<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">$1</p>
                    <p className="text-white font-semibold text-lg">$2</p>
                  </div>`
  );

  // Close the relative z-10 div and main div
  content = content.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*{\/\* Objectif de rendement \*\/}/,
    `</div>
              </div>
            </div>
          </div>

          {/* Objectif de rendement */}`
  );

  // Replace "Objectif de rendement" section
  content = content.replace(
    /<div className="mb-12">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Objectif de rendement\s*<\/h2>\s*<div className="bg-white rounded-xl shadow-lg border-2 border-\[#B99066\] p-8">/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Objectif de rendement"
              subtitle="Un potentiel de performance attractif avec un mécanisme dégressif"
            />
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#253F60]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
              
              <div className="relative z-10 text-center mb-8">`
  );

  // Update rendement content
  content = content.replace(
    /<div className="text-center mb-6">\s*<div className="inline-block bg-gradient-to-br from-\[#B99066\] to-\[#D4A574\] rounded-full px-8 py-4 mb-4">\s*<span className="text-white font-bold text-3xl">([^<]+)<\/span>\s*<\/div>\s*<p className="text-\[#4B5563\] text-lg">\s*([^<]+)\s*<\/p>\s*<\/div>\s*<div className="bg-gray-50 rounded-lg p-6">\s*<p className="text-\[#253F60\] font-semibold mb-2">Mécanisme :<\/p>\s*<p className="text-\[#4B5563\]">\s*([^<]+)\s*<\/p>\s*<\/div>/s,
    `<div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-6 mb-6 border-2 border-white/30">
                  <span className="text-white font-bold text-3xl sm:text-4xl">$1</span>
                </div>
                <p className="text-white text-lg sm:text-xl font-medium">
                  $2
                </p>
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
                <p className="text-white font-semibold mb-3 text-lg">Mécanisme :</p>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  $3
                </p>
              </div>`
  );

  // Replace "Barrière et protection" section
  content = content.replace(
    /<div className="mb-12">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Barrière et protection du capital\s*<\/h2>/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Barrière et protection du capital"
              subtitle="Comprendre les mécanismes de protection et de rappel anticipé"
            />`
  );

  // Update barrière cards
  content = content.replace(
    /<div className="bg-gradient-to-br from-\[#253F60\]\/10 to-\[#B99066\]\/10 rounded-xl p-6 border-l-4 border-\[#253F60\]">/g,
    `<div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>`
  );

  content = content.replace(
    /<div className="bg-gradient-to-br from-\[#253F60\]\/10 to-\[#B99066\]\/10 rounded-xl p-6 border-l-4 border-\[#B99066\]">/g,
    `<div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>`
  );

  // Update text colors in barrière cards
  content = content.replace(
    /<h3 className="text-\[#253F60\] font-bold text-lg mb-4">([^<]+)<\/h3>\s*<p className="text-\[#4B5563\] mb-4">\s*([^<]+)\s*<\/p>\s*<p className="text-\[#253F60\] font-semibold">\s*([^<]+)\s*<\/p>/g,
    `<h3 className="text-white font-bold text-xl sm:text-2xl mb-6 relative z-10">$1</h3>
                <p className="text-white/90 mb-4 text-base sm:text-lg leading-relaxed relative z-10">
                  $2
                </p>
                <p className="text-white font-semibold text-base sm:text-lg relative z-10">
                  $3
                </p>`
  );

  // Update "À l'échéance" section
  content = content.replace(
    /<p className="text-\[#253F60\] font-semibold mb-2">Protection du capital :<\/p>\s*<ul className="list-disc list-inside text-\[#4B5563\] space-y-1">\s*<li>([^<]+)<\/li>\s*<li>([^<]+)<\/li>\s*<\/ul>/s,
    `<p className="text-white font-semibold mb-3 text-base sm:text-lg relative z-10">Protection du capital :</p>
                <ul className="space-y-2 relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <span className="text-white/90 text-base sm:text-lg">$1</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <span className="text-white/90 text-base sm:text-lg">$2</span>
                  </li>
                </ul>`
  );

  // Replace "Points forts" section
  content = content.replace(
    /<div className="mb-12">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Points forts\s*<\/h2>/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Points forts"
              subtitle="Les avantages clés de ce produit structuré"
            />`
  );

  // Update points forts cards
  content = content.replace(
    /<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">\s*<h3 className="text-\[#253F60\] font-bold text-lg mb-3 flex items-center gap-2">\s*<span className="text-green-500">✓<\/span>\s*([^<]+)\s*<\/h3>\s*<p className="text-\[#4B5563\]">\s*([^<]+)\s*<\/p>\s*<\/div>/g,
    (match, title, desc, offset, string) => {
      const index = (string.substring(0, offset).match(/<div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">/g) || []).length;
      const isEven = index % 2 === 0;
      return `<div className="relative bg-gradient-to-br ${isEven ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 ${isEven ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-${isEven ? '[#B99066]' : '[#253F60]'} text-2xl">✓</span>
                  <span>${title}</span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  ${desc}
                </p>
              </div>`;
    }
  );

  // Replace "Risques clés" section
  content = content.replace(
    /<div className="mb-12">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Risques clés\s*<\/h2>\s*<div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-8">/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Risques clés"
              subtitle="Les risques importants à connaître avant d'investir"
            />
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-l-4 border-amber-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/20 rounded-bl-full"></div>
              <div className="space-y-6 sm:space-y-8 relative z-10">`
  );

  // Update risques items
  content = content.replace(
    /<div>\s*<h3 className="text-\[#253F60\] font-bold text-lg mb-2">⚠️ ([^<]+)<\/h3>\s*<p className="text-\[#4B5563\]">\s*([^<]+)\s*<\/p>\s*<\/div>/g,
    `<div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>$1</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    $2
                  </p>
                </div>`
  );

  // Replace "Pourquoi ce produit" section
  content = content.replace(
    /<div className="mb-12">\s*<h2 className="text-\[#253F60\] text-2xl sm:text-3xl font-cairo font-bold mb-6">\s*Pourquoi investir dans ce produit \?\s*<\/h2>\s*<div className="bg-gradient-to-br from-\[#253F60\] to-\[#1a2d47\] rounded-2xl p-10 text-white shadow-2xl">/s,
    `<div className="mb-16">
            <SectionHeader 
              title="Pourquoi investir dans ce produit ?"
              subtitle="Une opportunité d'investissement dans un secteur porteur"
            />
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10 space-y-6">`
  );

  // Update pourquoi content
  content = content.replace(
    /<p className="text-xl sm:text-2xl leading-relaxed font-light mb-6">\s*([^<]+)\s*<\/p>\s*<p className="text-lg leading-relaxed">\s*([^<]+)\s*<\/p>/s,
    `<p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed font-light">
                  $1
                </p>
                <p className="text-lg sm:text-xl leading-relaxed">
                  $2
                </p>`
  );

  // Replace CTA section
  content = content.replace(
    /<div className="text-center">\s*<div className="bg-gradient-to-r from-\[#253F60\]\/10 to-\[#B99066\]\/10 rounded-xl p-8 border-2 border-\[#253F60\]">/s,
    `<div className="mb-16">
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10 text-center">`
  );

  // Update CTA content
  content = content.replace(
    /<h3 className="text-\[#253F60\] text-2xl font-cairo font-bold mb-4">\s*Intéressé par ce produit \?\s*<\/h3>\s*<p className="text-\[#4B5563\] mb-6">\s*([^<]+)\s*<\/p>/s,
    `<h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                  Intéressé par ce produit ?
                </h3>
                <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  $1
                </p>`
  );

  // Update CTA buttons
  content = content.replace(
    /className="bg-\[#253F60\] hover:bg-\[#1a2d47\] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"/,
    'className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"'
  );

  content = content.replace(
    /className="bg-\[#B99066\] hover:bg-\[#A67A5A\] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"/,
    'className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"'
  );

  // Update Disclaimer
  content = content.replace(
    /<div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">\s*<p className="text-sm text-\[#4B5563\]">/s,
    `<div className="relative bg-gradient-to-br from-red-50 via-red-100/50 to-red-50 rounded-2xl p-8 sm:p-10 border-l-4 border-red-500 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-bl-full"></div>
            <div className="relative z-10">
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">`
  );

  content = content.replace(
    /<strong className="text-\[#253F60\]">🔒 Avertissement :<\/strong>/,
    '<strong className="text-red-700 text-lg sm:text-xl">🔒 Avertissement :</strong>'
  );

  content = content.replace(
    /<\/p>\s*<\/div>\s*<\/div>\s*<\/section>/,
    `</p>
            </div>
          </div>
        </div>
      </section>`
  );

  // Update mb-12 to mb-16 for consistency
  content = content.replace(/mb-12/g, 'mb-16');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Applied LMNP theme to: ${filePath}`);
};

brochures.forEach(brochure => {
  const filePath = path.join(__dirname, `../src/app/placements/produits-structures/${brochure}/page.jsx`);
  if (fs.existsSync(filePath)) {
    applyTheme(filePath);
  } else {
    console.warn(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ All brochures updated with LMNP theme!');



