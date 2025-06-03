import cloudinary from '../config/clodinary';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';


const uploadToCloudinary = (fileBuffer: Buffer, folder: string = 'users'):Promise<string> => {

    const results:Promise<string> = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result: UploadApiResponse | undefined) => {
                if (error) return reject(error);
                if (!result) return reject(new Error('No se recibió resultado de Cloudinary'));
                resolve(result.secure_url); // Te devuelve el enlace
            }
        );
        Readable.from(fileBuffer).pipe(stream);
    });
    return results
};

export default uploadToCloudinary;