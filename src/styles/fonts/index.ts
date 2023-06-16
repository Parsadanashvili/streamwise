import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "./helvetica/Helvetica-Neue-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Heavy.ttf",
      weight: "750",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Roman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./helvetica/Helvetica-Neue-UltLt.ttf",
      weight: "100",
      style: "normal",
    },
  ],

  variable: "--font-helvetica",
});
