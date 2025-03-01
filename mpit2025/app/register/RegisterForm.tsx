"use client";

import {
  emailSchema,
  nameSchema,
  passwordSchema,
  roleSchema,
} from "@/lib/zod-schemas";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiFetch from "@/lib/apiFetch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import type { IApiErrorMessage } from "@/lib/types/IServerErrorMessage";
import { useState } from "react";

export default function RegisterForm() {
    const {push} = useRouter()
    const [formError, setFormError] = useState("");
  const userSchema = z.object({
    login: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
  });
  type TypeFormData = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TypeFormData>({
    resolver: zodResolver(userSchema),
    
  });

  const { field } = useController({ control, name: "role" });

  const onSubmit = async (data: TypeFormData) => {
    try {
        const res = await apiFetch("/api/users/register", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (res.ok) {
        push("/login")
    } else {
        const apiError: IApiErrorMessage = await res.json()
        setFormError(apiError.detail);
    }
    } catch {
        setFormError("Ошибка. Пожалуйста повторите пойзже.");
    }
  };

  return (
    <form className="grid gap-2 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-red-400">{formError}</p>
      <input
        {...register("login")}
        className="gray"
        placeholder="Имя"
        type="text"
      />
      <div>{errors.login && <p className="text-red-400">{errors.login.message}</p>}</div>
      <input
        {...register("email")}
        className="gray"
        placeholder="Почта"
        type="text"
      />
      <div>{errors.email && <p className="text-red-400">{errors.email.message}</p>}</div>
      <input
        {...register("password")}
        className="gray"
        placeholder="Пароль"
        type="password"
      />
      <div>{errors.password && <p className="text-red-400">{errors.password.message}</p>}</div>
      <Select onValueChange={field.onChange}>
        <SelectTrigger className="input-gray">
          <SelectValue placeholder="Роль" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="User">Пользователь</SelectItem>
          <SelectItem value="Organization">Организация</SelectItem>
          <SelectItem value="Admin">Админ</SelectItem>
        </SelectContent>
      </Select>
      <div>{errors.role && <p className="text-red-400">{errors.role.message}</p>}</div>
      <Button className="place-self-start" type="submit">
        Продолжить
      </Button>
    </form>
  );
}
