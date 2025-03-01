import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const unbounded = Unbounded({
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "ПАТРИОТ. Уран Саха",
  description: "Патриотический сайт для молодежи, направленный на патриотичсекое воспитание, сохранение исторической памяти и вовлечение молодежи в активную общественную жизнь",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // ИСПРАВЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // ИСПРАВЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <html lang="en">
      <body className={`${unbounded.variable} antialiased`}>
        <header className="relative z-50 container flex items-center">
          <Link href={"/"}>
            <Image alt="logo" src="/logos/main.png" height={143} width={280} />
          </Link>
          <div className="flex gap-8 mb-6">
            <Button variant={"ghost"}>Работодателям</Button>
            <Link href={"/register"}>
              <Button variant={"outline"} size={"lg"}>
                Войти
              </Button>
            </Link>
          </div>
        </header>
        {children}
        <footer className="bg-gray-200">
          <div className="container">
            <div className="flex flex-wrap place-content-between w-full py-16">
              <span className="grid gap-[50px]">
                <Link href="/">Главная</Link>
                <Link href="/">Истории</Link>
                <Link href="/">Карта сайта</Link>
              </span>
              <span className="grid gap-[50px]">
                <Link href="/">Поисковый портал</Link>
                <Link href="/">Новости</Link>
                <Link href="/">Видеоуроки</Link>
              </span>
              <span className="grid gap-[50px]">
                <Link href="/">Благотворительность</Link>
                <Link href="/">Форум</Link>
                <Link href="/">Поиск</Link>
              </span>
              <span className="grid gap-[50px]">
                <Link href="/">О проекте</Link>
                <Link href="/">Вопрос-ответ</Link>
                <Link href="/">Контакты</Link>
              </span>
            </div>
            <hr className="mx-12" />
            <div className="flex items-center place-content-between w-full">
              <Link href={"/"}>
                <Image
                  alt="logo"
                  src="/logos/main.png"
                  height={143}
                  width={280}
                />
              </Link>
              <div className="flex items-center gap-[43px]">
                <Link href={"/"}>
                  <Image
                    alt="facebook"
                    src="/icons/facebook.png"
                    width={39}
                    height={39}
                  />
                </Link>
                <Link href={"/"}>
                  <Image
                    alt="dzen"
                    src="/icons/dzen.png"
                    width={39}
                    height={39}
                  />
                </Link>
                <Link href={"/"}>
                  <Image alt="vk" src="/icons/vk.png" width={52} height={52} />
                </Link>
                <Link href={"/"}>
                  <Image
                    alt="telegram"
                    src="/icons/telegram.png"
                    width={39}
                    height={39}
                  />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
