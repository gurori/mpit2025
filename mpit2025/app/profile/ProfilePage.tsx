import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/users";
import Image from "next/image";
import { redirect } from "next/navigation";
import s from "./ProfilePage.module.css"

export default async function ProfilePage() {
    const token = await getToken();
            if (!token){
                redirect("/login")
            }
        const res = await apiFetch("/api/users",{
            credentials: "include",
            headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        })
        const user = await res.json()

        return <div>
            <h3>Личный кабинет</h3>
            <div className="container">
                <Image src={"/images/profile-bg.png"} alt="bg" fill />
                <div className={s.card}>

                </div>
            </div>
        </div>
}