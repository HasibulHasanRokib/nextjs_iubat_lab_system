import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

export default async function AllStudents() {
  const students = await prisma.student.findMany({
    select: {
      id: true,
      fullName: true,
      studentId: true,
      program: true,
      email: true,
      phoneNumber: true,
      gender: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Table className="border">
        <TableCaption>A list of your all students.</TableCaption>
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
