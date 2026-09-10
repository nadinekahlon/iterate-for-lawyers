import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { registerDearNadineHttpRoutes } from "./dearNadineHttp";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
registerDearNadineHttpRoutes(app);

// Configure dev or production static file serving
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const templatePath = path.resolve(__dirname, "../client/index.html");
      let template = fs.readFileSync(templatePath, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  const publicPath = path.resolve(__dirname, "public");
  app.use(express.static(publicPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"));
  });
}

function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`[Iterate for Lawyers] Server running on http://localhost:${port}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[Iterate for Lawyers] Port ${port} is in use, trying http://localhost:${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

const initialPort = parseInt(process.env.PORT || "3000", 10);
startServer(initialPort);
