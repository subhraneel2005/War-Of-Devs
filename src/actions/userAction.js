'use server'

import UserModel from "@/models/userSchema";
import connectDB from "@/connection/db";

export async function getUserByEmail(email) {
    try {
        await connectDB();
        const user = await UserModel.findOne({ email }).lean(); // Use .lean() to return plain JavaScript objects
        return user ? user : null;
    } catch (error) {
        return { errMsg: error.message };
    }
}

export async function postNewUser(userData) {
    try {
        await connectDB();
        const newUser = new UserModel(userData);
        await newUser.save();
        return { msg: 'User created successfully' };
    } catch (error) {
        return { errMsg: error.message };
    }
}
