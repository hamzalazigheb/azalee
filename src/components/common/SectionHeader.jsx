'use client';

export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`text-center mb-12 sm:mb-16 ${className}`}>
      <div className="inline-block mb-4">
        <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}


