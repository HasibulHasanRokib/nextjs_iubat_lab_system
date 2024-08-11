import * as z from "zod";

export const registerSchema = z.object({
  studentId: z
    .string()
    .min(8, "Student id must be 8 digit!")
    .max(8, "Student id not more than 8 digit!"),

  program: z.string(),
  fullName: z.string().min(3, "Name is required!"),
  gender: z.string(),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(11, "Phone number is required!")
    .max(11, "Invalid number!"),

  password: z
    .string()
    .min(4, "Password must be 4 characters!")
    .max(8, "Password not more than 8 characters!"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const AttendanceSchema = z.object({
  studentId: z
    .string()
    .min(8, "Student id must be 8 digit!")
    .max(8, "Student id not more than 8 digit!"),

  password: z
    .string()
    .min(4, "Password must be 4 characters!")
    .max(8, "Password not more than 8 characters!"),
});

export type TAttendanceSchema = z.infer<typeof AttendanceSchema>;
