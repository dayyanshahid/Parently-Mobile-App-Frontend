import { Platform, StatusBar } from 'react-native';
import { scale, verticalScale } from './responsive';

// Platform-specific values
export const platformSelect = <T>(values: { ios: T; android: T; default?: T }): T => {
  return Platform.select({
    ios: values.ios,
    android: values.android,
    default: values.default || values.ios,
  }) as T;
};

// Platform-specific styling
export const platformStyles = {
  // Shadow styles
  shadow: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  },
  
  // Card shadow
  cardShadow: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
    },
  },
  
  // Button shadow
  buttonShadow: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
  },
};

// Get platform-specific shadow
export const getShadow = (type: 'default' | 'card' | 'button' = 'default') => {
  const shadowType = type === 'card' ? 'cardShadow' : type === 'button' ? 'buttonShadow' : 'shadow';
  return platformSelect(platformStyles[shadowType]);
};

// Platform-specific safe area
export const getSafeAreaInsets = () => {
  const statusBarHeight = StatusBar.currentHeight || 0;
  
  return {
    top: platformSelect({
      ios: verticalScale(44),
      android: verticalScale(Math.max(statusBarHeight - 15, 5)), // Much smaller gap for Android
    }),
    bottom: platformSelect({
      ios: verticalScale(34),
      android: verticalScale(10),
    }),
    left: scale(0),
    right: scale(0),
  };
};

// Platform-specific keyboard behavior
export const getKeyboardBehavior = () => {
  return platformSelect({
    ios: 'padding' as const,
    android: 'height' as const,
  });
};

// Platform-specific keyboard offset
export const getKeyboardVerticalOffset = () => {
  return platformSelect({
    ios: verticalScale(64),
    android: verticalScale(0),
  });
};

// Platform-specific haptic feedback
export const getHapticFeedback = () => {
  return platformSelect({
    ios: 'impactLight' as const,
    android: 'impactLight' as const,
  });
};

// Platform-specific animation configs
export const animationConfig = {
  // Spring animation
  spring: {
    damping: platformSelect({ ios: 15, android: 25 }), // Higher damping for Android
    stiffness: platformSelect({ ios: 150, android: 180 }), // Higher stiffness for snappier Android
    mass: platformSelect({ ios: 1, android: 0.8 }), // Lower mass for faster Android animations
  },
  
  // Timing animation
  timing: {
    duration: platformSelect({ ios: 250, android: 200 }), // Faster Android animations
    useNativeDriver: true,
  },
  
  // Layout animation
  layout: {
    duration: platformSelect({ ios: 200, android: 150 }), // Faster Android layout animations
    create: {
      type: platformSelect({ ios: 'easeInEaseOut', android: 'easeOut' }),
      property: platformSelect({ ios: 'opacity', android: 'opacity' }),
    },
    update: {
      type: platformSelect({ ios: 'spring', android: 'easeOut' }), // Use easeOut for smoother Android
      springDamping: platformSelect({ ios: 0.7, android: 0.9 }),
    },
  },
};

// Android performance optimizations
export const androidOptimizations = {
  // Enable hardware acceleration for views
  hardwareAccelerated: {
    renderToHardwareTextureAndroid: true,
    shouldRasterizeIOS: false,
  },
  
  // Optimize scroll performance
  scrollOptimizations: {
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    keyboardShouldPersistTaps: 'handled' as const,
  },
  
  // Reduce overdraw
  viewOptimizations: {
    needsOffscreenAlphaCompositing: false,
    renderToHardwareTextureAndroid: true,
  },
  
  // Android-specific performance props
  androidProps: {
    collapsable: false,
    needsOffscreenAlphaCompositing: false,
    renderToHardwareTextureAndroid: true,
  },
};

// Platform-specific text input props
export const getTextInputProps = () => {
  return {
    selectionColor: platformSelect({
      ios: '#007AFF',
      android: '#007AFF',
    }),
    underlineColorAndroid: 'transparent',
    autoCorrect: false,
    autoCapitalize: 'none' as const,
    keyboardAppearance: 'light' as const,
  };
};

// Platform-specific blur view props
export const getBlurViewProps = () => {
  return platformSelect({
    ios: {
      tint: 'light' as const,
      intensity: 8,
    },
    android: {
      tint: 'light' as const,
      intensity: 8,
      experimentalBlurMethod: 'dimezisBlurView' as const,
      reducedTransparencyFallbackColor: 'transparent',
      blurReductionFactor: 1,
    },
  });
};

// Platform-specific status bar
export const getStatusBarProps = () => {
  return {
    barStyle: 'light-content' as const,
    backgroundColor: platformSelect({
      ios: 'transparent',
      android: 'transparent',
    }),
    translucent: true,
    // Android-specific optimizations
    ...(Platform.OS === 'android' && {
      animated: true,
      showHideTransition: 'fade' as const,
    }),
  };
};

// Platform info
export const platformInfo = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  version: Platform.Version,
  select: platformSelect,
};
