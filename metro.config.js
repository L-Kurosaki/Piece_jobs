const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support to resolver configuration
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'mjs'];

// Basic asset extensions
config.resolver.assetExts.push('db');

// Enable package exports for proper module resolution
config.resolver.unstable_enablePackageExports = true;

// Use default transformer
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Simplified transform options
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

module.exports = config;