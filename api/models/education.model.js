import mongoose from "mongoose";
// {
//     title: "B.Tech",
//     institution: "IIIT Nuzvid",
//     duration: "Dec 2022 - May 2026",
//     details: "CGPA - 8.2",
//   }
const educationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },   
    institution: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }

});

const Education = mongoose.model("Education", educationSchema);

export default Education;
