import type { User } from "./data.js";
import { calculateInvisibilityScore } from "./lib.js";

/**
 * Takes a superhero test score and saves the invisibility result to a csv file

 * @param {number} superheroTestScore the superhero test score result
 */
export const getInvisibilityScore = (superheroTestScore: number): void => {
  // TODO: Fetch actual user
  const user: User = { gender: "male", age: 30 };

  // Calculate the invisibility score
  const invisibiltyScore = calculateInvisibilityScore(superheroTestScore, user);

  // TODO: Calculate invis status

  // TODO: Press results into csv
};
