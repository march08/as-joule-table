export const newArrayLength = (length: number, from: number, step = 1) => {
  const array = [];

  for (let i = 0; i < length; i += 1) {
    array.push(from + i * step);
  }

  return array;
};
