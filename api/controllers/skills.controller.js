import Skills  from "../models/skills.model.js";
import { errorHandler } from "../utils/error.js";
// createSkill,
// deleteSkill,
// editSkill,
// getSkills,
// {
//     "title": "Frontend Development",
//     "items": [
//       { "title": "React", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
//       { "title": "Next.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
//     ]
//   }

export const createSkill = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to create an Skills'));
    // }
    if (!req.body.title || !req.body.items) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const newSkills = new Skills({
        ...req.body,
        
    });
    try {
        const savedSkills = await newSkills.save();
        res.status(201).json(savedSkills);
    } catch (error) {
        next(error);
    }
}

export const deleteSkills = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to delete an Skills'));
    // }
    try {
        await Skills.findByIdAndDelete(req.params.SkillsId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const editSkills = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to edit an Skills'));
    // }
    try {
        const updatedSkills = await Skills.findByIdAndUpdate(req.params.SkillsId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedSkills) {
            return next(errorHandler(404, 'Skills not found'));
        }
        res.status(200).json(updatedSkills);
    } catch (error) {
        next(error);
    }
}

export const getSkills = async (req, res, next) => {
    try {
        const Skillss = await Skills.find();
        res.status(200).json(Skillss);
    } catch (error) {
        next(error);
    }
}
