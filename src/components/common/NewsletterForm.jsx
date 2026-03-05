'use client';

import React, { useState } from 'react';
import CTAButton from '@/components/ui/CTAButton';

export default function NewsletterForm({ className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setStatus('error');
      setMessage('Veuillez entrer votre adresse email');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Veuillez entrer une adresse email valide');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter.');
        setEmail(''); // Reset form
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== 'idle') {
                setStatus('idle');
                setMessage('');
              }
            }}
            placeholder="Votre adresse email"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#B99066] focus:outline-none focus:ring-2 focus:ring-[#B99066] focus:ring-offset-2 transition-all text-base font-inter"
            disabled={status === 'loading'}
            required
          />
        </div>
        <CTAButton
          type="submit"
          variant="outline"
          className="whitespace-nowrap"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Inscription...' : "S'inscrire"}
        </CTAButton>
      </form>

      {/* Status Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm font-inter ${
            status === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : status === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : ''
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

