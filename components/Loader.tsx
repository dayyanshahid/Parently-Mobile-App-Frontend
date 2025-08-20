// import React, { useEffect, useRef } from "react";
// import { View, Animated, StyleSheet, Dimensions, Platform } from "react-native";
// import { BlurView } from "expo-blur";

// const DOTS = 12;
// const RADIUS = 32;
// const DOT_SIZE = 12;
// const COLORS = {
//   magenta: "#e24fa3",
//   dark: "#3a003a",
// };

// type LoaderProps = {
//   loading: boolean;
// };

// export default function Loader({ loading }: LoaderProps) {
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (loading) {
//       Animated.loop(
//         Animated.timing(rotateAnim, {
//           toValue: 1,
//           duration: 1200,
//           easing: t => t,
//           useNativeDriver: true,
//         })
//       ).start();
//     } else {
//       rotateAnim.stopAnimation();
//       rotateAnim.setValue(0);
//     }
//   }, [loading]);

//   if (!loading) return null;

//   return (
//     <View style={styles.overlay}>
//       {/* Blur + dim background */}
//       <BlurView
//         {...(Platform.OS === "android"
//           ? {
//               experimentalBlurMethod: "dimezisBlurView",
//               blurReductionFactor: 5, // optimized for clarity
//               reducedTransparencyFallbackColor: "transparent",
//             }
//           : {})}
//         tint="dark"
//         intensity={30} // higher intensity for better blur effect
//         style={StyleSheet.absoluteFill}
//       />
//       <View style={styles.dimOverlay} />

//       {/* Spinner */}
//       <Animated.View
//         style={[
//           styles.spinner,
//           {
//             transform: [
//               {
//                 rotate: rotateAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: ["0deg", "360deg"],
//                 }),
//               },
//             ],
//           },
//         ]}
//       >
//         {Array.from({ length: DOTS }).map((_, i) => {
//           const angle = (i * 2 * Math.PI) / DOTS;
//           const x = Math.cos(angle) * RADIUS;
//           const y = Math.sin(angle) * RADIUS;

//           const opacity = rotateAnim.interpolate({
//             inputRange: [0, 1],
//             outputRange: [
//               ((i + DOTS - 1) % DOTS) / DOTS,
//               (i % DOTS) / DOTS,
//             ],
//             extrapolate: "clamp",
//           });

//           return (
//             <Animated.View
//               key={i}
//               style={[
//                 styles.dot,
//                 {
//                   left: 40 + x,
//                   top: 40 + y,
//                   backgroundColor: COLORS.magenta,
//                   opacity,
//                 },
//               ]}
//             />
//           );
//         })}
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   dimOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.04)",
//   },
//   spinner: {
//     width: 80,
//     height: 80,
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dot: {
//     position: "absolute",
//     width: DOT_SIZE,
//     height: DOT_SIZE,
//     borderRadius: DOT_SIZE / 2,
//   },
// });
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Circle, Path } from "react-native-svg";

type LoaderProps = {
  loading: boolean;
};

function SpinnerSVG() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dashOffsetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // rotation loop
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // dash offset loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(dashOffsetAnim, {
          toValue: 59,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(dashOffsetAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
      <Svg width={64} height={64} viewBox="0 0 24 24">
        <Circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="#c93c7c"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="42 150"
          strokeDashoffset={dashOffsetAnim}
        />
      </Svg>
    </Animated.View>
  );
}

export default function Loader({ loading }: LoaderProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
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
      {/* Blur background */}
      <BlurView
        {...(Platform.OS === "android"
          ? {
              experimentalBlurMethod: "dimezisBlurView",
              blurReductionFactor: 5,
              reducedTransparencyFallbackColor: "transparent",
            }
          : {})}
        tint="dark"
        intensity={30}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.dimOverlay} />

      {/* Rotating SVG Spinner */}
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <SpinnerSVG />
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
    // backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});
