// File: src/App.js
import React, { useState, useContext } from 'react';
import TopBar       from './components/TopBar';
import LeftBar      from './components/LeftBar';
import RightBar     from './components/RightBar';
import ControlPanel from './components/ControlPanel';
import PromptArea   from './components/PromptArea';
import PromptResponse from './components/PromptResponse';
import { ResponseContext } from './context/ResponseContext';

function App() {

  const [models, setModels]           = useState(['open_ai','anthropic','x_ai']);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens]     = useState(150);


  const { currentRequest, setCurrentRequest } = useContext(ResponseContext);

  const { prompt = '', results = [] } = currentRequest || {};

  const handleGenerate = (apiResponse) => {

    const {
      request_id,
      timestamp,
      prompt,
      models,
      temperature,
      maxTokens,
      results
    } = apiResponse;
  

    const normalized = results.map((r) => {
      const data = r.data || {};
      return {
        model:       r.model,
        text:        data.text,
        usage:       data.usage,
        cost:        data.cost,
        duration_ms: data.duration_ms
      };
    });
  
    setCurrentRequest({
      request_id,
      timestamp,
      prompt,
      models,
      temperature,
      maxTokens,
      results: normalized
    });
  };
  
const handleHistorySelect = (fullRecord) => {
    const {
      requestId:  request_id,
      timestamp,
      prompt,
      models,
      temperature,
      max_tokens: maxTokens,
      results
    } = fullRecord;
  
    const normalized = results.map((r) => ({
      model:       r.model,
      text:        r.text,
      usage:       { prompt_tokens: r.prompt_tokens, completion_tokens: r.completion_tokens },
      cost:        { prompt_cost: r.prompt_cost, completion_cost: r.completion_cost, total_cost: r.total_cost },
      duration_ms: r.duration_ms
    }));
  
    setCurrentRequest({
      request_id,
      timestamp,
      prompt,
      models,
      temperature,
      maxTokens,
      results: normalized
    });
  };

  console.log(currentRequest)

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftBar onSelect={handleHistorySelect} />

        <main className="flex flex-col flex-1 min-h-0 overflow-hidden p-6 space-y-8">
          <ControlPanel
            models={models}
            setModels={setModels}
            temperature={temperature}
            setTemperature={setTemperature}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
          />
          <PromptArea
            prompt={prompt}
            setPrompt={(newPrompt) =>
              setCurrentRequest({ ...currentRequest, prompt: newPrompt })
            }
            models={models}
            temperature={temperature}
            maxTokens={maxTokens}
            onGenerate={handleGenerate}
          />

          <div className="flex-1 min-h-0 overflow-hidden">
            <PromptResponse models={models} responses={results} />
          </div>
        </main>

        <RightBar />
      </div>
    </div>
  );
}

export default App;
