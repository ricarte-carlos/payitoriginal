import { cn } from "mizuhara/utils";
import type { HTMLProps } from "react";
import { SignUpForm } from "./sign-up-form";

export const SignUp: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={cn(
        props.className,
        "flex h-screen items-center justify-center",
      )}
    >
      <div className="max-w-lg mx-auto my-4 bg-zinc-900 ring-1 ring-neutral-700 p-10 rounded-md  flex flex-col">
        <h1 className="text-2xl font-bold text-center">Crie um novo usuário</h1>

        <SignUpForm />
      </div>
    </div>
  );
};
