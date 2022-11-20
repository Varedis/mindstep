export type User = {
  gender: "male" | "female";
  name: { title: string; first: string; last: string };
  dob: { date: string; age: number };
};

export const fetchUser = async (): Promise<User> => {
  return {
    gender: "male",
    age: 20,
  };
};
