// Whilst fetch is now native in Node 18, no one really supports mocking it out yet, so import this for now
import { fetch } from "cross-fetch";

export type User = {
  gender: "male" | "female";
  name: { title: string; first: string; last: string };
  dob: { date: string; age: number };
};

export const fetchUser = async (): Promise<User> => {
  const getUser = await fetch("https://randomuser.me/api");
  const userResponse = await getUser.json();

  return userResponse.results[0] as User;
};

export const generateCsv = (
  user: User,
  invisibilityScore: number,
  invisibilityStatus: string
): void => {
  return void 0;
};
