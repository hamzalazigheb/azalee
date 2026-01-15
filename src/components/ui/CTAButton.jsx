'use client';

/**
 * Client Component for CTA buttons with onClick handlers
 * Conforme aux recommandations d'audit UX/SEO :
 * - Orange #B99066 réservé aux actions prioritaires
 * - Dimensions minimales : 50px hauteur, 200px largeur (desktop)
 * - Border-radius : 5-8px (rounded-lg = 8px)
 * - Ombre portée et effet hover amélioré
 */
export default function CTAButton({ 
  href, 
  onClick, 
  children, 
  variant = 'primary',
  className = '',
  externalUrl,
  ...props 
}) {
  // Classes de base avec dimensions minimales et styles d'audit
  const baseClasses = `
    min-h-[50px] 
    min-w-[200px] 
    px-6 sm:px-8 
    py-3 sm:py-4 
    rounded-lg 
    shadow-md 
    font-inter 
    font-semibold 
    text-sm sm:text-base 
    transition-all 
    duration-200 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#B99066] 
    focus:ring-offset-2
  `.trim().replace(/\s+/g, ' ');
  
  const variants = {
    // Variant primary : Orange #B99066 pour actions prioritaires uniquement
    primary: `
      bg-[#B99066] 
      text-white 
      hover:bg-[#A67A5A] 
      hover:shadow-lg 
      hover:-translate-y-0.5 
      active:translate-y-0 
      active:shadow-md
    `.trim().replace(/\s+/g, ' '),
    
    // Variant outline : Pour actions secondaires (ne rivalise pas avec le CTA orange)
    outline: `
      border-2 
      border-[#B99066] 
      text-[#B99066] 
      bg-transparent 
      hover:bg-[#B99066] 
      hover:text-white 
      hover:shadow-md
    `.trim().replace(/\s+/g, ' '),
    
    // Variant secondary : Bordure blanche pour fonds colorés
    secondary: `
      border-2 
      border-white 
      text-white 
      bg-transparent
      hover:bg-white 
      hover:text-[#253F60] 
      hover:shadow-md
    `.trim().replace(/\s+/g, ' '),
    
    // Variant white : Pour fonds sombres
    white: `
      bg-white 
      text-[#112033] 
      hover:bg-gray-100 
      hover:shadow-md
    `.trim().replace(/\s+/g, ' ')
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  const handleClick = () => {
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    } else if (onClick) {
      onClick();
    }
  };
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={handleClick} className={classes} {...props}>
      {children}
    </button>
  );
}
