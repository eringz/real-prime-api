import jwt from 'jsonwebtoken';
import {ENV} from '../config/env.js';

export const authMiddleware = (req, res, next) => {
    console.log(`headers: ${req.headers.authorization}`);
    const hdr = req.headers.authorization || '';
    const parts = hdr.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({message: 'Missing or invalid Authorization header'}); 

    try {
        const payload = jwt.verify(parts[1], ENV.JWT_ACCESS_SECRET);
        req.user = {id: payload.sub, email: payload.email, role: payload.role};
        next();
    } catch {
        return res.status(401).json({message: 'Invalid or expired token'});
    }
};
