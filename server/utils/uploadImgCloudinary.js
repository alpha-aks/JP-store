import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath, override: true });

const uploadImgCloudinary = async (image, folderPath) => {
    dotenv.config({ path: envPath, override: true });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    console.log("Cloudinary upload using cloud_name:", cloudName);

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });

    if (!cloudName || !apiKey || !apiSecret) {
        console.error("Missing Cloudinary configuration in .env!");
        throw new Error("Missing Cloudinary configuration. Please verify your server/.env file.");
    }

    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: `binkeyit/${folderPath || 'general'}` }, 
            (error, uploadResult) => {
                if (error) {
                    console.error("Cloudinary upload_stream error:", error);
                    return reject(error);
                }
                resolve(uploadResult);
            }
        ).end(buffer);
    });

    return uploadImage;
};

export default uploadImgCloudinary;
