import OpenAI from "openai";
export const OpenAIClient = new OpenAI({ apiKey: import.meta.env.VITE_KEY, dangerouslyAllowBrowser: true });