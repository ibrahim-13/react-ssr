import type { TranspileOptions } from "typescript";
import path from "path";
import fs from "fs";

const TS_CONFIG_FILE = "tsconfig.json";

const projectRoot = process.cwd();
const tsConfigPath = path.join(projectRoot, TS_CONFIG_FILE);

export function GetRootTsConfig(): TranspileOptions | undefined {
  if (fs.existsSync(tsConfigPath) && fs.statSync(tsConfigPath).isFile()) {
    console.log("tsconfig.json file found, retrieving information...");
    const tsConfig: TranspileOptions | undefined = JSON.parse(
      fs.readFileSync(tsConfigPath).toString()
    );
    return tsConfig;
  }
  return undefined;
}
