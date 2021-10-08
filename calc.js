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
    var inputVal = input.value.replaceAll("x", "*");

    var words = inputVal.split(' ')

    if (words.length != 3) return;

    var number1 = parseFloat(words[0])
    var number2 = parseFloat(words[2])
    var operator = words[1]

    var eval = 0.0

    if (operator == '+') {
        eval = number1 + number2
    }
    if (operator == '-') {
        eval = number1 - number2
    }
    if (operator == '/') {
        if (number2 == 0) {
            eval = "Error"
            blocked = true
        } else {
            eval = number1 / number2
        }
    }
    if (operator == '*') {
        eval = number1 * number2
    }

    input.value = eval.toString()

    if (input.value != equation) {
        lastOperator = false
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