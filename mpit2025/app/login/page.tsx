import Link from "next/link";
import LoginFrom from "./LoginFrom";

export default function LoginPage() {
    return <div className="center mb-32 mt-6">
          <div className="card-md">
            <h3>Вход</h3>
            <LoginFrom />
            <Link href={"/register"}>Нет аккаунта? Зарегистрироваться</Link>
          </div>
        </div>
}