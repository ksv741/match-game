import { useMatchGame } from 'context/MatchGameContext';
import React, { useEffect, useState } from 'react';

import Button from 'components/UI/Button/Button';
import Timer from 'components/UI/Timer/Timer';

import cls from './BottomPanel.module.scss';

type BottomPanelProps = {
  startGame: () => void;
  retryGame: () => void;
  isFinishedGame?: boolean;
  shuffleCards: () => void;
}

type PanelState = 'start' | 'retry';

const BottomPanel: React.FC<BottomPanelProps> = (props) => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>('start');
  const {changeGameTime} = useMatchGame();

  function onStartBtnClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsTimerStarted(true);
    props.startGame();
  }

  useEffect(() => {
    setIsTimerStopped(true)
    setPanelState(props.isFinishedGame ? 'retry' : 'start')

  }, [props.isFinishedGame])

  function onRetryBtnClickHandler() {
    setIsTimerStarted(false);
    setIsTimerStopped(false);
    setPanelState('start');

    props.retryGame?.();
  }

  function renderRetryStatePanel() {
    return (
      <>
        <Button onClick={onRetryBtnClickHandler}>RETRY</Button>
      </>
    )
  }

  function onShuffleBtnClickHandler() {
    props.shuffleCards?.();
  }

  function renderStartStatePanel() {
    return isTimerStarted
      ? <Timer isStarted={isTimerStarted} startTime={0} isFinished={isTimerStopped} changeTime={changeGameTime}/>
      : <>
          <Button onClick={onStartBtnClickHandler}>START</Button>
          <Button onClick={onShuffleBtnClickHandler}>SHUFFLE</Button>
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
    <div className={cls.BottomPanel}>
      { renderPanelByState(panelState) }
    </div>
  );
};

export default BottomPanel;
