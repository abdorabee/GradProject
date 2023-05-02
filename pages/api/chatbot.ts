import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(res: NextApiResponse) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Your user message here",
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });
    // Extract the generated response from the API response
    const botResponse = response.data.choices[0].text;

    // Return the bot response to the client
    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error("Error processing chatbot response:", error);
  }
}
