import * as z from "zod";

const AdminCreateSchema = z
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
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        "Password must contain at least one letter, number and special character"
      ),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const AdminCreateDefaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "administrator",
};

export { AdminCreateSchema, AdminCreateDefaultValues };
