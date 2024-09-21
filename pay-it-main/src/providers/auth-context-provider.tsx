"use client";

import type { AuthSession } from "@/lib/auth/utils";
import { createContext, useContext } from "react";

type AuthContextType = {
  session: AuthSession["session"];
};

const AuthContext = createContext({} as AuthContextType);

type AuthContextProps = {
  session: AuthSession["session"];
  children: React.ReactNode;
};

export const AuthContextProvider = ({
  session,
  children,
}: AuthContextProps) => {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
