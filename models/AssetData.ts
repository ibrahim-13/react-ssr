export enum EnumAppAssetDataType {
  CSS = "css",
  JS = "JS",
}

export type TypeAppAssetData = {
  type: EnumAppAssetDataType;
  href: string;
};

export type TypeAssetManifest = {
  init: TypeAppAssetData[];
};
