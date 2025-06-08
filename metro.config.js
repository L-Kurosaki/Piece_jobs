const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper resolver configuration
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

// Add TypeScript extensions to source extensions
config.resolver.sourceExts.push('ts', 'tsx');

// Add support for additional platforms
config.resolver.platforms = ['native', 'web', 'ios', 'android'];

// Enable experimental features for SDK 53
config.resolver.unstable_enablePackageExports = true;

// Add condition names to help Metro resolve package entry points correctly
config.resolver.unstable_conditionNames = [
  'require',
  'import',
  'react-native',
  'browser',
  'default',
];

// Ensure proper transformer configuration for SDK 53
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Configure Babel transformer to handle TypeScript files
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;