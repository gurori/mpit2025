import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="center mb-32 mt-6">
      <div className="card-md">
        <h3>Регистрация</h3>
        <RegisterForm />
        <Link href={"/login"}>Ещё не зарегистрированы?</Link>
      </div>
    </div>
  );
}
