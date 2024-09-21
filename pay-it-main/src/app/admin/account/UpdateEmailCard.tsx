import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { ButtonAdmin } from "../components/ui/button";
import { InputAdmin } from "../components/ui/input";
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";

export function UpdateEmailCard({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { email } = Object.fromEntries(form.entries()) as { email: string };
    if (email.length < 3) {
      return toast.error("Email must be longer than 3 characters.");
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) toast.success("Email atualizado com sucesso!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Seu e-mail",
        description:
          "Por favor, atualize seu e-mail para que possamos entrar em contato com você.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <InputAdmin
            defaultValue={email ?? ""}
            name="email"
            disabled={isPending}
          />
        </AccountCardBody>
        <AccountCardFooter description="Nós iremos utilizar seu e-mail para melhorar sua experiência.">
          <ButtonAdmin disabled={isPending}>Atualize seu email</ButtonAdmin>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
