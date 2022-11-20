import { calculateInvisibilityScore, getInvisibilityStatus } from "./lib.js";
import { getInvisibilityScore } from "./main.js";

vi.mock("./lib.js", () => ({
  calculateInvisibilityScore: vi.fn().mockReturnValue(50),
  getInvisibilityStatus: vi.fn().mockReturnValue("Translucent"),
}));

describe("getInvisibilityScore", () => {
  test.todo("it calls fetchUser");

  test("it calls calculateInvisibilityScore", () => {
    getInvisibilityScore(30);

    expect(calculateInvisibilityScore).toHaveBeenCalledWith(30, {
      gender: "male",
      age: 20,
    });
  });

  test("it calls getInvisibilityStatus", () => {
    getInvisibilityScore(30);

    expect(getInvisibilityStatus).toHaveBeenCalledWith(50);
  });

  test.todo("it calls generateCsv");
});
