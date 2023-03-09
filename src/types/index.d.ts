declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export { SVG as ReactComponent };
}
declare module "*.woff";
declare module "*.woff2";
declare module "*.jpg";

declare module "*.jpeg";
declare module "*.png";
