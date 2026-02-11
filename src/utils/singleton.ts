export const memoize = <Args extends any[], T>(fn: (...args: Args) => T): ((...args: Args) => T) => {
   let cache: T | undefined;
   return (...args: Args) => cache ?? (cache = fn(...args));
};
