import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/users";
import { redirect } from "next/navigation";

export default async function ProfileRedirectPage() {
    const token = await getToken();
    if (!token){
        redirect("/login")
    }
    const res = await apiFetch("/api/users/role", {
        headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,

    },
    credentials: "include"
    })
    if (!res.ok) {
        console.log(res);
        redirect("/")
    }
    const role = await res.text()
    redirect(`/profile/${role.toLowerCase()}`)
}