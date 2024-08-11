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

export default async function StudentTable() {
  const activeStudent = await prisma.student.findMany({
    where: { isLoggedIn: true },
    select: {
      id: true,
      fullName: true,
      studentId: true,
      program: true,
      loginTime: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-3 ">
      <Table className="border">
        <TableCaption>A list of your active students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Student Id</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Login Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeStudent.map((student, index) => {
            return (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{student.fullName}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell className="uppercase">{student.program}</TableCell>
                <TableCell>{student.loginTime?.toLocaleTimeString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
