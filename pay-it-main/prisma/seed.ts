import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { lucia } from "lucia";

const db = new PrismaClient();

const auth = lucia({
  adapter: prisma(db),
  env: "DEV",
  sessionCookie: { expires: false },
  getUserAttributes: (data) => {
    return data;
  },
});

async function main() {
  console.log("Seeding database...");
  const user = await auth.createUser({
    key: {
      providerId: "username", // auth method
      providerUserId: "admin", // unique id when using "username" auth method
      password: "adminsenha123", // hashed by Lucia
    },
    attributes: {
      username: "admin",
      name: "",
      email: "",
      role: "Ascent_Admin",
    },
  });

  await db.collection.createMany({
    data: [
      {
        name: "Carousel",
        user_id: user.userId,
        type: "Carousel",
        permission: true,
      },
      {
        name: "whats-new",
        user_id: user.userId,
        type: "Video",
        permission: true,
      },
    ],
  });

  await db.video.create({
    data: {
      title: "Video Titulo",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      link: "https://www.youtube.com/watch?v=FxJ3zPUU6Y4",
      section: "WhatsNew",
      callToAction: "https://www.payitbeneficios.com.br/",
    },
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
