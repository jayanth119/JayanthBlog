import React from "react";

const ExperienceCard = ({ title, company, date, description, tags }) => {
  return (
    <div className="bg-[#161B22] text-gray-300 shadow-lg rounded-xl p-6 w-full md:w-2/3 relative border-l-4 border-blue-500 pl-6 mb-8 transition-all hover:scale-105 hover:shadow-blue-500/40">
      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{date}</span>
      <h3 className="text-xl font-bold mt-2 text-gray-100">{title}</h3>
      <p className="text-gray-400">{company}</p>
      <ul className="list-disc list-inside mt-3 text-gray-400">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="flex gap-2 mt-4 flex-wrap">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
