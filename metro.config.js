const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support to resolver configuration
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];

// Basic asset extensions
config.resolver.assetExts.push('db');

// Keep the default package exports and condition names for proper module resolution
// These are needed for TypeScript files in node_modules

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