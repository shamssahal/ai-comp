// src/utils/costCalculator.js
const configs = require('../services/llm/config.json');

const TOKENS_PER_MILLION = 1_000_000;

function round8(n) {
    return parseFloat(n.toFixed(8));
  }
function calculateCost(modelKey, promptTokens, completionTokens) {
  const cfg = configs[modelKey];
  if (!cfg) {
    throw new Error(`No pricing config found for model "${modelKey}"`);
  }

  const promptUnitPrice     = cfg.prompt_token_price     / TOKENS_PER_MILLION;
  const completionUnitPrice = cfg.completion_token_price / TOKENS_PER_MILLION;

  const promptCost     = promptTokens     * promptUnitPrice;
  const completionCost = completionTokens * completionUnitPrice;
  const totalCost      = promptCost + completionCost;

  return {
    prompt_cost:       round8(promptCost),
    completion_cost:   round8(completionCost),
    total_cost:        round8(totalCost),
  };
}

module.exports = { calculateCost };
