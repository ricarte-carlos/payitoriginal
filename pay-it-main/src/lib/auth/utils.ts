import { getPageSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      username?: string;
      role: "Ascent_Admin" | "Admin" | "Editor";
    };
  } | null;
};

export type AuthUser = {
  user: {
    id: string;
    name?: string;
    email?: string;
    username?: string;
    role: "Ascent_Admin" | "Admin" | "Editor";
  };
};

export const getUserAuth = async (): Promise<AuthSession> => {
  const session = await getPageSession();
  if (!session) return { session: null };
  return {
    session: {
      user: {
        id: session.user?.userId,
        name: session.user?.name,
        email: session.user?.email,
        username: session.user?.username,
        role: session.user?.role,
      },
    },
  };
};

export const checkAuth = async () => {
  const session = await getPageSession();
  if (!session) redirect("/sign-in");
};
