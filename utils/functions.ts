
export function delay (ms: number) {
  return new Promise((executor: any) => setTimeout(executor, ms));
}

export function getRandomIntInclusive (min: number, max: number) {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function getRandomItemFromArray <T> (arr: T[]) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
}

export function findObjectInArray <T extends Record<any, any>> (array: T[], target: T) {
  const find = array.find((obj) => Object.keys(obj).every((key) => target.hasOwnProperty(key) && obj[key] === target[key]));
  if (find) return find;
  else return false;
}

export function compareObjectsSingle <T extends Record<any, any>> (obj1: T | undefined, obj2: T | undefined) {
  if (!obj1 || !obj2) return;

  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !compareObjectsSingle(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function objectToArray <T extends Record<string, any>> (obj: T) {
  const entries: [keyof T, T[keyof T]][] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      entries.push([key, obj[key]]);
    }
  }

  return entries;
}

export async function loopUntil <T> (stopCondition: boolean, returnValue: T) {
  let done = false;
  let failsafe = 0;
  while (!done || failsafe < 20) {
    if (stopCondition) {
      done = true;
      console.log(returnValue)
      return returnValue;
    } else {
      await delay(5);
      failsafe++;
    }
  }
  return returnValue;
}
