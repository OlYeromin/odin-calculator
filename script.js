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
            currentDiv.textContent += `=${currentDiv.textContent}`;
            return;
    }
}

const keypad = document.querySelector("#keypad");
keypad.addEventListener("click", (event) => {
    if (result.length) {
        console.log("Keypad listener is fired!")
        if (event.target.id != "keypad") {
            outputUp("result");
            if (event.target.class == "numeral") {
                if (current.address == "first") clearOutput();
                else firstNumber = result.slice();
            }
            else if (event.target.id != "all-clear")
                firstNumber = result.slice();
            result = [];
        }
    }
})

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        if (result.length) {
            clearOutput();
            result = [];
        };
        const numeral = numeralButton.textContent;
        if (current.address == "operator") current.shiftTo("second");
        appendNumeral(numeral, current.reference);
        appendToOutput(numeral);
    })
})

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", (event) => {
        if (current.address == "second") {
            event.stopPropagation();            // If this line is skipped, the keypad eventlistener fires
                                                // and the result is pushed to the output immediately,
                                                // without emptying the "result" array. In this case, after
                                                // another click upon any button on the keypad the result 
                                                // is pushed up again and the output looks like "2 + 2 = 4 = 4"
            result = evaluateExpression();
            createHistoryEntry();
            outputUp("expression");
            clearOutput();
            displayResult();
            firstNumber = result.slice();
            operator[0] = operatorButton.id;
            appendToOutput(operatorButton.textContent);
            current.shiftTo("operator");
            return;
        };

        if (current.address == "operator") deleteLastChar();

        if (current.address == "first") {
            if (result.length) {
                firstNumber = result.slice();   
                result = [];
            };
            if (!firstNumber.length) return;        // if the first number is empty
            current.shiftTo("operator")};
        operator[0] = operatorButton.id;
        appendToOutput(operatorButton.textContent);
    })
})

const backSpace = document.querySelector("#correct");
backSpace.addEventListener("click", () => {
    if (result.length) {
        firstNumber = result.slice();
        current.reference = firstNumber;
        result = [];
    }
    correctExpression(current);
    deleteLastChar();
})

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", () => {
   clearOutput(); 
})

const evaluateButton = document.querySelector("#evaluate");
evaluateButton.addEventListener("click", (event) => {
    if (secondNumber.length) {
        event.stopPropagation();                // See the rationale in the operatorButton eventlistener
        result = evaluateExpression();
        createHistoryEntry();
        outputUp("expression");
        clearOutput();
        displayResult();
    }
})