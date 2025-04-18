// File: src/components/PromptResponse/index.js
import React, { useRef, useEffect, useContext } from 'react';
import { ResponseContext } from '../../context/ResponseContext';
import ResponseItem from './ResponseItem';


export default function PromptResponse({ models = [], responses = []}) {
  const { loading } = useContext(ResponseContext);
  const contentRefs = useRef([]);

  useEffect(() => {
    const panelCount = models.length;
    const refs = contentRefs.current.slice(0, panelCount);

    function syncScroll(e) {
      const top = e.target.scrollTop;
      refs.forEach((r) => {
        if (r && r !== e.target) r.scrollTop = top;
      });
    }

    refs.forEach((r) => r && r.addEventListener('scroll', syncScroll));
    return () => {
      refs.forEach((r) => r && r.removeEventListener('scroll', syncScroll));
    };
  }, [models, responses]);

  return (
    <div className="flex gap-4 mt-6 h-[calc(67vh-4rem)]">
      {models.map((modelKey, idx) => {

        const match = responses.find((r) => r.model === modelKey);
        return (
          <ResponseItem
            key={modelKey}
            modelName={modelKey}
            text={match?.text ?? ''}
            loading={loading}
            innerRef={(el) => (contentRefs.current[idx] = el)}
          />
        );
      })}
    </div>
  );
}
