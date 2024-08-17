let firstNumber = "";
let secondNumber = "";
let operator;

function appendNumeral(numeralAppended, number) {
    number.concat(numeralAppended); 
    console.log(number);
}

const numeralButtons = document.querySelectorAll(".numeral");
numeralButtons.forEach((numeralButton) => {
    numeralButton.addEventListener("click", () => {
        const numeral = numeralButton.textContent;
        if (operator === undefined) appendNumeral(numeral, firstNumber)
            else appendNumeral(numeral, secondNumber);
    })
})