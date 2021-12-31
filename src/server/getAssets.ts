import { EnumAppAssetDataType, TypeAppAssetData } from "../../models";
import { ConfigBuild } from "../../configs/build";
import fs from "fs";

function GetTypeFromFilePath(filePath: string): EnumAppAssetDataType {
  const _filePath = filePath.toUpperCase();
  if (_filePath.endsWith(".JS") || _filePath.endsWith(".JS.MAP"))
    return EnumAppAssetDataType.JS;
  if (_filePath.endsWith(".CSS")) return EnumAppAssetDataType.CSS;

  return EnumAppAssetDataType.NONE;
}

function GetHrefFromPath(filePath: string): string {
  return `/${filePath}`;
}

export function GetAssets(): TypeAppAssetData[] {
  const buildDirFiles = fs.readdirSync(ConfigBuild.PathClientBuild);
  return buildDirFiles.map((i) => ({
    type: GetTypeFromFilePath(i),
    href: GetHrefFromPath(i),
  }));
}
