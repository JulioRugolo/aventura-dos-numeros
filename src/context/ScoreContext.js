import React, { createContext, useContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(() => {
    const localData = localStorage.getItem('score');
    return localData ? parseInt(localData, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('score', score);
  }, [score]);

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
