export type User = {
  gender: "male" | "female";
  age: number;
};

export const fetchUser = async (): Promise<User> => {
  return {
    gender: "male",
    age: 20,
  };
};
