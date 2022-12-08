#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

//Steps to make a calculator:
//1 Welcome the user
//2 Ask for numbers and operation
//3 Check if numbers are valid
//4 Computer answer and show the results
//5 Try again?


// make a function to give some time to run animation and after that stops animation
function sleep(time: number) {
    return new Promise((res) => {
        setTimeout(res, time)
    })
}

//Make a function for welcome message and give animation color
async function welcomeMsg(msg: string) {
    let animation = chalkAnimation.rainbow(msg) //Start
    await sleep(2000)
    animation.stop()
    console.log(chalk.yellow(` 
     _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|\n`));

    await getInput();
}



// Make a function to validate the input from user
function validateNumber(input: any): string | boolean {
    if (isNaN(input)) {
        return "Please enter a valid number";
    }
    else {
        return true;
    }
}


async function getInput() {
    const answers = await inquirer.prompt([
        {
            name: "firstNumber",
            type: "input",
            message: "Enter first number",
            validate: validateNumber
        },

        {
            name: "operation",
            type: "list",
            message: "Select Operator",
            choices: ["+", "-", "÷", "x", "^"]
        },

        {
            name: "secondNumber",
            type: "input",
            message: "Enter second number",
            validate: validateNumber
        }
    ])

    let num1 = Number(answers.firstNumber);
    let num2 = Number(answers.secondNumber);

    switch (answers.operation) {
        case "+":
            console.log(chalk.green(`Result of ${num1} + ${num2} = ${num1 + num2}`));
            break;
        case "-":
            console.log(chalk.green(`Result of ${num1} - ${num2} = ${num1 - num2}`));
            break;
        case "x":
            console.log(chalk.green(`Result of ${num1} x ${num2} = ${num1 * num2}`));
            break;
        case "÷":
            console.log(chalk.green(`Result of ${num1} ÷ ${num2} = ${num1 / num2}`));
            break;
        case "^":
            console.log(chalk.green(`Result of ${num1} ^ ${num2} = ${Math.pow(num1 ,num2)}`));
            break;

    }
};

async function startAgain() {
    do {
        await welcomeMsg("\nWelcome to my Calculator");
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? Press Y / N: "
        })
    }
    while (again.restart == "y" || again.restart == "Y" || again.restart == "yes" || again.restart == "Yes" || again.restart == "YES")
}
startAgain();