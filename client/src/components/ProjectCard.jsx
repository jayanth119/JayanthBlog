import React from "react";
import ReactMarkdown from "react-markdown";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#161B22] border border-gray-700 rounded-xl shadow-md p-6 text-white w-full md:w-[400px]">
      {/* Image */}
      {project.image && (
        <img src={project.image} alt={project.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
      )}

      
      <h3 className="text-2xl font-bold text-gray-100">{project.title}</h3>

      {/* Project Description with scroll option */}
      <div className="text-gray-400 text-sm mt-2 max-h-40 overflow-y-auto">
        <ReactMarkdown>{project.bodyText}</ReactMarkdown>
      </div>

      {/* Buttons (Links) */}
      
      { project.github && project.demo && ( 
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => window.open(project.github, "_blank")}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs"
          >
            GitHub
          </button>
          <button
            onClick={() => window.open(project.demo, "_blank")}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs"
          >
            Live Demo
          </button>

        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2"> 
      </div>
      



      {/* Tags */}
      {project.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
