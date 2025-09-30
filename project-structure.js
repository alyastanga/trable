const { createIndependentModules } = require("eslint-plugin-project-structure");

const mobileConfig = createIndependentModules({
    modules: [
        {
            name: "App",
            pattern: "src/app/**",
            allowImportsFrom: ["{sharedImports}", "src/features/**"],
            errorMessage:
                "🔥 The app module may only import items from shared folders and features. Importing items from other app files is prohibited. 🔥"
        },
        {
            name: "Features",
            pattern: "src/features/**",
            allowImportsFrom: ["{family}/**", "{sharedImports}"],
            errorMessage:
                "🔥 A feature may only import items from shared folders and its own family. Importing items from another feature is prohibited. 🔥"
        },
        {
            name: "Shared",
            pattern: [
                "src/components/**",
                "src/data/**",
                "src/hooks/**",
                "src/store/**",
                "src/lib/**",
                "src/constants/**"
            ],
            allowImportsFrom: ["{sharedImports}"],
            errorMessage:
                "🔥 A shared module may only import items from other shared modules. Importing items from features is prohibited. 🔥"
        },
        {
            name: "Unknown files",
            pattern: [["src/**", "!src/tasks/*", "!src/*"]],
            allowImportsFrom: [],
            allowExternalImports: false,
            errorMessage:
                "🔥 This file is not specified as an independent module in `independentModules.jsonc`. 🔥"
        }
    ],
    reusableImportPatterns: {
        sharedImports: [
            "src/components/**",
            "src/data/**",
            "src/hooks/**",
            "src/store/**",
            "src/lib/**",
            "src/constants/**",
            "assets/**"
        ]
    },
    pathAliases: {
        baseUrl: ".",
        paths: {
            "@/*": ["src/*"],
            "@assets/*": ["assets/*"]
        }
    }
});

const serverConfig = createIndependentModules({
    modules: [
        {
            name: "Routes",
            pattern: "src/routes/**",
            allowImportsFrom: ["src/controllers/**", "{sharedImports}"],
            errorMessage:
                "🔥 Routes should only import controllers and shared modules. They cannot import services or other routes. 🔥"
        },
        {
            name: "Controllers",
            pattern: "src/controllers/**",
            allowImportsFrom: ["src/services/**", "{sharedImports}"],
            errorMessage:
                "🔥 Controllers may only import from services and shared modules. They cannot import other controllers directly. 🔥"
        },
        {
            name: "Services",
            pattern: "src/services/**",
            allowImportsFrom: ["src/models/**", "{sharedImports}"],
            errorMessage:
                "🔥 Services may only import models and shared modules. Cross-service imports are prohibited. 🔥"
        },
        {
            name: "Models",
            pattern: "src/models/**",
            allowImportsFrom: ["{sharedImports}"],
            errorMessage:
                "🔥 Models should only import shared modules. No upward dependencies allowed. 🔥"
        },
        {
            name: "Middlewares",
            pattern: "src/middlewares/**",
            allowImportsFrom: ["{sharedImports}"],
            errorMessage: "🔥 Middlewares may only import shared modules. 🔥"
        },
        {
            name: "Unknown files",
            pattern: [["src/**", "!src/*"]],
            allowImportsFrom: [],
            allowExternalImports: false,
            errorMessage:
                "🔥 This file does not belong to any defined module in serverConfig. 🔥"
        }
    ],
    reusableImportPatterns: {
        sharedImports: ["src/consts/**", "src/lib/**"]
    },
    pathAliases: {
        baseUrl: ".",
        paths: {
            "@/*": ["src/*"]
        }
    }
});

module.exports = { mobileConfig, serverConfig };
