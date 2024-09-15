const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = "";
let isResultDisplayed = false;

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    if (isResultDisplayed && !isNaN(value)) {
      // If result is displayed and a number is clicked, start fresh.
      currentInput = value;
      isResultDisplayed = false;
    } else if (value === "=") {
      calculate();
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      if (currentInput === "") return; // Prevent assigning operator without a value
      operator = value;
      previousInput = currentInput;
      currentInput = "";
      isResultDisplayed = false;
    } else {
      // Prevent multiple decimal points
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
    }

    display.textContent = currentInput || "0";
  });
});

document.getElementById("clear").addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  display.textContent = "0";
  isResultDisplayed = false;
});

function calculate() {
  let result = 0;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current; // Prevent division by zero
      break;
    default:
      return;
  }

  display.textContent = result.toString();
  if (result === "Error") {
    currentInput = ""; // Reset inputs if error occurs
    previousInput = "";
    operator = "";
  } else {
    currentInput = result.toString();
    previousInput = "";
    operator = "";
  }
  isResultDisplayed = true; // Prevent appending after displaying result
}
const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });