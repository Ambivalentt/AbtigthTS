import DBuser from '../models/User';
import { UserType } from '../types/index';
import bcrypt from 'bcryptjs';
import Validate from './validate';
import handleError from '../utils/errorHandler';
class UserRepo {
    static async create({ username, full_name, email, password, birthdate, bio, avatar_url }: Omit<UserType, '_id' | 'created_at'>) {
        try {
            Validate.email(email);
            Validate.string(username, 'Username');
            Validate.string(password, 'Contraseña');
            Validate.string(full_name, 'Nombre completo');
            const checkUser = await DBuser.findOne({ username });
            if (checkUser) throw new Error('Ya existe un usuario con ese username');

            const checkEmail = await DBuser.findOne({ email });
            if (checkEmail) throw new Error('Este email ya ha sido registrado');

            const pwhashed = await bcrypt.hash(password, 10)
            const newUser = new DBuser({
                username,
                full_name,
                email,
                password: pwhashed,
                bio,
                avatar_url: avatar_url === '' ? undefined : avatar_url,
                birthdate
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw handleError(error);
        }
    }
    static async login({ username, password }: { username: string; password: string }) {

        try {
            Validate.string(username, 'Username');
            Validate.string(password, 'Contraseña');
            const checkUsername = await DBuser.findOne({ username });
            if (!checkUsername) throw new Error('Usuario no encontrando');
            const isMatch = await bcrypt.compare(password, checkUsername.password);
            if (!isMatch) throw new Error('Contraseña incorrecta');
            const userDtails: Omit<UserType, 'password'> = {
                _id: checkUsername._id,
                username: checkUsername.username,
                full_name: checkUsername.full_name,
                email: checkUsername.email,
                bio: checkUsername.bio,
                avatar_url: checkUsername.avatar_url,
                birthdate: checkUsername.birthdate,
                created_at: checkUsername.created_at
            }
            return userDtails
        } catch (error) {
            throw handleError(error);
        }
    }
    static async findByUsername(username: string) {
        try {
            Validate.string(username, 'Username');
            const user = await DBuser.findOne({ username });
            if (!user) throw new Error('Usuario no encontrado');
            const userDetails: Omit<UserType, 'password'> = {
                _id: user._id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                bio: user.bio,
                avatar_url: user.avatar_url,
                birthdate: user.birthdate,
                created_at: user.created_at
            }
            return userDetails;
        } catch (error) {
            throw handleError(error);
        }
    }
}

export default UserRepo;