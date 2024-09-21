import { PayItSmallLogo } from "@/components/icons";

export default function Loading() {
  return (
    <div className="absolute inset-0 m-auto animate-bounce text-muted-foreground p-4 h-fit flex items-center justify-center">
      <div role="status">
        <PayItSmallLogo className="size-16 md:size-32" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
