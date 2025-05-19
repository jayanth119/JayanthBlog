import dotenv from "dotenv";
import mongoose from "mongoose";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BufferMemory } from "langchain/memory";
import { MongoDBChatMessageHistory } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import {getAdminData} from './tools/admindata_tool.js'
import {getBlogData} from './tools/blogdata_tool.js'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from "@langchain/core/prompts"; 


dotenv.config();

// 1. Connect with Mongoose
await mongoose.connect(process.env.MongoDB_URI);



// 3. Define tool: getAdminData

// 4. Define tool: getBlogData

const client = new MongoClient(process.env.MongoDB_URI);
await client.connect();
const db = client.db("blog_database");
const postsCollection = db.collection("posts");

// 5. Setup Memory
const memory = new BufferMemory({
  chatHistory: new MongoDBChatMessageHistory({
    postsCollection: postsCollection,
    sessionId: null, // agent will assign
  }),
  returnMessages: true,
  memoryKey: "history",
});



const prompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are Èpsilon, a friendly and helpful AI assistant for a blog website created by Jayanth.
Your job:
- Explain blog posts in a very short, crisp way so people of all ages can understand.
- Share admin details (education, current work, projects) only when asked.
- Do not stray beyond blog or admin info.
- Never invent extra details.
- Format every reply as: REPLY_TEXT::playAudio=true

Tone: informative, funny, clear, and age-friendly`
  ),
  HumanMessagePromptTemplate.fromTemplate("{messages}")
]);


// 6. LLM
export const genAI = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GEMINI_API_KEY,
});

// 7. Agent
export const agent = createReactAgent({
  llm:           genAI,
  tools:         [getAdminData, getBlogData],
  agentName:     "Èpsilon",
  prompt,       
});

// 4️⃣ Stream with the right parameter shape
const stream = await agent.stream(
  { input: "WHo create you ??" },   
  { streamMode: "values" }
);

for await (const { messages } of stream) {
  console.log(messages);
}