import { MotionDiv } from "@/lib/framer";
import { Card } from "./card";

export function Review() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -50 }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="container my-20 flex flex-col gap-12 scroll-m-28"
      id="novidades"
    >
      <div className="flex flex-col gap-4 md:text-center">
        <h3 className="text-4xl font-bold">O que estão falando sobre nós</h3>
      </div>
      <Card />
    </MotionDiv>
  );
}
