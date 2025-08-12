import React, { forwardRef } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

type StyledTextInputProps = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  mainContainerWidth?: number | `${number}%`; // ✅ restrict to valid DimensionValue
};

const StyledTextInput = forwardRef<TextInput, StyledTextInputProps>(
  ({ leftIcon, rightIcon, style, mainContainerWidth, ...props }, ref) => (
    <View
      style={{
        ...styles.inputContainer,
        width: mainContainerWidth ?? "100%",
      }}
    >
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor="#888"
        {...props}
      />
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </View>
  )
);

export default StyledTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    paddingVertical: 0,
  },
});
