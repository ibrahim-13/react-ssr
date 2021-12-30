import React from "react";
import { TypeAppAssetData, EnumAppAssetDataType } from "@models/AssetData";

type PropsAssets = {
  assets: TypeAppAssetData[];
};

export function AssetLink({ assets }: PropsAssets): JSX.Element {
  var links = React.useMemo(
    () =>
      assets
        .map((asset) =>
          asset.type == EnumAppAssetDataType.CSS ? (
            <link rel="stylesheet" href={asset.href} />
          ) : null
        )
        .filter((i): i is JSX.Element => i !== null || i !== undefined),
    [assets]
  );

  return <>{links}</>;
}
