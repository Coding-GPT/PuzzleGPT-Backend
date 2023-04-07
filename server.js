require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');


const app = express();

app.use(express.json());
app.use(cors());

// Set your OpenAI API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/puzzle', async (req, res) => {
  const { difficulty } = req.body;

  const prompt = `Create a word puzzle with difficulty level ${difficulty}.`;

  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt,
    max_tokens: 50,
    n: 1,
    stop: null,
    temperature: 1,
  });

  res.json({ puzzle: response.choices[0].text.trim() });
});

app.post('/clue', async (req, res) => {
  const { puzzle } = req.body;

  const prompt = `Provide a clue for the following word puzzle: ${puzzle}`;

  const response = await openai.Completion.create({
    engine: 'text-davinci-002',
    prompt,
    max_tokens: 30,
    n: 1,
    stop: null,
    temperature: 1,
  });

  res.json({ clue: response.choices[0].text.trim() });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});