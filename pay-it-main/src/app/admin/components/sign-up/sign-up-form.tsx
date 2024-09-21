"use client";

import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import ky from "ky";
import { toast } from "sonner";
import { COLLECTIONS, type CollectionsType } from "../../enums/collections";
import { ROLES } from "../../enums/roles";
import { ButtonAdmin } from "../ui/button";
import { CheckboxAdmin } from "../ui/checkbox";
import { InputAdmin } from "../ui/input";
import {
  SelectAdmin,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Collection = {
  name: COLLECTIONS;
  permission: boolean;
  type: CollectionsType;
};

export const SignUpForm = () => {
  type Inputs = {
    username: string;
    password: string;
    role: string;
    collections: Collection[];
  };

  const formSchema = z.object({
    username: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    role: z.string(),
    collections: z.array(
      z.object({
        name: z.nativeEnum(COLLECTIONS),
        permission: z.boolean(),
        type: z.string(),
      }),
    ),
  });

  const defaultValues = Object.entries(COLLECTIONS).map(([key, value]) => {
    return {
      name: value,
      permission: false,
      type: key as COLLECTIONS,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      role: "Admin",
      collections: defaultValues as Collection[],
    },
  });

  const submitFormData: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await ky.post("/api/sign-up", { json: data });

      toast.success("Usuário cadastrado com sucesso");
    } catch (_error) {
      toast.error("Erro ao cadastrar usuário");
    }
  };

  const watchAll = watch();

  return (
    <form
      onSubmit={handleSubmit(submitFormData)}
      className="flex flex-col gap-4"
    >
      <Label htmlFor="username" className="text-muted-foreground">
        Nome
      </Label>
      <InputAdmin
        id="username"
        placeholder="Example John Doe"
        {...register("username")}
        className="bg-gray-300 focus-within:bg-white text-black"
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}
      <Label htmlFor="password" className="text-muted-foreground">
        Senha
      </Label>
      <InputAdmin
        type="password"
        {...register("password")}
        placeholder="Senha"
        id="password"
        className="bg-gray-300 focus-within:bg-white text-black w-96"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <SelectAdmin
        onValueChange={(value) => {
          const role = Object.keys(ROLES).find((key) => key === value);

          if (!role) return;
          setValue("role", role);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Função" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ROLES).map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectAdmin>

      <div className="flex items-center space-x-4">
        {Object.values(COLLECTIONS).map((collection) => (
          <div className="flex items-center gap-2" key={collection}>
            <CheckboxAdmin
              onCheckedChange={(value) => {
                const actualPermissions = watchAll.collections;

                const newPermissions = actualPermissions.map((perm) => {
                  if (perm.name === collection) {
                    return {
                      name: collection as COLLECTIONS,
                      permission: value as boolean,
                      type: perm.type,
                    };
                  }

                  return perm;
                });

                setValue("collections", newPermissions);
              }}
              id={collection}
            />
            <Label className="capitalize" htmlFor={collection}>
              {collection}
            </Label>
          </div>
        ))}
      </div>

      <ButtonAdmin type="submit" disabled={!isDirty}>
        Cadastrar
      </ButtonAdmin>
    </form>
  );
};
