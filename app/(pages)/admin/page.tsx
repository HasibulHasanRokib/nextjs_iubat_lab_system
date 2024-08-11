import AllStudents from "./_components/AllStudents";
import Dashboard from "./_components/Dashboard";
import Navbar from "./_components/Navbar";

export default function page() {
  return (
    <main className="border rounded-md m-4 p-4 space-y-4 ">
      <Navbar />
      <Dashboard />
      <AllStudents />
    </main>
  );
}
