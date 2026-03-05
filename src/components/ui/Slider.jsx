'use client';
import React from 'react';
import Button from './Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    image: '/images/azalee-patrimoine-img-vector-1.webp',
    title: "VOTRE PARTENAIRE DE CONFIANCE EN MATIÈRE DE GESTION DE PATRIMOINE, DE FISCALITÉ ET DE CONSEIL EN INVESTISSEMENT.",
    description: (
      <>
        Explorez des conseils personnalisés en matière de fiscalité, d'immobilier, d'investissements, de retraite et <span className="bg-[#4ebbbd] text-white px-2 py-0.5 rounded-md">de gestion de patrimoine.</span>
      </>
    ),
  },
  {
    image: '/images/img_image_1221.png',
    title: "Optimisez votre fiscalité et développez votre patrimoine.",
    description: "Nos experts vous accompagnent à chaque étape pour maximiser vos investissements et sécuriser votre avenir.",
    quoteIcon: '/images/azalee-patrimoine-img-vector.svg',
  },
  {
    image: '/images/img_image_1222.png',
    title: "Des solutions sur-mesure pour chaque projet immobilier.",
    description: "Bénéficiez d'un accompagnement personnalisé pour réussir vos investissements immobiliers et financiers.",
    quoteIcon: '/images/azalee-patrimoine-img-vector.svg',
  },
  {
    image: '/images/new_uploaded_image.jpg', // Make sure to place the image in the public/images folder with this name
    title: '',
    description: '',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = slides.length;

  const goToSlide = (idx) => setCurrentSlide(idx);
  const goToPrev = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full flex" style={{ height: '412px' }}>
      {/* Left: Blue Diagonal with Content */}
      <div
        style={{
          flex: '0 0 60%',
          height: '100%',
          background: '#253F60',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '92px',
          paddingRight: '40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          style={{
            position: 'absolute',
            left: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            zIndex: 30,
            padding: 0,
          }}
          aria-label="Previous slide"
        >
          <FaChevronLeft style={{ width: '32px', height: '32px', color: '#fff' }} />
        </button>
        {/* Title */}
        <h1 style={{
          fontFamily: 'Cairo, sans-serif',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '40px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          marginBottom: '16px',
          maxWidth: '628px',
        }}>
          {slides[currentSlide].title}
        </h1>
        {/* Subtitle */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '26px',
          color: '#FFFFFF',
          marginBottom: '32px',
          maxWidth: '614px',
        }}>
          Explorez des conseils personnalisés en matière de fiscalité, d'immobilier, d'investissements, de retraite et{' '}
          <span style={{
            background: '#4EBBBD',
            borderRadius: '6px',
            color: '#fff',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '26px',
            padding: '2px 12px',
            display: 'inline-block',
          }}>
            de gestion de patrimoine.
          </span>
        </p>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
          <button style={{
            width: '270px',
            height: '42px',
            background: '#B99066',
            boxShadow: '0px 0px 4px rgba(139, 139, 139, 0.25), 0px 2px 8px rgba(182, 182, 182, 0.25)',
            borderRadius: '22.5px',
            border: 'none',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '12px',
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            Obtenez Votre Consultation Personnalisée
          </button>
          <button style={{
            width: '218px',
            height: '42px',
            background: 'transparent',
            border: '1px solid #FFFFFF',
            borderRadius: '22.5px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '12px',
            textTransform: 'capitalize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            Commencez À Explorer Les Sujets
          </button>
        </div>
        {/* Pager Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '0', marginTop: '0' }}>
          {[...Array(10)].map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '15px',
                height: '15px',
                background: idx === 1 ? '#B99066' : '#FFFFFF',
                border: '2px solid #FFFFFF',
                boxShadow: '0px 0px 5px rgba(0,0,0,0.25)',
                borderRadius: '7.5px',
                position: 'relative',
              }}
            />
          ))}
        </div>
      </div>
      {/* Right: Image */}
      <div style={{ flex: '1 1 40%', height: '100%', position: 'relative', zIndex: 1 }}>
        <img
          src={slides[currentSlide].image}
          alt="Slide visual"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        />
        {/* Right Arrow */}
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            zIndex: 30,
            padding: 0,
          }}
          aria-label="Next slide"
        >
          <FaChevronRight style={{ width: '32px', height: '32px', color: '#fff' }} />
        </button>
      </div>
    </div>
  );
};

export default Slider;