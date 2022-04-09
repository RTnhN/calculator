const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
let enterFirstNumber = null;


const calculator = {
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
        break;}

  },
  resetCalculator(){
    this.operandOne = null;
    this.operandTwo = null;
    this.operator = null;
    this.result = null;
  }
} 

clearButton.addEventListener("click", clearDisplay);
numbers.forEach(number=>number.addEventListener("click", numberPressed));
operationButtons.forEach(operation=>operation.addEventListener("click", addOperation));
equalsButton.addEventListener("click", showResult);

function numberPressed(e) {
  if (enterFirstNumber !== true){
    display.textContent = "";
    enterFirstNumber = true;
  };  
  if (display.textContent.includes(".") && e.target.textContent==="."){
    return
  }
  if (display.textContent === "" && e.target.textContent==="."){
    display.textContent = "0";
  };
  display.textContent += e.target.textContent;
  if (calculator.operator === null){
    calculator.operandOne = +display.textContent;
  } else{
    calculator.operandTwo = +display.textContent;
  }
}

function clearDisplay(){
  display.textContent = "0";
  enterFirstNumber = false;
  calculator.resetCalculator();
}

function addOperation(e){
  if (calculator.operandTwo !== null){
    calculator.operandOne = calculator.equals();
    calculator.operandTwo = null;
    display.textContent = calculator.equals();
  } 
  calculator.operator = e.target.textContent;
  enterFirstNumber = false;
}

function showResult() {
  display.textContent = calculator.equals();
}

