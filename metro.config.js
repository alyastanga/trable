const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("sql"); // <--- add this

config.resolver.assetExts.push(
    // Adds support for `.db` files for SQLite databases
    "db"
);

module.exports = withNativeWind(config, { input: "./src/app/global.css" });
