// Whilst fetch is now native in Node 18, no one really supports mocking it out yet, so import this for now
import { fetch } from "cross-fetch";
import { writeFile } from "node:fs/promises";
import jsonexport from "jsonexport";

export type User = {
  gender: "male" | "female";
  name: { title: string; first: string; last: string };
  dob: { date: string; age: number };
};

/**
 * Fetches a test user and returns the relevant information
 *
 * @returns {User} a user that has taken the test
 */
export const fetchUser = async (): Promise<User> => {
  const getUser = await fetch("https://randomuser.me/api");
  const userResponse = await getUser.json();

  return userResponse.results[0] as User;
};

/**
 * Outputs a CSV at the project root for storing the results of the test
 *
 * @param {User} user the user from the `fetchUser` method
 * @param {number} superheroTestScore the inputted superhero test score
 * @param {number} invisibilityScore the calculated invisibility score
 * @param {string} invisibilityStatus the calculated invisibility status
 */
export const generateCsv = async (
  user: User,
  superheroTestScore: number,
  invisibilityScore: number,
  invisibilityStatus: string
): Promise<void> => {
  const data = {
    ...user,
    superheroTestScore,
    invisibilityScore,
    invisibilityStatus,
  };

  await writeFile("./result.csv", await jsonexport([data]));
};
