import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath, override: true });

const deleteImgCloudinary = async (imageUrl, folderPath) => {
    dotenv.config({ path: envPath, override: true });

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!imageUrl) {
            throw new Error("No image URL provided for deletion.");
        }

        // Extract the public ID from the image URL
        const publicId = imageUrl.split('/').slice(-1)[0].split('.')[0]; // Extract ID from URL

        const result = await cloudinary.uploader.destroy(`binkeyit/${folderPath || 'general'}/${publicId}`);
        // console.log("Cloudinary delete result:", result);

        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};

export default deleteImgCloudinary

