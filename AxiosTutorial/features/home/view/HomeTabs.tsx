import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { Text, View } from 'react-native';
import TabLottieIcon from '../../../util/TabLottieIcon';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 45,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="MainHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/Home.json')}
              size={23}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Discover"
        component={TestImage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/Profile.json')}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={TestImage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/BookMark.json')}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={TestImage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/Compass.json')}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;

const TestImage = () => {
  return (
    <View>
      <Text>TestImage</Text>
    </View>
  );
};
