// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Production optimizations
config.transformer.minifierConfig = {
  // Optimize for production builds
  keep_fnames: false,
  mangle: {
    keep_fnames: false,
  },
  compress: {
    drop_console: true, // Remove console.log in production
    drop_debugger: true,
    pure_funcs: ['console.log', 'console.info', 'console.debug'],
  },
};

// Asset optimization
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Bundle splitting for better performance
config.serializer.createModuleIdFactory = function () {
  const fileToIdMap = new Map();
  let nextId = 0;
  return (path) => {
    if (!fileToIdMap.has(path)) {
      fileToIdMap.set(path, nextId++);
    }
    return fileToIdMap.get(path);
  };
};

// Optimize resolver for faster builds
config.resolver.platforms = ['native', 'android', 'ios'];

module.exports = config;
