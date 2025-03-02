import apiFetch from "@/lib/apiFetch";
import { getToken } from "@/lib/services/users";
import Image from "next/image";
import { redirect } from "next/navigation";
import s from "./ProfilePage.module.css";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
  const res = await apiFetch("/api/users", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  console.log(res);
  if (res.status === 401) redirect("/login");

  const user = await res.json();
  console.log(user);

  return (
    <div className="container">
      <h3>Личный кабинет</h3>
      <div className="container">
        <div className="relative h-[240px] w-full">
          <Image src={"/images/profile-bg.png"} alt="bg" fill />
        </div>
        <div className={s.card}>
          <div className="grid justify-center gap-8">
            <div className="flex gap-8">
              <div className={cn(s.user, "center rounded-full")}>
                <UserIcon size={72} className="text-slate-400" />
              </div>
              <div className="grid place-content-start gap-2">
                <p className={s.role}>{user.role}</p>
                <p className={s.name}>{user.firstName}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className={s.coins}>
                <p className={s.coinsTitle}>
                  Баланс:
                  <span
                    className={cn(
                      s.CoinsValue,
                      "text-[#CE4F3C] py-8 flex place-items-center gap-4"
                    )}
                  >
                    {user.coins}
                    <Image
                      alt="star"
                      src={"/icons/star.png"}
                      width={48}
                      height={48}
                    />
                  </span>
                </p>
              </div>
              <Link href={"/"} className={s.gotoMain}>
                <p className={cn(s.coinsTitle, "text-white p-6")}>
                  Перейти на главную
                </p>
              </Link>
            </div>
            <Link href={"/polk/new"} className="justify-self-center my-10">
              <Image alt="new post" src={"/images/new-polk.png"} height={100} width={360} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
