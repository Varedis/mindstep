import {
  calculateInvisibilityScore,
  getGenderModifier,
  getInvisibilityStatus,
} from "./lib.js";

describe("getGenderModifier", () => {
  test("for a male it returns 5", () => {
    expect(getGenderModifier("male")).toEqual(5);
  });

  test("for a female it returns 8", () => {
    expect(getGenderModifier("female")).toEqual(8);
  });

  test("for an unknown gender it returns an error", () => {
    expect(() => getGenderModifier(null)).toThrow(
      new Error("Couldn't find a modifier for null")
    );
  });
});

describe("calculateInvisibilityScore", () => {
  describe("for a male", () => {
    const cases = [
      { superheroScore: 10, age: 20, score: 0 },
      { superheroScore: 30, age: 20, score: 50 },
      { superheroScore: 25.52, age: 20, score: 27 },
      { superheroScore: 100, age: 20, score: 100 },
    ];

    test.each(cases)(
      "with superhero score of {$superheroScore} and an age of {$age} it returns {$score}",
      ({ superheroScore, age, score }) => {
        expect(
          calculateInvisibilityScore(superheroScore, {
            gender: "male",
            name: { title: "Mr", first: "Svitomir", last: "G'ereta" },
            dob: { date: "2022-01-01T00:00:00.000Z", age },
          })
        ).toEqual(score);
      }
    );
  });

  describe("for a female", () => {
    const cases = [
      { superheroScore: 10, age: 20, score: 0 },
      { superheroScore: 30, age: 20, score: 80 },
      { superheroScore: 25.52, age: 20, score: 44 },
      { superheroScore: 100, age: 20, score: 100 },
    ];

    test.each(cases)(
      "with superhero score of {$superheroScore} and an age of {$age} it returns {$score}",
      ({ superheroScore, age, score }) => {
        expect(
          calculateInvisibilityScore(superheroScore, {
            gender: "female",
            name: { title: "Mrs", first: "Matilda", last: "Ranta" },
            dob: { date: "2022-01-01T00:00:00.000Z", age },
          })
        ).toEqual(score);
      }
    );
  });
});

describe("getInvisibilityStatus", () => {
  const cases = [
    { score: 0, status: "Not invisible" },
    { score: 10, status: "Not invisible" },
    { score: 20, status: "Not invisible" },
    { score: 21, status: "Camouflage" },
    { score: 30, status: "Camouflage" },
    { score: 40, status: "Camouflage" },
    { score: 41, status: "Translucent" },
    { score: 50, status: "Translucent" },
    { score: 60, status: "Translucent" },
    { score: 61, status: "Transparent" },
    { score: 70, status: "Transparent" },
    { score: 80, status: "Transparent" },
    { score: 81, status: "Invisible" },
    { score: 90, status: "Invisible" },
    { score: 100, status: "Invisible" },
  ];

  test.each(cases)(
    "for score {$score} it returns {$status}",
    ({ score, status }) => {
      expect(getInvisibilityStatus(score)).to.equal(status);
    }
  );

  test("an unexpected value returns an error", () => {
    expect(() => getInvisibilityStatus(-100)).toThrow(
      new Error("An unexpected value -100 was encountered")
    );
  });
});
