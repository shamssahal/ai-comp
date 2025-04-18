const { anthropic } = require('./config.json');
const { calculateCost } = require('../../utils/costCalculator');

const ANTHROPIC_API_URL = anthropic.apiUrl;
const MODEL             = anthropic.model;
const VERSION           = anthropic.version;
const MODEL_KEY         = 'anthropic';

async function callAnthropic(prompt, { temperature, max_tokens }) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY in environment');
  }

  const body = {
    model:       MODEL,
    max_tokens,
    temperature,
    messages:   [{ role: 'user', content: prompt }],
  };

  const start = Date.now();
  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'x-api-key':         process.env.ANTHROPIC_API_KEY,
      'anthropic-version': VERSION,
      'content-type':      'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API error [${res.status}]: ${text}`);
  }

  const json = await res.json();
  const duration_ms = Date.now() - start;

  const contentArray = json.content;
  if (!Array.isArray(contentArray)) {
    throw new Error('Unexpected Anthropic response format');
  }
  const text = contentArray.map((c) => c.text).join('');

  const promptTokens     = json.usage?.input_tokens;
  const completionTokens = json.usage?.output_tokens;
  if (typeof promptTokens !== 'number' || typeof completionTokens !== 'number') {
    throw new Error('Missing usage tokens in Anthropic response');
  }

  const cost = calculateCost(MODEL_KEY, promptTokens, completionTokens);

  return {
    text:        text,
    model_name:  MODEL,
    usage:       { prompt_tokens: promptTokens, completion_tokens: completionTokens },
    cost,
    duration_ms
  };
}

module.exports = { callAnthropic };
