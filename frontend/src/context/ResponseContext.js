import React, { createContext, useState } from 'react';

export const ResponseContext = createContext({
  currentRequest: null,
  setCurrentRequest: () => {},
  loading: false,
  setLoading: () => {}
});

export function ResponseProvider({ children }) {
  const [currentRequest, setCurrentRequest] = useState(null);
  const [loading, setLoading]               = useState(false);

  return (
    <ResponseContext.Provider value={{
        currentRequest,
        setCurrentRequest,
        loading,
        setLoading}}>
      {children}
    </ResponseContext.Provider>
  );
}
