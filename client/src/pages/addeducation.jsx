// page to add education details
import { useState } from "react";
export default function AddEducation() {

    const [educationList, setEducationList] = useState([]);
    const [title, setTitle] = useState("");
    const [institution, setInstitution] = useState("");
    const [duration, setDuration] = useState("");
    const [details, setDetails] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newEducation = { title, institution, duration, details };
      setEducationList([...educationList, newEducation]);
      setTitle("");
      setInstitution("");
      setDuration("");
      setDetails("");
    };
  
    return (
    <div className="flex flex-col  bg-gray-900 text-white p-8">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Education</h2> */}
  
        <div className="flex flex-wrap gap-8   justify-between ">
          {/* Form Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Add Education</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title (e.g., B.Tech)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Institution (e.g., IIIT Nuzvid)"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., Dec 2022 - May 2026)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Details (e.g., CGPA - 8.2)"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="p-2 border rounded text-black"
                required
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Save
              </button>
            </form>
          </div>
  
          {/* Display Section */}
          <div className="flex-grow w-full lg:w-2/3">
            {educationList.length === 0 ? (
              <p className="text-gray-400 text-lg text-center">No education records added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationList.map((edu, index) => (
                  <div key={index} className="bg-gray-700 p-6 rounded shadow-md">
                    <h3 className="text-xl font-bold">{edu.title}</h3>
                    <p className="text-gray-300">{edu.institution}</p>
                    <p className="text-gray-400">{edu.duration}</p>
                    <p className="text-gray-300">{edu.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

}
    
    
 