import jsonexport from "jsonexport";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { writeFile } from "node:fs/promises";
import { MockInstance } from "vitest";
import { fetchUser, generateCsv } from "./data.js";
import type { User } from "./data.js";

vi.mock("node:fs/promises");
vi.mock("jsonexport");

const response = {
  results: [
    {
      gender: "female",
      name: { title: "Ms", first: "Avni", last: "Mugeraya" },
      location: {
        street: { number: 4956, name: "Chimanlal Girdharlal Rd" },
        city: "Raurkela Industrial Township",
        state: "Kerala",
        country: "India",
        postcode: 59051,
        coordinates: { latitude: "8.2954", longitude: "73.6254" },
        timezone: { offset: "+2:00", description: "Kaliningrad, South Africa" },
      },
      email: "avni.mugeraya@example.com",
      login: {
        uuid: "28b872c7-8a09-4266-bcc7-b50e78263ef3",
        username: "lazypanda381",
        password: "rosie",
        salt: "QdLlxySX",
        md5: "db11e6dc0051d8670ae2ae890bf5eacf",
        sha1: "fbcf33fd57ca5133138b0e935ea9e24887e6e5ac",
        sha256:
          "039cdf1df321b5ff21be7b5c24556a085c383233917e4f7c8347c5de3c8bfa3d",
      },
      dob: { date: "1945-08-09T09:14:07.696Z", age: 77 },
      registered: { date: "2020-03-21T05:23:33.508Z", age: 2 },
      phone: "8142892018",
      cell: "8505956491",
      id: { name: "UIDAI", value: "648407756990" },
      picture: {
        large: "https://randomuser.me/api/portraits/women/43.jpg",
        medium: "https://randomuser.me/api/portraits/med/women/43.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/women/43.jpg",
      },
      nat: "IN",
    },
  ],
  info: { seed: "6e8958b4a63f5540", results: 1, page: 1, version: "1.4" },
};

const restHandlers = [
  rest.get("https://randomuser.me/api", (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(response))
  ),
];

const errorHandlers = [
  rest.get("https://randomuser.me/api", (_req, res, ctx) =>
    res(ctx.status(500), ctx.json(null))
  ),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe("fetchUser", () => {
  test("it calls the random user api", async () => {
    const res = await fetchUser();

    expect(res).toEqual(response.results[0]);
  });

  test("if the api is down it throws an error", async () => {
    server.use(...errorHandlers);

    await expect(fetchUser()).rejects.toThrowError("User not found");
  });
});

describe("generateCsv", () => {
  test("it takes a json string and returns a csv", async () => {
    const expectedCsv = "test1,test2\nvalue1,value2";
    (jsonexport as unknown as MockInstance).mockResolvedValue(expectedCsv);

    const expectedData = {
      ...response.results[0],
      superheroTestScore: 20,
      invisibilityScore: 50,
      invisibilityStatus: "Translucent",
    };

    await generateCsv(response.results[0] as User, 20, 50, "Translucent");

    expect(jsonexport).toHaveBeenCalledWith([expectedData]);
    expect(writeFile).toHaveBeenCalledWith("./result.csv", expectedCsv);
  });
});
