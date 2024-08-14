# odin-calculator

This will be a basic calculator.

# Specifications

The calculator shall consist of a keypad and a display.
1. The keypad contains numerals, basic math operations (+, -, *, /), and "Evaluate", "Correct", "All Clear" and "Plus-minus" buttons.
2. The display is divided into two parts: a smaller "Output" and a larger "Memory".
3. In the "Output" the current operation (like "12 + 2") and results are displayed.
4. In the "Memory" the history of previous operations and their results are displayed.

The calculator must opearte in the following manner:
1. If a numeral or math operator is pressed, it is displayed in the "Output".
2. Only 2 numbers and 1 operator are allowed in the "Output".
3. If there are already 2 numbers and 1 operator in the "Output" and the user tries to add another operator,
the expression is evaluated, its result displayed in the "Output" and the selected operator is appended to the result.
4. "Evaluate" button evaluates the expression.
5. "Correct" button deletes a numeral or operator.
6. "All Clear" button clears the output. If the output is empty, the button clears the "Memory".
7. "Plus-minus" turns the current number into a positive number and vice versa.
8. "Memory" stores the evaluated expressions and their results. It stores a large, but finite number of expressions.
10. The user cannot see all the expressions from the "Memory" immediately. To access the older ones, there is a scrollbar.
11. User may press the buttons on the keypad, or he may press buttons on his keyboard. Only the numerals, math operators and "Backspace" are accepted. 

# Credits
[Created as part of the curriculum at The Odit Project.](https://www.theodinproject.com/lessons/foundations-calculator)