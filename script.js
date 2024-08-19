let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator = [];

let current = {
    address: "first",
    reference: firstNumber,
    changeRefto: function (newAddress, newReference) {
        this.address = newAddress;
        this.reference = newReference;
    }
}

const output = document.querySelector("#output");

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
    switch(operator[0]) {
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

function appendToOutput(character) {
    output.textContent += character;
}

function deleteLastChar() {
    string = output.textContent;
    string = string.slice(0, string.length - 1);
    output.textContent = string;
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (!operator.length) appendNumeral(numeral, firstNumber)
            else appendNumeral(numeral, secondNumber);
        appendToOutput(numeral);
    })
})

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (!firstNumber.length) return          // if the first number is empty

        if (secondNumber.length) {               // if the second number is defined
            firstNumber = evaluate();
            operator[0] = operatorButton.id;
            return;
        };

        if (operator.length) deleteLastChar();          // if operator is defined

        operator[0] = operatorButton.id;
        appendToOutput(operatorButton.textContent);        
    })
})

const backSpace = document.querySelector("#correct");
backSpace.addEventListener("click", () => {
    updateExpression(current);
    deleteLastChar();
})

//console.log(numeralsToNumber(["1","2","3",".","5","6"]))