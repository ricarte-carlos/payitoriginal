import { useEffect, useState } from "react";

export function useObjectURL(
  object: Blob | MediaSource | undefined,
): string | undefined {
  const [url, setUrl] = useState<string>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (object) {
      setUrl(URL.createObjectURL(object));
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [object]);

  return url;
}
