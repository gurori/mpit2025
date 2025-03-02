import { cookies } from "next/headers";

export async function getToken() {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth")
    return token
}