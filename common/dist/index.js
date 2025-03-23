"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogschema = exports.signin_schema = exports.signup_schema = void 0;
const zod_1 = require("zod");
const signup_schema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string()
        .min(5, "Password must be at least 5 characters long")
});
exports.signup_schema = signup_schema;
const signin_schema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required")
});
exports.signin_schema = signin_schema;
const blogschema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title cannot be empty"),
    content: zod_1.z.string().min(10, "Content must be at least 10 characters long"),
});
exports.blogschema = blogschema;
