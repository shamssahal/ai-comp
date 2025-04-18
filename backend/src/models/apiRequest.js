// src/models/apiRequest.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveRequest({
  requestId,
  timestamp,
  prompt,
  models,
  temperature,
  max_tokens,
  results
}) {

  const createResults = results.map((r) => ({
    model:             r.model,
    status:            r.status,
    text:              r.data.text,
    model_name:        r.data.model_name,
    prompt_tokens:     r.data.usage.prompt_tokens,
    completion_tokens: r.data.usage.completion_tokens,
    prompt_cost:       r.data.cost.prompt_cost,
    completion_cost:   r.data.cost.completion_cost,
    total_cost:        r.data.cost.total_cost,
    duration_ms:       r.data.duration_ms,
  }));

  return prisma.apiRequest.create({
    data: {
      requestId,
      timestamp: new Date(timestamp),
      prompt,
      models,
      temperature,
      max_tokens,
      results: {
        create: createResults
      }
    },
    include: { results: true }
  });
}

module.exports = { saveRequest };
