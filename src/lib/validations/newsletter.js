/**
 * Newsletter validation schemas
 */

import { z } from 'zod';

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .max(255, 'Email trop long')
    .toLowerCase()
    .trim(),
});

/**
 * Validate newsletter subscription
 */
export function validateNewsletterSubscription(data) {
  const result = newsletterSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    
    return {
      success: false,
      errors,
      message: errors[0]?.message || 'Email invalide'
    };
  }
  
  return {
    success: true,
    data: result.data
  };
}

