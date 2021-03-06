const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const backspaceButton = document.querySelector(".backspace");
const percentButton = document.querySelector(".percent");
const plusMinusButton = document.querySelector(".plusMinus");
const miscFuncs = document.querySelectorAll(".miscFunc");

let validNumberEntered = null;
let allowableChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Enter", "/", "*", "-", "+", "=", "^", ".", "Backspace", "Delete", "%"];
let operatorChars = "+-*/^";

const calculator = {
  operandOne: null,
  operandTwo: null,
  operator: null,
  result: null,
  add() {
    this.result = this.operandOne + this.operandTwo;
    return this.result;
  },
  subtract() {
    this.result = this.operandOne - this.operandTwo;
    return this.result;
  },
  multiply() {
    this.result = this.operandOne * this.operandTwo;
    return this.result;
  },
  divide() {
    this.result = this.operandOne / this.operandTwo;
    return this.result;
  },
  power() {
    this.result = this.operandOne ** this.operandTwo;
    return this.result;
  },
  equals() {
    switch (this.operator) {
      case "+":
        return this.add();
        break;
      case "-":
        return this.subtract();
        break;
      case "×":
        return this.multiply();
        break;
      case "÷":
        return this.divide();
        break;
      case "^":
        return this.power();
        break;
    }
  },
  resetCalculator() {
    this.operandOne = null;
    this.operandTwo = null;
    this.operator = null;
    this.result = null;
  },
  readyToCalculate() {
    return (this.operandOne !== null && this.operandTwo !== null && this.operator !== null);
  },
  updateOperand(value) {
    if (this.operator === null) {
      this.operandOne = value;
    } else {
      this.operandTwo = value;
    }
  },
  calculatePercent() {
    if (this.operator === null) {
      this.operandOne = this.operandOne / 100;
    } else {
      this.operandTwo = this.operandTwo / 100;
    }
}
}

clearButton.addEventListener("click", clearDisplay);
numbers.forEach(number => number.addEventListener("click", numberPressed));
operationButtons.forEach(operation => operation.addEventListener("click", operationPressed));
equalsButton.addEventListener("click", equalsPressed);
document.addEventListener("keydown", keyPressed);
backspaceButton.addEventListener("click", removeRightChar);
percentButton.addEventListener("click", calculatePercent);
plusMinusButton.addEventListener("click", changeSign);

function numberPressed(e) {
  if (validNumberEntered !== true) {
    display.textContent = "";
    if (e.target.textContent !== "0") {
      validNumberEntered = true;
    }
  };
  if (display.clientWidth > 300) {
    return;
  }
  if (display.textContent.includes(".") && e.target.textContent === ".") {
    return
  }
  if (display.textContent === "" && e.target.textContent === ".") {
    display.textContent = "0";
  };
  if (calculator.result !== null) {
    calculator.resetCalculator();
  }
  display.textContent += e.target.textContent;
  calculator.updateOperand(+display.textContent);
}

function clearDisplay() {
  display.textContent = "0";
  validNumberEntered = false;
  calculator.resetCalculator();
  operationButtons.forEach(operator => operator.classList.remove("pressedOperation"))
}

function operationPressed(e) {
  if (calculator.operandTwo !== null) {
    calculator.operandOne = calculator.equals();
    calculator.operandTwo = null;
    display.textContent = calculator.result;
    calculator.result = null;
  }
  if (e.type === "click") {
    calculator.operator = e.target.textContent;
  } else {
    if (e.key === "*") {
      calculator.operator = "×";
    } else if (e.key === "/") {
      calculator.operator = "÷";
    } else {
      calculator.operator = e.key;
    }
  }
  updateOperatorColor(calculator.operator);
  validNumberEntered = false;
}

function equalsPressed() {
  if (!calculator.readyToCalculate()) {
    display.textContent = "ERROR";
    calculator.resetCalculator();
    validNumberEntered = false;
  } else {
    display.textContent = calculator.equals();
    if (display.clientWidth > 300) {
      display.textContent = calculator.equals().toExponential(6);
    }
    validNumberEntered = false;

  }
  operationButtons.forEach(operator => operator.classList.remove("pressedOperation"));
}

function removeRightChar() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") {
    display.textContent = "0";
    validNumberEntered = false;
  }
  calculator.updateOperand(+display.textContent);

}

function keyPressed(e) {
  if (!allowableChars.includes(e.key)) {
    return;
  }
  if (operatorChars.includes(e.key)) {
    operationPressed(e);
    return;
  }
  if (e.key === "Enter") {
    equalsPressed()
    return;
  }
  if (e.key === "Backspace") {
    removeRightChar();
    return;
  }
  if (e.key === "Delete") {
    clearDisplay();
    return;
  }
  if (e.key === "%") {
    calculatePercent();
    return;
  }
  if (validNumberEntered !== true) {
    display.textContent = "";
    validNumberEntered = true;
  };
  if (display.textContent.includes(".") && e.key === ".") {
    return
  }
  if (display.textContent === "" && e.key === ".") {
    display.textContent = "0";
  };
  if (calculator.result !== null) {
    calculator.resetCalculator();
  }
  display.textContent += e.key;
  if (calculator.operator === null) {
    calculator.operandOne = +display.textContent;
  } else {
    calculator.operandTwo = +display.textContent;
  }
}

function calculatePercent() {
  display.textContent = +display.textContent / 100;
  calculator.calculatePercent();
}

function changeSign() {
  if (display.textContent === "0") {
    return;
  }
  if (display.textContent[0] !== "-") {
    display.textContent = "-" + display.textContent;
  } else {
    display.textContent = display.textContent.substring(1);
  }
  calculator.updateOperand(+display.textContent);
}

function updateOperatorColor(operator) {
  operationButtons.forEach(operator => operator.classList.remove("pressedOperation"));
  switch (operator) {
    case "+":
      operationButtons[3].classList.add("pressedOperation");
      break;
    case "-":
      operationButtons[2].classList.add("pressedOperation");
      break;
    case "×":
      operationButtons[1].classList.add("pressedOperation");
      break;
    case "÷":
      operationButtons[0].classList.add("pressedOperation");
      break;
  }
}


numbers.forEach(number => number.addEventListener("mousedown", numPressedColor));
numbers.forEach(number => number.addEventListener("mouseup", numReleasedColor));

function numPressedColor(e) {
  e.target.classList.remove("releasedNumber");
  e.target.classList.add("pressedNumber");
}
function numReleasedColor(e) {
  e.target.classList.add("releasedNumber");
  e.target.classList.remove("pressedNumber");
}

miscFuncs.forEach(func => func.addEventListener("mousedown", funcPressedColor));
miscFuncs.forEach(func => func.addEventListener("mouseup", funcReleasedColor));

function funcPressedColor(e) {
  e.target.classList.remove("releasedFunc");
  e.target.classList.add("pressedFunc");
}
function funcReleasedColor(e) {
  e.target.classList.add("releasedFunc");
  e.target.classList.remove("pressedFunc");
}
