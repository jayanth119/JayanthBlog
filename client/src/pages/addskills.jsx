import { useState, useEffect } from "react";

export default function AddSkills() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ title: "", items: [] });
    const [editingId, setEditingId] = useState(null);
    const [itemTitle, setItemTitle] = useState("");
    const [itemIcon, setItemIcon] = useState("");

    // Fetch skills from backend
    useEffect(() => {
        fetch('/api/getSkills')
            .then((res) => res.json())
            .then((data) => setSkills(data))
            .catch((err) => console.error("Error fetching skills:", err));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle adding skill items
    const addItem = () => {
        if (itemTitle.trim() && itemIcon.trim()) {
            setFormData({ ...formData, items: [...formData.items, { title: itemTitle, icon: itemIcon }] });
            setItemTitle("");
            setItemIcon("");
        }
    };

    // Handle deleting a skill item
    const deleteItem = (index) => {
        setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
    };

    // Handle adding/updating a skill
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSkill = { ...formData };

        if (editingId) {
            fetch(`/api/editSkill/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSkill),
            })
                .then((res) => res.json())
                .then((updatedSkill) => {
                    setSkills(skills.map((s) => (s._id === editingId ? updatedSkill : s)));
                    setEditingId(null);
                })
                .catch((err) => console.error("Error updating skill:", err));
        } else {
            fetch('/api/skill/create', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSkill),
            })
                .then((res) => res.json())
                .then((newSkill) => setSkills([...skills, newSkill]))
                .catch((err) => console.error("Error adding skill:", err));
        }

        setFormData({ title: "", items: [] });
    };

    // Handle deleting a skill
  const handleDelete = (id) => {
    fetch(`/api/deleteSkill/${id}`, { method: "DELETE" })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete skill");
            }
            setSkills((prevSkills) => prevSkills.filter((s) => s._id !== id));
        })
        .catch((err) => console.error("Error deleting skill:", err));
};

  

    // Handle editing a skill
    const handleEdit = (skill) => {
        setFormData({ ...skill });
        setEditingId(skill._id);
    };

    return (
        <div className="min-h-screen flex flex-col p-4">
            <div className="flex-1 p-4">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Skill" : "Add Skill"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" placeholder="Skill Category" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded text-black" required />
                    
                    <div className="flex gap-2">
                        <input type="text" placeholder="Skill Name" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} className="p-2 border rounded text-black" />
                        <input type="url" placeholder="Icon URL" value={itemIcon} onChange={(e) => setItemIcon(e.target.value)} className="p-2 border rounded text-black" />
                        <button type="button" onClick={addItem} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add</button>
                    </div>

                    <p><strong>Skills:</strong></p>
                    <ul>
                        {formData.items.map((item, index) => (
                            <li key={index} className="flex items-center justify-between">
                                {item.title} <img src={item.icon} alt={item.title} className="w-6 h-6 ml-2" />
                                <button type="button" onClick={() => deleteItem(index)} className="text-red-500">X</button>
                            </li>
                        ))}
                    </ul>
                    
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editingId ? "Update Skill" : "Add Skill"}
                    </button>
                </form>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Skills</h2>
                    {skills.length === 0 ? (
                        <p>No skills added yet.</p>
                    ) : (
                        skills.map((skill) => (
                            <div key={skill._id} className="bg-gray-700 border p-4 rounded mt-2">
                                <h3 className="font-semibold">{skill.title}</h3>
                                <ul>
                                    {skill.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center">
                                            {item.title} <img src={item.icon} alt={item.title} className="w-6 h-6 ml-2" />
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handleEdit(skill)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                <button onClick={() => {handleDelete(skill._id) 
                                  console.log(skill._id); }
                                } className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}