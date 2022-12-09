const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const dotButton = document.querySelector('[data-dot-number]');
const previousValueAndTextElement = document.querySelector('[data-previous-value]');
const currentValueAndTextElement = document.querySelector('[data-current-value]');

let currentValue = currentValueAndTextElement;
let previousValue = previousValueAndTextElement;
let currentOperator;

const add = function(x, y) {
    return x + y;
}

const subtract = function(x, y) {
    return x - y;
}

const multiply = function(x, y) {
    return x * y;
}

const divide = function(x, y) {
    return x / y;
}

let operate = function(num1, num2, mathematicalOperator) {
    let computation;
    const prev = parseFloat(num1);
    const current = parseFloat(num2);

    if(isNaN(prev) || isNaN(current)) {
        return
    }

    switch(mathematicalOperator) {
        case '+':
            computation = add(prev, current);
            break;
        case '-':
            computation = subtract(prev, current);
            break;
        case '*':
            computation = multiply(prev, current);
            break;
        case '÷':
            if(current === 0) {
                console.log("Please don't divide by 0");
                alert("Please don't divide by 0");
                return
            }
            computation = divide(prev, current);
            break;
    }
    console.log(`Previous value: ${prev} Current value: ${current} Operator: ${mathematicalOperator} Result: ${computation}`);

    computation = Number(computation.toFixed(2));
    currentValue = computation.toString();
    currentOperator = undefined;
    previousValue = '';
}

let getDisplayValue = function(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if(isNaN(integerDigits)) {
        integerDisplay = '';
    }
    else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        });
    }

    if(decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    }
    else {
        return integerDisplay;
    }
}

let selectedOperator = function(operator) {
    if(currentValue === '') {
        return
    }    
    
    operate(previousValue, currentValue, currentOperator);

    currentOperator = operator;
    previousValue = currentValue;
    currentValue = '';
}

let appendNewValue = function(number) {  
    currentValue = currentValue.toString() + number.toString();    
}

let disableDotCheck = function() {
    dotButton.disabled = currentValue.includes('.');
}

let updateDisplayValue = function() {
    currentValueAndTextElement.innerText = getDisplayValue(currentValue);
    if(currentOperator != null) {
        previousValueAndTextElement.innerText = `${getDisplayValue(previousValue)} ${currentOperator}`;
    }
    else {
        previousValueAndTextElement.innerText = '';
    }
    disableDotCheck();
}

let deleteLastNumber = function() {
    currentValue = currentValue.toString().slice(0, -1);    
}

let clearDisplay = function() {
    currentValue = '';
    previousValue = '';
    currentOperator = undefined;
    dotButton.disabled = false;
}
clearDisplay();

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNewValue(button.innerText);
        updateDisplayValue();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedOperator(button.innerText);
        updateDisplayValue();
    })
})

deleteButton.addEventListener('click', (button) => {
    deleteLastNumber();
    updateDisplayValue();
})

clearButton.addEventListener('click', (button) => {
    clearDisplay();
    updateDisplayValue();
})

equalsButton.addEventListener('click', (button) => {
    operate(previousValue, currentValue, currentOperator);
    updateDisplayValue();
})
