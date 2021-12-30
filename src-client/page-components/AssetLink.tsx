import React from "react";
import { TypeAppAssetData, EnumAppAssetDataType } from "@models/AssetData";

type PropsAssets = {
  assets: string[];
};

export function AssetLinkCSS({ assets }: PropsAssets): JSX.Element {
  var links = React.useMemo(
    () => assets.map((asset) => <link rel="stylesheet" href={asset} />),
    [assets]
  );
  return <>{links}</>;
}

export function AssetLinkJavaScript({ assets }: PropsAssets): JSX.Element {
  var jsScripts = React.useMemo(
    () => assets.map((asset) => <script src={asset} />),
    [assets]
  );
  return <>{jsScripts}</>;
}
