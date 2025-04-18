const { x_ai } = require('./config.json');
const { calculateCost } = require('../../utils/costCalculator');

const XAI_API_URL   = x_ai.apiUrl;
const MODEL         = x_ai.model;
const SYSTEM_PROMPT = x_ai.systemPrompt;
const MODEL_KEY     = 'x_ai';

async function callXai(prompt, { temperature, max_tokens }) {
  if (!process.env.XAI_API_KEY) {
    throw new Error('Missing XAI_API_KEY in environment');
  }

  const body = {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user',   content: prompt }
    ],
    model:       MODEL,
    stream:      false,
    temperature,
    max_tokens,
  };

  const start = Date.now();
  const res = await fetch(XAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`x.ai API error [${res.status}]: ${text}`);
  }

  const json = await res.json();
  const duration_ms = Date.now() - start;

  const choice = json.choices?.[0]?.message?.content;
  if (typeof choice !== 'string') {
    throw new Error('Unexpected x.ai response format');
  }

  const promptTokens     = json.usage?.prompt_tokens;
  const completionTokens = json.usage?.completion_tokens;
  if (typeof promptTokens !== 'number' || typeof completionTokens !== 'number') {
    throw new Error('Missing usage tokens in x.ai response');
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

module.exports = { callXai };
