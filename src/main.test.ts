import { fetchUser } from "./data.js";
import { calculateInvisibilityScore, getInvisibilityStatus } from "./lib.js";
import { getInvisibilityScore } from "./main.js";

vi.mock("./data.js", () => ({
  fetchUser: vi.fn().mockResolvedValue({
    gender: "male",
    name: { title: "Mr", first: "Svitomir", last: "G'ereta" },
    dob: { date: "1989-01-01T00:00:00.000Z", age: "30" },
  }),
}));

vi.mock("./lib.js", () => ({
  calculateInvisibilityScore: vi.fn().mockReturnValue(50),
  getInvisibilityStatus: vi.fn().mockReturnValue("Translucent"),
}));

describe("getInvisibilityScore", () => {
  test("it calls fetchUser", () => {
    getInvisibilityScore(30);

    expect(fetchUser).toHaveBeenCalledOnce();
  });

  test("it calls calculateInvisibilityScore", () => {
    getInvisibilityScore(30);

    expect(calculateInvisibilityScore).toHaveBeenCalledWith(30, {
      gender: "male",
      name: { title: "Mr", first: "Svitomir", last: "G'ereta" },
      dob: { date: "1989-01-01T00:00:00.000Z", age: "30" },
    });
  });

  test("it calls getInvisibilityStatus", () => {
    getInvisibilityScore(30);

    expect(getInvisibilityStatus).toHaveBeenCalledWith(50);
  });

  test.todo("it calls generateCsv");
});
