#! /usr/bin/env node

import inquirer from'inquirer'

async function main() {
    const todoList: string[] = [];
    while (true) {
        const { options } = await inquirer.prompt(
            {
                name: "options",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add Task", "Delete Task", "Update Task", "View Tasks", "Exit"],
            });

        // conditional statements
        if (options === "Add Task") {
            const { task } = await inquirer.prompt(
                {
                    name: "task",
                    type: "input",
                    message: "Enter new task:",
                    validate: (input) => {
                        if (input.trim() === "") {
                            return "Task cannot be empty. Please enter a valid task.";
                        }
                        return true;
                    },
                });
            todoList.push(task);
            console.log("Task added successfully!");
        }
        else if (options === "View Tasks") {
            console.log("Here are your tasks");
            todoList.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        else if (options === "Update Task") {
            const { index } = await inquirer.prompt(
                {
                    name: "index",
                    type: "number",
                    message: "Enter the index of the task you want to update:",
                });
            if (index >= 1 && index <= todoList.length) {
                const { update } = await inquirer.prompt(
                    {
                        name: "update",
                        type: "input",
                        message: "Enter updated task",
                    });
                todoList[index - 1] = update;
                console.log("Task updated successfully!");
            }
            else {
                console.log("Invalid task index!");
            }
        }
        else if (options === "Delete Task") {
            const { index } = await inquirer.prompt(
                {
                    name: "index",
                    type: "number",
                    message: "Enter the index of task you want to delete",
                });
            if (index >= 1 && index <= todoList.length) {
                todoList.splice(index - 1, 1);
                console.log("Task deleted successfully!");
            }
            else {
                console.log("Invalid task index!");
            }
        }
        else if (options === "Exit") {
            console.log("Goodbye!");
            break;
        }
    }
}

main();
