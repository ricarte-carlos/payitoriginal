import { cn } from "mizuhara/utils";
import Image from "next/image";
import Link from "next/link";
import type { HTMLProps } from "react";
import { ButtonAdmin } from "../ui/button";
import { posts } from "./blog-posts/posts";

export const Blog: React.FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={cn(props.className, "container py-8")}>
      <h1 className="text-3xl mb-8">Novidades</h1>
      {posts.map((post) => {
        const date = new Date(post.date).toLocaleString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return (
          <div
            key={post.title + post.date}
            className="border rounded-lg hover:bg-zinc-900 transition duration-200 ease-in-out"
          >
            <div className="h-64 relative ">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="p-8 w-full flex flex-col gap-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-zinc-500">{post.description}</p>
              <div className="flex h-48 w-full gap-8">
                {post.postsImages?.map((image) => (
                  <Link
                    href={image.link}
                    key={image.alt + image.link}
                    className="relative"
                    target="_blank"
                  >
                    <Image
                      src={image.link}
                      alt={image.alt}
                      className="object-contain rounded-lg"
                      height={400}
                      width={400}
                    />
                  </Link>
                ))}
              </div>

              <ButtonAdmin size="lg" asChild className="w-fit self-end">
                <Link href={post.callToActionMessage} target="_blank">
                  {post.callToAction}
                </Link>
              </ButtonAdmin>

              <p className="text-zinc-600 w-fit self-end">{date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
