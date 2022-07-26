import React from 'react';
import cls from './Button.module.scss';

type ButtonProps = {
  className?: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({children, className, style, onClick}) => {
  return (
    <button className={[cls.Button, className].join(' ')} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
