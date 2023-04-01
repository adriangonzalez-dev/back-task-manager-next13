import bcrypt from 'bcryptjs';

export const EncryptPassword = (password:string) => {
    return bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS));
}

export const ComparePassword = (password:string, hash:string) => {
    return bcrypt.compareSync(password, hash);
}   