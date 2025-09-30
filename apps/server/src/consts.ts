import "dotenv/config";

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const JWT_SECRET = process.env.JWT_SECRET as string;
const DATABASE_URL = process.env.DATABASE_URL as string;
const PROTOCOL = IS_DEVELOPMENT ? "http://" : "https://";
const HOST = process.env.HOST as string;
const SITE_URL = IS_DEVELOPMENT
    ? PROTOCOL + HOST + ":" + PORT
    : PROTOCOL + HOST;

if (!HOST) {
    throw new Error("Missing HOST");
}

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET");
}

if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
}

export {
    PROTOCOL,
    IS_DEVELOPMENT,
    HOST,
    DATABASE_URL,
    JWT_SECRET,
    PORT,
    SITE_URL
};
