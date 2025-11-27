import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import colors from '../../constants/color';

interface Props {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  color?:string;
}

const CommonErrorDialog: React.FC<Props> = ({
  visible,
  message,
  onClose,
  color = colors.snackbarLightColor,
  duration = 2000,

}) => {

  const slideAnim = useRef(new Animated.Value(-80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();

      const timer = setTimeout(() => hideBar(), duration);
      return () => clearTimeout(timer);

    } else {
      hideBar();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const hideBar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -80,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => onClose());
  };

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.leftCorner , { backgroundColor : color}]} />

      <TouchableOpacity activeOpacity={0.9} onPress={hideBar}>
        <Text style={styles.message}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CommonErrorDialog;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.snackbarbackgroundColor,
    zIndex: 9999,
  },

  leftCorner: {
    width: 2,
    borderRadius: 2,
  },

  message: {
    fontSize: 14,
    color: '#fff',
  },
});
