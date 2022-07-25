import { cardImages } from 'src/constants';
import { DiffLevel, FieldSize } from 'src/pages/Options/Options';

export type CardType = {code: string, imageURL: string};

export function randomizeElementInArray (arr: any[]) {
  return [...arr].sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  })
}

export function getTimeString(time?: Date): string {
  if (!time) return '';

  let minutes = time.getMinutes().toString();
  if (+minutes < 10) minutes = '0' + minutes;

  let seconds = time.getSeconds().toString();
  if (+seconds < 10) seconds = '0' + seconds;

  return `${minutes}:${seconds}`
}

export function createCards(diffLevel: DiffLevel = DiffLevel.Easy, size: FieldSize = FieldSize.Small): CardType[] {
  let arrSize = 6;
  switch (diffLevel) {
    case DiffLevel.Easy:
      switch (size) {
        case FieldSize.Small: {
          arrSize = 6;
          break;
        }
        case FieldSize.Normal:{
          arrSize = 12;
          break;
        }
        case FieldSize.Big:{
          arrSize = 18;
          break;
        }
      }

      return Array(arrSize).fill('').map((_, i) => {
        if (i < arrSize / 3) return {code: 'js', imageURL: cardImages.js};
        if (i >= arrSize / 3 && i < arrSize * 2/3) return {code: 'react', imageURL: cardImages.react};
        return {code: 'angular', imageURL: cardImages.angular}
      });

    case DiffLevel.Normal:
      switch (size) {
        case FieldSize.Small: {
          arrSize = 8;
          break;
        }
        case FieldSize.Normal:{
          arrSize = 16;
          break;
        }
        case FieldSize.Big:{
          arrSize = 24;
          break;
        }
      }

      return Array(arrSize).fill('').map((_, i) => {
        if (i < arrSize / 4) return {code: 'js', imageURL: cardImages.js};
        if (i >= arrSize / 4 && i < arrSize / 2) return {code: 'react', imageURL: cardImages.react};
        if (i >= arrSize / 2 && i < arrSize * 3/4) return {code: 'angular', imageURL: cardImages.angular};
        return {code: 'typescript', imageURL: cardImages.typescript}
      });

    case DiffLevel.Hard:
      switch (size) {
        case FieldSize.Small: {
          arrSize = 10;
          break;
        }
        case FieldSize.Normal:{
          arrSize = 20;
          break;
        }
        case FieldSize.Big:{
          arrSize = 30;
          break;
        }
      }
      return Array(arrSize).fill('').map((_, i) => {
        if (i < arrSize / 5) return {code: 'js', imageURL: cardImages.js};
        if (i >= arrSize / 5 && i < arrSize * 2/5) return {code: 'react', imageURL: cardImages.react};
        if (i >= arrSize * 2/5 && i < arrSize * 3/5) return {code: 'angular', imageURL: cardImages.angular};
        if (i >= arrSize * 3/5 && i < arrSize * 4/5) return {code: 'typescript', imageURL: cardImages.typescript};
        return {code: 'webpack', imageURL: cardImages.webpack}
      });
  }

  return Array(6).fill({code: 'angular', imageURL: cardImages.angular});
}
