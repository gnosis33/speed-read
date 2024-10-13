const inputText = document.getElementById("inputText");
const startButton = document.getElementById("startButton");
const speedControl = document.getElementById("speedControl");
const wpmDisplay = document.getElementById("wpmDisplay");
const wordDisplay = document.getElementById("wordDisplay");

const maxSpeed = 3600;

function getLogarithmicValue(value) {
  var min = Math.log(100);
  var max = Math.log(maxSpeed);
  var scale = max - min;
  var position = (value - speedControl.min) / (speedControl.max - speedControl.min);
  return Math.exp(min + scale * position);
}

speedControl.addEventListener("input", () => {
  const logValue = Math.round(getLogarithmicValue(speedControl.value));
  wpmDisplay.textContent = "WPM: " + logValue;
});

startButton.addEventListener("click", async () => {
  const text = inputText.value;

  // Send text input to the backend API for processing
  const response = await fetch("/api/process_text", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: { "Content-Type": "application/json" },
  });

  const words = await response.json(); // Get the words from the backend
  displayWords(words);
});

function displayWords(words) {
  let wordIndex = 0;

  const displayNextWord = () => {
    if (wordIndex < words.length) {
      wordDisplay.textContent = words[wordIndex]; // Display each word
      wordIndex++;

      // Calculate delay based on the current WPM
      const delay = 60000 / getLogarithmicValue(speedControl.value);
      setTimeout(displayNextWord, delay);
    }
  };

  displayNextWord(); // Start displaying the words
}
