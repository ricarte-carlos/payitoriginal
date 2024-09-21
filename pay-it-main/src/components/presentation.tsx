import { Separator } from "./separator";
import { Button } from "./ui/button";

export function Presentation() {
  return (
    <div className="container my-6 md:my-0 flex flex-col gap-4 sm:sticky h-fit sm:-translate-y-14 sm:z-10">
      <div className="grid grid-rows-1 grid-cols-3 sm:grid-cols-5 bg-transparent sm:p-5 sm:bg-featured sm:dark:bg-gray-600/40 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0 sm:place-items-center rounded-xl  shadow-2xl shadow-black/20">
        <div className="text-center border-dashed">
          <p className="text-secondary font-bold md:text-2xl">5mil+</p>
          <p className="font-medium">Clientes</p>
        </div>
        <Separator
          className="bg-line-hero hidden sm:block dark:bg-white"
          orientation="vertical"
        />
        <div className="text-center">
          <p className="text-secondary font-bold md:text-2xl">R$ 1 Bilhão</p>
          <p className="font-medium">Processados Anualmente</p>
        </div>
        <Separator
          className="bg-line-hero hidden sm:block dark:bg-white"
          orientation="vertical"
        />
        <div className="text-center">
          <p className="text-secondary font-bold md:text-2xl">200+</p>
          <p className="font-medium">Parceiros</p>
          <p className="font-medium">no Brasil</p>
        </div>
      </div>
      <Button className="rounded-full flex sm:hidden">Call to action</Button>
    </div>
  );
}
