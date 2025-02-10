export enum Genders {
  Male = "male",
  Female = "female",
  Others = "others",
}

// photoURL,
// about,
// skills,
export interface userInterface {
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  age: number;
  gender: Genders;
  photoUrl?: string;
  about: string;
  skills: string[];
}
