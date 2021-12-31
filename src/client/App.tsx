import { TypeAssetManifest } from "../../models";
import { Html } from "./page-components";

type PropsClientApp = {
  assetsManifest: TypeAssetManifest;
};

export function ClientApp(props: PropsClientApp): JSX.Element {
  return (
    <Html assetManifest={props.assetsManifest} title="React SSR">
      <div>Hello World!</div>
    </Html>
  );
}
