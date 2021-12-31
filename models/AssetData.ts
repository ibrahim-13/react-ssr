export enum EnumAppAssetDataType {
  NONE = "none",
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
