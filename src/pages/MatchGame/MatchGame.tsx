import GoToMenuButton from 'components/GoToMenuButton/GoToMenuButton';
import React, { useEffect, useState } from 'react';
import BottomPanel from 'components/UI/BottomPanel/BottomPanel';
import Button from 'components/UI/Button/Button';
import CardsField from 'components/CardsField/CardsField';
import FinishedField from 'components/FinishedField/FinishedField';
import Timer from 'components/UI/Timer/Timer';
import { createCards, randomizeElementInArray } from 'src/utils';
import { useMatchGame } from 'context/MatchGameContext';

import cls from './MatchGame.module.scss';

interface MatchGameProps {
  isNewGame: boolean;
}
type PanelState = 'start' | 'retry';

const MatchGame: React.FC<MatchGameProps> = ({isNewGame}) => {
  const {
    gameTime,
    mistakesCount,
    resetGameProgress,
    setIsGameStarted,
    setIsGameFinished,
    isGameFinished,
    isGameStarted,
    changeGameTime,
    diffLevel,
    filedSize
  } = useMatchGame();

  // TODO replace to CardsField
  const [cards, setCards] = useState<any[]>(randomizeElementInArray(createCards(diffLevel, filedSize)));
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>('start');

  useEffect(() => {
    if (isNewGame) resetGameProgress?.();
  }, [isNewGame])

  useEffect(() => {
    if (isGameFinished) {
      setIsTimerStopped(true);
      localStorage.removeItem('match-game:cards');
    }
    setPanelState(isGameFinished ? 'retry' : 'start');
  }, [isGameFinished])

  function startGame() {
    setIsGameStarted?.(true);
    setIsTimerStarted(true);
  }

  function retryGame() {
    setIsTimerStarted?.(false);
    resetGameProgress?.();

    setCards(prev => randomizeElementInArray(prev.map(el => ({...el, disabled: true, isMatched: false, toggled: true}))))
  }

  function finishGame() {
    setIsGameFinished?.(true);
    localStorage.removeItem('match-game:cards');
  }

  function shuffleCards() {
    setCards(randomizeElementInArray([...cards]));
  }

  function renderRetryStatePanel() {
    return (
      <>
        <GoToMenuButton/>
        <Button onClick={retryGame}>RETRY</Button>
      </>
    )
  }

  function renderStartStatePanel() {
    return isTimerStarted
      ? <>
        <GoToMenuButton/>
        <Timer isStarted={isTimerStarted} startTime={gameTime || 0} isFinished={isTimerStopped} changeTime={changeGameTime}/>
      </>
      : <>
        <GoToMenuButton/>
        <Button style={{width: 'auto', minWidth: '120px'}} onClick={startGame}>{isNewGame ? 'START' : 'CONTINUE'}</Button>
        {isNewGame && <Button onClick={shuffleCards}>SHUFFLE</Button>}
      </>
  }

  function renderPanelByState(state: PanelState) {
    if (!state) {
      console.error('Нет состояния у панели')
      return;
    }

    switch (state) {
      case 'start': return renderStartStatePanel();
      case 'retry': return renderRetryStatePanel();
      default: return;
    }
  }

  return (
    <div className={cls.MatchGameField}>
      <div style={{marginBottom: 20}}>
        {
          isGameFinished
            ? <FinishedField gameTime={gameTime} mistakesCount={mistakesCount} difficultyLevel={diffLevel} fieldSize={filedSize}/>
            : <CardsField cards={cards} isGameStarted={isGameStarted} finishGameCallback={finishGame} isNewGame={isNewGame}/>
        }
      </div>
      <BottomPanel style={{width: '100%'}}>
        { renderPanelByState(panelState) }
      </BottomPanel>
    </div>

  );
};

export default MatchGame;
