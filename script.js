const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
let enterFirstNumber = null;
let allowableChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0","Enter", "/", "*", "-", "+", "=", "^", "."];
let operatorChars = "+-*/^"

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
        break;
      }

  },
  resetCalculator(){
    this.operandOne = null;
    this.operandTwo = null;
    this.operator = null;
    this.result = null;
  },
  readyForCalculations(){
    return (this.operandOne !== null && this.operandTwo !== null && this.operator !== null)
  }
} 

clearButton.addEventListener("click", clearDisplay);
numbers.forEach(number=>number.addEventListener("click", numberPressed));
operationButtons.forEach(operation=>operation.addEventListener("click", addOperation));
equalsButton.addEventListener("click", showResult);
document.addEventListener("keydown", keyPressed);

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
  if (e.type === "click"){
    calculator.operator = e.target.textContent;
  } else{
    if (e.key === "*"){
      calculator.operator +="×";
    } else if (e.key === "/"){
      calculator.operator +="×";
    } else {
      calculator.operator = e.key;
    }
  }
  enterFirstNumber = false;
}

function showResult() {
  if (!calculator.readyForCalculations()){
    display.textContent = "ERROR";
    calculator.resetCalculator();
    enterFirstNumber = false;
  } else{
    display.textContent = calculator.equals();
  }
  
}

function keyPressed(e) {
  if (!allowableChars.includes(e.key)){
    return
  }
  if (operatorChars.includes(e.key)){
    addOperation(e);
    return
  }
  if (e.key === "Enter"){
    showResult()
    return
  }
  if (enterFirstNumber !== true){
    display.textContent = "";
    enterFirstNumber = true;
  };  
  if (display.textContent.includes(".") && e.key==="."){
    return
  }
  if (display.textContent === "" && e.key==="."){
    display.textContent = "0";
  };  
  display.textContent += e.key;
  if (calculator.operator === null){
    calculator.operandOne = +display.textContent;
  } else{
    calculator.operandTwo = +display.textContent;
  }
}
