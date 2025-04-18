const { randomUUID } = require('crypto');
const { generateForModels } = require('../services/generateService');
const { saveRequest } = require('../models/apiRequest');

const DEFAULT_TEMPERATURE = 0;
const DEFAULT_MAX_TOKENS  = 1500;

async function handleGenerate(req, res) {
  const requestId = randomUUID();
  const timestamp = new Date().toISOString();

  const {
    model,
    prompt,
    temperature = DEFAULT_TEMPERATURE,
    max_tokens  = DEFAULT_MAX_TOKENS,
  } = req.body;


  if (!Array.isArray(model) || typeof prompt !== 'string') {
    return res
      .status(400)
      .json({ error: '`model` must be string[] and `prompt` must be string' });
  }
  if (typeof temperature !== 'number' || temperature < 0 || temperature > 2) {
    return res
      .status(400)
      .json({ error: '`temperature` must be a number between 0 and 2' });
  }
  if (!Number.isInteger(max_tokens) || max_tokens <= 0) {
    return res
      .status(400)
      .json({ error: '`max_tokens` must be a positive integer' });
  }

  try {
    const results = await generateForModels(
      model,
      prompt,
      { temperature, max_tokens }
    );

    await saveRequest({
        requestId,
        timestamp,
        prompt,
        models: model,
        temperature,
        max_tokens,
        results
        });
        
    return res.json({
      request_id: requestId,
      timestamp,
      results
    });
  } catch (err) {
    console.error(`[${requestId}] generate error:`, err);
    return res.status(500).json({
      request_id: requestId,
      timestamp,
      error: 'Internal server error'
    });
  }
}

module.exports = { handleGenerate };
