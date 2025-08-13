import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";

export default function PasswordResetScreen() {
  const router = useRouter();
  const [input, setInput] = useState("");

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

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/verificationscreen");
    }, 1800);
  };

  return (
    <GradientBackground showLogo showBackButton onPress={() => router.back()}>
      <Loader loading={showLoader} />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email address or phone number to request a{" "}
            <Text style={styles.link}>password reset</Text>
          </Text>
          <StyledTextInput
            placeholder="Email or Phone No."
            value={input}
            onChangeText={setInput}
            leftIcon={<MaterialCommunityIcons name="email-outline" size={22} color="#888" />}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <StyledButton title="Verify" onPress={handleVerify} style={styles.verifyBtn}>
            <Feather name="arrow-right" size={22} color="#fff" style={{ marginLeft: 8 }} />
          </StyledButton>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
  },
  backBtn: {
    position: "absolute",
    top: 32,
    left: 24,
    zIndex: 2,
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
    marginTop: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  subtitle: {
    color: "#888",
    fontSize: 15,
    marginBottom: 28,
  },
  link: {
    color: "#2a6cf6",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 32,
  },
  verifyBtn: {
    backgroundColor: "#c93c7c",
    borderRadius: 32,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
  },
});
