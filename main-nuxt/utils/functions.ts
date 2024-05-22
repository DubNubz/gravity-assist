
export function delay (ms: number) {
    return new Promise((executor: any) => setTimeout(executor, ms));
}
  
export function getRandomIntInclusive (min: number, max: number): number {
    const minCeiled: number = Math.ceil(min);
    const maxFloored: number = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export function compareObjects(obj1: Record<string, any>, obj2: Record<string, any>) {
    return Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
}
