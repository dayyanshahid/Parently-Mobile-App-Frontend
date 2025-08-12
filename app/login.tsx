import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import SocialButton from "../components/SocialButton";
import { MaterialCommunityIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/verificationscreen");
    }, 1800);
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
            leftIcon={<MaterialCommunityIcons name="email-outline" size={22} color="#888" />}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <StyledTextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Feather name="lock" size={22} color="#888" />}
            rightIcon={<Feather name="eye" size={22} color="#888" />}
            secureTextEntry
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
            icon={<FontAwesome name="google" size={24} color="#EA4335" />}
            onPress={() => {}}
          />
          <SocialButton
            title="Login with Outlook"
            icon={<MaterialCommunityIcons name="microsoft-outlook" size={24} color="#0072C6" />}
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
    // justifyContent: "center",
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  forgotText: {
    color: "#e24fa3",
    fontSize: 14,
    fontWeight: "500",
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
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 0,
  },
  signupText: {
    color: "#888",
    fontSize: 15,
  },
  signupLink: {
    color: "#2a6cf6",
    fontSize: 15,
    fontWeight: "bold",
  },
  contactBtn: {
    alignSelf: "center",
    marginTop: 12,
  },
  contactText: {
    color: "#2a6cf6",
    fontSize: 15,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
