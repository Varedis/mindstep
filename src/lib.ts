import type { User } from "./data.js";

enum GenderModifier {
  male = 5,
  female = 8,
}

enum InvisibilityStatus {
  NotInvisible = "Not invisible",
  Camouflage = "Camouflage",
  Translucent = "Translucent",
  Transparent = "Transparent",
  Invisible = "Invisible",
}

/**
 * Takes a user and returns the gender modifier
 *
 * @param {User} user the user of the test
 * @returns {number} the gender modifier
 */
export const getGenderModifier = (user: User): number => {
  const modifier = GenderModifier[user.gender];

  if (!modifier) {
    throw new Error(`Couldn't find a modifier for ${user.gender}`);
  }

  return modifier;
};

/**
 * Takes a test score and a user and returns an invisibility score
 *
 * @param {number} superheroTestScore the score of the superhero test
 * @param {User} user the user of the test
 * @returns {number} the invisibility score that has been floored so it doesn't overestimate
 */
export const calculateInvisibilityScore = (
  superheroTestScore: number,
  user: User
): number => {
  let score = getGenderModifier(user) * (superheroTestScore - user.age);

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return Math.floor(score);
};

/**
 * Takes an invisibility score and translates it to a human readable categorisation
 *
 * @param {number} invisibilityScore the invisibilityScore generated from calculateInvisibilityScore
 * @returns {string} the invisibility status
 */
export const getInvisibilityStatus = (invisibilityScore: number): string => {
  if (invisibilityScore >= 0 && invisibilityScore <= 20) {
    return InvisibilityStatus.NotInvisible;
  } else if (invisibilityScore > 20 && invisibilityScore <= 40) {
    return InvisibilityStatus.Camouflage;
  } else if (invisibilityScore > 40 && invisibilityScore <= 60) {
    return InvisibilityStatus.Translucent;
  } else if (invisibilityScore > 60 && invisibilityScore <= 80) {
    return InvisibilityStatus.Transparent;
  } else if (invisibilityScore > 80 && invisibilityScore <= 100) {
    return InvisibilityStatus.Invisible;
  }

  throw new Error(`An unexpected value ${invisibilityScore} was encountered`);
};
