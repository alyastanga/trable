import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import indexRouter from "./routes";

import { HOST, IS_DEVELOPMENT, PORT, SITE_URL } from "@/consts";

const app = express();
const server = app.listen(PORT, HOST, onListen);

app.use(morgan(IS_DEVELOPMENT ? "dev" : "combined"));
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: "Too many requests, please try again later.",
        legacyHeaders: false,
        standardHeaders: "draft-8"
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);

process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown);

function onListen() {
    console.log(`[server] running on ${SITE_URL}`);
}

function onShutdown(signal: string) {
    console.log(`[server] Received ${signal}, shutting down gracefully...`);

    server.close((err) => {
        if (err) {
            console.error("[server] Error during shutdown", err);
            return process.exit(1);
        }

        console.log("[server] Closed all connections, exiting");
        return process.exit(0);
    });
}
