type PropsWithChildren<T = unknown> = T & { children: React.ReactNode };
type PropsWithOptionalChildren<T = unknown> = T & {
  children?: React.ReactNode;
};
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

declare module "@savvywombat/tailwindcss-grid-areas" {
  declare const plugin: { handler: () => void };

  export = plugin;
}
