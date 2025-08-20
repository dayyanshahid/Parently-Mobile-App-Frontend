import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import SocialButton from "../components/SocialButton";
import { MaterialCommunityIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";
import { getToken, loginUser } from "../components/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // Auto login if token exists
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        router.push("/homescreen");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      console.log("Login success:", data);

      setLoading(false);
      router.push({
        pathname: "/verificationscreen",
        params: { fromSignIn: "true" },
      });
    } catch (err) {
      setLoading(false);
      alert(err.message || "Login failed. Please try again.");
    }
  };

  const handleForgotpassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/passwordreset");
    }, 1800);
  };

  return (
    <GradientBackground showLogo>
      <Loader loading={showLoader} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Sign in</Text>
          <StyledTextInput
            placeholder="Enter email or phone no."
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
          <TouchableOpacity style={styles.forgotBtn} onPress={handleForgotpassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <StyledButton title="Sign in" onPress={handleLogin}>
            <Text style={styles.arrow}>→</Text>
          </StyledButton>
          <Text style={styles.or}>OR</Text>
          <SocialButton
              title="Login with Google"
              icon={
                <Image 
                  source={require("../assets/Google.png")} 
                  style={styles.socialIcon} 
                />
              }
              onPress={() => {}}
            />
          <SocialButton
              title="Login with Outlook"
              icon={
                <Image 
                  source={require("../assets/Outlook.png")} 
                  style={styles.socialIcon} 
                />
              }
              onPress={() => {}}
            />
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.contactText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn} onPress={() => router.push("/index")}>
          <Text style={styles.contactText}>TEST SCREEN</Text>
        </TouchableOpacity>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: spacing.xs,
  },
  forgotText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
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
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.sm,
    marginBottom: 0,
  },
  signupText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.regular,
  },
  signupLink: {
    color: colors.secondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
  },
  contactBtn: {
    alignSelf: "center",
    marginTop: spacing.xs,
  },
  contactText: {
    color: colors.secondary,
    fontSize: typography.fontSize.md,
    textDecorationLine: "underline",
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
  },
});
