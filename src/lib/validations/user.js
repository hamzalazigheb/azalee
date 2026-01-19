/**
 * User validation schemas
 */

import { z } from 'zod';

/**
 * Password validation regex
 * Requires: 1 uppercase, 1 lowercase, 1 number, 1 special char
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

/**
 * User creation schema
 */
export const createUserSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .max(255, 'Email trop long')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
    .max(128, 'Le mot de passe est trop long')
    .regex(passwordRegex, 
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)'
    ),
  
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim(),
  
  role: z.enum(['admin', 'editor', 'viewer'])
    .default('admin'),
});

/**
 * User update schema (all fields optional except ID)
 */
export const updateUserSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .max(255, 'Email trop long')
    .toLowerCase()
    .trim()
    .optional(),
  
  password: z.string()
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
    .max(128, 'Le mot de passe est trop long')
    .regex(passwordRegex, 
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)'
    )
    .optional(),
  
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim()
    .optional(),
  
  role: z.enum(['admin', 'editor', 'viewer'])
    .optional(),
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: z.string()
    .email('Email invalide')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(1, 'Le mot de passe est requis'),
});

/**
 * Change password schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Le mot de passe actuel est requis'),
  
  newPassword: z.string()
    .min(12, 'Le nouveau mot de passe doit contenir au moins 12 caractères')
    .max(128, 'Le mot de passe est trop long')
    .regex(passwordRegex, 
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)'
    ),
});

/**
 * Validate user creation data
 */
export function validateUserCreation(data) {
  const result = createUserSchema.safeParse(data);
  
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

/**
 * Validate user update data
 */
export function validateUserUpdate(data) {
  const result = updateUserSchema.safeParse(data);
  
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

