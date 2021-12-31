import { renderToString } from "react-dom/server";
import type { Request, Response } from "express";
import { ClientApp } from "../client/App";
import { GetAssets } from "./getAssets";

export function GetRenderedClient(req: Request): string {
  return (
    "<!DOCTYPE html>" +
    renderToString(<ClientApp assetsManifest={{ init: GetAssets() }} />)
  );
}
