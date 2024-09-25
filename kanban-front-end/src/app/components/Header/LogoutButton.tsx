"use client";

import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push("/");
    },
  });

  return <button className="py-1 px-2 rounded-xl bg-red-200" onClick={() => mutate()}>Выйти</button>;
}