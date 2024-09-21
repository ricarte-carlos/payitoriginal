"use client";

import { ButtonAdmin } from "@/app/admin/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Action = "/api/sign-in" | "/api/sign-up" | "/api/sign-out";

export const AuthForm = ({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: Action;
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ error: string } | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <form
      action={action}
      method="post"
      className="mt-4 flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const formData = new FormData(e.currentTarget);

        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh();
        }
        setErrors(await response.json());
        setLoading(false);
      }}
    >
      {errors ? (
        <div className="bg-red-500 p-3 my-4 text-white rounded-md">
          <h3 className="font-bold text-md">Error!</h3>
          <p className="text-sm">{errors.error}</p>
        </div>
      ) : null}
      {children}
      <SubmitButton action={action} loading={loading} />
    </form>
  );
};

const SubmitButton = ({
  action,
  loading,
}: {
  action: Action;
  loading: boolean;
}) => {
  let buttonSuffix = "";
  switch (action) {
    case "/api/sign-in":
      buttonSuffix = "Entrar";
      break;
    case "/api/sign-out":
      buttonSuffix = "Sair";
      break;
    case "/api/sign-up":
      buttonSuffix = "Cadastrar";
      break;
  }
  return (
    <ButtonAdmin
      type="submit"
      className={action === "/api/sign-out" ? "" : "w-full"}
      disabled={loading}
      variant={action === "/api/sign-out" ? "destructive" : "default"}
    >
      {!loading ? (
        buttonSuffix
      ) : (
        <LoaderIcon className="animate-spin h-5 w-5" />
      )}
    </ButtonAdmin>
  );
};
