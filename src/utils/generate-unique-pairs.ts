export function generateUniquePairs(rowSize: number) {
  const result = [];

  for (let i = 1; i <= rowSize; i++) {
    for (let j = 1; j <= rowSize; j++) {
      if (i !== j) {
        result.push([i, j]);
      }
    }
  }

  return result;
}
