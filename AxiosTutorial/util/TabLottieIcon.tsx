import React from "react";
import LottieView from "lottie-react-native";

interface TabLottieIconProps {
  file: any;
  size?: number;
}

const TabLottieIcon: React.FC<TabLottieIconProps> = ({ file, size = 40 }) => {
  // const animationRef = useRef<LottieView>(null);

  
  return (
    <LottieView
      source={file}
      progress={0.5}  
      autoPlay={false}
      loop={false}
      style={{ width: size, height: size }}
    />
  );
};

export default TabLottieIcon;
