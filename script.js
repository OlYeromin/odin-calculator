let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator = [];
let result = [];

// Using "current address" feature allows for a straightforward "correct" function
let current = {
    address: "first",
    reference: firstNumber,
    shiftTo: function (newAddress) {
        this.address = newAddress;
        switch (newAddress) {
            case "first": 
                this.reference = firstNumber;
                return;
            case "second":
                this.reference = secondNumber;
                return;
            case "operator":
                this.reference = operator;
                return;
        }
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

function evaluateExpression() {
    let num1 = numeralsToNumber(firstNumber);
    let num2 = numeralsToNumber(secondNumber);
    switch(operator[0]) {
        case "add":
            return (num1 + num2).toString.split("");
        case "subtract":
            return (num1 - num2).toString.split("");
        case "multiply":
            return (num1 * num2).toString.split("");
        case "divide":
            return (num1 / num2).toString.split("");
    }
}

function correctExpression() {
    current.reference.pop();
    if (current.address == "operator") current.shiftTo("first");
    if (current.address == "second" && !secondNumber.length) 
        current.shiftTo("operator");
}

function appendToOutput(character) {
    output.textContent += character;
}

function deleteLastChar() {
    string = output.textContent;
    string = string.slice(0, string.length - 1);
    output.textContent = string;
}

function clearOutput() {
    output.textContent = "";
    firstNumber = [];
    secondNumber = [];
    operator = [];
    current.shiftTo("first");
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (current.address == "operator") current.shiftTo("second");
        appendNumeral(numeral, current.reference);
        appendToOutput(numeral);
    })
})

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if (!firstNumber.length) return          // if the first number is empty

        if (current.address == "second") {
            result = evaluateExpression();
            clearOutput();
            displayResult();
            firstNumber = result.slice();
            operator[0] = operatorButton.id;
            appendToOutput(operatorButton.textContent);
            return;
        };

        if (current.address == "operator") deleteLastChar();
        if (current.address == "first") current.shiftTo("operator");
        operator[0] = operatorButton.id;
        appendToOutput(operatorButton.textContent);
    })
})

const backSpace = document.querySelector("#correct");
backSpace.addEventListener("click", () => {
    correctExpression(current);
    deleteLastChar();
})

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", () => {
   clearOutput(); 
})

//console.log(numeralsToNumber(["1","2","3",".","5","6"]))