import express from "express";
import type { Request, Response, NextFunction } from "express";
import { GetRenderedClient } from "./client-renderer";

function withErrorHandler(fn: (req: Request, res: Response) => Promise<void>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

const isPipe = (portOrPipe: number | string) => Number.isNaN(portOrPipe);

const PORT = 4500;
const app = express();

app.use(express.static("build"));
// app.use(express.static('public'));

app.get(
  "/",
  withErrorHandler(async function (req, res) {
    const html = GetRenderedClient(req);
    res.send(html);
  })
);

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })
  .on("error", function (error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = isPipe(PORT) ? "Pipe " + PORT : "Port " + PORT;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  });
