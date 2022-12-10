#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";

//Steps to make a calculator:
//1 Welcome the user
//2 Ask for numbers and operation
//3 Check if numbers are valid
//4 Computer answer and show the results
//5 Try again?

// make a function to give some time to run animation and after that stops animation
function sleep(time: number) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}

//Make a function for welcome message and give animation color
async function welcomeMsg() {
    const spinner = createSpinner(chalk.yellow("Initializing Calculator...\n")).start();
    await sleep(2000);
    spinner.success();

    // Add a banner
    figlet(`\nMy  CLI  Calculator  !\n`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + "\n");
    });
    await sleep(1000);

    //Add animation
    let animation = chalkAnimation.rainbow("\n\t\t\t\tDeveloped by M.Fasih\n"); //Start
    await sleep(2000);
    console.log(
        chalk.yellow(` 
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
    |_____________________|\n\n\n`)
    );
    animation.stop();
}

// Make a function to validate the input from user
function validateNumber(input: any): string | boolean {
    if (isNaN(input)) {
        return "Please enter a valid number";
    } else {
        return true;
    }
}

async function getInput() {
    const answers = await inquirer.prompt([
        {
            name: "firstNumber",
            type: "input",
            message: "Enter first number",
            validate: validateNumber,
        },

        {
            name: "operation",
            type: "list",
            message: "Select Operator",
            choices: ["Addition (+)", "Subtraction (-)", "Divivsion (÷)", "Multiplication (x)", "Power (^)"],
        },

        {
            name: "secondNumber",
            type: "input",
            message: "Enter second number",
            validate: validateNumber,
        },
    ]);

    let num1 = Number(answers.firstNumber);
    let num2 = Number(answers.secondNumber);

    switch (answers.operation) {
        case "Addition (+)":
            console.log(chalk.yellow.bold(`\nResult of ${num1} + ${num2} = `) + chalk.green.bold(`${num1 + num2}\n`));
            break;
        case "Subtraction (-)":
            console.log(chalk.yellow.bold(`\nResult of ${num1} - ${num2} = `) + chalk.green.bold(`${num1 - num2}\n`));
            break;
        case "Multiplication (x)":
            console.log(chalk.yellow.bold(`\nResult of ${num1} x ${num2} = `) + chalk.green.bold(`${num1 * num2}\n`));
            break;
        case "Divivsion (÷)":
            console.log(chalk.yellow.bold(`\nResult of ${num1} ÷ ${num2} = `) + chalk.green.bold(`${num1 / num2}\n`));
            break;
        case "Power (^)":
                console.log(chalk.yellow.bold(`\nResult of ${num1} ^ ${num2} = `) + chalk.green.bold(`${Math.pow(num1, num2)}\n`));

            break;
    }
}

async function toContinue() {
    console.clear();
    await welcomeMsg();
    do {
        await getInput();
        var again = await inquirer.prompt({
            type: "confirm",
            name: "restart",
            message: "Do you want to do another calculation?",
        });
    } while (again.restart);
}
toContinue();
