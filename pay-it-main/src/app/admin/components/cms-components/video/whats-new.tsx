import { HeaderAdmin } from "../../header/header-admin";
import { FormVideo } from "./form-video";

export const WhatsNew = () => {
  return (
    <div>
      <HeaderAdmin>
        <div>
          <h1 className="capitalize text-3xl font-medium">
            Seção - O que há de novo
          </h1>
          <p>Atualize dados do vídeo</p>
        </div>
      </HeaderAdmin>

      <div className="container mx-auto">
        <FormVideo />
      </div>
    </div>
  );
};
