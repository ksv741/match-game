import React, { useContext, useState } from 'react';
import { getTimeString } from '../utils';

type MatchGameContextType = {
  mistakesCount?: number;
  addMistakesCount?: () => void;
  gameTime?: string;
  changeGameTime?: (time: number) => void;
  resetGameProgress?: () => void;
}
const MatchGameContext = React.createContext<MatchGameContextType>({});

export const useMatchGame = () => useContext(MatchGameContext);
export const MatchGameProvider: React.FC = ({children}) => {
  const [mistakesCount, setMistakesCount] = useState(0)
  const [gameTime, setGameTime] = useState('');

  const addMistakesCount = () => {
    return setMistakesCount(prev => prev + 1)
  };

  const changeGameTime = (time: number) => {
    setGameTime(getTimeString(new Date(time)));
  }

  const resetGameProgress = () => {
    setMistakesCount(0);
    setGameTime(getTimeString(new Date(0)));
  }

  return (
    <MatchGameContext.Provider value={{
      mistakesCount,
      addMistakesCount,
      gameTime,
      changeGameTime,
      resetGameProgress
    }}>
      {children}
    </MatchGameContext.Provider>
  )
}
