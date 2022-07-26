import React from 'react';
import Button from 'components/UI/Button/Button';
import { useMatchGame } from 'context/MatchGameContext';

import cls from './GoToMenuButton.module.scss';

const GoToMenuButton = () => {
  const {setCurrentMenuItem, setIsGameStarted} = useMatchGame();

  function onClickHandler() {
    setIsGameStarted?.(false);
    setCurrentMenuItem?.('menu')
  }

  return (
    <Button className={cls.Button} onClick={onClickHandler}>&#8678;</Button>
  );
};

export default GoToMenuButton;
