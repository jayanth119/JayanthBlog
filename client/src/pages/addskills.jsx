import { useState, useEffect } from "react";

export default function AddSkills() {
  const [categories, setCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("Frontend Development");
  const [skillTitle, setSkillTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/getSkills");
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    if (!skillTitle.trim() || !icon.trim()) return;

    setCategories((prev) => {
      const updatedCategories = prev.map((cat) =>
        cat.title === categoryTitle
          ? { ...cat, items: [...cat.items, { title: skillTitle, icon }] }
          : cat
      );

      if (!updatedCategories.some((cat) => cat.title === categoryTitle)) {
        updatedCategories.push({ title: categoryTitle, items: [{ title: skillTitle, icon }] });
      }

      return updatedCategories;
    });

    setSkillTitle("");
    setIcon("");
  };

  const handleDeleteSkill = (categoryIndex, skillIndex) => {
    setCategories((prev) =>
      prev.map((cat, index) =>
        index === categoryIndex
          ? { ...cat, items: cat.items.filter((_, i) => i !== skillIndex) }
          : cat
      )
    );
  };

  const handleSaveToDB = async () => {
    try {
      const response = await fetch("/api/skill/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories),
      });
      if (!response.ok) throw new Error("Failed to save skills");
      alert("Skills saved successfully!");
    } catch (error) {
      setError("Failed to save skills");
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-8 justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Add Skills</h3>

        <input
          type="text"
          placeholder="Category Title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          className="p-2 border rounded w-full mb-4 text-black"
          required
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Skill Title"
            value={skillTitle}
            onChange={(e) => setSkillTitle(e.target.value)}
            className="p-2 border rounded w-full text-black"
            required
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="p-2 border rounded w-full text-black"
            required
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Skills List</h2>
          {categories.length === 0 ? (
            <p className="text-gray-400">No skills added yet.</p>
          ) : (
            categories.map((category, catIndex) => (
              <div key={catIndex} className="mt-4">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <ul>
                  {category.items.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="flex justify-between items-center bg-gray-700 p-3 rounded my-2"
                    >
                      <div className="flex items-center gap-3">
                        <img src={skill.icon} alt={skill.title} className="w-8 h-8" />
                        <span>{skill.title}</span>
                      </div>
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => handleDeleteSkill(catIndex, skillIndex)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleSaveToDB}
          className="mt-4 bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Save Skills
        </button>
      </div>
      {error && <p className="text-red-400 text-lg text-center mt-4">{error}</p>}
    </div>
  );
}
