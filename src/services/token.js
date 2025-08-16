import jwt from 'jsonwebtoken';
import { ENV }  from '../config/env.js';

export const generateAccessToken = user => jwt.sign({sub: user.id, email: user.email, role: user.role}, ENV.JWT_ACCESS_SECRET, {expiresIn: ENV.ACCESS_TTL});
export const generateRefreshToken = user => jwt.sign({sub: user.id}, ENV.JWT_REFRESH_SECRET, {expiresIn: ENV.REFRESH_TTL});