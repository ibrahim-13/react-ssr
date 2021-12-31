import path from "path";

export const ConfigBuild = {
  PathClientBuild: path.resolve(__dirname, "../build"),
  PathClientEntry: path.join("..", "src", "client", "index.tsx"),
};
