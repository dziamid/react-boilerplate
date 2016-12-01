export const strings = (a, b) => a.localeCompare(b);
export const numbers = (a, b) => a - b;

export const seq = (...comparators) => (a, b) => {
  for (const comparator of comparators) {
    const res = comparator(a, b);
    if (res !== 0) {
      return res;
    }
  }

  return 0;
};
