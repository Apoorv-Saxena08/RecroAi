import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Convert chat messages (system/user/assistant) to Gemini API format.
 * Extracts system message as systemInstruction, user/model as contents.
 */
function toGeminiFormat(messages) {
  let systemInstruction = null;
  const contents = [];

  for (const msg of messages) {
    const text = msg.content?.trim() || "";
    if (!text) continue;

    if (msg.role === "system") {
      systemInstruction = { parts: [{ text }] };
    } else if (msg.role === "user") {
      contents.push({ role: "user", parts: [{ text }] });
    } else if (msg.role === "assistant") {
      contents.push({ role: "model", parts: [{ text }] });
    }
  }

  return { systemInstruction, contents };
}

export const askAi = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment.");
    }

    const { systemInstruction, contents } = toGeminiFormat(messages);

    if (contents.length === 0) {
      throw new Error("No user or model messages to send.");
    }

    const body = {
      contents: contents.map((c) => ({
        role: c.role,
        parts: c.parts,
      })),
    };

    if (systemInstruction) {
      body.systemInstruction = systemInstruction;
    }

    const url = `${GEMINI_API_URL}?key=${apiKey}`;
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    const content =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content.trim();
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error?.message || "Gemini API Error"
    );
  }
};
