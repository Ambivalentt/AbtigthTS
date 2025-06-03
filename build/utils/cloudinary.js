"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clodinary_1 = __importDefault(require("../config/clodinary"));
const stream_1 = require("stream");
const uploadToCloudinary = (fileBuffer, folder = 'users') => {
    const results = new Promise((resolve, reject) => {
        const stream = clodinary_1.default.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error('No se recibió resultado de Cloudinary'));
            resolve(result.secure_url); // Te devuelve el enlace
        });
        stream_1.Readable.from(fileBuffer).pipe(stream);
    });
    return results;
};
exports.default = uploadToCloudinary;
