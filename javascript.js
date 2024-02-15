document.addEventListener("DOMContentLoaded", function() {

const calcScreen = document.querySelector("#result");
const btnOperator = document.querySelectorAll(".btnOperator");
const btnNumber = document.querySelectorAll(".btnNumber");
const btnClear = document.querySelector("#btnClear");
const btnEqual = document.querySelector("#btnEqual");

const logic = {
    currNumValue: '0',
    num1: 0,
    num2: 0,
    currOperator: null,
    resultCalc: 0,
};

const sum = function (num1, num2) {
    return num1 + num2;
};

const substract = function (num1, num2) {
    return num1 - num2;
};

const multiply = function (num1, num2) {
    return num1 * num2;
};

const divide = function (num1, num2) {
    if (num2 === 0) {
        resetCalc();
        throw new Error('Error: it is impossible to divide by zero!');
    }
    return num1 / num2;
};

const operate = (num1,num2, operator) => {
    switch (operator) {
        case "+":
            return sum(num1, num2);
        case "-":
            return substract(num1, num2);
        case "/":
            return divide(num1, num2);
        case "*":
            return multiply(num1, num2);
        default:
            return sum(num1, num2);
    }
};

const updateScreen = (value) => {
    calcScreen.textContent = value;
};

const clearCalc = () => {
    logic.num1 = 0;
    logic.num2 = 0;
    logic.currNumValue = "0";
    logic.resultCalc = 0;
    updateScreen(logic.currNumValue);
};

const enterNumValue = (event) => {
    if (logic.currNumValue === "0") logic.currNumValue = "";
    logic.currNumValue += event.target.textContent;
    updateScreen(logic.currNumValue);
    console.log(logic.currNumValue)
};

const performOperation = (event) => {
    const operator = event.target.textContent;
    logic.currOperator = operator;
    if (!logic.resultCalc && !logic.num1) {
        logic.num1 = Number(logic.currNumValue);
        logic.currNumValue = "";
    }
    else if (logic.num1 && !logic.resultCalc) {
        getCalcResult();
    }
    if (!logic.num1 && logic.resultCalc) {
        logic.num1 = logic.resultCalc;
        logic.resultCalc = 0;
    }
    console.log(logic);
};

const clearLogicValues = (result) => {
    logic.resultCalc = result;
    logic.num1 = 0;
    logic.num2 = 0;
    logic.currNumValue = "0";
};

const getCalcResult = () => {
    logic.num2 = Number(logic.currNumValue);
    const {num1, num2, currOperator} = logic;
    const result = operate(num1,num2,currOperator);
    updateScreen(result);
    clearLogicValues(result);
};

const clearCurrentValues = () => {
    clearLogicValues(0);
    updateScreen(logic.currNumValue);
};

const assignEventListeners = () => {
    btnNumber.forEach((element) => {
        element.addEventListener("click", enterNumValue);
    });
    btnOperator.forEach((element) => {
        element.addEventListener("click", performOperation);
    });
    btnEqual.addEventListener("click", getCalcResult);
    btnClear.addEventListener("click", clearCalc);
};

const runCalc = () => {
    assignEventListeners();
};

runCalc();
});