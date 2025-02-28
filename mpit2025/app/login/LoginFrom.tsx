"use client"

import { passwordSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiFetch from "@/lib/apiFetch";

export default function LoginFrom() {
    const userSchema = z.object({
        password: passwordSchema
    })
    type TypeFormData = z.infer<typeof userSchema>;

    const form = useForm<TypeFormData>({resolver: zodResolver(userSchema)});

    const onSubmit = async (data: TypeFormData) => {
        const res = await apiFetch("/api/users/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        });
    }

    return <div></div>
}