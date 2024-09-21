// app.d.ts
/// <reference types="lucia" />
import type { role as Role } from "@prisma/client";

declare namespace Lucia {
  type Auth = import("@/lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
    name: string;
    email: string;
    role: Role;
  };
}
