let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator = [];
let result = [];

const firstSpan = document.querySelector("#first");
const secondSpan = document.querySelector("#second");
const operatorSpan = document.querySelector("#operator");

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

function changeSign(number) {
    if (number[0] != "-") number.unshift("-")
    else number.shift();
}

function prependSign(span) {
    let newSpanText;
    if (span.textContent[0] != "-") newSpanText = "-" + span.textContent
    else newSpanText = span.textContent.slice(1);
    span.textContent = newSpanText;
}

function appendToOutput(character) {
    current.span.textContent += character;
}

function deleteLastChar() {
    string = current.span.textContent;
    string = string.slice(0, string.length - 1);
    current.span.textContent = string;
}

function clearOutput() {
    firstSpan.textContent = "";
    secondSpan.textContent = "";
    operatorSpan.textContent = "";
    firstNumber = [];
    secondNumber = [];
    operator = [];
    current.shiftTo("first");
}

function clearHistory() {
    history.textContent = "";
}

function displayResult() {
    current.span.textContent = result.join("");
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
            currentDiv.textContent += `= ${result.join("")}`;
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
                current.shiftTo("first");           // If this line is not present, current reference
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
    numeralButton.addEventListener("click", pressNumeral)
})

function pressNumeral(event) {
    var numeral;
    if (event.type == "click") numeral = event.currentTarget.textContent
    else
        if (event.key == ",") numeral = "."
        else numeral = event.key;
    if (numeral === "." && current.reference.includes(numeral)) return;
    if (current.address == "operator") current.shiftTo("second");
    appendNumeral(numeral, current.reference);
    appendToOutput(numeral);
}

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
backSpace.addEventListener("click", pressBackSpace)

function pressBackSpace() {
    deleteLastChar();
    correctExpression(current);         // The order is important here.
                                        // E.g.: if you correct "12 +",
                                        // it clears operator ARRAY, shifts to first,
                                        // and deletes the last char in first,
                                        // so you have "1 +", with firstNumber = [1, 2]
                                        // and empty operator.
}

const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", () => {
    if (firstSpan.textContent == "") clearHistory()
    else clearOutput();
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

const plusMinus = document.querySelector("#plus-minus");
plusMinus.addEventListener("click", () => {
    let editedNum;
    let editedSpan;
    if (current.address == "operator") {
        editedNum = firstNumber;
        editedSpan = firstSpan;
    }
    else {
        editedNum = current.reference;
        editedSpan = current.span;
    }
    changeSign(editedNum);
    prependSign(editedSpan);
})

document.addEventListener("keydown", function(event) {
    if (!isNaN(Number(event.key)) || [".", ","].includes(event.key)) pressNumeral(event)
    else if (event.key == "Backspace") pressBackSpace();
});