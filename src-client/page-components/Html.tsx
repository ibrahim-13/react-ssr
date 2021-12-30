import React, { PropsWithChildren } from "react";
import { EnumAppAssetDataType, TypeAssetManifest } from "@models/AssetData";
import { AssetLinkCSS } from "@page-components/AssetLink";
import { ConfigApp } from "@configs/app";

type PropsHtml = {
  assetManifest: TypeAssetManifest;
  title: string;
};

export function Html(props: PropsWithChildren<PropsHtml>): JSX.Element {
  const { title, assetManifest, children } = props;
  const assetsCss = React.useMemo(
    () =>
      assetManifest.init
        .filter((i) => i.type === EnumAppAssetDataType.CSS)
        .map((i) => i.href),
    [assetManifest]
  );
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <AssetLinkCSS assets={assetsCss} />
        <title>{title}</title>
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Enable JavaScript to run this app.</b>`,
          }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `${ConfigApp.AssetsManifestKey} = ${JSON.stringify(assetManifest)};`,
          }}
        />
      </body>
    </html>
  );
}
