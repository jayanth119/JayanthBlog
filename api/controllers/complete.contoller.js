// routes/chat.js (or wherever)
import { chain, postsmemory } from "../utils/lllmconfig.js";

export const complete = async (req, res) => {
  try {
    const userText = req.body.text || "";
    const aiMessage = await chain.invoke(
      { input: userText  },
      { postsmemory }
    );

    const fullText = aiMessage.content?.trim() || "";
    const regex = /^(?:REPLY_TEXT:)?\s*([\s\S]*?)\s*::\s*playAudio=(true|false)\s*$/i;
    const m = fullText.match(regex);

    if (m) {
      return res.json({
        reply: m[1].trim(),
        playAudio: m[2].toLowerCase() === "true",
      });
    }

    // fallback
    return res.json({ reply: fullText, playAudio: false });
  } catch (err) {
    console.error("AI completion error:", err);
    return res.status(500).json({ error: "AI completion failed" });
  }
};
