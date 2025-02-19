import Education from "../models/education.model.js";
import { errorHandler } from '../utils/error.js';

// createEducation,
// deleteEducation,
// editEducation,
// getEducations,
// {
//     title: "B.Tech",
//     institution: "IIIT Nuzvid",
//     duration: "Dec 2022 - May 2026",
//     details: "CGPA - 8.2",
//   }
export const createEducation = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to create an education'));
    // }
    if (!req.body.title || !req.body.institution || !req.body.duration || !req.body.details ) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const newEducation = new Education({
        ...req.body,
    });
    try {
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (error) {
        next(error);
    }
    };

export const deleteEducation = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to delete an education'));
    // }
    try {
        await Education.findByIdAndDelete(req.params.educationId);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export const editEducation = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You are not allowed to edit an education'));
    // }
    try {
        const updatedEducation = await Education.findByIdAndUpdate(req.params.educationId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedEducation) {
            return next(errorHandler(404, 'Education not found'));
        }
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
}

export const getEducations = async (req, res, next) => {
    try {
        const educations = await Education.find();
        res.status(200).json(educations);
    } catch (error) {
        next(error);        

    }
}

