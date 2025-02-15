import z from "zod";
export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(5, {
    message: "Password must be 5 characters",
  }),
});

const maxImgSize = 5 * 1024 * 1024;
const acceptedImgTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(5, {
    message: "Password must be 5 characters",
  }),
  firstName: z.string().refine((val) => val.length > 2 && val.length < 40, {
    message: "Invalid first name",
  }),
  lastName: z.string().refine((val) => val.length > 2 && val.length < 40, {
    message: "Invalid last name",
  }),
  gender: z.enum(["male", "female", "others"], {
    message: "Invlid gender",
  }),
  age: z.string().refine((val) => Number(val) >= 18, {
    message: "You must be more than 18 years of age",
  }),
  about: z.string().refine((val) => val.length > 0 && val.length <= 100, {
    message: "Please Tell us something about yourself",
  }),
  skills: z.string(),
  // skills: z.array(z.string(), {
  //   message: "Please enter some skills",
  // }),
  image: z
    .any()
    .refine((images) => images?.[0].size <= maxImgSize, {
      message: "Image size should be within 5MB",
    })
    .refine((images) => acceptedImgTypes.includes(images?.[0].type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

export const emailFormSchema = registerFormSchema.pick({
  email: true,
  password: true,
});

export const personalInfoFormSchema = registerFormSchema.pick({
  firstName: true,
  lastName: true,
  gender: true,
  age: true,
  about: true,
  skills: true,
});

export const imageFormSchema = registerFormSchema.pick({
  image: true,
});
export type emailFormSchemaType = z.infer<typeof emailFormSchema>;
export type personalInfoFormSchemaType = z.infer<typeof personalInfoFormSchema>;
export type imageFormSchemaType = z.infer<typeof imageFormSchema>;
