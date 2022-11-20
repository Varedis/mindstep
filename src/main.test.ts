import { fetchUser, generateCsv } from "./data.js";
import { calculateInvisibilityScore, getInvisibilityStatus } from "./lib.js";
import { getInvisibilityScore } from "./main.js";

vi.mock("./data.js", () => ({
  fetchUser: vi.fn().mockResolvedValue({
    gender: "male",
    name: { title: "Mr", first: "Svitomir", last: "G'ereta" },
    dob: { date: "1989-01-01T00:00:00.000Z", age: "30" },
  }),
  generateCsv: vi.fn(),
}));

vi.mock("./lib.js", () => ({
  calculateInvisibilityScore: vi.fn().mockReturnValue(50),
  getInvisibilityStatus: vi.fn().mockReturnValue("Translucent"),
}));

const user = {
  gender: "male",
  name: { title: "Mr", first: "Svitomir", last: "G'ereta" },
  dob: { date: "1989-01-01T00:00:00.000Z", age: "30" },
};

describe("getInvisibilityScore", () => {
  test("it calls fetchUser", async () => {
    await getInvisibilityScore(30);

    expect(fetchUser).toHaveBeenCalledOnce();
  });

  test("it calls calculateInvisibilityScore", async () => {
    await getInvisibilityScore(30);

    expect(calculateInvisibilityScore).toHaveBeenCalledWith(30, user);
  });

  test("it calls getInvisibilityStatus", async () => {
    await getInvisibilityScore(30);

    expect(getInvisibilityStatus).toHaveBeenCalledWith(50);
  });

  test("it calls generateCsv", async () => {
    await getInvisibilityScore(30);

    expect(generateCsv).toHaveBeenCalledWith(user, 50, "Translucent");
  });
});
