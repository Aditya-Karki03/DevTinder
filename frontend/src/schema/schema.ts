import z from "zod";
export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(5, {
    message: "Password must be 5 characters",
  }),
});

export const registerFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  // password: z.string().min(5, {
  //   message: "Password must be 5 characters",
  // }),
  firstName: z.string().refine((val) => val.length > 2 && val.length < 40, {
    message: "Invalid first name",
  }),
  lastName: z.string().refine((val) => val.length > 2 && val.length < 40, {
    message: "Invalid last name",
  }),
  // gender: z.enum(["male", "female", "others"], {
  //   message: "Invlid gender",
  // }),
  about: z.string().refine((val) => val.length > 0 && val.length <= 100, {
    message: "Please Tell us something about yourself",
  }),
  skills: z.string(),
  // skills: z.array(z.string(), {
  //   message: "Please enter some skills",
  // }),
});
