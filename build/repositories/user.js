"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validate_1 = __importDefault(require("./validate"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
class UserRepo {
    static async create({ username, full_name, email, password, birthdate, bio, avatar_url }) {
        try {
            validate_1.default.email(email);
            validate_1.default.string(username, 'Username');
            validate_1.default.string(password, 'Contraseña');
            validate_1.default.string(full_name, 'Nombre completo');
            const checkUser = await User_1.default.findOne({ username });
            if (checkUser)
                throw new Error('Ya existe un usuario con ese username');
            const checkEmail = await User_1.default.findOne({ email });
            if (checkEmail)
                throw new Error('Este email ya ha sido registrado');
            const pwhashed = await bcryptjs_1.default.hash(password, 10);
            const newUser = new User_1.default({
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
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    static async login({ username, password }) {
        try {
            validate_1.default.string(username, 'Username');
            validate_1.default.string(password, 'Contraseña');
            const checkUsername = await User_1.default.findOne({ username });
            if (!checkUsername)
                throw new Error('Usuario no encontrando');
            const isMatch = await bcryptjs_1.default.compare(password, checkUsername.password);
            if (!isMatch)
                throw new Error('Contraseña incorrecta');
            const userDtails = {
                _id: checkUsername._id,
                username: checkUsername.username,
                full_name: checkUsername.full_name,
                email: checkUsername.email,
                bio: checkUsername.bio,
                avatar_url: checkUsername.avatar_url,
                birthdate: checkUsername.birthdate,
                created_at: checkUsername.created_at
            };
            return userDtails;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
    static async findByUsername(username) {
        try {
            validate_1.default.string(username, 'Username');
            const user = await User_1.default.findOne({ username });
            if (!user)
                throw new Error('Usuario no encontrado');
            const userDetails = {
                _id: user._id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                bio: user.bio,
                avatar_url: user.avatar_url,
                birthdate: user.birthdate,
                created_at: user.created_at
            };
            return userDetails;
        }
        catch (error) {
            throw (0, errorHandler_1.default)(error);
        }
    }
}
exports.default = UserRepo;
