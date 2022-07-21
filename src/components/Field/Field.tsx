import BottomPanel from '../BottomPanel/BottomPanel';
import Alert from '../Alert/Alert';
import React, { useEffect, useState } from 'react';
import Card, { CardProps } from '../Card/Card';
import cls from './Field.module.scss';
import { v4 as uuidv4 } from 'uuid';

const Field: React.FC = () => {

  const img = {
    react: 'https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png',
    js: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png',
    angular: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
  }

  function matchHandler(prev: CardProps, card: CardProps) {
    setAlertState(true);
    setCards(prevState => prevState.map(el => {
      if (el.id === card.id || el.id === prev.id) return {...el, disabled: true, isMatched: true}
      else return {...el, disabled: true}
    }))
    setTimeout(enableCards, 1000)
  }

  function notMatchHandler() {
    setAlertState(false);
    setMistakesCount(prev => prev + 1);
    disableCards();
    setTimeout(() => {
      setAlertState(null);
      setCards(prevState => prevState.map(el => {
        return {...el, toggled: false, disabled: false, isMatched: false};
      }))
    }, 1000)
  }

  function reverseCardHandler(card: CardProps) {
    setCards(prevState => prevState.map(el => el.id === card.id ? {...el, toggled: !el.toggled, disabled: true} : el))

    setCurrentCard(prev => {
      if (!prev) return card;
      else {
        if (prev.code === card.code) matchHandler(prev, card);
        else notMatchHandler();

        return null;
      }
    });
  }

  function disableCards() {
    setCards(prevState => prevState.map(el => ({...el, disabled: true})));
  }

  function enableCards() {
    setAlertState(null);
    setCards(prevState => prevState.map(el => ({...el, disabled: false})));
  }

  function showCards() {
    setCards(prevState => prevState.map(el => ({...el, toggled: true})));
  }

  function hideCards() {
    setCards(prevState => prevState.map(el => ({...el, toggled: false})));
  }

  function hideCard(id: string) {
    setCards(prevState => prevState.map((el) => (
       el.id === id ? {...el, toggled: false} : el
    )))
  }

  function createCard (title: string, code: string, imageURL: string): CardProps {
    return {id: uuidv4(), title, code, imageURL, onReverse: reverseCardHandler, toggled: true, disabled: false, isMatched: false};
  }

  const [currentCard, setCurrentCard] = useState<CardProps | null>(null)

  const [alertState, setAlertState] = useState<boolean | null>(null);

  const [cards, setCards] = useState<CardProps[]>(randomizeElementInArray([
    createCard('1', 'react', img.react),
    createCard('2', 'angular', img.angular),
    createCard('3', 'angular', img.angular),
    createCard('4', 'react', img.react),
    createCard('5', 'vue', img.js),
    createCard('6', 'angular', img.angular),
    createCard('7', 'react', img.react),
    createCard('8', 'vue', img.js),
    createCard('9', 'angular', img.angular),
    createCard('10', 'react', img.react),
    createCard('11', 'vue', img.js),
    createCard('12', 'vue', img.js),
  ]));

  const [isGameFinished, setGameFinish] = useState<boolean>(false);

  const [isGameStarted, setGameStart] = useState<boolean>(false);

  const [mistakesCount, setMistakesCount] = useState<number>(0);


  useEffect(() => {
    const isFinished = cards.reduce((res, cur) => res = res && cur.isMatched, true);
    isFinished && setTimeout(() => setGameFinish(true), 1500);
  }, [cards]);

  useEffect(() => {
    showCards();
  }, [])

  function renderCards() {
    return cards.map((el, index) => <Card key={el.id} {...el} title={index + 1 + ''} disabled={isGameStarted ? el.disabled : true}></Card>);
  }

  function renderAlert(state: boolean | null) {
    if (state === null) return;

    if (state) return <Alert success={true}/>;

    return <Alert success={false}/>
  }

  function startGame() {
    setGameStart(true);
    cards.forEach((card, index) => {
      setTimeout(() => hideCard(card.id), index*100)
    })
  }

  function retryGame() {
    setGameFinish(false);
    setGameStart(false);
    setCards(prev => randomizeElementInArray(prev.map(el => ({...el, disabled: false, isMatched: false, toggled: true}))))
  }

  function getWrapperClassList() {
    let classes = [cls.Field];

    if (isGameFinished) classes = [cls.FieldFinish];

    return classes;
  }


  return (
    <>
      <div className={getWrapperClassList().join(' ')} style={{marginBottom: 20}}>
        {
          isGameFinished
            ? (
              <div className={cls.FinishBlock}>
                <h1>GAME IS FINISHED !</h1>
                <p>Время: <span>10:10</span></p>
                <p>Количество ошибок: <span>{mistakesCount}</span></p>
                <p>Сложность: <span>Легко</span></p>
                <p>Размер поля: <span>4х4</span></p>
              </div>
            )
            : (
              <>
                {renderCards()}
                {renderAlert(alertState)}
              </>
            )
        }
      </div>
      {<BottomPanel start={startGame} isFinishedGame={isGameFinished} retry={retryGame}/>}
    </>

  );
};

function randomizeElementInArray (arr: any[]) {
  return arr.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  })
}

export default Field;
