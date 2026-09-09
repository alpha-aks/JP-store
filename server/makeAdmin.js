import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/user.model.js";
import { hashPassword } from "./helper/passwordHashng.js";

dotenv.config();

const emailArg = process.argv[2];
const passwordArg = process.argv[3];

if (!process.env.MONGODB_URI) {
    console.error("Error: MONGODB_URI is not set in server/.env");
    process.exit(1);
}

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully.\n");

        if (!emailArg) {
            console.log("Usage to promote existing user:");
            console.log("  node makeAdmin.js <email>");
            console.log("\nUsage to create a new admin user directly:");
            console.log("  node makeAdmin.js <email> <password> [name]\n");

            const users = await UserModel.find({}, "name email role status").limit(20);
            if (users.length === 0) {
                console.log("No users found in database.");
            } else {
                console.log("Existing users in database:");
                console.table(users.map(u => ({ Name: u.name, Email: u.email, Role: u.role, Status: u.status })));
            }
            await mongoose.disconnect();
            return;
        }

        const email = emailArg.trim().toLowerCase();
        let user = await UserModel.findOne({ email });

        if (user) {
            user.role = "ADMIN";
            user.verify_email = true;
            user.status = "Active";
            if (passwordArg) {
                user.password = await hashPassword(passwordArg);
                console.log(`Password updated for ${email}.`);
            }
            await user.save();
            console.log(`User "${email}" is now an ADMIN!`);
        } else {
            if (!passwordArg) {
                console.log(`User with email "${email}" does not exist.`);
                console.log(`To create this user as an admin, run:`);
                console.log(`  node makeAdmin.js ${email} <password> [name]`);
            } else {
                const nameArg = process.argv[4] || "Admin";
                const hashedPassword = await hashPassword(passwordArg);
                user = new UserModel({
                    name: nameArg,
                    email,
                    password: hashedPassword,
                    role: "ADMIN",
                    verify_email: true,
                    status: "Active"
                });
                await user.save();
                console.log(`New ADMIN user created successfully for "${email}"!`);
            }
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("Failed:", err.message);
        process.exit(1);
    }
};

run();
