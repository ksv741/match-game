import Button from 'components/UI/Button/Button';
import React from 'react';

import cls from './Options.module.scss'

interface OptionProps {
  text: string;
  value: string;
  onChange: (type: 'next' | 'prev') => void;
}

const Option:React.FC<OptionProps> = ({value, text, onChange}) => {
  return (
    <div className={cls.Option}>
      <div>
        {text}
      </div>
      <div className={cls.selectGroup}>
        <Button className={cls.button} onClick={() => onChange('prev')}>&#10094;</Button>
        <span>{value}</span>
        <Button className={cls.button} onClick={() => onChange('next')}>&#10095;</Button>
      </div>
    </div>

  );
};

export default Option;
