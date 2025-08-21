import { Dimensions, PixelRatio, Platform } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 12/13/14 as reference)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Device type detection
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      (adjustedWidth >= 1920 && adjustedHeight >= 1080) ||
      (adjustedWidth >= 1080 && adjustedHeight >= 1920)
    );
  }
};

export const isSmallDevice = () => SCREEN_WIDTH < 350;
export const isMediumDevice = () => SCREEN_WIDTH >= 350 && SCREEN_WIDTH < 410;
export const isLargeDevice = () => SCREEN_WIDTH >= 410;

// Responsive scaling functions
export const scale = (size: number): number => {
  const ratio = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * ratio));
};

export const verticalScale = (size: number): number => {
  const ratio = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(PixelRatio.roundToNearestPixel(size * ratio));
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return Math.round(size + (scale(size) - size) * factor);
};

// Font scaling with device-specific adjustments
export const fontScale = (size: number): number => {
  const scaledSize = moderateScale(size, 0.3);
  
  if (isTablet()) {
    return scaledSize * 1.2;
  }
  
  if (isSmallDevice()) {
    return Math.max(scaledSize * 0.9, size * 0.85);
  }
  
  return scaledSize;
};

// Spacing system
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
};

// Responsive breakpoints
export const breakpoints = {
  small: 350,
  medium: 410,
  large: 768,
  xlarge: 1024,
};

// Get responsive value based on screen size
export const getResponsiveValue = (values: {
  small?: any;
  medium?: any;
  large?: any;
  xlarge?: any;
  default: any;
}) => {
  if (SCREEN_WIDTH >= breakpoints.xlarge && values.xlarge !== undefined) {
    return values.xlarge;
  }
  if (SCREEN_WIDTH >= breakpoints.large && values.large !== undefined) {
    return values.large;
  }
  if (SCREEN_WIDTH >= breakpoints.medium && values.medium !== undefined) {
    return values.medium;
  }
  if (SCREEN_WIDTH >= breakpoints.small && values.small !== undefined) {
    return values.small;
  }
  return values.default;
};

// Safe area calculations
export const getSafeAreaPadding = () => {
  const baseTopPadding = Platform.OS === 'ios' ? 44 : 8; // Much smaller for Android
  const baseBottomPadding = Platform.OS === 'ios' ? 34 : 0;
  
  return {
    top: verticalScale(baseTopPadding),
    bottom: verticalScale(baseBottomPadding),
  };
};

// Android-specific spacing adjustments
export const getAndroidSpacing = () => {
  if (Platform.OS !== 'android') return {};
  
  return {
    // Reduced header spacing for Android
    headerTop: verticalScale(4),
    headerPadding: scale(8),
    
    // Optimized margins for Android
    screenMarginTop: verticalScale(8),
    cardMarginTop: verticalScale(12),
    
    // Performance-optimized spacing
    minTouchTarget: scale(44), // Minimum touch target size
    listItemSpacing: verticalScale(8),
  };
};

// Device info
export const deviceInfo = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet: isTablet(),
  isSmallDevice: isSmallDevice(),
  isMediumDevice: isMediumDevice(),
  isLargeDevice: isLargeDevice(),
  platform: Platform.OS,
  pixelRatio: PixelRatio.get(),
};

// Responsive dimensions for common UI elements
export const responsiveDimensions = {
  // Button dimensions
  buttonHeight: {
    small: verticalScale(44),
    medium: verticalScale(52),
    large: verticalScale(56),
  },
  
  // Input dimensions
  inputHeight: {
    default: verticalScale(52),
    large: verticalScale(56),
  },
  
  // Icon sizes
  iconSize: {
    xs: scale(12),
    sm: scale(16),
    md: scale(20),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(40),
  },
  
  // Avatar sizes
  avatarSize: {
    xs: scale(24),
    sm: scale(32),
    md: scale(40),
    lg: scale(48),
    xl: scale(64),
  },
  
  // Border radius
  borderRadius: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
    round: scale(50),
  },
};

// Typography scale
export const typography = {
  fontSize: {
    xs: fontScale(10),
    sm: fontScale(12),
    md: fontScale(14),
    lg: fontScale(16),
    xl: fontScale(18),
    xxl: fontScale(20),
    xxxl: fontScale(24),
    heading: fontScale(28),
    title: fontScale(32),
    display: fontScale(40),
  },
  lineHeight: {
    xs: fontScale(14),
    sm: fontScale(16),
    md: fontScale(20),
    lg: fontScale(24),
    xl: fontScale(26),
    xxl: fontScale(28),
    xxxl: fontScale(32),
    heading: fontScale(36),
    title: fontScale(40),
    display: fontScale(48),
  },
};
