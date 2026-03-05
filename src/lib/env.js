/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

/**
 * Validate all required environment variables
 * @throws {Error} If required variables are missing or invalid
 */
export function validateEnv() {
  const errors = [];
  
  // Required variables
  const required = [
    'JWT_SECRET',
    'MONGODB_URI',
    'NEXT_PUBLIC_APP_URL',
  ];
  
  // Check for missing variables
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    errors.push(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate JWT_SECRET
  if (process.env.JWT_SECRET) {
    const insecureDefaults = [
      'your-secret-key-change-in-production',
      'your_jwt_secret_key_here_change_in_production',
      'change-this',
      'secret',
    ];
    
    if (insecureDefaults.some(val => process.env.JWT_SECRET.toLowerCase().includes(val))) {
      errors.push('JWT_SECRET is using a default/insecure value');
    }
    
    if (process.env.JWT_SECRET.length < 32 && process.env.NODE_ENV === 'production') {
      errors.push('JWT_SECRET should be at least 32 characters in production');
    }
  }
  
  // Validate MONGODB_URI
  if (process.env.MONGODB_URI) {
    if (!process.env.MONGODB_URI.startsWith('mongodb://') && 
        !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
      errors.push('MONGODB_URI must be a valid MongoDB connection string');
    }
  }
  
  // Validate NODE_ENV
  const validEnvs = ['development', 'production', 'test'];
  if (process.env.NODE_ENV && !validEnvs.includes(process.env.NODE_ENV)) {
    errors.push(`NODE_ENV must be one of: ${validEnvs.join(', ')}`);
  }
  
  // Log results
  if (errors.length > 0) {
    console.error('❌ Environment validation failed:');
    errors.forEach(error => console.error(`   - ${error}`));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Environment validation failed. Cannot start in production mode.');
    } else {
      console.warn('⚠️  Continuing in development mode, but please fix these issues before deploying.');
    }
  } else {
    console.log('✅ Environment variables validated successfully');
  }
}

/**
 * Get environment info for logging (sanitized)
 */
export function getEnvInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    hasJWTSecret: !!process.env.JWT_SECRET,
    hasMongoURI: !!process.env.MONGODB_URI,
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'not set',
  };
}

