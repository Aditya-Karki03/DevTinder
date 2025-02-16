import React, { createContext, useContext, useState, useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector, UseSelector } from "react-redux";

export interface IContextRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  about: string;
  gender: string;
  age: string; // Change from string to number
  skills: string;
  image: any;
}

// ✅ Provide default values, but `setRegistrationValues` should be a function to prevent runtime errors
const defaultValues: IContextRegistration = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  about: "",
  gender: "",
  age: "",
  skills: "",
  image: null,
};

export const RegistrationContext =
  createContext<IContextRegistration>(defaultValues);

export const useRegistration = () => {
  return useContext(RegistrationContext);
};

const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const email = useSelector((store: RootState) => store?.registration?.email);
  const password = useSelector(
    (store: RootState) => store?.registration?.password
  );
  const firstName = useSelector(
    (store: RootState) => store?.registration?.firstName
  );
  const lastName = useSelector(
    (store: RootState) => store?.registration?.lastName
  );
  const age = useSelector((store: RootState) => store?.registration?.age);
  const gender = useSelector((store: RootState) => store?.registration?.gender);
  const about = useSelector((store: RootState) => store?.registration?.about);
  const skills = useSelector((store: RootState) => store?.registration?.skills);
  const image = useSelector(
    (store: RootState) => store?.registration?.photoUrl
  );
  // Use local state to store registration values
  const [registrationData, setRegistrationData] =
    useState<IContextRegistration>(defaultValues);

  // Update local state whenever Redux state changes
  useEffect(() => {
    setRegistrationData({
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      about,
      skills,
      image,
    });
  }, [email, password, firstName, lastName, age, gender, about, skills, image]);

  //   const registrationValues = {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //     age,
  //     gender,
  //     about,
  //     skills,
  //     image,
  //   };
  console.log(about);
  return (
    <RegistrationContext.Provider value={registrationData}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
