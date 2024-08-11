"use server";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { AttendanceSchema, TAttendanceSchema } from "@/lib/zodSchema";
import { redirect } from "next/navigation";

export const studentAuth = async (values: TAttendanceSchema) => {
  const validateValues = AttendanceSchema.safeParse(values);
  if (!validateValues.success) {
    return { error: "Invalid inputs!" };
  }
  const { studentId, password } = validateValues.data;

  const studentExist = await prisma.student.findFirst({
    where: { studentId },
  });

  if (!studentExist) {
    return { error: "You are not register. Please register first." };
  }

  const passwordOk = bcrypt.compareSync(password, studentExist.password);

  if (!passwordOk) {
    return { error: "Password incorrect!" };
  }

  if (studentExist.isBanned) {
    return { error: "You are banned!" };
  }

  if (studentExist.isLoggedIn === true) {
    await prisma.student.update({
      where: { id: studentExist.id },
      data: {
        isLoggedIn: false,
        logoutTime: new Date(),
        logoutTimestamps: {
          push: new Date().toISOString(),
        },
      },
    });

    return { success: "Logout successful." };
  }
  await prisma.student.update({
    where: { id: studentExist.id },
    data: {
      isLoggedIn: true,
      loginTime: new Date(),
      loginTimestamps: {
        push: new Date().toISOString(),
      },
    },
  });

  return { success: "Login successful." };
};
