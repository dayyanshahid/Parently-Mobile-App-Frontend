import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Canvas, Circle, Group, Path, Skia, SweepGradient, vec } from "@shopify/react-native-skia";
import { Audio } from "expo-av";
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle, withRepeat } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const orbSize = width * 0.6;

const VoiceRequestScreen: React.FC = () => {
  const globePulse = useSharedValue(1);
  const gradientRotation = useSharedValue(0);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // --- Globe Pulse Animation ---
  useEffect(() => {
    const loopPulse = () => {
      globePulse.value = withRepeat(
        withTiming(1.2, { duration: 500, easing: Easing.ease }),
        -1,
        true
      );
    };
    loopPulse();
  }, [globePulse]);

  // --- Gradient Rotation Animation ---
  useEffect(() => {
    const loopRotation = () => {
      gradientRotation.value = withRepeat(
        withTiming(1, { duration: 8000, easing: Easing.linear }),
        -1,
        false
      );
    };
    loopRotation();
  }, [gradientRotation]);

  // --- Update gradient speed when recording ---
  useEffect(() => {
    if (recording) {
      gradientRotation.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      gradientRotation.value = withRepeat(
        withTiming(1, { duration: 8000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [recording, gradientRotation]);

  // --- Generate Globe Grid Paths ---
  const generateGlobePaths = () => {
    const paths: any[] = [];
    const step = 20;
    for (let lat = -60; lat <= 60; lat += step) {
      const r = Math.cos((lat * Math.PI) / 180) * (orbSize / 2);
      const y = orbSize / 2 + (lat / 90) * (orbSize / 2);
      const path = Skia.Path.Make();
      path.addOval({ x: (orbSize - r * 2) / 2, y: y - 2, width: r * 2, height: 4 });
      paths.push(path);
    }
    return paths;
  };

  const globePaths = generateGlobePaths();

  // --- Recording Functions ---
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please grant microphone access.");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording.recording);

      monitorVolume(newRecording.recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
    setRecording(null);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
  };

  const toggleRecording = async () => {
    if (recording) await stopRecording();
    else await startRecording();
  };

  const playRecording = async () => {
    if (!recordingUri) return;
    try {
      if (sound) await sound.unloadAsync();

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  };

  // --- Voice Reactive Pulse ---
  const monitorVolume = async (rec: Audio.Recording) => {
    const interval = setInterval(async () => {
      if (!rec) {
        clearInterval(interval);
        return;
      }
      const status = await rec.getStatusAsync();
      if (status.metering !== undefined) {
        const level = Math.min(Math.max((status.metering + 200) / 160, 0.6), 1.4);
        globePulse.value = withTiming(level, { duration: 200, easing: Easing.ease });
      }
    }, 50);
  };

  const rotation = gradientRotation.value * 360;

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close" size={28} color="#000" />
      </TouchableOpacity>

      {/* Center Globe */}
      <View style={styles.centerContainer}>
        <Animated.View
          style={[
            styles.globe,
            {
              transform: [{ scale: globePulse.value }],
              opacity: 0.7,
            },
          ]}
        />
        <Canvas style={{ width: orbSize, height: orbSize }}>
          <Group>
            <Circle cx={orbSize / 2} cy={orbSize / 2} r={orbSize / 2}>
              <SweepGradient
                c={vec(orbSize / 2, orbSize / 2)}
                colors={["#ffffff", "#ff5fa2", "#ff5fa2", "#ffffff"]}
                positions={[0, 0.3, 0.7, 1]}
                transform={[{ rotate: rotation }]}
              />
            </Circle>
            {globePaths.map((p, i) => (
              <Path key={i} path={p} color="#ff5fa2" style="stroke" strokeWidth={1} />
            ))}
            <Circle
              cx={orbSize / 2}
              cy={orbSize / 2}
              r={orbSize / 2 - 2}
              color="rgba(255, 176, 209, 0.3)"
            />
          </Group>
        </Canvas>
      </View>

      {/* Play Recording Button */}
      {recordingUri && (
        <TouchableOpacity style={styles.playButton} onPress={playRecording}>
          <Ionicons name="play" size={24} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 8 }}>Play Recording</Text>
        </TouchableOpacity>
      )}

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Start by tapping the mic and {"\n"}speaking your request
      </Text>

      {/* Mic Button */}
      <TouchableOpacity
        style={[
          styles.micButton,
          {
            backgroundColor: recording ? "#ff0000" : "#ff5fa2",
            shadowColor: recording ? "#ff0000" : "#ff5fa2",
          },
        ]}
        onPress={toggleRecording}
      >
        <Ionicons name="mic" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  closeButton: { position: "absolute", top: 50, right: 20, zIndex: 10 },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  globe: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: "#ffc3dcff",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 35,
    marginBottom: 15,
    alignSelf: "center",
  },
  subtitle: { textAlign: "center", fontSize: 16, color: "#555", marginBottom: 50 },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default VoiceRequestScreen;
