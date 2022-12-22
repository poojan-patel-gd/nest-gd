import * as bcrypt from 'bcrypt';

export function enCodePassword(rawPassword:string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
}