import React from 'react';

import cls from './FinishedField.module.scss';

type FinishedFieldProps = {
  mistakesCount?: number;
  gameTime?: string;
}

const FinishedField: React.FC<FinishedFieldProps> = ({mistakesCount, gameTime}) => {
  return (
    <div className={cls.FinishedField}>
      <h1>GAME IS FINISHED !</h1>
      <p>Время: <span>{gameTime}</span></p>
      <p>Количество ошибок: <span>{mistakesCount}</span></p>
      <p>Сложность: <span>difficultyLevel</span></p>
      <p>Размер поля: <span>fieldSize</span></p>
    </div>
  );
};

export default FinishedField;
