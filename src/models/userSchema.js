import mongoose from "mongoose";
import { projectSchema } from "./projectSchema";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {type: String, required: true},
    bio: {type: String, required: true},
    profilePicture: {type: String},
    resumeLink: {type: String},
    projects : {type: [projectSchema], default:[]},
    githubId: { type: String },  
    instagramId: { type: String },
    youtubeId: {type: String},
    linkedInId: { type: String },
    twitterId: { type: String },
    productHuntId: { type: String },
    subscriptions: { 
      type: [String], 
      enum: ['basic', 'premium'], 
      default: 'basic' 
    },
    profileUpvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema);

module.exports = User;