import { tool } from "@langchain/core/tools";
import Education from "../../../models/education.model.js";
import Experience from "../../../models/experience.model.js";
import Skills from "../../../models/skills.model.js";

export const getAdminData = tool(
  async () => {
    // Fetch and format admin info
    const edus = await Education.find().lean().exec();
    const exps = await Experience.find().lean().exec();
    const skills = await Skills.find().lean().exec();

    const eduText = edus.length
      ? edus.map(e => {
          const deg = e.degree || e.title || "N/A";
          const inst = e.school || e.institution || "N/A";
          const yrs = e.startYear && e.endYear
            ? `${e.startYear}–${e.endYear}`
            : e.duration || "N/A";
          return `• ${deg} at ${inst} (${yrs})`;
        }).join("\n")
      : "No education info available.";

    const expText = exps.length
      ? exps.map(e => {
          const title = e.title || "N/A";
          const comp = e.company || "N/A";
          const period = e.startDate && e.endDate
            ? `${e.startDate}–${e.endDate}`
            : e.date || "N/A";
          const bullets = Array.isArray(e.description)
            ? e.description.map(b => `  – ${b}`).join("\n")
            : `  – ${e.description || "N/A"}`;
          return `• ${title} @ ${comp} (${period})\n${bullets}`;
        }).join("\n\n")
      : "No experience info available.";

    const skillsText = skills.length
      ? skills.map(s => {
          const cat = s.title || "Untitled Category";
          const items = Array.isArray(s.items) && s.items.length
            ? s.items.map(i => i.title).join(", ")
            : "No items listed";
          return `• ${cat}: ${items}`;
        }).join("\n")
      : "No skills available.";

    return [
      "=== ADMIN EDUCATION ===", eduText,
      "", "=== ADMIN EXPERIENCE ===", expText,
      "", "=== ADMIN SKILLS ===", skillsText
    ].join("\n");
  },
  {
    name: "get_admin_data",
    description: "Retrieve formatted admin (education, experience, skills) details.",
  }
);