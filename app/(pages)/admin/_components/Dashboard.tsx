import prisma from "@/lib/db";
import { PieChartComponent } from "./PieChart";
import DetailsCard from "./DetailsCard";

export default async function Dashboard() {
  const activeCount = await prisma.student.count({
    where: {
      isLoggedIn: true,
    },
  });
  const offline = await prisma.student.count({
    where: { isLoggedIn: false, isBanned: false },
  });
  const bannedCount = await prisma.student.count({
    where: {
      isBanned: true,
    },
  });
  const total = await prisma.student.count();
  return (
    <div className="flex  gap-x-3">
      <PieChartComponent
        active={activeCount}
        banned={bannedCount}
        total={total}
        offline={offline}
      />
      <DetailsCard />
    </div>
  );
}
