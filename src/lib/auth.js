/**
 * Authentication utilities
 * Centralized JWT secret management
 */

/**
 * Get JWT secret with validation
 * @throws {Error} If JWT_SECRET is not set or is using default value
 * @returns {string} JWT secret
 */
export function getJWTSecret() {
  const secret = process.env.JWT_SECRET;
  
  // Check if JWT_SECRET is not set
  if (!secret) {
    throw new Error(
      'SECURITY ERROR: JWT_SECRET environment variable is required for production. ' +
      'Please set a strong, random secret in your .env.production file.'
    );
  }
  
  // Check if using default/placeholder value
  const insecureDefaults = [
    'your-secret-key-change-in-production',
    'your_jwt_secret_key_here_change_in_production',
    'change-this',
    'secret',
    'jwt-secret',
  ];
  
  if (insecureDefaults.some(defaultVal => secret.toLowerCase().includes(defaultVal))) {
    throw new Error(
      'SECURITY ERROR: JWT_SECRET is using a default/insecure value. ' +
      'Please generate a strong random secret (at least 32 characters).'
    );
  }
  
  // Warn if secret is too short (but still allow it in development)
  if (secret.length < 32 && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  WARNING: JWT_SECRET should be at least 32 characters for security');
  }
  
  return secret;
}

/**
 * Verify JWT secret is properly configured
 * Call this at app startup
 */
export function verifyJWTConfig() {
  try {
    getJWTSecret();
    console.log('✅ JWT_SECRET is properly configured');
    return true;
  } catch (error) {
    console.error('❌', error.message);
    if (process.env.NODE_ENV === 'production') {
      // Fail fast in production
      process.exit(1);
    }
    return false;
  }
}

