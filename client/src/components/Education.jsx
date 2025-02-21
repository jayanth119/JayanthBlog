import React from "react";
import { useState , useEffect } from "react";
// const educationData = [
//     {
//         title: "B.Tech",
//         institution: "IIIT Nuzvid",
//         duration: "Dec 2022 - May 2026",
//         details: "CGPA - 8.2",
//       } , 
//   {
//     title: "Pre University ",
//     institution: "IIIT Nuzvid",
//     duration: "Jan 2020 - Sept 2022",
//     details: "CGPA - 9.8",
//   },
//   {
//     title: "High School",
//     institution: "ZPHS Gajuwaka",
//     duration: "Jun 2019 - Jan 2020",
//     details: "CGPA - 9.8",
//   },
// ];

const Education = () => {
  const [education, setEducation] = useState([]);
  useEffect(() => {
    fetch("/api/getEducations")
      .then((res) => res.json())
      .then((data) => setEducation(data))
      .catch((err) => console.error("Error fetching education:", err));
  }
  , []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-8">Education</h2>
      <div className="relative w-3/4 lg:w-1/2">
        <div className="absolute left-1/2 w-1 bg-blue-500 h-full transform -translate-x-1/2"></div>
        {education.map((edu, index) => (
          <div
            key={index}
            className={`relative flex items-center mb-8 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full`}
             
            ></div>
            <div className="bg-gray-900 p-5 rounded-lg w-80 shadow-lg">
              <h3 className="text-lg font-semibold">{edu.title}</h3>
              <p className="text-blue-400 font-medium">{edu.institution}</p>
              <p className="mt-2 text-sm">{edu.details}</p>
              <p className="mt-2 text-sm">{edu.duration}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;