"use server";

import prisma from "@/lib/db";
import { registerSchema, TRegisterSchema } from "@/lib/zodSchema";
import bcrypt from "bcryptjs";

export const registerAction = async (values: TRegisterSchema) => {
  try {
    console.log(values);
    const validateValues = registerSchema.safeParse(values);
    if (!validateValues.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }
    const {
      studentId,
      email,
      program,
      fullName,
      gender,
      password,
      phoneNumber,
    } = validateValues.data;

    const studentExist = await prisma.student.findFirst({
      where: { studentId },
    });

    if (studentExist) {
      return { error: "This student ID is already registered!" };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    await prisma.student.create({
      data: {
        studentId,
        email,
        program,
        fullName,
        gender,
        password: hashPassword,
        phoneNumber,
      },
    });
    return { success: "Registration successful." };
  } catch (error) {
    return { error: "Something went wrong!Please try again later." };
  }
};
