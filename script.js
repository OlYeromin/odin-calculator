let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator = [];
let result = [];

// Using "current address" feature allows for a straightforward "correct" function
let current = {
    address: "first",
    reference: firstNumber,
    span: firstSpan,
    shiftTo: function (newAddress) {
        this.address = newAddress;
        switch (newAddress) {
            case "first": 
                this.reference = firstNumber;
                this.span = firstSpan;
                return;
            case "second":
                this.reference = secondNumber;
                this.span = secondSpan;
                return;
            case "operator":
                this.reference = operator;
                this.span = operatorSpan;
                return;
        }
    }
}

const output = document.querySelector("#output");
const history = document.querySelector("#history")

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
            return (num1 + num2).toString().split("");
        case "subtract":
            return (num1 - num2).toString().split("");
        case "multiply":
            return (num1 * num2).toString().split("");
        case "divide":
            return (num1 / num2).toString().split("");
    }
}

function correctExpression() {
    current.reference.pop();
    if (current.address == "operator") current.shiftTo("first");
    if (current.address == "second" && !secondNumber.length) 
        current.shiftTo("operator");
}

function changeSign() {
    if (current.address == "operator") editedNum = firstNumber
    else editedNum = current.reference;

    if (editedNum[0] != "-") editedNum.unshift("-")
    else editedNum.shift();
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

function displayResult() {
    output.textContent = result.join("");
}

function createHistoryEntry() {
    const newdiv = document.createElement("div");
    history.appendChild(newdiv);
    newdiv.scrollIntoView();
}

function outputUp(parameter) {
    const outputContent = output.textContent;
    const currentDiv = document.querySelector("#history > :last-child");
    switch (parameter) {
        case "expression": 
            currentDiv.textContent = outputContent;
            return;
        case "result":
            currentDiv.textContent += `=${result.join("")}`;
            return;
    }
}

const keypad = document.querySelector("#keypad");
keypad.addEventListener("click", (event) => {
    if (result.length) {
        if (event.target.id != "keypad") {
            outputUp("result");
            if (event.target.className == "numeral") {
                if (current.address == "first") clearOutput();
                else firstNumber = result.slice();
            }
            else if (event.target.id != "all-clear")
                firstNumber = result.slice();
                current.reference = firstNumber;    // If this line is not present, current reference
                                                    // is not set. I.e.: you see, "12" in the output,
                                                    // then you press "1" and you see "121",
                                                    // but the calculator thinks it is still 12.
            result = [];
        }
    }
}, true)            // The keypad listener is fired before the listeners below.
                    // If not true, the result wouldn't be displayed in the output
                    // but pushed right away to history, which is not intended here.
                    // Plus, the order is important in case of numerals:
                    // output should be cleared first and then a numeral selected,
                    // not the other way round (it'd delete the selected numeral immediately this way).

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
        if (current.address == "second") {
            result = evaluateExpression();
            createHistoryEntry();
            outputUp("expression");
            clearOutput();
            displayResult();
            operator[0] = operatorButton.id;
            appendToOutput(operatorButton.textContent);
            current.shiftTo("operator");
            return;
        };

        if (current.address == "operator") deleteLastChar();

        if (current.address == "first") {
            if (!firstNumber.length) return;        // if the first number is empty
            current.shiftTo("operator")};
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

const evaluateButton = document.querySelector("#evaluate");
evaluateButton.addEventListener("click", () => {
    if (secondNumber.length) {
        result = evaluateExpression();
        createHistoryEntry();
        outputUp("expression");
        clearOutput();
        displayResult();
    }
})