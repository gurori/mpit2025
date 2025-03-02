"use client";

import { cn } from "@/lib/utils";
import s from "./Polk.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { textSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiFetch from "@/lib/apiFetch";
import { Button } from "@/components/ui/button";

export default function PolkForm({token}: {token: string}) {
  const { push } = useRouter();
  const [formError, setFormError] = useState("");
  const polkSchema = z.object({
    name: textSchema,
    description: textSchema,
  });
  type TypeFormData = z.infer<typeof polkSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormData>({
    resolver: zodResolver(polkSchema),
  });

  const onSubmit = async (data: TypeFormData) => {
    try {
        
      const res = await apiFetch("/api/posts", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      
      if (res.ok) {
        push("/");
      } else
      if (res.status === 401) {
        push("/register");
      }
    } catch {
      setFormError("Ошибка. Пожалуйста повторите пойзже.");
    }
  };
  return (
    <form action="" className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      {formError}
      <label className="space-y-2 md:flex md:justify-between md:items-center">
        <p>Заголовок</p>
        <input
          className={cn("gray", s.input)}
          type="text"
          {...register("name")}
        />
      </label>
      {errors.name && <p className="text-red-400">{errors.name.message}</p>}
      <label className="space-y-2 md:flex md:justify-between md:items-center">
        <p>Описание</p>
        <textarea
          className={cn("gray", s.input)}
          {...register("description")}
        />
      </label>
      {errors.description && (
        <p className="text-red-400">{errors.description.message}</p>
      )}
      <Button size={"lg"} type="submit" className="place-self-start bg-black">
        Сохранить
      </Button>
    </form>
  );
}
