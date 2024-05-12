import crypto from 'node:crypto';
import {promisify} from 'node:util';

export const hashPassword = async (password: string) => {

    const keyLen = 64;
    const digest = 'sha512';
    const iterations = 100_000;
    const salt = crypto.randomBytes(128).toString("hex");

    const derivedKey = (await promisify(crypto.pbkdf2)(password,salt,iterations,keyLen,digest)).toString("hex");
    const hash = salt + '$' + derivedKey;

    return hash

}

export const verifyPassword = async (hash: string, password:string) => {

    const keyLen = 64;
    const digest = 'sha512';
    const iterations = 100_000;
    const [salt, hashedPassword] = hash.split('$');

    const derivedKey = (await promisify(crypto.pbkdf2)(password,salt,iterations,keyLen,digest)).toString("hex");
    
    return hashedPassword === derivedKey;
}