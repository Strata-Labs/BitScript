const { withPlausibleProxy } = require("next-plausible");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// next.config.js
/* production
module.exports = withPlausibleProxy()({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add a rule to ignore CSS files specifically from monaco-editor
      config.module.rules.push({
        test: /node_modules\/monaco-editor\/.*\.css$/,
        loader: "ignore-loader",
      });
    }

    // Return the altered config
    return config;
  },
});
*/
