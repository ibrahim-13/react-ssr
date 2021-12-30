import ReactDOM from "react-dom";
import { ConfigApp } from "@configs/app";
import { ClientApp } from "./App";
import { TypeAssetManifest } from "@models/AssetData";

const manifest = (window as unknown as { [key: string]: TypeAssetManifest })[
  ConfigApp.AssetsManifestKey
];
ReactDOM.hydrate(
  <ClientApp assetsManifest={manifest} />,
  window.document.getElementById(ConfigApp.DomRootId),
  () => console.log("Hydration Complete.")
);
