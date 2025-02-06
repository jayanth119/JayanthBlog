import mongoose  from "mongoose";
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
const exprerienceSchema  = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    company : {
        type: String,
        required: true
    } , 
    description :{
        type: [String],
        required: true
    } , 
    tags : {
        type : [String],
        required: true
    }
});

const experience = mongoose.model('experience', exprerienceSchema);

module.exports = experience;
