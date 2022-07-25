import React, { useEffect, useState } from 'react';

import BottomPanel from 'components/BottomPanel/BottomPanel';
import CardsField from 'components/CardsField/CardsField';
import FinishedField from 'components/FinishedField/FinishedField';
import { cardImages } from 'src/constants';
import { randomizeElementInArray } from 'src/utils';
import { useMatchGame } from 'context/MatchGameContext';

import cls from './MatchGame.module.scss'

interface MatchGameProps {
  isNewGame: boolean;
}

const MatchGame: React.FC<MatchGameProps> = ({isNewGame}) => {
  // TODO replace to CardsField
  const [cards, setCards] = useState<any[]>(randomizeElementInArray([
    {code: 'react', imageURL: cardImages.react},
    {code: 'angular', imageURL: cardImages.angular},
    {code: 'js', imageURL: cardImages.js},
    {code: 'react', imageURL: cardImages.react},
    {code: 'angular', imageURL: cardImages.angular},
    {code: 'js', imageURL: cardImages.js},
  ]));

  const {gameTime,
    mistakesCount,
    resetGameProgress,
    setIsGameStarted,
    setIsGameFinished,
    isGameFinished,
    isGameStarted
  } = useMatchGame();

  useEffect(() => {
    if (isNewGame) resetGameProgress?.();
  }, [isNewGame])

  function startGame() {
    setIsGameStarted?.(true);
  }

  function retryGame() {
    setIsGameFinished?.(false);
    setIsGameStarted?.(false);
    setCards(prev => randomizeElementInArray(prev.map(el => ({...el, disabled: true, isMatched: false, toggled: true}))))

    resetGameProgress?.();
  }

  function finishGame() {
    setIsGameFinished?.(true);
    localStorage.removeItem('match-game:cards');
  }

  // TODO replace to CardsField
  function shuffleCards() {
    setCards(randomizeElementInArray([...cards]));
  }

  function getWrapperClassList() {
    let classes = [cls.Field];

    if (isGameFinished) classes = [cls.FieldFinish];

    return classes;
  }

  return (
    <>
      <div className={getWrapperClassList().join(' ')} style={{marginBottom: 20}}>
        {
          isGameFinished
            ? <FinishedField gameTime={gameTime} mistakesCount={mistakesCount}/>
            : <CardsField cards={cards} isGameStarted={isGameStarted} finishGameCallback={finishGame} isNewGame={isNewGame}/>
        }
      </div>
      <BottomPanel startGame={startGame} isFinishedGame={isGameFinished} retryGame={retryGame} shuffleCards={shuffleCards} isNewGame={isNewGame}/>
    </>

  );
};

export default MatchGame;
