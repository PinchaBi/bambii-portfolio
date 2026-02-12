module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  importOrder: [
    "^react$",
    "^react-dom$",

    "^react-router-dom$",
    "^@tanstack/.*",
    "^next/.*",

    "<THIRD_PARTY_MODULES>",

    "^@/styles/.*",
    "^@/assets/.*",

    "^@/config/.*",
    "^@/lib/.*",
    "^@/utils/.*",
    "^@/hooks/.*",
    "^@/contexts/.*",
    "^@/services/.*",
    "^@/components/.*",
    "^@/features/.*",
    "^@/pages/.*",

    "^[./]",
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
