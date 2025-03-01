"use server"

import { redirect } from "next/navigation";
import s from "./Polk.module.css";
import PolkForm from "./PolkForm";
import { getToken } from "@/lib/services/users";

export default async function NewPolkPage() {
    const token = await getToken();
              if (!token) {
                redirect("/login");
              }
  return (
    <>
      <div className="container mb-16">
        <h3 className="py-12">Моя публикация</h3>
        <main className={s.bg}>
          <PolkForm token={token.value} />
        </main>
      </div>
    </>
  );
}
