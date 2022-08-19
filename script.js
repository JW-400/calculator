const numberButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#delete");

let firstNumber = "";
let secondNumber = "";
let currentOperation = null;
let isEvaluated = false;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberClick(button.innerHTML);
  });
});

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    handleOperatorClick(operator.innerHTML);
  });
});

equalsButton.addEventListener("click", () => {
  if (currentOperation != null) {
    evaluate();
  }
});

clearButton.addEventListener("click", () => {
  clearAll();
});

const evaluate = () => {
  if (currentOperation && secondNumber) {
    clearScreen();
    populateScreen(
      (firstNumber = operate(
        currentOperation,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      ))
    );
    secondNumber = "";
    currentOperation = null;
    console.log(
      `FirstNumber: ${firstNumber}, secondNumber: ${secondNumber}, currentOperation: ${currentOperation}`
    );
    isEvaluated = true;
  }
};

const handleNumberClick = (number) => {
  if (!firstNumber || isEvaluated === true) {
    clearAll();
  }
  if (currentOperation !== null) {
    secondNumber += number;
    if (secondNumber.includes(".")) {
      decimalButton.disabled = true;
    }
    populateScreen(number);
  } else {
    populateScreen(number);
    firstNumber += number;
    if (firstNumber.includes(".")) {
      decimalButton.disabled = true;
    }
  }
  console.log(
    `FirstNumber: ${firstNumber}, secondNumber: ${secondNumber}, currentOperation: ${currentOperation}`
  );
};

const handleOperatorClick = (operator) => {
  isEvaluated = false;
  if (currentOperation !== null) {
    if (secondNumber !== "") {
      clearScreen();
      populateScreen(
        (firstNumber = operate(
          currentOperation,
          parseFloat(firstNumber),
          parseFloat(secondNumber)
        ))
      );
      currentOperation = operator;
      secondNumber = "";
      populateScreen(currentOperation);
    } else {
      currentOperation = operator;
      display.innerHTML = display.innerHTML.slice(0, -1);
      populateScreen(currentOperation);
    }
    console.log(operator, firstNumber, secondNumber);
  } else {
    if (firstNumber) {
      populateScreen(operator);
      currentOperation = operator;
    } else {
      populateScreen(operator);
      firstNumber += operator;
    }
  }
  decimalButton.disabled = false;
};

const clearAll = () => {
  clearScreen();
  currentOperation = null;
  firstNumber = "";
  secondNumber = "";
  isEvaluated = false;
};

const populateScreen = (input) => {
  display.innerHTML += input;
  numberHistory = display.innerHTML;
};

const deleteCharacter = () => {
  display.innerHTML = display.innerHTML.slice(0, -1);
};

const clearScreen = () => {
  display.innerHTML = "";
};

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  console.log(operator, num1, num2);
  switch (operator) {
    case "+":
      return parseFloat(add(num1, num2).toFixed(8));
      break;
    case "-":
      return parseFloat(subtract(num1, num2).toFixed(8));
      break;
    case "*":
      return parseFloat(multiply(num1, num2).toFixed(8));
      break;
    case "/":
      if (num2 === 0) {
        return NaN;
      } else {
        return parseFloat(divide(num1, num2).toFixed(8));
      }
      break;
    default:
      return "Error";
  }
};
