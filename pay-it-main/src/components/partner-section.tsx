"use client";
import img1 from "@/assets/images/section-img1.png";
import img2 from "@/assets/images/section-img2.png";
import img3 from "@/assets/images/section-img3.png";
import img4 from "@/assets/images/section-img4.png";
import { MotionDiv } from "@/lib/framer";
import Image from "next/image";

import { ButtonPartner } from "./butonsPostHog/buttonPartner";

const items = [
  {
    title: "Quando a gente conecta você cresce!",
    text: "Mais que só maquininha, somos o conjunto de soluções que seu negócio precisa para crescer.",
    img: img1,
  },
  {
    title: "Conecte seu negócio ao futuro.",
    text: "O futuro do seu negócio começa com a Pay it Brasil, de melhores Taxas a pagar menos impostos.",
    img: img2,
  },
  {
    title: "Tudo em um!",
    text: "Todas as soluções financeiras que seu negócio precisa em um só lugar.",
    img: img3,
  },
  {
    title: "De pessoas, para pessoas!",
    text: "Quem disse que a praticidade do digital, e confiança do atendimento humano não podem andar juntas?",
    img: img4,
  },
];

export async function PartnerSection() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="mt-20 py-9 sm:py-20 scroll-m-16"
      id="ser-payit"
    >
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
          Vem ser Payit.Brasil
        </h2>
        <div className="grid sm:grid-cols-2 items-center justify-items-center gap-6">
          {items.map((item) => (
            <div
              className="bg-card bg-opacity-40 px-4 lg:px-14 py-8 lg:py-16 rounded-md size-full grid xs:grid-cols-[2fr,1fr] even:xs:grid-cols-[1fr,2fr] group items-center gap-4 md:min-h-[335px] min-h-[271px] shadow-md shadow-black/30"
              key={item.title}
            >
              <div>
                <h3 className="text-balance text-xl md:text-2xl font-semibold text-secondary">
                  {item.title}
                </h3>
                <p className="text-pretty max-w-[24ch]">{item.text}</p>
              </div>
              <Image
                key={item.text}
                src={item.img}
                alt=""
                aria-hidden
                draggable={false}
                className="group-even:order-first"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-bold text-balance text-secondary">
            Vamos fazer historia Juntos
          </h3>
          <h4 className="mt-2 mb-9">
            Você e sua empresa são nossa prioridade, vamos marcar uma conversa
          </h4>
          <ButtonPartner />
        </div>
      </div>
    </MotionDiv>
  );
}
