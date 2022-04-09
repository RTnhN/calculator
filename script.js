const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
let enterFirstNumber = false;

const calculator = {
  enterFirstNumber:null,
  enterSecondNumber:null,
  operandOne:null, 
  operandTwo:null,
  operator:null, 
  result:null,
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
  equals(){
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
    }
  }
    
}

clearButton.addEventListener("click", clearDisplay);
numbers.forEach(number=>number.addEventListener("click", numberPressed));
operationButtons.forEach(operation=>operation.addEventListener("click", addOperation));
equalsButton.addEventListener("click", calculateResult);

function numberPressed(e) {
  if (enterFirstNumber === false){
    display.textContent = "";
    enterFirstNumber = true;
  };  
  let number = +e.target.textContent;
  display.textContent += number;
}

function clearDisplay(){
  display.textContent = "0";
  enterFirstNumber = false;
}

function addOperation(e){
  calculator.operandOne = +display.textContent;
  calculator.operator = e.target.textContent;
  enterFirstNumber = false;
}

function calculateResult() {
  calculator.operandTwo = +display.textContent;
  display.textContent = calculator.equals();
}

