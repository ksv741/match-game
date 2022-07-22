import React, { useState } from 'react';
import { cardImages } from '../../constants';
import { useMatchGame } from '../../context/MatchGameContext';
import { randomizeElementInArray } from '../../utils';
import BottomPanel from '../BottomPanel/BottomPanel';
import CardsField from '../CardsField/CardsField';
import FinishedField from '../FinishedField/FinishedField';
import cls from './MatchGame.module.scss';

const MatchGame: React.FC = () => {
  // TODO replace to CardsField
  const [cards, setCards] = useState<any[]>(randomizeElementInArray([
    {code: 'react', imageURL: cardImages.react},
    {code: 'angular', imageURL: cardImages.angular},
    {code: 'js', imageURL: cardImages.js},
    {code: 'react', imageURL: cardImages.react},
    {code: 'angular', imageURL: cardImages.angular},
    {code: 'js', imageURL: cardImages.js},
  ]));

  const [isGameFinished, setGameFinish] = useState<boolean>(false);
  const [isGameStarted, setGameStart] = useState<boolean>(false);

  const {gameTime, mistakesCount, resetGameProgress} = useMatchGame();

  function startGame() {
    setGameStart(true);
  }

  function retryGame() {
    setGameFinish(false);
    setGameStart(false);
    setCards(prev => randomizeElementInArray(prev.map(el => ({...el, disabled: false, isMatched: false, toggled: true}))))

    resetGameProgress?.();
  }

  function finishGame() {
    setGameFinish(true);
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
            : <CardsField cards={cards} isGameStarted={isGameStarted} finishGameCallback={finishGame}/>
        }
      </div>
      <BottomPanel startGame={startGame} isFinishedGame={isGameFinished} retryGame={retryGame} shuffleCards={shuffleCards}/>
    </>

  );
};

export default MatchGame;
