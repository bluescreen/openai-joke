const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const gTTS = require("gtts");
const player = require("play-sound")((opts = {}));
const { LANGUAGE, PROMPT, RESULT_FILE, OPENAI_CONFIG } = require("./config");

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

// https://platform.openai.com/docs/models/gpt-3
async function tellJoke(about) {
  const response = await openai.createCompletion({
    prompt: PROMPT + " " + about,
    ...OPENAI_CONFIG,
  });
  const joke = response.data.choices.map(({ text }) => text).join();
  console.log(joke);
  return joke;
}

async function textToSpeech(text) {
  var gtts = new gTTS(text, LANGUAGE);
  gtts.save(RESULT_FILE, function (err, result) {
    if (err) {
      throw new Error(err);
    }
    playSound(RESULT_FILE);
  });
}

function playSound(resultFile) {
  player.play(resultFile, function (err) {
    if (err) throw err;
  });
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

readline.question("Prompt:\n", (prompt) => {
  tellJoke(prompt).then((text) => {
    textToSpeech(text);
  });
  readline.close();
});
