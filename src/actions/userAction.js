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

export async function getAllUsers() {
    try {
        // Step 1: Confirm Database Connection
        await connectDB();
        console.log("Database connected successfully");
  
        // Step 2: Fetch all users
        const users = await UserModel.find({}).lean(); // Use .lean() for plain JavaScript objects
  
        // Step 3: Check if users were fetched correctly
        console.log("Fetched users:", users);
  
        if (!users || users.length === 0) {
            console.log("No users found in the database");
            return []; // Return empty array if no users found
        }

        // Step 4: Return fetched users
        return users;
  
    } catch (error) {
        console.error("Error while getting all users:", error);
        return { errMsg: "Error fetching users", details: error.message }; // Return an error response
    }
}

export async function likeUser(userId) {
    await connectDB();
    await UserModel.findByIdAndUpdate(userId, { $inc: { profileUpvotes: 1 } });
  }
  
  // Function to unlike a user
  export async function unlikeUser(userId) {
    await connectDB();
    await UserModel.findByIdAndUpdate(userId, { $inc: { profileUpvotes: -1 } });
  }
