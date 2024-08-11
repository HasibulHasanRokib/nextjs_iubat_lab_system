import { CircleCheckBig } from "lucide-react";

export default function FormSuccess({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <>
      {message && (
        <div className="bg-emerald-500/15 text-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-sm">
          <CircleCheckBig />
          {message}
        </div>
      )}
    </>
  );
}
