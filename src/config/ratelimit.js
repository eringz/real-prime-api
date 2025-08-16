import ratelimit from 'express-rate-limit';

export const loginLimiter = rateLimeit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts. Try again later',
});