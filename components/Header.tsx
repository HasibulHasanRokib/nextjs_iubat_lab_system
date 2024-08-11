import prisma from "@/lib/db";

export default async function Header() {
  const activeStudent = await prisma.student.findMany({
    where: { isLoggedIn: true },
  });

  const current = new Date();
  const time = current.toLocaleTimeString("en-US");
  const date = current.toDateString();

  return (
    <div className="flex justify-between items-start p-4 border-b">
      <div className="">
        <h5>Computer lab 1 (CSE Practice lab)</h5>
        <p>Seat: {activeStudent.length}/50</p>
        <p className="text-green-500">System logout</p>
      </div>
      <h2 className="font-semibold text-xl">ICT Center</h2>
      <div className="">
        <p className="font-semibold text-lg">{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
