import { useState, useEffect } from "react";

export default function AddExperience() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [experienceList, setExperienceList] = useState([]); // Ensure default empty array
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch("/api/getExperiences");
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperienceList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = { title, company, date, description, tags };

    try {
      const response = await fetch(editId ? `/api/editExperience/${editId}` : "/api/experience/create", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) throw new Error("Failed to save experience");

      const result = await response.json();
      setExperienceList((prev) =>
        editId ? prev.map((exp) => (exp._id === editId ? result : exp)) : [...prev, result]
      );

      setTitle("");
      setCompany("");
      setDate("");
      setDescription("");
      setTags([]);
      setEditId(null);
    } catch (error) {
      console.error("Error saving experience:", error);
      setError("Failed to save experience");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteExperience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete experience");
      setExperienceList((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
      setError("Failed to delete experience");
    }
  };

  const handleEdit = (experience) => {
    setTitle(experience.title);
    setCompany(experience.company);
    setDate(experience.date);
    setDescription(experience.description);
    setTags(experience.tags);
    setEditId(experience._id);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const deleteOneTag  = () => {
    // delete one tag recently added 
    if (tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      setTags(tags.filter((tag) => tag !== lastTag));
    }
  }

  return (
    <div className="flex flex-col bg-gray-900 text-white p-8 justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">{editId ? "Edit Experience" : "Add Experience"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded text-black" required />
          <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="p-2 border rounded text-black" required />
          <input type="text" placeholder="Duration (e.g., Dec 2024 - Present)" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 border rounded text-black" required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded text-black" required></textarea>
          <div className="flex gap-2">
            <input type="text" placeholder="Add a tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="p-2 border rounded text-black" />
            <button type="button" onClick={addTag} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add</button>
            <buttom type="button" onClick = {deleteOneTag} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</buttom>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">{tag}</span>
            ))}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">{editId ? "Update" : "Save"}</button>
        </form>
      </div>

      {loading ? (
        <p className="text-gray-400 text-lg text-center mt-4">Loading experiences...</p>
      ) : error ? (
        <p className="text-red-400 text-lg text-center mt-4">{error}</p>
      ) : (
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Experience Records</h2>
          {experienceList.length === 0 ? (
            <p className="text-gray-400 text-lg text-center">No experience records added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experienceList.map((exp) => (
                <div key={exp._id} className="bg-gray-700 p-6 rounded shadow-md relative">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-gray-400">{exp.date}</p>
                  <p className="text-gray-300">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(exp.tags) &&
                      exp.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-600 px-2 py-1 rounded text-sm">{tag}</span>
                      ))}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-3">
                    <button className="text-blue-400 hover:text-blue-500" onClick={() => handleEdit(exp)}>Edit</button>
                    <button className="text-red-400 hover:text-red-500" onClick={() => handleDelete(exp._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
