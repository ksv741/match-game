import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useMatchGame } from 'context/MatchGameContext';
import Card, { CardComponentProps } from 'components/Card/Card';

import cls from './CardsField.module.scss';

type CardProps = {
  code: string;
  imageURL: string;
}

type CardsFieldProps = {
  cards: CardProps[];
  isGameStarted?: boolean;
  finishGameCallback: () => void;
  isNewGame: boolean;
}

type CardHandlerType =
  'disableAll' |
  'enableAll' |
  'showAll' |
  'hideAll';

type CurrentCardPareType = {
  first: CardComponentProps | null;
  second: CardComponentProps | null;
}

const CardsField: React.FC<CardsFieldProps> = ({cards, isGameStarted = false, finishGameCallback, isNewGame}) => {
  // TODO use useReducer
  const [cardsState, setCardsState] = useState<CardComponentProps[]>(getInitialConfig(isNewGame));
  const [currentCardPare, setCurrentCardPare] = useState<CurrentCardPareType>({first: null, second: null})

  const {addMistakesCount} = useMatchGame();

  function getInitialConfig(isNewGame: boolean): CardComponentProps[] {
    if (!isNewGame) {
      const config = localStorage.getItem('match-game:cards');

      if (config) return (JSON.parse(config) as CardComponentProps[]).map(el => ({...el, disabled: true, toggled: false}));
    }

    return cards.map(el => createCard(el))
  }

  function matchHandler(prev: CardComponentProps, card: CardComponentProps) {
    setCardsState(prevState => prevState.map(el => {
      if (el.id === card.id || el.id === prev.id) return {...el, disabled: true, isMatched: true}
      else return {...el, disabled: true}
    }));
    setTimeout(() => cardsHandler('enableAll'), 500)
  }

  function notMatchHandler() {
    cardsHandler('disableAll');
    addMistakesCount?.();
    setTimeout(() => {
      setCardsState(prevState => prevState.map(el => {
        return {...el, toggled: false, disabled: false, isMatched: false};
      }))
    }, 1000);
  }

  function cardsHandler(type: CardHandlerType) {
    switch (type) {
      case 'disableAll':
        setCardsState(prevState => prevState.map(el => ({...el, disabled: true})));
        return;
      case 'enableAll':
        setCardsState(prevState => prevState.map(el => ({...el, disabled: false})));
        return;
      case 'showAll':
        setCardsState(prevState => prevState.map(el => ({...el, toggled: true})));
        return;
      case 'hideAll':
        setCardsState(prevState => prevState.map(el => ({...el, toggled: false})));
        return;
      default: return;
    }
  }

  const cardClickHandler = useCallback((id: string) => {
    const targetCard = cardsState.find(el => el.id === id);
    if (!targetCard) return;
    setCardsState(prevState => prevState.map(el => el.id === id ? {...el, toggled: !el.toggled, disabled: true} : el))
    setCurrentCardPare(prev => {
      if (!prev.first) return {first: targetCard, second: null};
      if (prev.first && !prev.second) return {...prev, second: targetCard};

      return {first: targetCard, second: null}
    })
  }, [cardsState])

  function isAllCardsMatched(cards: CardComponentProps[]) {
    return cards.reduce((res, cur) => (res && cur.isMatched), true)
  }

  useEffect(() => {
    if (isAllCardsMatched(cardsState)) setTimeout(finishGameCallback, 800);
    if (isGameStarted) localStorage.setItem('match-game:cards', JSON.stringify(cardsState));
  }, [cardsState])

  useEffect(() => {
    const {first, second} = currentCardPare;
    if (first && second) {
      if (first?.code === second?.code) matchHandler(first, second)
      else notMatchHandler();
    }
  }, [currentCardPare])

  useEffect(() => {
    setCardsState(prev => (prev.map(el => ({...el, disabled: !isGameStarted, toggled: !isGameStarted && isNewGame}))));
    if (isGameStarted) localStorage.setItem('match-game:cards', JSON.stringify(cardsState));
  }, [isGameStarted])

  useEffect(() => {
    if (isNewGame) setCardsState(cards.map(el => createCard(el)))
  }, [cards])

  function createCard (card: CardProps): CardComponentProps {
    return {
      id: uuidv4(),
      toggled: !isGameStarted,
      disabled: !isGameStarted,
      isMatched: false,
      ...card
    };
  }

  function renderCards() {
    return cardsState.map((el, index) => (
      <Card
        {...el}
        key={el.id}
        title={index + 1 + ''}
        onClick={() => cardClickHandler(el.id)}
      >
      </Card>
    ));
  }

  return (
    <div className={cls.CardsField}>
      {renderCards()}
    </div>
  );
};

export default CardsField;
