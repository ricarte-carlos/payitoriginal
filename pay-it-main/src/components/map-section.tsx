import { MotionDiv } from "@/lib/framer";
import { BrazilStates } from "./brazil-states";

export function MapSection() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="container my-20 md:flex md:flex-col md:items-center scroll-m-36"
      id="parceiros"
    >
      <h2 className="text-4xl font-bold mb-4">Nossos Parceiros</h2>
      <h3 className="text-balance text-xl font-medium">
        Temos representantes espalhados por todo o Brasil
      </h3>

      <svg
        role="img"
        aria-label="Brazil"
        width={798.4}
        height={755.807}
        id="map"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 798.4 755.807"
        preserveAspectRatio="xMinYMin"
        className="max-w-full h-auto"
      >
        <BrazilStates />
      </svg>
    </MotionDiv>
  );
}
