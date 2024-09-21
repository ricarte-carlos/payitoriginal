import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { ButtonAdmin } from "../components/ui/button";
import { InputAdmin } from "../components/ui/input";
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";

export function UpdateNameCard({ name }: { name: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { name } = Object.fromEntries(form.entries()) as { name: string };
    if (name.length < 3) {
      return toast.error("Name must be longer than 3 characters.");
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) toast.success("Nome atualizado com sucesso!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Seu nome",
        description:
          "Seu nome é exibido para outros usuários e é usado para personalizar seu conteúdo.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <InputAdmin
            defaultValue={name ?? ""}
            name="name"
            disabled={isPending}
          />
        </AccountCardBody>
        <AccountCardFooter description="Máximo de 64 caracteres">
          <ButtonAdmin disabled={isPending}>Atualizar Nome</ButtonAdmin>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
