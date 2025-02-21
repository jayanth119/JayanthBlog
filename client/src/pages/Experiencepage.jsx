import React from "react";
import { useEffect , useState } from "react";
import ExperienceCard from "../components/ExperienceCard";

const experiences = [
  {
    title: "AI Engineer Onsite",
    company: "Parabola9",
    date: "Dec 2024 - Present",
    description: [
      "Designed and optimized machine learning models using TensorFlow and PyTorch.",
      "Conducted data preprocessing, feature engineering, and hyper-parameter tuning.",
      "Deployed AI solutions into production ensuring scalability and integration.",
      "Explored cutting-edge AI technologies like NLP and computer vision."
    ],
    tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },
  {
    title: "Backend Developer",
    company: "Scorify",
    date: "June 2024 - Oct 2024",
    description: [
      "Developed APIs using Django REST Framework for UK property management.",
      "Integrated OpenAI for AI-driven property management insights.",
      "Built and optimized tenant inspection and property repair systems."
    ],
    tags: ["Django", "OpenAI", "REST API"],
  },
  {
    title: "Data Analyst",
    company: "FindPrivateSolution",
    date: "Jul 2024 - Oct 2024",
    description: [
      "Analyzed large datasets and provided actionable insights.",
      "Developed visual reports using Excel and automated data processes."
    ],
    tags: ["Data Analysis", "Excel", "Automation"],
  },
  {
    title: "Flutter Developer",
    company: "Genius Search",
    date: "Dec 2023 - Mar 2024",
    description: [
      "Developed mobile application screens using Flutter.",
      "Integrated APIs for real-time search results and content suggestions."
    ],
    tags: ["Flutter", "API Integration", "Mobile Development" ],
  }
];

const ExperiencePage = () => {
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    fetch("/api/getExperiences")
      .then((res) => res.json())
      .then((experience) => setExperience(experience))
      .catch((err) => console.error("Error fetching experience:", err));
  }
  , []);
   
  return (
    <section className="bg-[#0D1117] text-white py-16 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200 tracking-wide">
          EXPERIENCE
        </h2>
        <div className="relative border-l-4 border-gray-700 pl-6 space-y-10">

          {experience.map((experience, index) => (
            <><div className="absolute left-[-28px] bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
              </div><ExperienceCard key={index} {...experience} /></>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePage;
