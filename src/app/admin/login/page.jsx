'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Show preloader for 5 seconds
        setShowPreloader(true);
        setLoading(false);
        
        // Redirect to dashboard after 5 seconds
        setTimeout(() => {
          router.push('/admin');
        }, 5000);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Preloader component
  if (showPreloader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#B99066] flex items-center justify-center relative overflow-hidden">
        {/* Ultra-professional animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple gradient orbs with different speeds */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#B99066]/30 rounded-full blur-3xl animate-orb-float-1"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#253F60]/30 rounded-full blur-3xl animate-orb-float-2"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#A67C52]/20 rounded-full blur-3xl animate-orb-float-3"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#1a2d47]/25 rounded-full blur-3xl animate-orb-float-4"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B99066]/15 rounded-full blur-3xl animate-orb-pulse"></div>
          
          {/* Animated grid pattern with depth */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              animation: 'grid-move 25s linear infinite'
            }}></div>
          </div>
          
          {/* Particle effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Ultra-professional logo animation */}
          <div className="mb-14 relative">
            {/* Multiple glow rings with different opacities */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B99066] via-[#A67C52] to-[#B99066] opacity-25 blur-3xl animate-glow-pulse scale-130"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#253F60] via-[#1a2d47] to-[#253F60] opacity-20 blur-2xl animate-glow-pulse-2 scale-120"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B99066] to-[#253F60] opacity-15 blur-xl animate-glow-pulse-3 scale-115"></div>
            
            {/* Animated rotating gradient border */}
            <div className="absolute inset-0 rounded-3xl animate-border-rotate" style={{
              background: 'conic-gradient(from 0deg, #B99066, #253F60, #A67C52, #1a2d47, #B99066)',
              padding: '4px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}>
              <div className="w-full h-full rounded-3xl bg-transparent"></div>
            </div>
            
            {/* Inner shadow ring */}
            <div className="absolute inset-2 rounded-3xl border-2 border-white/10 animate-inner-glow"></div>
            
            {/* Logo container with premium effects */}
            <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-48 h-48 flex items-center justify-center transform animate-logo-premium">
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[#B99066]/10 to-transparent"></div>
              
              {!logoError ? (
                <img 
                  src="/images/azalee-patrimoine3.webp" 
                  alt="Azalée Patrimoine Logo" 
                  className="max-w-full max-h-full object-contain relative z-10 animate-logo-refined drop-shadow-2xl"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex flex-col items-center justify-center text-white font-cairo font-bold shadow-inner relative z-10 animate-logo-refined">
                  <span className="text-7xl leading-none mb-2 drop-shadow-lg">A</span>
                  <span className="text-sm leading-tight tracking-wider drop-shadow">AZALÉE</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Ultra-professional loading text */}
          <div className="text-center animate-text-premium-fade">
            <h2 className="text-5xl font-cairo font-bold text-white mb-5 relative inline-block">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-[#B99066] via-white to-[#B99066] blur-xl opacity-50 animate-text-glow"></span>
                <span className="relative bg-gradient-to-r from-white via-[#B99066] to-white bg-clip-text text-transparent animate-text-gradient-premium" style={{
                  backgroundSize: '300% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Connexion réussie
                </span>
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B99066] to-transparent animate-underline-premium"></span>
            </h2>
            <p className="text-gray-200 font-inter text-xl font-light tracking-wider animate-text-slide-premium mt-2">
              <span className="inline-block animate-dot-1">.</span>
              <span className="inline-block animate-dot-2">.</span>
              <span className="inline-block animate-dot-3">.</span>
              <span className="ml-2">Redirection en cours</span>
            </p>
          </div>
          
          {/* Ultra-professional progress bar */}
          <div className="mt-14 w-[500px]">
            <div className="h-4 bg-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-md relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              
              <div 
                className="h-full bg-gradient-to-r from-[#B99066] via-[#A67C52] via-[#B99066] via-[#A67C52] to-[#B99066] rounded-full relative overflow-hidden"
                style={{
                  animation: 'progress-premium 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                  width: '0%',
                  backgroundSize: '300% 100%',
                  backgroundPosition: '0% center'
                }}
              >
                {/* Multiple shimmer layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-premium-1"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-premium-2"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#B99066] opacity-60 blur-lg animate-glow-premium"></div>
                
                {/* Sparkle particles */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Progress indicators */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-300 font-inter font-medium">
              <span className="flex items-center gap-2 animate-indicator-1">
                <span className="w-2 h-2 bg-[#B99066] rounded-full animate-pulse"></span>
                Initialisation
              </span>
              <span className="flex items-center gap-2 animate-indicator-2">
                <span className="w-2 h-2 bg-[#B99066] rounded-full animate-pulse"></span>
                Chargement
              </span>
              <span className="flex items-center gap-2 animate-indicator-3">
                <span className="w-2 h-2 bg-[#B99066] rounded-full animate-pulse"></span>
                Finalisation
              </span>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes progress-premium {
            from {
              width: 0%;
              background-position: 0% center;
            }
            to {
              width: 100%;
              background-position: 100% center;
            }
          }
          
          @keyframes logo-premium {
            0%, 100% {
              transform: translateY(0px) scale(1) rotate(0deg);
              box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(185, 144, 102, 0.2);
            }
            25% {
              transform: translateY(-10px) scale(1.03) rotate(0.5deg);
              box-shadow: 0 25px 70px rgba(0,0,0,0.35), 0 0 50px rgba(185, 144, 102, 0.3);
            }
            50% {
              transform: translateY(-15px) scale(1.06) rotate(0deg);
              box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(185, 144, 102, 0.4);
            }
            75% {
              transform: translateY(-10px) scale(1.03) rotate(-0.5deg);
              box-shadow: 0 25px 70px rgba(0,0,0,0.35), 0 0 50px rgba(185, 144, 102, 0.3);
            }
          }
          
          @keyframes logo-refined {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              opacity: 0.98;
              transform: scale(1.02);
              filter: brightness(1.05);
            }
          }
          
          @keyframes orb-float-1 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            33% {
              transform: translate(40px, -40px) scale(1.15);
              opacity: 0.4;
            }
            66% {
              transform: translate(-30px, 30px) scale(0.95);
              opacity: 0.25;
            }
          }
          
          @keyframes orb-float-2 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            33% {
              transform: translate(-40px, 40px) scale(0.9);
              opacity: 0.25;
            }
            66% {
              transform: translate(30px, -30px) scale(1.15);
              opacity: 0.4;
            }
          }
          
          @keyframes orb-float-3 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.2;
            }
            50% {
              transform: translate(30px, 30px) scale(1.1);
              opacity: 0.3;
            }
          }
          
          @keyframes orb-float-4 {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.25;
            }
            50% {
              transform: translate(-30px, -30px) scale(0.95);
              opacity: 0.35;
            }
          }
          
          @keyframes orb-pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.15;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.25);
              opacity: 0.3;
            }
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.25;
              transform: scale(1.3);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.35);
            }
          }
          
          @keyframes glow-pulse-2 {
            0%, 100% {
              opacity: 0.2;
              transform: scale(1.2);
            }
            50% {
              opacity: 0.3;
              transform: scale(1.25);
            }
          }
          
          @keyframes glow-pulse-3 {
            0%, 100% {
              opacity: 0.15;
              transform: scale(1.15);
            }
            50% {
              opacity: 0.25;
              transform: scale(1.2);
            }
          }
          
          @keyframes border-rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes inner-glow {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.2;
            }
          }
          
          @keyframes text-premium-fade {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes text-gradient-premium {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: 300% center;
            }
          }
          
          @keyframes text-glow {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.05);
            }
          }
          
          @keyframes underline-premium {
            0% {
              width: 0%;
              opacity: 0;
              transform: scaleX(0);
            }
            50% {
              width: 100%;
              opacity: 1;
              transform: scaleX(1);
            }
            100% {
              width: 100%;
              opacity: 0.9;
              transform: scaleX(1);
            }
          }
          
          @keyframes text-slide-premium {
            0% {
              opacity: 0;
              transform: translateX(-30px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes dot-1 {
            0%, 20% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes dot-2 {
            0%, 40% {
              opacity: 0;
            }
            60% {
              opacity: 1;
            }
          }
          
          @keyframes dot-3 {
            0%, 60% {
              opacity: 0;
            }
            80% {
              opacity: 1;
            }
          }
          
          @keyframes shimmer-premium-1 {
            0% {
              transform: translateX(-100%) skewX(-20deg);
            }
            100% {
              transform: translateX(300%) skewX(-20deg);
            }
          }
          
          @keyframes shimmer-premium-2 {
            0% {
              transform: translateX(-100%) skewX(20deg);
            }
            100% {
              transform: translateX(300%) skewX(20deg);
            }
          }
          
          @keyframes glow-premium {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
          
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: translateY(-50%) scale(0);
            }
            10%, 90% {
              opacity: 1;
              transform: translateY(-50%) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(-50%) scale(1.5);
            }
          }
          
          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }
          
          @keyframes particle {
            0%, 100% {
              opacity: 0;
              transform: translateY(0) translateX(0);
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-100vh) translateX(20px);
            }
          }
          
          @keyframes indicator-1 {
            0% {
              opacity: 0;
              transform: translateX(-10px);
            }
            16% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes indicator-2 {
            0%, 33% {
              opacity: 0;
              transform: translateX(-10px);
            }
            50% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes indicator-3 {
            0%, 66% {
              opacity: 0;
              transform: translateX(-10px);
            }
            83% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-logo-premium {
            animation: logo-premium 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          
          .animate-logo-refined {
            animation: logo-refined 4s ease-in-out infinite;
          }
          
          .animate-orb-float-1 {
            animation: orb-float-1 10s ease-in-out infinite;
          }
          
          .animate-orb-float-2 {
            animation: orb-float-2 12s ease-in-out infinite;
          }
          
          .animate-orb-float-3 {
            animation: orb-float-3 8s ease-in-out infinite;
          }
          
          .animate-orb-float-4 {
            animation: orb-float-4 9s ease-in-out infinite;
          }
          
          .animate-orb-pulse {
            animation: orb-pulse 7s ease-in-out infinite;
          }
          
          .animate-glow-pulse {
            animation: glow-pulse 4s ease-in-out infinite;
          }
          
          .animate-glow-pulse-2 {
            animation: glow-pulse-2 5s ease-in-out infinite;
          }
          
          .animate-glow-pulse-3 {
            animation: glow-pulse-3 6s ease-in-out infinite;
          }
          
          .animate-border-rotate {
            animation: border-rotate 10s linear infinite;
          }
          
          .animate-inner-glow {
            animation: inner-glow 3s ease-in-out infinite;
          }
          
          .animate-text-premium-fade {
            animation: text-premium-fade 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .animate-text-gradient-premium {
            animation: text-gradient-premium 4s linear infinite;
          }
          
          .animate-text-glow {
            animation: text-glow 3s ease-in-out infinite;
          }
          
          .animate-underline-premium {
            animation: underline-premium 2.5s ease-in-out infinite;
          }
          
          .animate-text-slide-premium {
            animation: text-slide-premium 1s ease-out 0.5s both;
          }
          
          .animate-dot-1 {
            animation: dot-1 1.5s ease-in-out infinite;
          }
          
          .animate-dot-2 {
            animation: dot-2 1.5s ease-in-out infinite 0.2s;
          }
          
          .animate-dot-3 {
            animation: dot-3 1.5s ease-in-out infinite 0.4s;
          }
          
          .animate-shimmer-premium-1 {
            animation: shimmer-premium-1 1.2s infinite;
          }
          
          .animate-shimmer-premium-2 {
            animation: shimmer-premium-2 1.8s infinite;
          }
          
          .animate-glow-premium {
            animation: glow-premium 2.5s ease-in-out infinite;
          }
          
          .animate-sparkle {
            animation: sparkle 2s ease-in-out infinite;
          }
          
          .animate-particle {
            animation: particle linear infinite;
          }
          
          .animate-indicator-1 {
            animation: indicator-1 5s ease-out;
          }
          
          .animate-indicator-2 {
            animation: indicator-2 5s ease-out;
          }
          
          .animate-indicator-3 {
            animation: indicator-3 5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#B99066] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B99066]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#253F60]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-2xl relative w-28 h-28 flex items-center justify-center">
              {!logoError ? (
                <img 
                  src="/images/azalee-patrimoine3.webp" 
                  alt="Azalée Patrimoine Logo" 
                  className="max-w-full max-h-full object-contain"
                  onError={() => setLogoError(true)}
                  onLoad={() => setLogoError(false)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex flex-col items-center justify-center text-white font-cairo font-bold shadow-inner">
                  <span className="text-4xl leading-none mb-1">A</span>
                  <span className="text-[10px] leading-tight tracking-wider">AZALÉE</span>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-cairo font-bold text-white mb-2">
            Connexion Admin
          </h1>
          <p className="text-gray-200 font-inter text-sm">
            Accédez au tableau de bord Azalée Patrimoine
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-white/20 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-[#253F60] transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Entrez votre adresse email"
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-cairo font-semibold text-[#253F60] mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-[#253F60] transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-cairo font-bold rounded-xl text-white bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#253F60] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Se connecter
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-200 font-inter">
            © {new Date().getFullYear()} Azalée Patrimoine. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}


