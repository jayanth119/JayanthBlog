import dotenv from "dotenv";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { MongoClient } from "mongodb";

dotenv.config();

export const getBlogData = tool(
  async ({ filter = {}, limit = 0, skip = 0 } = {}) => {
    // Fetch blog posts with optional pagination and filtering
    const client = new MongoClient(process.env.M);
    await client.connect();
    const db = client.db("blog_database");
    const postsCollection = db.collection("posts");
    const cursor = postsCollection.find(filter);
    if (limit > 0) cursor.limit(limit);
    if (skip > 0) cursor.skip(skip);
    const docs = await cursor.sort({ createdAt: -1 }).toArray();

    if (!docs.length) {
      return { success: false, message: "No blog posts found.", data: [] };
    }

    // Return full blog documents
    return { success: true, data: docs };
  },
  {
    name: "get_blog_data",
    description:
      "Fetch all blog post details from MongoDB, with optional filter, limit, and skip.",
    schema: z.object({
      filter: z.record(z.any()).optional(),
      limit: z
        .number()
        .min(0)
        .optional()
        .describe("Max number of posts to fetch (0 = no limit)"),
      skip: z
        .number()
        .min(0)
        .optional()
        .describe("Number of posts to skip for pagination"),
    }),
  }
);

// export const getBlogTitles = tool(async ({ limit = 0, skip = 0 } = {}) => {
//     if (!docs.length) return "No blog posts found.";

//     return docs.map(d => `• ${d.title} (by ${d.author}, ${new Date(d.createdAt).toDateString()})`).join("\n");
//   },
//   {
//     name: "get_blog_data",
//     description: "Fetch recent blog post titles and metadata.",
//     schema: {
//       type: "object",
//       properties: {
//         limit: { type: "number", description: "Number of recent posts to fetch", default: 5 }
//       },
//       required: []
//     }
//   }
// );
