import React, { forwardRef, useState } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { responsiveDimensions, spacing } from "../utils/responsive";
import { getShadow, getTextInputProps } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

type StyledTextInputProps = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  mainContainerWidth?: number | `${number}%`;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'default' | 'large';
  error?: boolean;
  disabled?: boolean;
};

const StyledTextInput = forwardRef<TextInput, StyledTextInputProps>(
  ({ 
    leftIcon, 
    rightIcon, 
    style, 
    mainContainerWidth, 
    variant = 'default',
    size = 'default',
    error = false,
    disabled = false,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textInputProps = getTextInputProps();

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const containerStyle = [
      styles.inputContainer,
      styles[variant],
      styles[size],
      isFocused && styles.focused,
      error && styles.error,
      disabled && styles.disabled,
      !disabled && getShadow('card'),
      {
        width: mainContainerWidth ?? "100%",
      }
    ];

    const inputStyle = [
      styles.input,
      styles[`${size}Text`],
      disabled && styles.disabledText,
      style
    ];

    return (
      <View style={containerStyle}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          style={inputStyle}
          placeholderTextColor={colors.textTertiary}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
          {...props}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    );
  }
);

export default StyledTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  
  // Variants
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    height: responsiveDimensions.inputHeight.default,
    borderRadius: borderRadius.md,
  },
  outlined: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,
    height: responsiveDimensions.inputHeight.default,
    borderRadius: borderRadius.md,
  },
  filled: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.transparent,
    height: responsiveDimensions.inputHeight.default,
    borderRadius: borderRadius.md,
  },
  
  // Sizes
  large: {
    height: responsiveDimensions.inputHeight.large,
    borderRadius: borderRadius.lg,
  },
  
  // States
  focused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: colors.gray100,
    borderColor: colors.gray200,
    opacity: 0.6,
  },
  
  // Icon container
  icon: {
    marginHorizontal: spacing.xs,
  },
  
  // Input text
  input: {
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: 0,
    fontFamily: typography.fontFamily.regular,
    fontWeight: typography.fontWeight.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  },
  
  // Size text styles
  defaultText: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  },
  largeText: {
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.lg,
  },
  
  // Disabled text
  disabledText: {
    color: colors.textDisabled,
  },
});
