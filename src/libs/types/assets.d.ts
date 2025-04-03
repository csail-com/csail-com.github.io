import React from "react";

declare global {
  type AssetType = React.SVGProps<SVGSVGElement> & {
    size?: number | "100%";
    fill?: string;
  };
}

export {};
