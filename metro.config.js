const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper resolver configuration
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

// Add support for additional platforms
config.resolver.platforms = ['native', 'web', 'ios', 'android'];

// Ensure proper transformer configuration for SDK 53
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Enable experimental features for SDK 53
config.resolver.unstable_enablePackageExports = true;

module.exports = config;