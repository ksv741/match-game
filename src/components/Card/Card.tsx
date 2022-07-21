import React, {useMemo} from 'react';
import cls from './Card.module.scss'

export type CardProps = {
  title: string;
  code: string;
  onReverse?: (a: any) => void;
  imageURL: string;
  id: string;
  toggled: boolean;
  disabled: boolean;
  isMatched: boolean;
}

const Card: React.FC<CardProps> = (props) => {

  const canClick = useMemo(() => {
    return !props.disabled && !props.isMatched
  }, [props.disabled, props.isMatched]);

  const classes = useMemo(() => {
    return props.toggled ? [cls.Card, cls.reverse] : [cls.Card];
  }, [props.toggled])

  return (
    <div className={cls.CardWrapper} style={{
      opacity: props.isMatched ? 0 : 1
    }}>
      <div className={classes.join(' ')} onClick={() => canClick && props.onReverse?.(props)}>
        <div className={cls.frontside}>{props.title}</div>
        <div className={cls.backside}>
          <img src={props.imageURL} alt={props.title}/>
        </div>
      </div>
    </div>
  );
};

export default Card;
