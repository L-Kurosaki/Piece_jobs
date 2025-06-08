const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper resolver configuration
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

// Prioritize JavaScript extensions before TypeScript to prevent Node.js from loading raw TS files
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];

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

// Add transformer configuration to handle TypeScript files properly
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Explicitly set the Babel transformer path
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = config;