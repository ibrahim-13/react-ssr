import type { PropsWithChildren } from "react";
import type { TypeAssetManifest } from "@models/AssetData";
import { AssetLink } from "@page-components/AssetLink";

type PropsHtml = {
  assetManifest: TypeAssetManifest;
  title: string;
};

export function Html(props: PropsWithChildren<PropsHtml>): JSX.Element {
  const { title, assetManifest, children } = props;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <AssetLink assets={assetManifest.init} />
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
            __html: `assetManifest = ${JSON.stringify(assetManifest)};`,
          }}
        />
      </body>
    </html>
  );
}
