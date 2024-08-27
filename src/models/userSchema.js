import mongoose, { model, models } from "mongoose";
import { projectSchema } from "./projectSchema";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String},
    password: { type: String },
    location: { type: String },
    bio: { type: String },
    profilePicture: { type: String },
    resumeLink: { type: String },
    projects: { type: [projectSchema], default: [] },
    githubId: { type: String },
    instagramId: { type: String },
    youtubeId: { type: String },
    linkedinId: { type: String },
    twitterId: { type: String },
    productHuntId: { type: String },
    subscriptions: {
        type: [String],
        enum: ['basic', 'premium'],
        default: 'basic'
    },
    profileUpvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const UserModel = models.user || model('user', userSchema);

export default UserModel;
