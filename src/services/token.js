import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ENV }  from '../config/env.js';
import prisma from '../utils/prisma.js';
import { hashToken } from '../utils/crypto.js';

export const generateAccessToken = user => jwt.sign({sub: user.id, email: user.email, role: user.role}, ENV.JWT_ACCESS_SECRET, {expiresIn: ENV.ACCESS_TTL});
export const generateRefreshToken = () => crypto.randomBytes(64).toString('hex');

export const persistRefreshToken = async (userId, rawToken, meta = {}) => {
    const tokenHash = await hashToken(rawToken);
    const expiresAt = new Date(Date.now() + parseTtlMs(ENV.REFRESH_TTL));

    return prisma.refreshToken.create({ 
        data: {
            tokenHash, 
            userId,
            userAgent: meta.userAgent,
            ip: meta.ip,
            expiresAt
        },
    });
};

export const revokeRefreshToken = async (rawToken) => {
    const tokenHash = await hashToken(rawToken);
    await prisma.refreshToken.updateMany({
        where: {tokenHash, revokedAt: null},
        data: {revokedAt: new Date()},
    });
};

export const findValidRefreshToken = async (rawToken) => {
    const tokenHash = await hashToken(rawToken);
    return  prisma.refreshToken.findFirst({
        where: {tokenHash, revokedAt: null, expiresAt: {gt: new Date()}},
        include: {user: true}
    });
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie('rt', refreshToken, {
        httpOnly: true,
        secure: ENV.COOKIE_SECURE,
        samesite: ENV.COOKIE_SAMESITE,
        domain: ENV.COOKIE_DOMAIN || undefined,
        path: '/',
        maxAge: parseTtlMs(ENV.REFRESH_TTL),
    }); 
    // ACCESS TOKEN GOES IN RESPONSE BODY; CLIENT STORES IN MEMORY AND SENDS VIA AUTHORIZATION HEADER
};

export const clearAuthCookies = res => {
    res.clearCookie('rt', {
        httpOnly: true,
        secure: ENV.COOKIE_SECURE,
        samesite: ENV.COOKIE_SAMESITE,
        domain: ENV.COOKIE_DOMAIN || undefined,
        path: '/',
    });
}

// helpers
function parseTtlMs (ttl) {
    // supports '14d', '15m', '1h'
    const m = ttl.match(/^(\d+)([smhd])$/i);

    if (!m) return 0;
    const n = Number(m[1]);
    const unit = m[2].toLowerCase();
    const mult = {s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000}[unit];
    return n * mult;
    
}