var input = document.getElementById("textField");
var operators = ['+', '-', 'x', '/'];
var lastOperator = false
var blocked = false

function processResetButton() {
    input.value = "0";
    decimalAdded = false;
    blocked = false;
    lastOperator = false;
}

function processEqualsButton() {
    var equation = input.value.replaceAll("x", "*");


    input.value = eval(equation);

    if (input.value != equation) {
        lastOperator = false
    }

    if (input.value.toLowerCase().includes("inf")) {
        blocked = true
    }
}

function processOperatorButton(btnValue) {
    var inputVal = input.value;

    if (lastOperator || blocked) {
        return;
    }

    if (operators.some(element => inputVal.includes(element))) {
        processEqualsButton()
    }

    var lastChar = inputVal.substring(inputVal.length - 1);
    var btnVal = btnValue;

    if (inputVal == '') {
        return;
    }

    if (inputVal != '' && operators.indexOf(lastChar) == -1) {
        input.value += " " + btnVal + " ";
    } else if (inputVal == '' && btnVal == '-') {
        input.value += " " + btnVal + " ";
    }

    if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
        input.value = inputVal.substring(0, inputVal.length - 1) + btnVal;
    }

    lastOperator = true
}

function processDecimalButton(btnValue) {
    if (blocked) return;

    if (!isExitsDot()) {
        input.value += '.'
    }
}

function processNumberButton(btnValue) {
    if (blocked) return;

    if (input.value == '0')
        input.value = "";

    var btnVal = btnValue;
    input.value += btnVal;
    lastOperator = false

    if (input.value.length > 18) {
        input.value = "Too long, sorry ;("
        blocked = true
    }
}

function isExitsDot() {
    return input.value.includes(".")
}