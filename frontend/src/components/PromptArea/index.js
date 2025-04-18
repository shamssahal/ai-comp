import React, { useState, useContext } from 'react';
import { generate } from '../../api/client';
import { ResponseContext } from '../../context/ResponseContext';

export default function PromptArea({ models, temperature, maxTokens }) {
  const { loading, setLoading, currentRequest, setCurrentRequest } = useContext(ResponseContext);
  const req    = currentRequest || {};
  const prompt = req.prompt || '';
  const setPrompt = (newPrompt) =>
  setCurrentRequest({ ...req, prompt: newPrompt });
  const [error, setError]     = useState(null);
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await generate({
        model: models,
        prompt,
        temperature,
        max_tokens: maxTokens,
      });

      const normalized = (res.results || []).map((r) => ({
        model:       r.model,
        text:        r.data.text,
        usage:       r.data.usage,
        cost:        r.data.cost,
        duration_ms: r.data.duration_ms,
      }));

      setCurrentRequest({
        requestId:   res.request_id,
        timestamp:   res.timestamp,
        prompt,             // now safe
        models,
        temperature,
        maxTokens,
        results:     normalized,
      });
    } catch (e) {
      console.error('Generate error', e);
      setError('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 mt-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt here"
        className="max-w-3xl w-full h-12 px-4 text-lg shadow-lg rounded-full resize-none placeholder-gray-500 text-center leading-[3rem] border border-gray-200 mx-auto"
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt}
        className="mx-auto text-white px-8 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 hover:opacity-90"
      >
        {loading ? 'Loading...' : 'Generate'}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
