import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedProps,
  interpolateColor,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function AnimatedCircularButton() {
  const rotation = useSharedValue(270);
  const circleProgress = useSharedValue(0);

  const radius = 27;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));


  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - circleProgress.value),
  }));

 
  const fillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      circleProgress.value,
      [0, 1],
      ['#FFFFFF', '#000']
    
    ),
  }));

  const handlePress = () => {
    rotation.value = withTiming(360, {
      duration: 1600,
      easing: Easing.inOut(Easing.ease),
    });

    circleProgress.value = withTiming(1, {
      duration: 1600,
      easing: Easing.inOut(Easing.ease),
    });

    setTimeout(() => {
    navigation.navigate('Home');
  }, 1600);

  };

  return (
    <Pressable
      onPress={
        handlePress
      }
      style={styles.button}
    >
      {/* Animated Fill Background */}
      <Animated.View style={[styles.fillBackground, fillStyle]} />

      {/* Circle outline */}
      <View style={styles.circleContainer}>
        <Svg height="60" width="60">
          <Circle
            cx="30"
            cy="30"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx="30"
            cy="30"
            r={radius}
            stroke="#000"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* Arrow inside */}
      <Animated.View style={animatedStyle}>
        <FontAwesomeIcon
          icon={faArrowRight as any}
          size={18}
          // style={{ backgroundColor :  rotated ? '#FFF' : '#000'}}
          // color={rotated ? '#FFF' : '#000'}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillBackground: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
