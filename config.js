const LANGUAGE = "DE";
const PROMPT = "Erzähle einen lustigen Witz über";
const RESULT_FILE = "./results/processed-text.mp3";

const OPENAI_CONFIG = {
  model: "text-davinci-003",
  temperature: 0.8,
  max_tokens: 20,
  top_p: 1.0,
  frequency_penalty: 2.0,
  presence_penalty: 0.5,
};

module.exports = { LANGUAGE, PROMPT, RESULT_FILE, OPENAI_CONFIG };
