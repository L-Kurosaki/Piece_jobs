const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support to resolver configuration
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];

// Basic asset extensions
config.resolver.assetExts.push('db');

// Remove problematic TypeScript configurations
delete config.resolver.unstable_enablePackageExports;
delete config.resolver.unstable_conditionNames;

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