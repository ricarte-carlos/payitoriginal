import { AuthForm } from "@/components/auth/form";
import { AscentIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { getPageSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import { InputAdmin } from "../components/ui/input";

export default async function Page() {
  const session = await getPageSession();
  if (session?.user) redirect("/admin");

  return (
    <main className="w-full">
      <div className="max-w-lg p-10 bg-zinc-900 border-neutral-600 border absolute inset-0 m-auto h-fit rounded-md">
        <AscentIcon className="m-auto w-32 h-16 " />
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-bold text-center">Bem vindo</h1>
          <p className="text-center w-3/4">
            Para acessar o painel de administração, faça login com suas
            credenciais.
          </p>
        </div>

        <AuthForm action="/api/sign-in">
          <Label htmlFor="username">Nome de usuário</Label>
          <InputAdmin
            name="username"
            id="username"
            className="bg-gray-300 text-black"
            placeholder="Ex John Doe"
          />
          <br />
          <Label htmlFor="password">Senha</Label>
          <InputAdmin
            type="password"
            name="password"
            id="password"
            className="bg-gray-300 text-black"
            placeholder="Senha"
          />
          <br />
        </AuthForm>
      </div>
    </main>
  );
}
