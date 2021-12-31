import { ConfigBuild } from "../configs/build";
import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import webpack from "webpack";
import { Config as SWCConfig } from "@swc/core";
import { GetSwcConfig } from "./libs/getSwcConfig";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Pre-build checks
 */
if (
  fs.existsSync(ConfigBuild.PathClientBuild) &&
  fs.statSync(ConfigBuild.PathClientBuild).isDirectory()
) {
  console.log(
    "Existing directory found, cleaning up before building client..."
  );
  rimraf.sync(ConfigBuild.PathClientBuild);
}

if (
  fs.existsSync(ConfigBuild.PathClientEntry) &&
  fs.statSync(ConfigBuild.PathClientEntry).isFile()
) {
  console.log(
    `Could not find client-app entry point at : ${ConfigBuild.PathClientEntry}`
  );
  process.exit(1);
}

const swcConfig = GetSwcConfig(isProduction);

webpack(
  {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: [ConfigBuild.PathClientEntry],
    output: {
      path: ConfigBuild.PathClientBuild,
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: "swc-loader",
            options: {
              // This makes swc-loader invoke swc synchronously on dev build to get correct error message.
              sync: isProduction ? true : false,
              ...swcConfig,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
  },
  (err, stats) => {
    if (err) {
      if (err.message) {
        console.error(err.message);
      }
      console.error(err.stack || err);
      process.exit(1);
    }
    const info = stats?.toJson();
    if (stats?.hasErrors()) {
      console.log("Finished running webpack with errors.");
      info?.errors?.forEach((e) => console.error(e));
      process.exit(1);
    } else {
      console.log("Finished running webpack.");
    }
  }
);
