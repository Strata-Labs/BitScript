const { withPlausibleProxy } = require("next-plausible");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({});

/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// next.config.js

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
  async headers() {
    return [
      {
        //match only the rpc route
        source: "/api/handleReplitRPC",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
});
