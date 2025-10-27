const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettier = require("eslint-config-prettier/flat");

const { mobileConfig } = require("./project-structure");

module.exports = defineConfig([
    prettier,
    expoConfig,
    {
        ignores: ["**/dist/**", "**/build/**", "**/node_modules/**"]
    },
    {
        plugins: {
            "project-structure": require("eslint-plugin-project-structure")
        },
        rules: {
            "project-structure/independent-modules": ["error", mobileConfig]
        }
    },
    {
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", "ts", ".tsx"]
                }
            }
        },
        rules: {
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index"
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before"
                        },
                        {
                            pattern: "@src/**",
                            group: "internal"
                        }
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true
                    }
                }
            ]
        }
    }
]);
