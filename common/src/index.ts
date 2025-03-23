import { z } from "zod";

const signup_schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string()
        .min(5, "Password must be at least 5 characters long")
});

const signin_schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

const blogschema = z.object({
    title: z.string().min(1, "Title cannot be empty"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
});

export type signupInput = z.infer<typeof signup_schema>;
export type signinInput = z.infer<typeof signin_schema>;
export type blogInput = z.infer<typeof blogschema>;

export { signup_schema, signin_schema, blogschema };
