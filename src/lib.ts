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
 * @param {string} gender the gender of the user of the test
 * @returns {number} the gender modifier
 */
export const getGenderModifier = (gender: User["gender"]): number => {
  const modifier = GenderModifier[gender];

  if (!modifier) {
    throw new Error(`Couldn't find a modifier for ${gender}`);
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
  const genderModifier = getGenderModifier(user.gender);
  const score = genderModifier * (superheroTestScore - user.dob.age);

  return normaliseScore(score, genderModifier);
};

/**
 * Takes a test score between -NNN..NNN and normalises it to 0..100
 *
 * @param {number} score the superhero test score
 * @param {GenderModifier} genderModifier the gender modifier used for the user
 * @returns {number} the normalised test score
 */
export const normaliseScore = (
  score: number,
  genderModifier: GenderModifier
): number => {
  const max = genderModifier * 100;
  const min = -max;

  // Normalise the score to 0..1
  let normalisedScore = (score - min) / (max - min);

  // Flatten out the super low numbers so that we don't overestimate peoples abilities just because they are older
  if (normalisedScore <= 0.2) normalisedScore = 0;

  return Math.floor(normalisedScore * 100);
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
