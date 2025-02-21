import { useState, useEffect } from "react";

export default function AddProjects() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: "", bodyText: "", image: "", github: "", demo: "", tags: [] });
    const [editingId, setEditingId] = useState(null);
    const [tagInput, setTagInput] = useState("");

    // Fetch projects from backend
    useEffect(() => {
        fetch('/api/getProjects')
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle adding tags
    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput)) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput("");
        }
    };

    // Handle deleting a single tag (last one)
    const deleteOneTag = () => {
        setFormData({ ...formData, tags: formData.tags.slice(0, -1) });
    };

    // Handle adding/updating a project
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = { ...formData };

        if (editingId) {
            // Update project in backend
            fetch(`/api/editProject/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            })
                .then((res) => res.json())
                .then((updatedProject) => {
                    setProjects(projects.map((p) => (p._id === editingId ? updatedProject : p)));
                    setEditingId(null);
                })
                .catch((err) => console.error("Error updating project:", err));
        } else {
            // Add new project to backend
            fetch('/api/project/create', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject),
            })
                .then((res) => res.json())
                .then((newProject) => setProjects([...projects, newProject]))
                .catch((err) => console.error("Error adding project:", err));
        }

        setFormData({ title: "", bodyText: "", image: "", github: "", demo: "", tags: [] });
    };

    // Handle deleting a project
    const handleDelete = (id) => {
        fetch(`/api/deleteProject/${id}`, { method: "DELETE" })
            .then(() => setProjects(projects.filter((p) => p._id !== id)))
            .catch((err) => console.error("Error deleting project:", err));
    };

    // Handle editing a project
    const handleEdit = (project) => {
        setFormData({ ...project, tags: Array.isArray(project.tags) ? project.tags : [] });
        setEditingId(project._id);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row p-4">
            {/* Project Form */}
            <div className="flex-1 p-4">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Project" : "Add Project"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded text-black" required />
                    <textarea name="bodyText" placeholder="Description" value={formData.bodyText} onChange={handleChange} className="w-full p-2 border rounded text-black" required />
                    <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded text-black" />
                    <input type="url" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="w-full p-2 border rounded text-black" />
                    <input type="url" name="demo" placeholder="Live Demo URL" value={formData.demo} onChange={handleChange} className="w-full p-2 border rounded text-black" />

                    {/* Tags Input */}
                    <div className="flex gap-2">
                        <input type="text" placeholder="Add a tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="p-2 border rounded text-black" />
                        <button type="button" onClick={addTag} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add</button>
                        <button type="button" onClick={deleteOneTag} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
                    </div>

                    {/* Display Tags */}
                    <p><strong>Tags:</strong> {formData.tags.join(", ") || "No tags added"}</p>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editingId ? "Update Project" : "Add Project"}
                    </button>
                </form>

                {/* Display Projects */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Projects</h2>
                    {projects.length === 0 ? (
                        <p>No projects added yet.</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className=" bg-gray-700 border p-4 rounded mt-2 flex justify-between items-center">
                                <div>
                                    {/* Display Image if Available */}
                                    {project.image && (
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-32 h-32 object-cover mb-2 rounded"
                                        />
                                    )}
                                    
                                    <h3 className="font-semibold">{project.title}</h3>
                                    <p>{project.bodyText}</p>

                                    {/* GitHub & Live Demo Links */}
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub</a> | 
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-green-500"> Live Demo</a>

                                    {/* Tags */}
                                    <p><strong>Tags:</strong> {Array.isArray(project.tags) ? project.tags.join(", ") : "No tags"}</p>
                                </div>
                                
                                {/* Edit & Delete Buttons */}
                                <div className="space-x-2">
                                    <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
