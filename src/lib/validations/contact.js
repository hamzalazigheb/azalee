/**
 * Contact form validation schemas
 */

import { z } from 'zod';

/**
 * Phone number validation regex (French formats)
 * Accepts: +33, 0033, 06, 07, 01-05, 09, with or without spaces/dots/dashes
 */
const phoneRegex = /^(?:(?:\+|00)33|0)[1-9](?:[\s.-]?\d{2}){4}$/;

/**
 * Contact form submission schema
 */
export const contactSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim(),
  
  email: z.string()
    .email('Email invalide')
    .max(255, 'Email trop long')
    .toLowerCase()
    .trim(),
  
  telephone: z.string()
    .regex(phoneRegex, 'Numéro de téléphone invalide')
    .trim(),
  
  ville: z.string()
    .min(2, 'La ville doit contenir au moins 2 caractères')
    .max(100, 'La ville ne peut pas dépasser 100 caractères')
    .trim(),
  
  profession: z.string()
    .max(100, 'La profession ne peut pas dépasser 100 caractères')
    .trim()
    .optional()
    .default(''),
  
  patrimoine: z.string()
    .max(50, 'Le patrimoine ne peut pas dépasser 50 caractères')
    .trim()
    .optional()
    .default(''),
  
  message: z.string()
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
    .trim()
    .optional()
    .default(''),
});

/**
 * Sanitize contact form data
 * Remove potentially harmful characters and normalize whitespace
 */
export function sanitizeContactData(data) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Remove null bytes, control characters except newlines/tabs
      let clean = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
      // Normalize whitespace
      clean = clean.replace(/\s+/g, ' ').trim();
      sanitized[key] = clean;
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize contact form submission
 */
export function validateContactSubmission(data) {
  // First sanitize
  const sanitized = sanitizeContactData(data);
  
  // Then validate with Zod
  const result = contactSchema.safeParse(sanitized);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return {
      success: false,
      errors,
      message: errors[0]?.message || 'Données invalides'
    };
  }
  
  return {
    success: true,
    data: result.data
  };
}

