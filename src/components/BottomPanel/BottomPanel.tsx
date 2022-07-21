import React, { useEffect, useState } from 'react';
import cls from './BottomPanel.module.scss';

type BottomPanelProps = {
  start: () => void;
  retry?: () => void;
  isFinishedGame?: boolean;
}

const BottomPanel: React.FC<BottomPanelProps> = (props) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout>();


  function onStartBtnClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setStartTime(0);
    const interval = setInterval(() => {
      setStartTime(prev => prev !== null ? prev + 1000 : 0)
    }, 1000);
    setTimeInterval(interval);
    props.start();
  }

  useEffect(() => {
    clearInterval(timeInterval)
  }, [props.isFinishedGame])

  function renderActiveStatePanel() {
    return startTime !== null
      ? <p className={cls.Timer}>{getTimeString(new Date(startTime))}</p>
      : <button className={cls.StartButton} onClick={onStartBtnClickHandler}>START</button>
  }

  function onRetryBtnClickHandler() {
    setStartTime(null);
    props.retry?.();
  }

  function renderRetryButton() {
    return (
      <>
        <button className={cls.StartButton} onClick={onRetryBtnClickHandler}>Retry</button>
      </>
    )
  }

  return (
    <div className={cls.BottomPanel}>
      { props.isFinishedGame ? renderRetryButton() : renderActiveStatePanel() }
    </div>
  );
};

function getTimeString(time: Date): string {
  let minutes = time.getMinutes().toString();
  if (+minutes < 10) minutes = '0' + minutes;

  let seconds = time.getSeconds().toString();
  if (+seconds < 10) seconds = '0' + seconds;

  return `${minutes}:${seconds}`
}

export default BottomPanel;
