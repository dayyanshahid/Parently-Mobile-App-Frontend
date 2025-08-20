import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { responsiveDimensions, spacing } from "../utils/responsive";
import { getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

type StyledButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

export default function StyledButton({ 
  title, 
  onPress, 
  style, 
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false
}: StyledButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    !disabled && getShadow('button'),
    style
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress} 
      activeOpacity={disabled ? 1 : 0.85}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.xs,
    flexDirection: "row",
    borderWidth: 1,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
  },
  
  // Sizes
  small: {
    height: responsiveDimensions.buttonHeight.small,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  medium: {
    height: responsiveDimensions.buttonHeight.medium,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
  },
  large: {
    height: responsiveDimensions.buttonHeight.large,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.xl,
  },
  
  // Disabled state
  disabled: {
    backgroundColor: colors.gray300,
    borderColor: colors.gray300,
  },
  
  // Text styles
  text: {
    fontWeight: typography.fontWeight.semiBold,
    letterSpacing: typography.letterSpacing.wide,
    fontFamily: typography.fontFamily.semiBold,
  },
  
  // Variant text styles
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  
  // Size text styles
  smallText: {
    fontSize: typography.fontSize.sm,
  },
  mediumText: {
    fontSize: typography.fontSize.lg,
  },
  largeText: {
    fontSize: typography.fontSize.xl,
  },
  
  // Disabled text
  disabledText: {
    color: colors.textDisabled,
  },
});
