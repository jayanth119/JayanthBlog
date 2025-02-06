import mongoose  from "mongoose";
// {
//     "title": "Frontend Development",
//     "items": [
//       { "title": "React", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
//       { "title": "Next.js", "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
//     ]
//   }
const skillsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    items: [
        {
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        }
    ]
});

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;

