export function randomizeElementInArray (arr: any[]) {
  return arr.sort(() => {
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

