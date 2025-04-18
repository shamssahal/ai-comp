const { callOpenAi }    = require('./llm/openAi');
const { callAnthropic } = require('./llm/anthropic');
const { callXai }       = require('./llm/xAi');


async function generateForModels(models, prompt, options) {
  const calls = models.map((m) => {
    switch (m) {
      case 'open_ai':
        return callOpenAi(prompt, options);
      case 'anthropic':
        return callAnthropic(prompt, options);
      case 'x_ai':
        return callXai(prompt, options);
      default:
        return Promise.reject(new Error(`Unknown model "${m}"`));
    }
  });

  const settled = await Promise.allSettled(calls);

  return settled.map((r, idx) => ({
    model: models[idx],
    status: r.status,
    data:   r.status === 'fulfilled' ? r.value : undefined,
    error:  r.status === 'rejected'  ? r.reason.message : undefined,
  }));
}

module.exports = { generateForModels };
