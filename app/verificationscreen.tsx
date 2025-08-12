import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledButton from "../components/StyledButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import VerificationCodeInput from "../components/VerificationCodeInput";

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const email = "abc123@gmail.com";

  return (
    <GradientBackground showLogo showBackButton>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>
            We’ve send you the verification code on{" "}
            <Text style={styles.email}>{email}</Text>
          </Text>
          <View style={styles.codeRow}>
            <VerificationCodeInput
              codeLength={4}
              onFulfill={(code) => setCode(code)}
              keyboardType="number-pad"
              autoFocus={true}
            />
          </View>
          <StyledButton title="Verify" onPress={() => {
            Keyboard.dismiss();
            router.push("/passwordreset");
          }} style={styles.verifyBtn}>
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
  email: {
    color: "#2a6cf6",
    fontWeight: "bold",
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 8,
  },
  codeInput: {
    borderRadius: 16,
    fontSize: 32,
    color: "#222",
    borderColor: "#ffffffff",
    borderStyle: "solid",
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