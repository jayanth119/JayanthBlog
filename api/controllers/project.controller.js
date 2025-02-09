import project from "../models/project.model";
import { errorHandler } from '../utils/error.js';
// createProject,
// deleteProject,
// editProject,
// getProjects,
// {
//     title: "AI Image Generator",
//     bodyText: "A project that generates images using OpenAI's DALL·E model.",
//     image: "https://source.unsplash.com/400x250/?ai,technology",
//     links: [
//       { text: "GitHub", href: "https://github.com/your-repo" },
//       { text: "Live Demo", href: "https://yourproject.com" },
//     ],
//     tags: ["AI", "Machine Learning", "DALL·E"],
//   }

export const createProject = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a project'));
    }
    if (!req.body.title || !req.body.bodyText || !req.body.image || !req.body.links) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const newProject = new project({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        next(error);
    }
}

export const deleteProject = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to delete a project'));
    }
    try {
        await project.findByIdAndDelete(req.params.projectId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const editProject = async (req , res , next )=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403 , 'You are not allowed to delete a project')); 
    }
    try{
            const updateProject = await project.findByIdAndUpdate(req.params.projectId);
            if(!updateProject){
                return next(errorHandler(404 , 'Project not found '));
            }
            res.status(200).json(updateProject); 
    }
    catch (error){
        next(error); 
    }

}

export const getProjects = async (req , res , next)=>{
    try{
        const projects = await project.find(); 
        res.status(200 ).json(projects);
    }
    catch(error){
        next(error );  
    }
}