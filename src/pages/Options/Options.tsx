import GoToMenuButton from 'components/GoToMenuButton/GoToMenuButton';
import BottomPanel from 'components/UI/BottomPanel/BottomPanel';
import Button from 'components/UI/Button/Button';
import { useMatchGame } from 'context/MatchGameContext';
import React, { useState } from 'react';
import Option from 'src/pages/Options/Option';

import cls from './Options.module.scss'

export type OptionsType = {
  diffLevel: number;
  size: number;
}

export enum DiffLevel {
  Easy,
  Normal,
  Hard
}

export enum FieldSize {
  Small,
  Normal,
  Big
}

const Options: React.FC = () => {
  const {saveOptions, setCurrentMenuItem, diffLevel, resetGameProgress, filedSize} = useMatchGame();

  const [size, setSize] = useState(filedSize || FieldSize.Small);
  const [difficultLevel, setDifficultLevel] = useState(diffLevel || DiffLevel.Easy);

  function saveOptionHandler() {
    saveOptions?.({
      diffLevel: difficultLevel,
      size
    });
    resetGameProgress?.();
    setCurrentMenuItem?.('menu');
  }

  function changeFieldSize(type: 'prev' | 'next') {
    const size = Object.values(FieldSize).length/2;

    if (type === 'next') setSize(prev => prev + 1 === size ? 0 : prev + 1);
    if (type === 'prev') setSize(prev => prev === 0 ? size - 1 : prev - 1);
  }

  function changeDiffLevel(type: 'prev' | 'next') {
    const size = Object.values(DiffLevel).length/2;

    if (type === 'next') setDifficultLevel(prev => prev + 1 === size ? 0 : prev + 1);
    if (type === 'prev') setDifficultLevel(prev => prev === 0 ? size - 1 : prev - 1);
  }

  return (
    <>
      <div className={cls.Options}>
        <h2>Options</h2>
        <ul>
          <li><Option text={'Size'} value={FieldSize[size]} onChange={changeFieldSize}/></li>
          <li><Option text={'Difficult level'} value={DiffLevel[difficultLevel]} onChange={changeDiffLevel}/></li>
        </ul>
      </div>
      <BottomPanel>
        <GoToMenuButton/>
        <Button onClick={saveOptionHandler}>Save</Button>
      </BottomPanel>
    </>
  );
};

export default Options;
