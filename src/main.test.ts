import { calculateInvisibilityScore } from "./lib.js";
import { getInvisibilityScore } from "./main.js";

vi.mock("./lib.js", () => ({
  calculateInvisibilityScore: vi.fn().mockReturnValue(50),
}));

describe("getInvisibilityScore", () => {
  test.todo("it calls fetchUser");

  test("it calls calculateInvisibilityScore", () => {
    getInvisibilityScore(30);

    expect(calculateInvisibilityScore).toHaveBeenCalledWith(30, {
      gender: "male",
      age: 30,
    });
  });

  test.todo("it calls getInvisibilityStatus");

  test.todo("it calls generateCsv");
});
