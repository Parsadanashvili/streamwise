import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "./helvetica/helvetica_neue_lt_geo_95_black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_85_heavy.woff2",
      weight: "750",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_75_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_65_medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_55_roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_45_light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_35_thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./helvetica/helvetica_neue_lt_geo_25_ultlt.woff2",
      weight: "100",
      style: "normal",
    },
  ],

  variable: "--font-helvetica",
});
