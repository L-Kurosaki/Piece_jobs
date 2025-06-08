const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support
config.resolver.sourceExts.push('ts', 'tsx');

// Ensure proper asset extensions
config.resolver.assetExts.push('db');

// Enable package exports for better module resolution
config.resolver.unstable_enablePackageExports = true;

// Add condition names for better package resolution
config.resolver.unstable_conditionNames = [
  'react-native',
  'browser',
  'require',
  'import'
];

// Configure transformer for TypeScript
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Add TypeScript transform options
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Ensure proper minifier configuration
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;