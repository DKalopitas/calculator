function add(num1, num2) {
    return(num1 + num2);
}

function subtract(num1, num2) {
    return(num1 - num2);
}

function multiply(num1, num2) {
    return(num1 * num2);
}

function divide(num1, num2) {
    return(num1 / num2);
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return(add(num1, num2));
    }
    if (operator === '-') {
        return(subtract(num1, num2));
    }
    if (operator === '×') {
        return(multiply(num1, num2));
    }
    if (operator === '÷') {
        return(divide(num1, num2));
    }
    return;
}

function addOnDisplay(data) {
    const display = document.querySelector('.display');
    if (typeof(data) === 'number') {
        display.textContent = data;
        result = true;
        return;
    }
    if (data.getAttribute('class') === 'number') {
        display.textContent += data.textContent;
        return;
    }
    if (display.textContent !== '') {
        display.textContent += ` ${data.textContent} `;
    }
}

function removeLast() {
    const display = document.querySelector('.display');
    display.textContent = display.textContent.slice(0, -3);
}

function clearDisplay() {
    const display = document.querySelector('.display');
    display.textContent = '';
    numArray = [];
    result = false;
    currNumber = '';
}

let result;
let currNumber = '';
const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => {button.addEventListener('click', ()=> {
    if (result || currNumber === '0') {
        clearDisplay();
    }
    addOnDisplay(button);
    currNumber += button.textContent;
})})

let numArray = [];
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => button.addEventListener('click', ()=> {  
    if (currNumber === '') {
        if (numArray.length > 1) {
            numArray.pop();
            numArray.push(button.textContent);
        }
        removeLast();
        addOnDisplay(button);
        return;
    }
    addOnDisplay(button);
    currNumber = parseInt(currNumber);
    if (numArray.length > 0) {
        if (button.textContent === '×' || button.textContent === '÷') {
            if (numArray[numArray.length-1] === '+' || numArray[numArray.length-1] === '-') {
                numArray.push(currNumber);
                numArray.push(button.textContent);
                currNumber = '';
                return;
            }
        }
        numArray.push(operate(numArray.pop(), numArray.pop(), currNumber));
    } else {
        result = false;
        numArray.push(currNumber);
    }
    numArray.push(button.textContent);
    currNumber = '';
}))

function equalsTo() {
    numArray.push(parseInt(currNumber));
    currNumber = '';
    let op, num1, num2;
    while (numArray.length > 1) {
        num2 = numArray.pop();
        op = numArray.pop();
        num1 = numArray.pop(); 
        numArray.push(operate(op, num1, num2));
    }
    currNumber = numArray.pop();
    addOnDisplay(currNumber);
}
