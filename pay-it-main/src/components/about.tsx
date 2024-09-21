import { MotionDiv } from "@/lib/framer";
import Image from "next/image";

export function About() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="container my-20 md:my-0 grid grid-rows-[1fr,auto] grid-cols-1 gap-12 md:grid-rows-[auto,1fr] scroll-m-36"
      id="sobre"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold md:text-center">A Pay It</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-10 md:gap-5">
        <div className="md:order-last md:grid md:grid-cols-2 md:gap-x-5">
          <div className="relative w-fit h-fit flex flex-col justify-center items-center">
            <Image
              className="rounded-tl-[150px] rounded-br-[150px] rounded-bl-lg rounded-tr-lg md:rounded-tl-[130px] md:rounded-br-[130px] lg:rounded-br-[150px] lg:rounded-tl-[150px]"
              src="/pay-it.png"
              alt="Pay-it"
              width={500}
              height={500}
            />
            <div className="-z-10 absolute bg-orange-500 w-full h-full top-0 -right-2 rounded-tl-[200px] rounded-br-[150px] md:rounded-br-[130px] lg:rounded-br-[150px] rounded-bl-lg rounded-tr-lg sm:rounded-br-[150px] sm:rounded-tl-[150px]" />
          </div>
          <div className="md:grid md:grid-rows-[auto,1fr]  hidden md:gap-4 md:relative">
            <Image
              className="rounded-tl-[50px] rounded-br-[50px] rounded-bl-lg rounded-tr-lg sm:w-32 md:w-36 xl:w-44"
              src="/img1.jpg"
              alt="Pay-it"
              width={150}
              height={150}
            />
            <Image
              className="rounded-tl-[40px] rounded-br-[40px] rounded-bl-lg rounded-tr-lg sm:w-24 md:w-32 xl:w-40"
              src="/img2.jpg"
              alt="Pay-it"
              width={130}
              height={130}
            />
            <div className="bg-white rounded-tl-[40px] rounded-br-[40px] rounded-bl-lg rounded-tr-lg w-24 h-20 hidden lg:flex  items-center justify-center absolute top-24 left-36 sm:left-28 sm:w-16 sm:h-16 lg:left-36 lg:w-24 lg:h-20  xl:left-44">
              <Image
                className="sm:w-10 md:w-16"
                src="/pay-it-small.svg"
                alt="Pay-it"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:justify-center">
          <p className="text-xl md:text-3xl font-bold md:text-left">
            Um pouco sobre nossa história
          </p>
          <p className="text-pretty lg:text-left">
          Atuando a mais de 10 anos junto aos maiores players do mercado de Adquirência, tivemos a honra de conhecer milhares de negócios por todo território nacional e acompanhar de perto o dia a dia do empreendedor brasileiro, compreendendo suas necessidades e dificuldades para escalar seu negócio.
          Durante essa jornada percebemos que cada negócio é único, e por isso precisa de soluções especificas. Pensando nisso desenvolvemos uma marca que oferece mais, um conjunto de soluções sob medida para cada negócio.
          Mais que um banco ou plataforma de pagamentos queremos nos tornar seu parceiro em uma jornada rumo ao seu sucesso.
          </p>
        </div>
      </div>
    </MotionDiv>
  );
}
