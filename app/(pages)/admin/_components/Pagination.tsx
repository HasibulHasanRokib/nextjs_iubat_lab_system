"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPage: number;
}

export default function Pagination({ totalPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") ?? 1;
  const perPage = searchParams.get("per_page") ?? 5;

  return (
    <div className="flex justify-between items-center pb-4 px-2">
      <button
        className={cn(
          "flex items-center gap-x-2 text-sm",
          Number(page) <= 1 && "invisible"
        )}
        onClick={() =>
          router.push(`/admin?page=${Number(page) - 1}&per_page=${perPage}`)
        }
      >
        <ArrowLeft size={15} /> Previous
      </button>
      <p className="font-semibold text-sm">
        Page {page} of {totalPage}
      </p>
      <button
        className={cn(
          "flex items-center gap-x-2 text-sm",
          Number(page) >= totalPage && "invisible"
        )}
        onClick={() =>
          router.push(`/admin?page=${Number(page) + 1}&per_page=${perPage}`)
        }
      >
        Next <ArrowRight size={15} />
      </button>
    </div>
  );
}
