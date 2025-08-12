import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import SocialButton from "../components/SocialButton";
import Loader from "../components/Loader";
import { MaterialCommunityIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Loader state
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

  const handleSignup = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/verificationscreen");
    }, 1800);
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
            leftIcon={<MaterialCommunityIcons name="account-outline" size={22} color="#888" />}
          />
          <StyledTextInput
            placeholder="abc@email.com"
            value={email}
            onChangeText={setEmail}
            leftIcon={<MaterialCommunityIcons name="email-outline" size={22} color="#888" />}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <StyledTextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Feather name="lock" size={22} color="#888" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={22} color="#888" />
              </TouchableOpacity>
            }
            secureTextEntry={!showPassword}
          />
          <StyledTextInput
            placeholder="Confirm password"
            value={confirm}
            onChangeText={setConfirm}
            leftIcon={<Feather name="lock" size={22} color="#888" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Feather name={showConfirm ? "eye-off" : "eye"} size={22} color="#888" />
              </TouchableOpacity>
            }
            secureTextEntry={!showConfirm}
          />
          <StyledButton
            title="Sign in"
            onPress={handleSignup}
            style={styles.signinBtn}
          >
            <Text style={styles.arrow}>→</Text>
          </StyledButton>
          <Text style={styles.or}>OR</Text>
          <SocialButton
            title="Login with Google"
            icon={<FontAwesome name="google" size={24} color="#EA4335" />}
            onPress={() => {}}
            style={styles.socialBtn}
          />
          <SocialButton
            title="Login with Facebook"
            icon={<FontAwesome name="facebook" size={24} color="#1877F3" />}
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
    paddingVertical: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 36,
    padding: 28,
    width: "90%",
    maxWidth: 400,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 24,
  },
  signinBtn: {
    backgroundColor: "#e24fa3",
    borderRadius: 32,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  arrow: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 8,
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginVertical: 12,
    fontWeight: "500",
  },
  socialBtn: {
    backgroundColor: "#f6f6f6",
    borderColor: "#f6f6f6",
    marginBottom: 16,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  loginText: {
    color: "#888",
    fontSize: 15,
  },
  loginLink: {
    color: "#2a6cf6",
    fontSize: 15,
    fontWeight: "bold",
  },
});
