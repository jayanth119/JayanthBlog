import React from "react";
import ReactMarkdown from "react-markdown";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#161B22] border border-gray-700 rounded-xl shadow-md p-6 text-white w-full md:w-[400px]">
      {/* Image */}
      {project.image && (
        <img src={project.image} alt={project.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
      )}

      {/* Project Title */}
      <h3 className="text-2xl font-bold text-gray-100">{project.title}</h3>

      {/* Project Description */}
      <div className="text-gray-400 text-sm mt-2">
        <ReactMarkdown>{project.bodyText}</ReactMarkdown>
      </div>

      {/* Buttons (Links) */}
      {project.links && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-500 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}

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
