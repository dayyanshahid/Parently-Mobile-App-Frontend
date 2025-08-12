import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";

const DOTS = 12;
const RADIUS = 32;
const DOT_SIZE = 12;
const COLORS = {
  magenta: "#e24fa3",
  dark: "#3a003a",
};

type LoaderProps = {
  loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: (t) => t,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      {/* Blur + dim background */}
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="light" experimentalBlurMethod="dimezisBlurView" />
      <View style={styles.dimOverlay} />

      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        {Array.from({ length: DOTS }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / DOTS;
          const x = Math.cos(angle) * RADIUS;
          const y = Math.sin(angle) * RADIUS;

          // Fade effect for magenta highlight
          const opacity = rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [((i + DOTS - 1) % DOTS) / DOTS, (i % DOTS) / DOTS],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  left: 40 + x,
                  top: 40 + y,
                  backgroundColor: COLORS.magenta,
                  opacity: opacity,
                },
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  dimOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  spinner: {
    width: 80,
    height: 80,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: 'red',
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
