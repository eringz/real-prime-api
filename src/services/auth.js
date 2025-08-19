// 2.2 services/auth.js (includes Google Sign-in by ID token)
import prisma from '../utils/prisma.js';
import { comparePassword, hashPassword} from '../utils/crypto.js';
import { OAuth2Client } from 'google-auth-library'; // this should be checked and verified to our frontend if working
import {
    generateAccessToken,
    generateRawRefreshToken,
    persistRefreshToken,
} from './token.js';
import { ENV } from '../config/env.js';

const googleClient = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

export const registerUser = async ({name, email, password, role}) => {
    const exists = await prisma.user.findUnique({where: email});
    if (exists) throw new Error('Email already exists');

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: {name, email, password: hashed, role: role || 'buyer'},
    });
    return user;
}

export const loginUser = async ({email, password}) => {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) throw new Error('Invalid credentials');

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken(user);
    const refreshToken = generaterawRefreshToken();
    await persistRefreshToken(user.id, refreshToken);
    return {user, accessToken, refreshToken};

};

// Should POST { idToken } from Google One Tap / Sign-in
export const loginWithGoogleIdToken = async ({idToken}) => {
    const ticket = await googleClient.verifyIdtoken({
        idToken,
        audience: ENV.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name || payload.email.split('@')[0];

    let user = await prisma.userfindUnique({where: {email}});

    if (!user) {
        // auto-provision account
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: await hashPassword(cryptoRandom()), // placeholder
                role: 'buyer',
            },
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRawRefreshToken();
    await persistRefreshToken(user.id, refreshToken);
    return {user, accessToken, refreshToken};

};

function cryptoRandom () {
    return Math.random().toString(36).slice(2) + Date.now();
}


