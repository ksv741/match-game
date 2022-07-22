import React, { useEffect, useState } from 'react';
import { useMatchGame } from '../../../context/MatchGameContext';
import { getTimeString } from '../../../utils';
import cls from './Timer.module.scss'

type TimerProps = {
  startTime: number;
  isStarted: boolean;
  isFinished: boolean;
}

const Timer: React.FC<TimerProps> = ({startTime, isStarted, isFinished}) => {
  const [time, setTime] = useState(startTime);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timer | null>(null)
  const {changeGameTime} = useMatchGame();

  useEffect(() => {
    if (!isStarted) return;

    setTimeInterval(setInterval(() => setTime(prev => prev + 1000), 1000));
  }, [isStarted])

  useEffect(() => {
    clearInterval(timeInterval as NodeJS.Timeout);
  }, [isFinished])

  useEffect(() => {
    changeGameTime?.(time);
  }, [time])

  return (
    <div>
      <p className={cls.Timer}>{getTimeString(new Date(time))}</p>
    </div>
  );
};

export default Timer;
