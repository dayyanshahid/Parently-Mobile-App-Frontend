import { StyleSheet, Text, View } from "react-native";
import GradientBackground from "./GradientBackground";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import BackButton from "./BackButton";
import { spacing } from "../utils/responsive";
import { colors, typography, borderRadius } from "../utils/theme";

interface EventMatProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function EventMat({ children, title, subtitle }: EventMatProps) {
    const hasSubtitle = Boolean(subtitle);
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <View style={[
            styles.titleContainer,
            { paddingTop: hasSubtitle ? spacing.sm : spacing.md },
          ]}>
        <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <View style={styles.body}>
       {children}
      </View>
    </GradientBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: '13%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  titleContainer: {
    paddingLeft: spacing.xxl,
    paddingVertical: spacing.xs,
    gap: spacing.xs / 2,
  },
  title: {
    fontSize: typography.fontSize.heading3,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.white,
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
  },
  body: {
    flex: 1,
    bottom: 0,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderStartStartRadius: borderRadius.xxxl,
    borderTopEndRadius: borderRadius.xxxl,
    backgroundColor: colors.white,
  },
});
