export { cn } from "mizuhara/utils";

export function dataURItoFile(dataURI: string, filename: string) {
  const arr = dataURI.split(",");
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const mime = arr[0]!.match(/:(.*?);/)![1];

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function extractVideoId(link: string) {
  const regex = /(?:\?|&)v=([^&]+)/;
  const match = link.match(regex);
  return match ? match[1] : "";
}
