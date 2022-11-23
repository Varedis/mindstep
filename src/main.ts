import { fetchUser, generateCsv } from "./data.js";
import { calculateInvisibilityScore, getInvisibilityStatus } from "./lib.js";

/**
 * Takes a superhero test score and saves the invisibility result to a csv file

 * @param {number} superheroTestScore the superhero test score result
 */
export const getInvisibilityScore = async (
  superheroTestScore: number
): Promise<void> => {
  // Fetch the user data
  const user = await fetchUser();

  // Calculate the invisibility score
  const invisibilityScore = calculateInvisibilityScore(
    superheroTestScore,
    user
  );

  // Get the invisibility status
  const invisibilityStatus = getInvisibilityStatus(invisibilityScore);

  // Parse the results into csv
  await generateCsv(
    user,
    superheroTestScore,
    invisibilityScore,
    invisibilityStatus
  );
};
