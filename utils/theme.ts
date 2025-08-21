import { Appearance } from 'react-native';
import { scale } from './responsive';

// Disable system theme changes
Appearance.setColorScheme('light');

// Color palette
export const colors = {
  // Primary colors
  primary: '#e91e63',
  primaryLight: '#ff5983',
  primaryDark: '#ad1457',
  
  // Secondary colors
  secondary: '#007AFF',
  secondaryLight: '#4DA3FF',
  secondaryDark: '#0056CC',
  
  // Accent colors
  accent: '#FF6B6B',
  accentLight: '#FF9999',
  accentDark: '#CC5555',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gray scale
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
  
  // Semantic colors
  success: '#4CAF50',
  successLight: '#81C784',
  successDark: '#388E3C',
  
  warning: '#FF9800',
  warningLight: '#FFB74D',
  warningDark: '#F57C00',
  
  error: '#F44336',
  errorLight: '#EF5350',
  errorDark: '#D32F2F',
  
  info: '#2196F3',
  infoLight: '#64B5F6',
  infoDark: '#1976D2',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#F1F3F4',
  
  // Surface colors
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F9FA',
  surfaceTertiary: '#F1F3F4',
  
  // Text colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textInverse: '#FFFFFF',
  textDisabled: '#BDBDBD',
  
  // Border colors
  border: '#E0E0E0',
  borderLight: '#F5F5F5',
  borderDark: '#BDBDBD',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  
  // Gradient colors
  gradientStart: '#e91e63',
  gradientEnd: '#ad1457',
  gradientSecondaryStart: '#007AFF',
  gradientSecondaryEnd: '#0056CC',
  
  // Transparent colors
  transparent: 'transparent',
  
  // Glass effect colors
  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
};

// Typography system
export const typography = {
  // Font families (system fonts to avoid external dependencies)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  
  // Font weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  
  // Font sizes (using responsive scaling)
  fontSize: {
    xs: scale(10),
    sm: scale(12),
    md: scale(14),
    lg: scale(16),
    xl: scale(18),
    xxl: scale(20),
    xxxl: scale(24),
    heading1: scale(32),
    heading2: scale(28),
    heading3: scale(24),
    heading4: scale(20),
    heading5: scale(18),
    heading6: scale(16),
    display: scale(40),
    caption: scale(12),
    overline: scale(10),
  },
  
  // Line heights
  lineHeight: {
    xs: scale(14),
    sm: scale(16),
    md: scale(20),
    lg: scale(24),
    xl: scale(26),
    xxl: scale(28),
    xxxl: scale(32),
    heading1: scale(40),
    heading2: scale(36),
    heading3: scale(32),
    heading4: scale(28),
    heading5: scale(26),
    heading6: scale(24),
    display: scale(48),
    caption: scale(16),
    overline: scale(14),
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
};

// Spacing system
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
  xxxl: scale(64),
};

// Border radius system
export const borderRadius = {
  none: 0,
  xs: scale(2),
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
  xxl: scale(20),
  xxxl: scale(24),
  full: scale(9999),
};

// Shadow system
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 16,
  },
};

// Component-specific theme
export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.white,
      color: colors.primary,
      borderColor: colors.primary,
    },
    outline: {
      backgroundColor: colors.transparent,
      color: colors.primary,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: colors.transparent,
      color: colors.primary,
      borderColor: colors.transparent,
    },
  },
  
  input: {
    default: {
      backgroundColor: colors.white,
      borderColor: colors.border,
      color: colors.textPrimary,
      placeholderColor: colors.textTertiary,
    },
    focused: {
      borderColor: colors.primary,
    },
    error: {
      borderColor: colors.error,
    },
  },
  
  card: {
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      shadow: shadows.sm,
    },
    elevated: {
      backgroundColor: colors.surface,
      borderColor: colors.transparent,
      shadow: shadows.md,
    },
  },
};

// Theme configuration
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  
  // Disable system theme
  colorScheme: 'light' as const,
  
  // Force light theme
  isDark: false,
  isLight: true,
};

// Utility function to get theme values
export const getThemeValue = (path: string) => {
  const keys = path.split('.');
  let value: any = theme;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  
  return value;
};

// Force light theme on app start
export const initializeTheme = () => {
  // Disable automatic theme changes
  Appearance.setColorScheme('light');
  
  // Override system theme listener
  const originalAddChangeListener = Appearance.addChangeListener;
  Appearance.addChangeListener = () => {
    // Return a dummy subscription that does nothing
    return { remove: () => {} };
  };
};

export default theme;
