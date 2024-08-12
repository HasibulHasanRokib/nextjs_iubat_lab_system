import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search } from "lucide-react";
import { Student } from "@prisma/client";

export default async function AllStudents({
  students,
}: {
  students: Student[];
}) {
  return (
    <>
      <Table className="border">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Student Id</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Registration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => {
            return (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{student.fullName}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell className="uppercase">{student.program}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="capitalize">{student.gender}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>{student.createdAt.toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
