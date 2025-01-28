export enum Genders {
  Male = "male",
  Female = "female",
  Others = "others",
}

export interface userInterface {
  firstName: string;
  lastName: string;
  age: number;
  gender: Genders;
}
