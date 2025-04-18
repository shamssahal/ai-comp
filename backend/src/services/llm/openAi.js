const { open_ai } = require('./config.json');
const { calculateCost } = require('../../utils/costCalculator');

const OPENAI_API_URL = open_ai.apiUrl;
const MODEL          = open_ai.model;
const MODEL_KEY      = 'open_ai';

async function callOpenAi(prompt, { temperature, max_tokens }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY in environment');
  }

  const body = {
    model:       MODEL,
    messages:    [{ role: 'user', content: prompt }],
    temperature,
    max_tokens,
  };

  const start = Date.now();
  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error [${res.status}]: ${text}`);
  }

  const json = await res.json();
  const duration_ms = Date.now() - start;

  const choice = json.choices?.[0]?.message?.content;
  if (typeof choice !== 'string') {
    throw new Error('Unexpected OpenAI response format');
  }

  const promptTokens     = json.usage?.prompt_tokens;
  const completionTokens = json.usage?.completion_tokens;
  if (typeof promptTokens !== 'number' || typeof completionTokens !== 'number') {
    throw new Error('Missing usage tokens in OpenAI response');
  }

  const cost = calculateCost(MODEL_KEY, promptTokens, completionTokens);

  return {
    text:        choice,
    model_name:  MODEL,
    usage:       { prompt_tokens: promptTokens, completion_tokens: completionTokens },
    cost,
    duration_ms
  };
}

module.exports = { callOpenAi };
