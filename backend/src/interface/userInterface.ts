export enum Genders {
  Male = "male",
  Female = "female",
  Others = "others",
}

export interface userInterface {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  age: number;
  gender: Genders;
}
