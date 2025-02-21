import mongoose  from "mongoose";

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

const projectSchema = new mongoose.Schema({

    title :{
        type: String,
        required: true
    }, 
    bodyText :{
        type: String,
        required: true
    },
    image :{
        type: String,
        required: true
    },
    
    github: {
            type: String,
            required: true
        },
    
    image: {
            type: String,
            required: true
        },
    tags : {
            type : [String],
            
        },
    demo : {
        type : String,
        required: true
    }
 
}) ; 

const project =mongoose.model('Project', projectSchema);

export default project;

