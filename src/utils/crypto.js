import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {ENV} from '../config/env.js';

export const hashPassword = password => bcrypt.hash(password, parseInt(ENV.BCRYPT_ROUNDS || '12'));
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

// for refresh token hashing
export const hashToken = async token => crypto.createHash('sha256').update(token).digest('hex');
