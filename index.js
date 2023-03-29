const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const response = openai
  .createCompletion({
    model: "text-davinci-003",
    prompt: "Erzähl mir einen lustigen Witz " + Date.now(),
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
  .then((response) => {
    console.log(response.data.choices.map(({ text }) => text).join());
  });
