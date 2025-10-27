const { createIndependentModules } = require("eslint-plugin-project-structure");

const mobileConfig = createIndependentModules({
    modules: [
        {
            name: "App",
            pattern: "src/app/**",
            allowImportsFrom: ["{sharedImports}", "src/features/**", "src/app/global.css"],
            errorMessage:
                "🔥 The app module may only import items from shared folders and features. Importing items from other app files is prohibited. 🔥"
        },
        {
            name: "Features",
            pattern: "src/features/**",
            allowImportsFrom: ["{family_3}/**", "{sharedImports}"],
            errorMessage:
                "🔥 A feature may only import items from shared folders and its own family. Importing items from another feature is prohibited. 🔥"
        },

        {
            name: "Persistence",
            pattern: "src/lib/persistence.ts",
            allowImportsFrom: ["src/features/**/db/**"],
            errorMessage:
                "The persistence file may only import from `src/features/**/db/**`"
        },
        {
            name: "Shared",
            pattern: [
                "src/components/**",
                "src/data/**",
                "src/drizzle/**",
                "src/hooks/**",
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
            "src/drizzle/**",
            "src/hooks/**",
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

module.exports = { mobileConfig };
