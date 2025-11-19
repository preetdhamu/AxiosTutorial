/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: object;
}

const Shimmer: React.FC<ShimmerProps> = ({ width, height, radius = 6, style }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius: radius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  shimmer: {
    width: 200,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
  },
});

export default Shimmer;
