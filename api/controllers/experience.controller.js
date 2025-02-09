import Experience from "../models/experience.model";
import { errorHandler } from '../utils/error';

// createExperience,
// deleteExperience,
// editExperience,
// getExperiences,
// {
//     title: "AI Engineer Onsite",
//     company: "Parabola9",
//     date: "Dec 2024 - Present",
//     description: [
//       "Designed and optimized machine learning models using TensorFlow and PyTorch.",
//       "Conducted data preprocessing, feature engineering, and hyper-parameter tuning.",
//       "Deployed AI solutions into production ensuring scalability and integration.",
//       "Explored cutting-edge AI technologies like NLP and computer vision."
//     ],
//     tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
//   }
export const createExperience = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create an experience'));
    }
    if (!req.body.title || !req.body.company || !req.body.date || !req.body.description || !req.body.tags) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const newExperience = new Experience({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (error) {
        next(error);
    }
}

export const deleteExperience = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to delete an experience'));
    }
    try {
        await Experience.findByIdAndDelete(req.params.experienceId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const editExperience = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to edit an experience'));
    }
    try {
        const updatedExperience = await Experience.findByIdAndUpdate(req.params.experienceId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedExperience) {
            return next(errorHandler(404, 'Experience not found'));
        }
        res.status(200).json(updatedExperience);
    } catch (error) {
        next(error);
    }
}

export const getExperiences = async (req, res, next) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        next(error);
    }
}
