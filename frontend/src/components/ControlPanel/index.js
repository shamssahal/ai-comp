import React from 'react';

const MODEL_OPTIONS = [
  { label: 'OpenAI', value: 'open_ai' },
  { label: 'Anthropic', value: 'anthropic' },
  { label: 'xAI', value: 'x_ai' },
];

export default function ControlPanel({ models, setModels, temperature, setTemperature, maxTokens, setMaxTokens }) {
  const handleModelChange = (value) => {
    if (models.includes(value)) {
      setModels(models.filter((m) => m !== value));
    } else {
      setModels([...models, value]);
    }
  };

  return (
    <div className="bg-white py-2 px-4 border-b border-gray-200 flex space-x-6 w-full">
      {/* Models selection */}
      <div className="flex-1">
        <h3 className="font-semibold mb-2">Models</h3>
        <div className="flex space-x-6">
          {MODEL_OPTIONS.map((opt) => (
            <label key={opt.value} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                value={opt.value}
                checked={models.includes(opt.value)}
                onChange={() => handleModelChange(opt.value)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Temperature slider */}
      <div className="w-1/4">
        <h3 className="font-semibold mb-5">Temperature: {temperature}</h3>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Max tokens input */}
      <div className="w-1/4">
        <h3 className="font-semibold mb-2">Max Tokens</h3>
        <input
          type="number"
          min="1"
          value={maxTokens}
          onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  );
}