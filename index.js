const { Configuration, OpenAIApi } = require("openai");
var fs = require("fs");
var request = require("request");

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

// https://platform.openai.com/docs/models/gpt-3
async function tellJoke(about) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Create a meme text about " + about,
    temperature: 0.8,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 2.0,
    presence_penalty: 0.5,
  });
  const joke = response.data.choices.map(({ text }) => text).join();
  console.log(joke);
  return joke;
}

async function createImageFromJoke(prompt) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  return response.data.data[0].url;
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question("Text:\n", (name) => {
  tellJoke(name).then((joke) => {
    createImageFromJoke(joke).then((uri) => {
      console.log("DOWNLOAD", uri);

      request.head(uri, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);

        request(uri)
          .pipe(fs.createWriteStream("results/" + name + ".png"))
          .on("close", () => {
            console.log("DONE");
          });
      });
    });
  });
  readline.close();
});
