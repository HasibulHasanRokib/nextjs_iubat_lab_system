import { TriangleAlert } from "lucide-react";

export default function FormError({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <>
      {message && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-x-2 text-sm w-full">
          <TriangleAlert /> {message}
        </div>
      )}
    </>
  );
}
