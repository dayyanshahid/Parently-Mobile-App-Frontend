import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import SocialButton from "../components/SocialButton";
import Loader from "../components/Loader";
import { MaterialCommunityIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";
import { registerUser } from "../components/api"; // ✅ import signup from api.js

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const loaderTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (loading) {
      loaderTimeout.current = setTimeout(() => setShowLoader(true), 500);
    } else {
      setShowLoader(false);
      if (loaderTimeout.current) {
        clearTimeout(loaderTimeout.current);
        loaderTimeout.current = null;
      }
    }
  }, [loading]);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser( email, password, name);

      if (res.success) {
        // ✅ Navigate after signup success
        router.push({
          pathname: "/verificationscreen",
          params: { fromCreateAccount: "true" }
        });
      } else {
        Alert.alert("Signup failed", res.message || "Unknown error");
      }
    } catch (err) {
      console.error("Signup error:", err);
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground showLogo>
      <Loader loading={showLoader} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          <StyledTextInput
            placeholder="Full name"
            value={name}
            onChangeText={setName}
            leftIcon={
              <MaterialCommunityIcons 
                name="account-outline" 
                size={responsiveDimensions.iconSize.md} 
                color={colors.textTertiary} 
              />
            }
          />

          <StyledTextInput
            placeholder="Email/Phone"
            value={email}
            onChangeText={setEmail}
            leftIcon={
              <MaterialCommunityIcons 
                name="email-outline" 
                size={responsiveDimensions.iconSize.md} 
                color={colors.textTertiary} 
              />
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <StyledTextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            leftIcon={
              <Feather 
                name="lock" 
                size={responsiveDimensions.iconSize.md} 
                color={colors.textTertiary} 
              />
            }
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={responsiveDimensions.iconSize.md} 
                  color={colors.textTertiary} 
                />
              </TouchableOpacity>
            }
            secureTextEntry={!showPassword}
          />

          <StyledTextInput
            placeholder="Confirm password"
            value={confirm}
            onChangeText={setConfirm}
            leftIcon={
              <Feather 
                name="lock" 
                size={responsiveDimensions.iconSize.md} 
                color={colors.textTertiary} 
              />
            }
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Feather 
                  name={showConfirm ? "eye-off" : "eye"} 
                  size={responsiveDimensions.iconSize.md} 
                  color={colors.textTertiary} 
                />
              </TouchableOpacity>
            }
            secureTextEntry={!showConfirm}
          />

          <StyledButton
            title="Sign up"
            onPress={handleSignup}
            style={styles.signinBtn}
          >
            <Text style={styles.arrow}>→</Text>
          </StyledButton>

          <Text style={styles.or}>OR</Text>

          <SocialButton
            title="Login with Google"
            icon={<Image source={require("../assets/Google.png")} style={styles.socialIcon} />}
            onPress={() => {}}
          />

          <SocialButton
            title="Login with Facebook"
            icon={<FontAwesome name="facebook" size={responsiveDimensions.iconSize.lg} color={colors.secondary} />}
            onPress={() => {}}
            style={styles.socialBtn}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxxl,
    padding: spacing.xl,
    width: "90%",
    maxWidth: 400,
    alignItems: "stretch",
    marginBottom: spacing.xl,
    ...getShadow('card'),
  },
  title: {
    fontSize: typography.fontSize.heading2,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  signinBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    height: responsiveDimensions.buttonHeight.large,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  arrow: {
    color: colors.white,
    fontSize: typography.fontSize.xl,
    marginLeft: spacing.sm,
    fontWeight: typography.fontWeight.bold,
  },
  or: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: typography.fontSize.lg,
    marginVertical: spacing.xs,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
  },
  socialIcon: {
    width: responsiveDimensions.iconSize.lg,
    height: responsiveDimensions.iconSize.lg,
  },
  socialBtn: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.backgroundSecondary,
    marginBottom: spacing.md,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.regular,
  },
  loginLink: {
    color: colors.secondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
});
