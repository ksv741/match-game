import React from 'react';
import { DiffLevel, FieldSize } from 'src/pages/Options/Options';
import { getTimeString } from 'src/utils';

import cls from './FinishedField.module.scss';

type FinishedFieldProps = {
  mistakesCount?: number;
  gameTime?: number;
  difficultyLevel?: number;
  fieldSize?: number;
}

const FinishedField: React.FC<FinishedFieldProps> = ({mistakesCount, gameTime, difficultyLevel, fieldSize}) => {
  return (
    <div className={cls.FinishedField}>
      <h1>GAME IS FINISHED !</h1>
      <p>Время: <span>{getTimeString(new Date(gameTime || 0))}</span></p>
      <p>Количество ошибок: <span>{mistakesCount}</span></p>
      <p>Сложность: <span>{DiffLevel[difficultyLevel as any]}</span></p>
      <p>Размер поля: <span>{FieldSize[fieldSize as any]}</span></p>
    </div>
  );
};

export default FinishedField;
