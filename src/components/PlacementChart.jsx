import React from 'react';
import Image from 'next/image';

const PlacementChart = ({ title, data, chartImage }) => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="w-[45px] h-[1.5px] bg-[#4EBBBD] rounded-full"></div>
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-normal uppercase leading-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Chart Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-lg shadow-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ring-2 ring-gray-100">
              <Image
                src={chartImage}
                alt={`${title} Chart`}
                fill
                className="object-contain object-center"
                quality={100}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                style={{
                  imageRendering: 'auto',
                  filter: 'contrast(1.05) saturate(1.1)',
                }}
                unoptimized={false}
                onError={(e) => {
                  console.log('Chart image failed to load:', e.target.src);
                }}
                onLoad={() => console.log('Chart image loaded successfully')}
              />
            </div>
          </div>

          {/* Right: Data Table */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-source-sans font-semibold mb-6">
                Données actuelles
              </h3>
              
              <div className="space-y-4">
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <span className="text-[#686868] font-source-sans font-medium">
                      {item.label}
                    </span>
                    <span className="text-[#112033] font-source-sans font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-[#FAFFEF] rounded-lg">
                <p className="text-[#686868] text-sm font-source-sans">
                  <strong>Note :</strong> Ces données sont mises à jour régulièrement et peuvent varier selon les conditions de marché.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementChart; 