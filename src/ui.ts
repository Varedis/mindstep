import inquirer from "inquirer";
import { getInvisibilityScore } from "./main.js";

process.stdout.write(
  "Hello, welcome to Mindstep's invisibility score data entry UI\n\n"
);

const { superheroTestScore } = await inquirer.prompt([
  {
    type: "input",
    name: "superheroTestScore",
    message: "Please enter the users superhero test score",
    validate(value) {
      if (isNaN(parseInt(value)) || value < 0 || value > 100) {
        return "Please enter a valid test score between 0 and 100";
      }

      return true;
    },
    filter: (value) => (isNaN(parseInt(value)) ? value : parseInt(value, 10)),
  },
]);

await getInvisibilityScore(superheroTestScore);

process.stdout.write(
  "\nThe users invisibility has been calculated! Check the results file at ./results.csv\n\nBye!"
);
