import ReactDOM from "react-dom";
import { ClientApp } from "./App";
import type { TypeAssetManifest } from "../models/AssetData";
import { ConfigApp } from "../configs/app";

const manifest = (window as unknown as { [key: string]: TypeAssetManifest })[
  ConfigApp.AssetsManifestKey
];
ReactDOM.hydrate(
  <ClientApp assetsManifest={manifest} />,
  window.document.getElementById(ConfigApp.DomRootId),
  () => console.log("Hydration Complete.")
);
