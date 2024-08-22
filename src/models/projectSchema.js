import mongoose from "mongoose";

export const projectSchema = new mongoose.Schema({
    projectName: {type: String, required:true},
    projectDescription: {type: String, required:true},
    projectTechStack: {type: String, required:true},
    projectImage: {type: String},
    projectRepository: {type: String},
    projectLink: {type: String}
})

