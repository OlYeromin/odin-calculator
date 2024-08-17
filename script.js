let firstNumber = [];  // I tried strings first but they are immutable,
let secondNumber = []; // i.e. you cannot change them unlike an array.
let operator;

function appendNumeral(numeralAppended, number) {
    number.push(Number(numeralAppended)); 
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (operator === undefined) appendNumeral(numeral, firstNumber)
            else appendNumeral(numeral, secondNumber);
    })
})