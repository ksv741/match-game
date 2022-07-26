import React, { useContext, useState } from 'react';
import { DiffLevel, FieldSize, OptionsType } from 'src/pages/Options/Options';

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
  filedSize?: number;
  diffLevel?: number;
  saveOptions?: (options: OptionsType) => void;
}
const MatchGameContext = React.createContext<MatchGameContextType>({});
export const useMatchGame = () => useContext(MatchGameContext);

function getInitialSize() {
  const sizeFromLocalStorage = localStorage.getItem('match-game:size');
  return sizeFromLocalStorage ? JSON.parse(sizeFromLocalStorage) : FieldSize.Small;
}

function getInitialDiffLevel() {
  const diffLevelFromLocalStorage = localStorage.getItem('match-game:diffLevel');
  return diffLevelFromLocalStorage ? JSON.parse(diffLevelFromLocalStorage) : DiffLevel.Easy;
}

function getInitialTime() {
  const timeFromLocalStorage = localStorage.getItem('match-game:time');
  return timeFromLocalStorage ? JSON.parse(timeFromLocalStorage) : 0;
}

function getInitialMistakesCount() {
  const mistakesCountFromLocalStorage = localStorage.getItem('match-game:mistakesCount');
  return mistakesCountFromLocalStorage ? JSON.parse(mistakesCountFromLocalStorage) : 0;
}

export const MatchGameProvider: React.FC = ({children}) => {
  const [mistakesCount, setMistakesCount] = useState<number>(getInitialMistakesCount)
  const [gameTime, setGameTime] = useState<number>(getInitialTime);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>('menu');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [filedSize, setFieldSize] = useState<number>(getInitialSize);
  const [diffLevel, setDiffLevel] = useState<number>(getInitialDiffLevel);

  const addMistakesCount = () => {
    localStorage.setItem('match-game:mistakesCount', JSON.stringify(mistakesCount + 1));
    return setMistakesCount(prev => prev + 1)
  };

  const changeGameTime = (time: number) => {
    setGameTime(time);
    localStorage.setItem('match-game:time', JSON.stringify(time));
  }

  const resetGameProgress = () => {
    setMistakesCount(0);
    setGameTime(0);
    setIsGameStarted(false);
    setIsGameFinished(false);

    localStorage.removeItem('match-game:cards');
    localStorage.removeItem('match-game:time');
    localStorage.removeItem('match-game:mistakesCount');
  }

  const saveOptions = (options: OptionsType) => {
    setFieldSize(options.size);
    setDiffLevel(options.diffLevel);

    localStorage.setItem('match-game:size', JSON.stringify(options.size));
    localStorage.setItem('match-game:diffLevel', JSON.stringify(options.diffLevel));
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
      setIsGameFinished,
      filedSize,
      diffLevel,
      saveOptions
    }}>
      {children}
    </MatchGameContext.Provider>
  )
}
