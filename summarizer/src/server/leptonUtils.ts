import { fewShotExamples } from "./ollamaUtils";
import OpenAI from "openai";

export const LLAMA2_13B_MODEL = "llama2-13b";
export const LLAMA2_70B_MODEL = "llama2-70b";

export const genLeptonAIConfig = (modelId: string) => ({
  apiKey: process.env.LEPTONAI_API_KEY,
  baseURL: `https://${modelId}.lepton.run/api/v1`,
});

export async function executeOpenAILikeLLMAPIChat({
  prompt,
  modelIds,
}: {
  prompt: string;
  modelIds: string[];
}) {
  for (const modelId of modelIds) {
    const provider = new OpenAI(genLeptonAIConfig(modelId));

    const completion = await provider.chat.completions.create({
      model: modelId,
      temperature: 0.5,
      messages: [
        ...fewShotExamples,
        {
          role: "user",
          content: `ORIGINAL TEXT:
\`\`\`
${prompt}
\`\`\`

JSON TITLE:
`,
        },
      ] as any,
    });

    const message = completion.choices[0].message?.content;
    // const message = completion.data.choices[0].text;
    // console.log("message", message);
    if (!message) {
      console.error(`Failed to generate summary with model ${modelId}.`);
      continue;
    }
    const summary = message;
    // console.debug("summary", summary);

    return summary;
  }

  throw new Error("None of the models managed to generate a summary.");
}
