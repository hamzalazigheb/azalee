/**
 * Rate limiting configuration for API routes
 * Protects against brute force attacks and abuse
 */

import rateLimit from 'next-rate-limit';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Rate limiter for login endpoints
 * Development: 50 attempts per minute
 * Production: 5 attempts per 15 minutes per IP
 */
export const loginLimiter = rateLimit({
  interval: isDevelopment ? 60 * 1000 : 15 * 60 * 1000,
  uniqueTokenPerInterval: 500,
  limit: isDevelopment ? 50 : 5,
});

/**
 * Rate limiter for contact form submissions
 * Development: 100 per hour
 * Production: 10 submissions per hour per IP
 */
export const contactLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
  limit: isDevelopment ? 100 : 10,
});

/**
 * Rate limiter for newsletter signups
 * Development: 100 per hour
 * Production: 5 signups per hour per IP
 */
export const newsletterLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
  limit: isDevelopment ? 100 : 5,
});

/**
 * General API rate limiter
 * 60 requests per minute per IP
 */
export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  limit: 60,
});

/**
 * Strict rate limiter for sensitive operations
 * 3 attempts per 10 minutes
 */
export const strictLimiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 500,
  limit: 3,
});

/**
 * Get unique identifier for rate limiting (IP address)
 * @param {Request} request - Next.js request object
 * @returns {string} Client IP address or 'unknown'
 */
export function getClientIdentifier(request) {
  // Try to get real IP from headers (for proxied requests)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  // Try X-Real-IP header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback to request IP or unknown
  return request.ip || 'unknown';
}

/**
 * Apply rate limiter to a request with IP-based identification
 * @param {Request} request - Next.js request object
 * @param {Object} limiter - Rate limiter instance
 * @param {string} prefix - Prefix for the rate limit key (e.g., 'login', 'contact')
 * @returns {Promise<{limited: boolean, identifier?: string}>}
 */
export async function applyRateLimit(request, limiter, prefix = 'api') {
  const identifier = getClientIdentifier(request);
  const token = `${prefix}_${identifier}`;
  
  try {
    await limiter.check(request, 10, token);
    return { limited: false, identifier };
  } catch (error) {
    if (isDevelopment) {
      console.log(`Rate limit exceeded for ${token}`);
    }
    return { 
      limited: true,
      identifier,
      message: 'Too many requests. Please try again later.',
      retryAfter: error.reset || Date.now() + 60000
    };
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use applyRateLimit instead
 */
export async function checkRateLimit(request, limiter) {
  return applyRateLimit(request, limiter, 'cache');
}

