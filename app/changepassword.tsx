import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loader from "../components/Loader";
import FloatingPopup from "../components/FloatingPopup";


export default function ChangePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const loaderTimeout = useRef<number | null>(null);

  // Popup state
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { height } = Dimensions.get("window");

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

  const handleChangePassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPopupVisible(true);
    }, 1800);
  };

  const closePopup = () => {
    setPopupVisible(false);
    router.push("login");
  };

  const PopupContent = () => (
    <View style={styles.popupContent}>
      <View style={{ alignItems: "center", justifyContent: "center"}}>
      <View style={{ alignItems: "center", backgroundColor:'#66CB63', paddingVertical:16, paddingHorizontal:16, borderRadius: 50, marginBottom:20, width:100, height: 100, justifyContent: "center" }}>
        <Feather name="check" size={55} color="#ffffffff" style={{}} />
      </View>
      </View>
      <View style={{width: "80%", alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.popupTitle}>Updated Successfully</Text>
        <Text style={styles.popupsubTitle}>Your password has been changed successfully</Text>
      </View>
      <StyledButton
        title="Continue"
        onPress={closePopup}
        style={styles.continueBtn}
      />
    </View>
  );

  return (
    <GradientBackground showLogo showBackButton onPress={() => router.back()}>
      <Loader loading={showLoader} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>Create your new password</Text>
          <StyledTextInput
            placeholder="Enter new password"
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
            placeholder="Re-enter new password"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Feather name="lock" size={22} color="#888" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Feather name={showConfirm ? "eye-off" : "eye"} size={22} color="#888" />
              </TouchableOpacity>
            }
            secureTextEntry={!showConfirm}
          />
          <StyledButton
            title="Update Password"
            onPress={handleChangePassword}
            style={styles.verifyBtn}
          >
            <Feather name="arrow-right" size={22} color="#fff" style={{ marginLeft: 8 }} />
          </StyledButton>
        </View>
      </ScrollView>

      {/* Success Popup */}
      <FloatingPopup
        visible={isPopupVisible}
        onClose={closePopup}
        customView={<PopupContent />}
        popupHeight={height * 0.4}
      />
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
  card: {
    backgroundColor: "#ffffffff",
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
  verifyBtn: {
    // backgroundColor: "#c93c7c",
    borderRadius: 32,
    width: "100%",
    textAlign: "center",
  },
  popupContent: {
    padding: 24,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 36,
    height: "100%",
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
    popupsubTitle: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "400",
    color: "#333",
    textAlign: "center",
    flexWrap: "wrap",
  },
  continueBtn: {
    // backgroundColor: "#c93c7c",
    // borderRadius: 32,
    // width: "50%",
    // alignContent: 'center',
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    marginTop:24
  }
});
