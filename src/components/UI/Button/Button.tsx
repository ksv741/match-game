import React from 'react';
import cls from './Button.module.scss';

type ButtonProps = {
  className?: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({children, className, onClick}) => {
  return (
    <button className={[cls.Button, className].join('')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
