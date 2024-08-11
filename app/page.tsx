import AttendanceForm from "@/components/AttendenceForm";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";
import StudentTable from "@/components/StudentTable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <main className="p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-md border"
      >
        <ResizablePanel defaultSize={25}>
          <RegisterForm />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex flex-col space-y-2">
            <Header />
            <AttendanceForm />
            <StudentTable />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
