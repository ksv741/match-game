import CardsField from 'components/CardsField/CardsField';
import FinishedField from 'components/FinishedField/FinishedField';

import BottomPanel from 'components/UI/BottomPanel/BottomPanel';
import Button from 'components/UI/Button/Button';
import Timer from 'components/UI/Timer/Timer';
import { useMatchGame } from 'context/MatchGameContext';
import React, { useEffect, useState } from 'react';
import { createCards, randomizeElementInArray } from 'src/utils';

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
    setCurrentMenuItem,
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
  }, [isNewGame, resetGameProgress])

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
    setIsGameFinished?.(false);
    setIsGameStarted?.(false);
    setIsTimerStarted?.(false);
    setCards(prev => randomizeElementInArray(prev.map(el => ({...el, disabled: true, isMatched: false, toggled: true}))))

    resetGameProgress?.();
  }

  function finishGame() {
    setIsGameFinished?.(true);
    localStorage.removeItem('match-game:cards');
  }

  function shuffleCards() {
    setCards(randomizeElementInArray([...cards]));
  }

  function goToMenu() {
    setIsGameStarted?.(false);
    setCurrentMenuItem?.('menu');
  }

  function renderRetryStatePanel() {
    return (
      <>
        <Button onClick={goToMenu}>&#8678;</Button>
        <Button onClick={retryGame}>RETRY</Button>
      </>
    )
  }

  function renderStartStatePanel() {
    return isTimerStarted
      ? <>
        <Button onClick={goToMenu}>&#8678;</Button>
        <Timer isStarted={isTimerStarted} startTime={gameTime || 0} isFinished={isTimerStopped} changeTime={changeGameTime}/>
      </>
      : <>
        <Button onClick={goToMenu}>&#8678;</Button>
        <Button onClick={startGame}>{isNewGame ? 'START' : 'Continue'}</Button>
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
    <>
      <div style={{marginBottom: 20}}>
        {
          isGameFinished
            ? <FinishedField gameTime={gameTime} mistakesCount={mistakesCount} difficultyLevel={diffLevel} fieldSize={filedSize}/>
            : <CardsField cards={cards} isGameStarted={isGameStarted} finishGameCallback={finishGame} isNewGame={isNewGame}/>
        }
      </div>
      <BottomPanel>
        { renderPanelByState(panelState) }
      </BottomPanel>
    </>

  );
};

export default MatchGame;
