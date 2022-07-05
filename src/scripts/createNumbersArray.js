const createNumbersArray = (from, to) => {
  const numbersArray = [];

  for (let i = from; i <= to; i += 1) {
    numbersArray.push(i);
  }

  return numbersArray;
};

export default createNumbersArray;
