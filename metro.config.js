const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

let config = getDefaultConfig(__dirname);

// Apply your custom resolver extensions
config.resolver.sourceExts.push("sql");
config.resolver.assetExts.push("db");

// Wrap the modified config with NativeWind
module.exports = withNativeWind(config, {
    input: "./src/app/global.css"
});
