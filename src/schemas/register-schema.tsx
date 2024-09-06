import * as z from "zod";

const RegisterSchema = z
  .object({
    email: z.string().email("Email should be valid"),
    username: z.string().min(3, "Username must have at least 3 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password must contain at least one letter, number and special character"
      ),
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password must contain at least one letter, number and special character"
      ),
    // role: z.string({ required_error: "Please select role" }),
    role: z.enum(["manager", "guest"], {
      required_error: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
  });

const RegisterDefaultValues = {
  username: "",
  email: "",
  password: "",
  confirmpassword: "",
  role: undefined,
};

export { RegisterSchema, RegisterDefaultValues };
