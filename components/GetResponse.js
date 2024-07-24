import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: "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",
});

export async function main(best, worst, refinetext) {
  const chatCompletion = await getGroqChatCompletion(best, worst, refinetext);
  // Print the completion returned by the LLM.
  return chatCompletion.choices[0]?.message?.content || "";
}
async function getGroqChatCompletion(best, worst, refinetext) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          "Come up with a schdule for a date for 2 in singapore based on a best trait of " +
          best +
          " and the worst trait of " +
          worst +
          "and with the following conditions" +
          refinetext,
      },
    ],
    model: "llama3-8b-8192",
  });
}
