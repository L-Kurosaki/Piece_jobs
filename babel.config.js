module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }]
    ],
    plugins: [
      // Required for proper interop handling
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-modules-commonjs',
      // Reanimated plugin (should be last)
      'react-native-reanimated/plugin',
    ],
  };
};