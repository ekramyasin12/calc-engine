let display = document.getElementById('display');

function AppendToDisplay(input) {
    let currentValue = display.value;
    let lastChar = currentValue[currentValue.length - 1];
    
    // Check if input is an operator (+, -, *, /)
    const operators = ['+', '-', '*', '/'];
    const isOperator = operators.includes(input);
    
    // Prevent multiple operators in a row
    if (isOperator && operators.includes(lastChar)) {
        // Replace the last operator with the new one
        display.value = currentValue.slice(0, -1) + input;
        return;
    }
    
    // Prevent starting with an operator (except minus for negative numbers)
    if (currentValue === '') {
        if (input === '*' || input === '/' || input === '+') {
            return;
        }
    }
    
    // Allow minus sign at the beginning for negative numbers
    if (currentValue === '' && input === '-') {
        display.value = input;
        return;
    }
    
    // Prevent multiple decimal points in the current number
    if (input === '.') {
        // Find the last operator to determine current number
        let lastOperatorIndex = -1;
        for (let i = currentValue.length - 1; i >= 0; i--) {
            if (operators.includes(currentValue[i])) {
                lastOperatorIndex = i;
                break;
            }
        }
        
        // Get the current number (everything after the last operator)
        let currentNumber = currentValue.substring(lastOperatorIndex + 1);
        
        // If current number already has a decimal, prevent adding another
        if (currentNumber.includes('.')) {
            return;
        }
        
        // If current number is empty, add '0.' instead of just '.'
        if (currentNumber === '') {
            display.value += '0.';
            return;
        }
    }
    
    // If all validations pass, append the input
    display.value += input;
}

function calculate() {
    try {
        // Prevent calculation if expression ends with operator
        let lastChar = display.value[display.value.length - 1];
        const operators = ['+', '-', '*', '/'];
        
        if (operators.includes(lastChar)) {
            display.value = 'ERROR';
            return;
        }
        
        // Handle empty display
        if (display.value === '') {
            display.value = '0';
            return;
        }
        
        // Evaluate the expression
        let result = eval(display.value);
        
        // Handle floating point precision
        result = parseFloat(result.toFixed(10));
        
        display.value = result;
    } catch(error) {
        display.value = 'ERROR';
    }
}

function clearall() {
    display.value = "";
}

function deletelast() {
    display.value = display.value.slice(0, -1);
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Delete', 'Escape'];
    
    if (validKeys.includes(key)) {
        event.preventDefault();
        
        if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            deletelast();
        } else if (key === 'Delete' || key === 'Escape') {
            clearall();
        } else {
            AppendToDisplay(key);
        }
    }
});