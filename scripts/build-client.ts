import { ConfigBuild } from "../configs/build";
import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import webpack from "webpack";

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
                baseUrl: path.join(__dirname, "..", "src-client"),
                paths: {
                  "@page-components/*": ["page-components/*"],
                  "@models/*": ["../models/*"],
                },
              },
              module: {
                type: "commonjs",
                strict: true,
                strictMode: true,
                lazy: false,
                noInterop: true,
              },
              sourceMaps: "inline",
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
