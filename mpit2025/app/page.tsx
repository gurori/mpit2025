import apiFetch from "@/lib/apiFetch";
import Image from "next/image";

export default async function Home() {
  const res = await apiFetch("/api/posts")
  const polks: any[] = await res.json()
  return <>
  <main className="relative">
    <div className="image-container -mt-32 mb-16">
      {/* <h2 className="absolute text-center bottom-1/2">СЕРДЦЕ ЯКУТИИ <br />НАЧИНАЕТСЯ С ТЕБЯ</h2> */}
      <div className="main-title">
        <Image alt="title" src={"/images/main-title.png"} fill />
      </div>
      <img alt="bg" src="/images/main-bg.png" className="blur-top"/>
    </div>
    <div className="container relative">
      <div className="h-[157px]">

      <Image src="/images/80-years.png" fill alt="poster" />
      </div>
    </div>
  </main>
  <main className="container my-20 grid">
    <h4>
      Уран Саха - повышение интереса и вовлечённости у молодёжи к ценностям патриотизма, проявляющееся в недостаточной осведомленности об истории и культуре своей страны.
    </h4>
    <h3 className="pt-20 pb-10">Публикации бессмертного полка</h3>
    {polks.map((p, i) => (<div key={i}>
      <h6>{p.name}</h6>
      <p className="description">{p.description}</p>
    </div>))}
    </main></>;
}
