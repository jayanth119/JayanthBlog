import React, { useState, useEffect } from "react";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("/api/getEducations")
      .then((res) => res.json())
      .then((data) => setEducation(data))
      .catch((err) => console.error("Error fetching education:", err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Education</h2>

      <div className="relative w-full sm:w-11/12 md:w-4/5 lg:w-1/2">
        {/* Vertical line in the middle */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-blue-500 transform -translate-x-1/2 z-0"></div>

        {education.map((edu, index) => (
          <div
            key={index}
            className={`relative mb-12 flex flex-col sm:flex-row ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full z-10 border-4 border-black"></div>

            <div
              className={`bg-gray-900 p-5 rounded-lg w-full sm:w-[85%] md:w-96 shadow-lg z-10 ${
                index % 2 === 0
                  ? "sm:ml-6 sm:mr-auto"
                  : "sm:ml-auto sm:mr-6"
              }`}
            >
              <h3 className="text-xl font-semibold">{edu.title}</h3>
              <p className="text-blue-400 font-medium">{edu.institution}</p>
              <p className="mt-2 text-sm">{edu.details}</p>
              <p className="mt-1 text-sm text-gray-400">{edu.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
