import { Config, JscConfig } from "@swc/core";
import { GetRootTsConfig } from "./getTsConfig";
import path from "path";

function GetPathsConfig(): JscConfig {
  const tsConfig = GetRootTsConfig();
  if (tsConfig?.compilerOptions?.baseUrl && tsConfig?.compilerOptions.paths) {
    const projectRoot = process.cwd();
    return {
      baseUrl: path.join(projectRoot, tsConfig.compilerOptions.baseUrl),
      paths: tsConfig.compilerOptions.paths as JscConfig["paths"],
    };
  }
  return {};
}

export function GetSwcConfig(isProduction: boolean): Config {
  const pathsConfig = GetPathsConfig();
  const swcConfig: Config = {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
        dynamicImport: true,
      },
      transform: {
        react: {
          pragma: "React.createElement",
          pragmaFrag: "React.Fragment",
          throwIfNamespace: true,
          development: isProduction ? true : false,
          useBuiltins: false,
          runtime: "automatic",
        },
      },
      target: "es2016",
      keepClassNames: true,
      loose: true,
      ...pathsConfig,
    },
    module: {
      type: "commonjs",
      strict: true,
      strictMode: true,
      lazy: false,
      noInterop: true,
    },
    sourceMaps: "inline",
  };
  return swcConfig;
}
