import React from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "AI Image Generator",
    bodyText: "A project that generates images using OpenAI's DALL·E model.",
    image: "https://source.unsplash.com/400x250/?ai,technology",
    links: [
      { text: "GitHub", href: "https://github.com/your-repo" },
      { text: "Live Demo", href: "https://yourproject.com" },
    ],
    tags: ["AI", "Machine Learning", "DALL·E"],
  },
  {
    title: "Weather App",
    bodyText: "A simple app that shows real-time weather information.",
    image: "https://source.unsplash.com/400x250/?weather,clouds",
    links: [
      { text: "GitHub", href: "https://github.com/your-repo" },
      { text: "Live Demo", href: "https://yourproject.com" },
    ],
    tags: ["React", "API", "Weather"],
  },
  {
    title: "E-Commerce Website",
    bodyText: "A modern e-commerce website built with React and Firebase.",
    image: "https://source.unsplash.com/400x250/?shopping,cart",
    links: [
      { text: "GitHub", href: "https://github.com/your-repo" },
      { text: "Live Demo", href: "https://yourproject.com" },
    ],
    tags: ["React", "Firebase", "E-Commerce"],
  },
];

const ProjectPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-8">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
