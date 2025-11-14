import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

interface TabLottieIconProps {
  focused: boolean;
  file: any;
  size?: number;
}

const TabLottieIcon: React.FC<TabLottieIconProps> = ({ focused, file, size = 40 }) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (!animationRef.current) return;

    if (focused) {
      animationRef.current.play(0, 120);
    } else {
      animationRef.current.play(120, 120);
    }
  }, [focused]);

  return (
    <LottieView
      ref={animationRef}
      source={file}
      autoPlay={true}
      loop={true}
      style={{ width: size, height: size }}
    />
  );
};

export default TabLottieIcon;
