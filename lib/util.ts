export function test() {
  return "test";
}

//courtesy of Gemini...
export function getRandomNumbers(count: number, max: number): number[] {
  // Use a Set to store unique numbers automatically
  const randomNumbers = new Set();

  // A safety check to prevent an infinite loop if the count requested
  // is greater than the available range of numbers.
  if (count > max) {
    console.error(
      "Error: The number of unique numbers requested exceeds the available range."
    );
    return [] as number[];
  }

  // Loop until the Set has the desired number of unique elements
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    randomNumbers.add(randomNumber);
  }

  // Convert the Set back to an array and return it
  return Array.from(randomNumbers) as number[];
}
