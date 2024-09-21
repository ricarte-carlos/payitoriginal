import { auth } from "@/lib/auth/lucia";
import { getUserAuth } from "@/lib/auth/utils";
import { LuciaError } from "lucia";

import { db } from "@/lib/db";
import type { collectionType } from "@prisma/client";
import type { NextRequest } from "next/server";
import { userSchema } from "prisma/zod/user";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
  const { session } = await getUserAuth();
  if (!session) return new Response("Not Authorized", { status: 401 });

  const body = await request.json();

  try {
    const { username, role, password, collections } = userSchema
      .omit({ id: true, name: true, email: true })
      .parse(body);

    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username: username,
        name: "",
        email: "",
        role: role || "Admin",
      },
    });

    await db.collection.createMany({
      data: collections.map((collection) => {
        return {
          name: collection.name as string,
          type: collection.type as collectionType,
          permission: collection.permission,
          user_id: user.userId,
        };
      }),
    });
  } catch (e) {
    if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
      return new Response("Username already taken", { status: 400 });
    }
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 400 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }

  return new Response(null, { status: 201 });

  // HOW TO CREATE A SESSION AFTER SIGN UP

  //   const session = await auth.createSession({
  //     userId: user.userId,
  //     attributes: {},
  //   });
  //   const authRequest = auth.handleRequest(request.method, context);
  //   authRequest.setSession(session);
  //   return new Response(null, {
  //     status: 302,
  //     headers: {
  //       Location: "/", // redirect to profile page
  //     },
  //   });
};
