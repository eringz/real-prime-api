import {
    registerUser,
    loginUser,
    loginWithGoogleIdToken,
} from '../services/auth.js';
import {
    setAuthCookies,
    clearAuthCookies,
    findValidRefreshToken,
    generateAccessToken,
    generateRawRefreshToken,
    persistRefreshToken,
    revokeRefreshToken,
} from '../services/token.js';
import prisma from '../utils/prisma.js';

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({message: 'Registered', user: {id: user.id, email: user.email}});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const meta = {ip: req.ip, userAgent: req.get('user-agent')};
        const {user, accessToken, refreshToken} = await loginUser(req.body);
        setAuthCookies(res, accessToken, refreshToken);
        res.json({
            accessToken,
            user: {id: user.id, email: user.email, role: user.role},
        });
    } catch (err) {
        res.status(401).json({message: err.message});
    }
};

const refresh = async (req, res) => {
    try {
        const rt = req.cookies?.rt;
        if (!rt) return res.status(401).json({message: 'No refresh token'});

        // find & rotate
        const record = await findValidRefreshToken(rt);
        if (!record) return res.status(401).json({message: 'Invalid refresh token'});

        const user = record.user;
        // rotate: revoke old, issue new
        await revokeRefreshToken(rt);
        const newRt = generateRawRefreshToken();
        await persistRefreshToken(user.id, newRt);

        const newAt = generateAccessToken(user);
        setAuthCookies(res, newAt, newRt);

        res.json({accessToken: newAt, user: {id: user.id, email: user.email, role: user.role}});
    } catch (err) {
        res.status(401).json({message: err.message});
    }
};

export const logout = async (req, res) => {
    try {
        const rt = req.cookies?.rt;
        if (rt) await revokeRefreshToken(rt);
        clearAuthCookies(res);
        res.json({message: 'Logged out'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const googleLogin = async (req, res) => {
    try {
        const {idToken} = req.body; // Frontend provides ID token
        const {user, accessToken, refreshToken} = await loginWithGoogleIdToken({idToken});
        setAuthCookies(res, accessToken, refreshToken);
        res.json({
            accessToken,
            user: {id: user.id, email: user.email, role: user.role},
        });
    } catch (err) {
        res.status(401).json({message: err.message});
    }
};

