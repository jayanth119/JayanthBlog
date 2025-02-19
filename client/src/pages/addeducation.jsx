import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react"; // Import icons

export default function AddEducation() {
  const [educationList, setEducationList] = useState([]);
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/getEducations");
        if (!res.ok) {
          throw new Error("Failed to fetch education records");
        }
        const data = await res.json();
        setEducationList(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };

    fetchEducation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !institution || !duration || !details) {
      alert("Please fill all fields");
      return;
    }

    const newEducation = { title, institution, duration, details };

    try {
      let res;
      if (editId) {
        // Update existing record
        res = await fetch(`/api/editEducation/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEducation),
        });
      } else {
        // Create new record
        res = await fetch("/api/education/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEducation),
        });
      }

      if (!res.ok) throw new Error("Failed to save education details");

      const savedEducation = await res.json();

      if (editId) {
        setEducationList((prevList) =>
          prevList.map((edu) => (edu._id === editId ? savedEducation : edu))
        );
      } else {
        setEducationList([...educationList, savedEducation]);
      }

      // Clear form fields
      setTitle("");
      setInstitution("");
      setDuration("");
      setDetails("");
      setEditId(null);

      console.log("Education saved successfully:", savedEducation);
    } catch (error) {
      console.error("Error saving education:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (education) => {
    setTitle(education.title);
    setInstitution(education.institution);
    setDuration(education.duration);
    setDetails(education.details);
    setEditId(education._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`/api/deleteEducation/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setEducationList((prevList) => prevList.filter((edu) => edu._id !== id));
      console.log("Education deleted successfully");
    } catch (error) {
      console.error("Error deleting education:", error.message);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-8 justify-center items-center min-h-screen">
      {/* Form Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">
          {editId ? "Edit Education" : "Add Education"}
        </h3>
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
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editId ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* Display Section */}
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Education Records</h2>
        {educationList.length === 0 ? (
          <p className="text-gray-400 text-lg text-center">
            No education records added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((edu) => (
              <div
                key={edu._id}
                className="bg-gray-700 p-6 rounded shadow-md relative"
              >
                {/* Education Details */}
                <h3 className="text-xl font-bold">{edu.title}</h3>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-gray-400">{edu.duration}</p>
                <p className="text-gray-300">{edu.details}</p>

                {/* Edit & Delete Icons */}
                <div className="absolute top-4 right-4 flex gap-3">
                  <Pencil
                    className="text-blue-400 cursor-pointer hover:text-blue-500"
                    onClick={() => handleEdit(edu)}
                  />
                  <Trash2
                    className="text-red-400 cursor-pointer hover:text-red-500"
                    onClick={() => handleDelete(edu._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
