import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import dayjs, { Dayjs } from "dayjs";

const { width } = Dimensions.get("window");

export default function Calendar() {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState<Dayjs>(today);
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const WEEKS_AROUND = 3;
  const TOTAL_WEEKS = WEEKS_AROUND * 2 + 1;
  const baseCenter = today.subtract(WEEKS_AROUND, "week");
  const getWeekCenterByIndex = (index: number) => baseCenter.add(index, "week");
  const renderWeekDays = (center: Dayjs) =>
    Array.from({ length: 6 }, (_, i) => center.add(i - 3, "day"));

  const DAY_WIDTH = width / 7;
  const listRef = useRef<FlatList<any> | null>(null); // <-- typed ref, null initial

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({ index: WEEKS_AROUND, animated: false });
    }, 0);
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentDate(getWeekCenterByIndex(pageIndex));
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf:'flex-end' }}>
        <Text style={{ fontSize: 13, fontWeight: "600",color: "#4d4d4d86" }}>
          {selectedDay.format(" DD MMM YY")}
        </Text>
      </View>
      <FlatList
        ref={listRef}
        horizontal
        // pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={Array.from({ length: TOTAL_WEEKS }, (_, i) => i)}
        keyExtractor={(i) => String(i)}
        initialScrollIndex={WEEKS_AROUND}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        scrollEventThrottle={8}
        renderItem={({ item: weekIndex }) => {
          const weekCenter = getWeekCenterByIndex(weekIndex as number);
          const days = renderWeekDays(weekCenter);

          return (
            <View style={styles.container}>
              {days.map((day) => {
                const isSelected = selectedDay.isSame(day, "day");
                const isToday = day.isSame(today, "day");
                const dayContainerStyle = [
                  styles.dayContainer,
                  isSelected && styles.selectedDay,
                  isSelected && { paddingVertical: 12, borderRadius: 14, marginTop: -6 },
                ];

                const dayNumberStyle = [
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  isSelected && { fontSize: 20 },
                ];

                const weekdayStyle = [
                  styles.weekdayText,
                  isSelected && styles.selectedDayText,
                  isSelected && { fontSize: 14, marginTop: 4 },
                ];

                const dotStyleForToday = [
                  styles.dot,
                  { backgroundColor: "#EA479A" },
                  isToday && { width: 10, height: 10, borderRadius: 5 },
                ];

                return (
                  <TouchableOpacity
                    key={day.format("YYYY-MM-DD")}
                    onPress={() => setSelectedDay(day)}
                    activeOpacity={0.8}
                    style={{ width: DAY_WIDTH }}
                  >
                    <View style={dayContainerStyle}>
                      <Text style={dayNumberStyle}>{day.format("D")}</Text>
                      <Text style={weekdayStyle}>{day.format("ddd")}</Text>
                    </View>

                    <View style={styles.dotsRow}>
                      {isToday ? <View style={dotStyleForToday} /> : <View style={styles.dotHidden} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 120,
    alignItems: "flex-start",
    paddingTop: 16,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#ffffffff",
    marginHorizontal: 5,
  },
  selectedDay: {
    backgroundColor: "#ffe6ecff",
  },
  dayText: {
    fontSize: 16,
    color: "#333333ff",
    textAlign: "center",
    fontWeight: "600",
  },
  weekdayText: {
    fontSize: 12,
    color: "#666666ff",
    textAlign: "center",
    marginTop: 2,
  },
  selectedDayText: {
    fontWeight: "700",
    color: "#ff007bff",
    fontSize: 16,
  },
  dotsRow: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 1,
  },
  dotHidden: {
    width: 8,
    height: 8,
    opacity: 0,
  },
});
