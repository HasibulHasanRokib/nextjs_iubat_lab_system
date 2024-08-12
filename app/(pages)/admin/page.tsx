import { Prisma } from "@prisma/client";
import AllStudents from "./_components/AllStudents";
import Dashboard from "./_components/Dashboard";
import Navbar from "./_components/Navbar";
import prisma from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import Pagination from "./_components/Pagination";

interface StudentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const searchStudent = async (formData: FormData) => {
  "use server";
  const student_id = formData.get("student_id") as string;
  const searchParams = new URLSearchParams({
    ...(student_id && { student_id: student_id.trim() }),
  });
  redirect(`/admin/?${searchParams.toString()}`);
};

export default async function page({ searchParams }: StudentProps) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const searchFilter: Prisma.StudentWhereInput = {
    AND: [
      searchParams.student_id
        ? {
            studentId: {
              contains: searchParams.student_id as string,
              mode: "insensitive",
            },
          }
        : {},
    ],
  };

  const studentsPromise = prisma.student.findMany({
    where: searchFilter,
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const countPromise = prisma.student.count();
  const [students, total] = await Promise.all([studentsPromise, countPromise]);
  const totalPage = Math.ceil(total / Number(per_page));

  return (
    <main className="border rounded-md m-4 p-4 space-y-4 ">
      <Navbar />
      <Dashboard />
      <div className="border rounded-md p-2 space-y-3">
        <div className="flex justify-between items-center px-4">
          <h5 className="font-semibold">A list of your all students.</h5>
          <form action={searchStudent} className="flex gap-x-2">
            <Input type="search" name="student_id" placeholder="Student id" />
            <Button>
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </form>
        </div>
        <AllStudents students={students} />
        <Pagination totalPage={totalPage} />
      </div>
    </main>
  );
}
