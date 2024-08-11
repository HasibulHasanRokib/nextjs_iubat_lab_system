"use client";

import { AttendanceSchema, TAttendanceSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import { studentAuth } from "@/actions/studentAuth";
import { useRouter } from "next/navigation";

export default function AttendanceForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TAttendanceSchema>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
  });
  const submit = (values: TAttendanceSchema) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      await studentAuth(values).then((data) => {
        if (data.success) {
          router.refresh();
        }
        setSuccess(data?.success);
        setError(data?.error);
        form.reset();
      });
    });
  };
  return (
    <div className="border-b min-h-60 flex flex-col justify-center items-center">
      <div className="space-y-3 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="flex gap-x-3">
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} type="submit" className="mt-8">
              {isPending ? "Loading..." : "Login/Logout"}
            </Button>
          </form>
        </Form>
        <FormError message={error} />
        <FormSuccess message={success} />
        <h5 className="text-sm">
          Note:You have to logout when you will leave the lab. Otherwise you
          will be blocked.
        </h5>
      </div>
    </div>
  );
}
