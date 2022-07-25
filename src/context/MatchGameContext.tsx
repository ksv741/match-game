import React, { useContext, useState } from 'react';
import { getTimeString } from 'src/utils';

export type MenuItem = 'menu' | 'new-game' | 'continue-game' | 'options' | 'exit';

interface MatchGameContextType {
  mistakesCount?: number;
  addMistakesCount?: () => void;
  gameTime?: number;
  changeGameTime?: (time: number) => void;
  resetGameProgress?: () => void;
  currentMenuItem?: MenuItem;
  setCurrentMenuItem?: (item: MenuItem) => void;
  isGameStarted?: boolean;
  setIsGameStarted?: (status: boolean) => void;
  isGameFinished?: boolean;
  setIsGameFinished?: (status: boolean) => void;
}
const MatchGameContext = React.createContext<MatchGameContextType>({});
export const useMatchGame = () => useContext(MatchGameContext);

export const MatchGameProvider: React.FC = ({children}) => {
  const [mistakesCount, setMistakesCount] = useState(0)
  const [gameTime, setGameTime] = useState(0);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>('menu');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const addMistakesCount = () => {
    return setMistakesCount(prev => prev + 1)
  };

  const changeGameTime = (time: number) => {
    setGameTime(time);
  }

  const resetGameProgress = () => {
    setMistakesCount(0);
    setGameTime(0);
    setIsGameStarted(false);
    setIsGameFinished(false);
  }

  return (
    <MatchGameContext.Provider value={{
      mistakesCount,
      addMistakesCount,
      gameTime,
      changeGameTime,
      resetGameProgress,
      currentMenuItem,
      setCurrentMenuItem,
      isGameStarted,
      setIsGameStarted,
      isGameFinished,
      setIsGameFinished
    }}>
      {children}
    </MatchGameContext.Provider>
  )
}
