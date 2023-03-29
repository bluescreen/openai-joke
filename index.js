const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

// https://platform.openai.com/docs/models/gpt-3
async function tellJoke(about) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Erzähl mir einen zufälligen Witz über " + about,
    temperature: 0.8,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 2.0,
    presence_penalty: 0.5,
  });
  return response.data.choices.map(({ text }) => text).join();
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question("Erzähl mir einen Witz über:\n", (name) => {
  tellJoke(name).then(console.log);
  readline.close();
});
