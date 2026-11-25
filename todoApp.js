
import fs from "fs";
import readline from "readline";

const FILE = "task.json";

// Create JSON file if it doesn't exist
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load tasks
const loadTask = () => {
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data);
};

// Save tasks
const saveTask = (tasks) => {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
};

// Show menu
const showMenu = () => {
  console.log("\n======== Todo Application ========\n");
  console.log("1. Add Task");
  console.log("2. View Task");
  console.log("3. Delete Task");
  console.log("4. Exit\n");

  rl.question("Choose an option: ", handleMenu);
};

// Handle menu
const handleMenu = (option) => {
  switch (option) {

    // Add Task
    case "1":
      rl.question("Enter task: ", (task) => {
        if (!task.trim()) {
          console.log("Task cannot be empty.");
        } else {
          const tasks = loadTask();

          tasks.push({
            task: task.trim(),
            completed: false
          });

          saveTask(tasks);
          console.log("Task added successfully!");
        }

        showMenu();
      });
      break;

    // View Task
    case "2": {
      const tasks = loadTask();

      if (tasks.length === 0) {
        console.log("No task found.");
      } else {
        console.log("\nYour Tasks:");

        tasks.forEach((t, index) => {
          console.log(`${index + 1}. ${t.task}`);
        });
      }

      showMenu();
      break;
    }

    // Delete Task
    case "3": {
      const allTasks = loadTask();

      if (allTasks.length === 0) {
        console.log("No task to delete.");
        showMenu();
        return;
      }

      console.log("\nYour Tasks:");

      allTasks.forEach((t, index) => {
        console.log(`${index + 1}. ${t.task}`);
      });

      rl.question("Enter task number to delete: ", (num) => {
        const index = Number(num) - 1;

        if (
          Number.isInteger(index) &&
          index >= 0 &&
          index < allTasks.length
        ) {
          allTasks.splice(index, 1);

          saveTask(allTasks);

          console.log("Task deleted successfully!");
        } else {
          console.log("Invalid task number.");
        }

        showMenu();
      });

      break;
    }

    // Exit
    case "4":
      console.log("Thank you for using Todo Application!");
      rl.close();
      break;

    default:
      console.log("Invalid option. Please try again.");
      showMenu();
  }
};

// Start application
showMenu();
