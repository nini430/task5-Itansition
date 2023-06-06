

const deleteChar = (value, prng) => {
  const position = Math.floor(prng() * value.length);
  return value.substring(0, position) + value.substring(position + 1);
};


const insertChar = (value, prng) => {
  const allChars = [];
  for (let i = 32; i < 127; i++) {
    allChars.push(String.fromCharCode(i));
  }
  const index = Math.floor(prng() * value.length);

  return (
    value.substring(0, index) +
    allChars[Math.floor(prng() * allChars.length)] +
    value.substring(index)
  );
};

// swap near characters
const swapChars = (value, prng) => {
  value = value.split("");

  const valueRef = [...value];

  const index = Math.floor(prng() * value.length);
  if (index === 0) {
    valueRef[index] = value[index + 1];
    valueRef[index + 1] = value[index];
  } else if (index === value.length - 1) {
    valueRef[index] = value[index - 1];
    valueRef[index - 1] = value[index];
  } else {
    const operations = ["+", "-"];
    const op = operations[Math.floor(prng() * operations.length)];
    const operationExp = op === "+" ? index + 1 : index - 1;
    valueRef[index] = value[operationExp];
    valueRef[operationExp] = value[index];
  }

  return valueRef.join("");
};

// execute function with equal probabilities
export const randExec = (value, prng) => {
  let i = 0;
  let sum = 0;
  let probas = [33.3333333333, 33.3333333333, 33.3333333333];
  const funcs = [insertChar, deleteChar, swapChars];
  let probRange = [];

  for (i = 0; i < probas.length; i++) {
    sum += probas[i] / 100;
    probRange.push(sum);
  }

  let randomNum = prng();

  for (i = 0; i < probRange.length && randomNum >= probRange[i]; i++);

  return funcs[i](value, prng);
};
