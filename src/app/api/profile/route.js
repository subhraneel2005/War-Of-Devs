import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/userSchema";

export async function POST(request) {
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to database");

        // Parse the request body
        const data = await request.json();

        // Create a new user instance
        const user = new User(data);

        // Save the user to the database
        const savedUser = await user.save();
        
        return NextResponse.json({ message: "Profile created successfully", data: savedUser });
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json({ message: "Error creating profile", error: error.message }, { status: 500 });
    } finally {
        // Ensure the database connection is closed after the operation
        await mongoose.disconnect();
    }
}
