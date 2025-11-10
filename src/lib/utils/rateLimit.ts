/**
 * Simple in-memory rate limiter based on IP address
 * Limits requests per IP to prevent spam and abuse
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - IP address to check
 * @returns Object with allowed status and remaining time
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingTime?: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry) {
    // First request from this IP
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (entry.resetTime < now) {
    // Window expired, reset
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return {
      allowed: false,
      remainingTime: Math.ceil((entry.resetTime - now) / 1000), // seconds
    };
  }

  // Increment count
  entry.count += 1;
  return { allowed: true };
}

/**
 * Get client IP address from request
 * Handles Next.js request headers for IP detection
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (handles proxies, load balancers, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',');
    return ips[0]?.trim() || 'unknown';
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  return 'unknown';
}

