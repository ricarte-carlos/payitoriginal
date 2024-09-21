import localFont from "next/font/local";

const sans = localFont({
  src: [
    {
      path: "../assets/fonts/Thrifty-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../assets/fonts/Thrifty-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Thrifty-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
});

export const fonts = {
  sans,
};
