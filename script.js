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
    switch(operator) {
        case "add":
            return firstNumber + secondNumber;
        case "subtract":
            return firstNumber - secondNumber;
        case "multiply":
            return firstNumber * secondNumber;
        case "divide":
            return firstNumber / secondNumber;
    }
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (!operator) appendNumeral(numeral, firstNumber)
            else appendNumeral(numeral, secondNumber);
    })
})

console.log(numeralsToNumber(["1","2","3",".","5","6"]))