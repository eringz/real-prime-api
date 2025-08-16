import bcrypt from 'bcrypt';
import {ENV} from '../config/env.js';

export const hashPassword = password => bcrypt.hash(password, parseInt(ENV.BCRYPT_ROUNDS));
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);