let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator;

function appendNumeral(numeralAppended, number) {
    if (numeralAppended === "0" && !number.length) return;
    if (numeralAppended === ".") {
        if (!number.length) {
            number.push("0");
            number.push(".");
            return;
        }
        else if (number.includes(".")) return;
    }
    number.push(numeralAppended);
}

function numeralsToNumber(numeralsArray) {
        return Number(numeralsArray.join(""));
}

function evaluate() {
    let num1 = numeralsToNumber(firstNumber);
    let num2 = numeralsToNumber(secondNumber);
    firstNumber = [];
    secondNumber = [];
    switch(operator) {
        case "add":
            return num1 + num2;
        case "subtract":
            return num1 - num2;
        case "multiply":
            return num1 * num2;
        case "divide":
            return num1 / num2;
    }
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (!operator) appendNumeral(numeral, firstNumber)
            else appendNumeral(numeral, secondNumber);
        appendToOutput(numeral);
    })
})

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (!firstNumber.length) {              // if the first number is empty
            console.log(operator);
            return
        };
        if (!operator || !secondNumber.length) {// if the operator or the second number is empty
            operator = operatorButton.id;
            appendToOutput(operatorButton.textContent);
            console.log(operator);
            return;
        };
        if (secondNumber.length) {
            firstNumber = evaluate();
            operator = operatorButton.id;
            console.log(operator);
            return;
        }; 
    })
})
function appendToOutput(character) {
    output = document.querySelector("#output");
    output.textContent += character;
}

//console.log(numeralsToNumber(["1","2","3",".","5","6"]))