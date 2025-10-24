// utils/lllmconfig.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MongoClient, ObjectId } from "mongodb";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { RunnableSequence } from "@langchain/core/runnables";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Skills from "../models/skills.model.js";

dotenv.config();

// 1. Connect with Mongoose
await mongoose.connect(process.env.MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Connect raw MongoClient for memory
const client = new MongoClient(process.env.MongoDB_URI);
await client.connect();
const db = client.db("blog_database");
const postsCollection = db.collection("posts");

// 3. Fetch and format admin info
let educationContext = "No education info available.";
let experienceContext = "No experience info available.";
let skillsContext = "No skills available.";

try {
  const educationDocs = await Education.find().lean().exec();
  if (educationDocs.length > 0) {
    educationContext = educationDocs
      .map((edu) => {
        const degree = edu.degree || edu.title || "N/A";
        const institution = edu.school || edu.institution || "N/A";
        const years = edu.startYear && edu.endYear
          ? `${edu.startYear}–${edu.endYear}`
          : edu.duration || "N/A";
        return `• ${degree} at ${institution} (${years})`;
      })
      .join("\n");
  }
} catch (e) {
  console.error("Failed to load education:", e);
}

try {
  const experienceDocs = await Experience.find().lean().exec();
  if (experienceDocs.length > 0) {
    experienceContext = experienceDocs
      .map((exp) => {
        const title = exp.title || "N/A";
        const company = exp.company || "N/A";
        const period = exp.startDate && exp.endDate
          ? `${exp.startDate}–${exp.endDate}`
          : exp.date || "N/A";
        const bullets = Array.isArray(exp.description)
          ? exp.description.map((b) => `  – ${b}`).join("\n")
          : `  – ${exp.description || "N/A"}`;
        return `• ${title} @ ${company} (${period})\n${bullets}`;
      })
      .join("\n\n");
  }
} catch (e) {
  console.error("Failed to load experience:", e);
}

try {
  const skillDocs = await Skills.find().lean().exec();
  if (skillDocs.length > 0) {
    skillsContext = skillDocs
      .map((skill) => {
        const category = skill.title || "Untitled Category";
        const itemsList = Array.isArray(skill.items) && skill.items.length > 0
          ? skill.items
              .map((it) => `${it.title || "Unnamed"} (${it.icon || "no-icon.png"})`)
              .join(", ")
          : "No items listed";
        return `• ${category}: ${itemsList}`;
      })
      .join("\n");
  }
} catch (e) {
  console.error("Failed to load skills:", e);
}

// Combine into one block
const adminDetails = [
  "=== ADMIN EDUCATION ===", 
  educationContext,
  "", 
  "=== ADMIN EXPERIENCE ===", 
  experienceContext,
  "", 
  "=== ADMIN SKILLS ===", 
  skillsContext
].join("\n");

// 4. Unique sessionId
const sessionId = new ObjectId().toString();

// 5. Memory
export const postsmemory = new BufferMemory({
  chatHistory: new MongoDBChatMessageHistory({
    postsCollection,
    sessionId,
  }),
  returnMessages: true,
  memoryKey: "history",
});

// 6. Model
export const genAI = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GEMINI_API_KEY,
});

// 7. Prompt
export const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are Èpsilon, a friendly and helpful AI assistant for a blog website created by Jayanth.
Your job:
- Explain blog posts in a very short, crisp way so people of all ages can understand.
- Share admin details (education, current work, projects) only when asked.
- Do not stray beyond blog or admin info.
- Never invent extra details.
- Format every reply as: REPLY_TEXT::playAudio=true

Tone: informative, funny, clear, and age-friendly.

${adminDetails}

Always end with ::playAudio=true.`,
  ],
  ["user", "{input}"],
]);

export const chain = RunnableSequence.from([prompt, genAI]);
