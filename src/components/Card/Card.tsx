import React, { useMemo, useState } from 'react';
import cls from './Card.module.scss'

export type CardComponentProps = {
  title?: string;
  imageURL: string;
  id: string;
  toggled: boolean;
  isMatched: boolean;
  disabled: boolean;
  onClick?: (id: string) => void;
  code?: string;
}

const Card: React.FC<CardComponentProps> = (props) => {
  const classes = [cls.Card, props.toggled ? cls.reverse : ''];

  function cardClickHandler(id: string) {
    if (props.disabled) return;

    props.onClick?.(id);
  }

  return (
    <div
      className={cls.CardWrapper}
      style={{opacity: props.isMatched ? 0 : 1}}
      onClick={() => cardClickHandler(props.id)}
    >
      <div className={classes.join(' ')}>
        <div className={cls.frontside}>{props.title}</div>
        <div className={cls.backside}>
          <img src={props.imageURL} alt={props.title}/>
        </div>
      </div>
    </div>
  );
};

export default Card;
