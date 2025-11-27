import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from '../../auth/view/ProfileScreen';
import colors from '../../../constants/color';
import TabLottieIcon from '../../../shared/components/TabLottieIcon';
import UnderConstruction from '../../../shared/components/UnderConstruction';

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 45,
          backgroundColor: colors.cardUpperLayer,
          shadowColor: colors.lightSecondary,
          // shadowOffset : { width : 0 , height : -3 },
          shadowOpacity: 0.65,
          shadowRadius: 6,
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
          tabBarIcon: () => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/Home.json')}
              size={23}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Discover"
        component={()=><UnderConstruction  titleName='Discover'/>}
        options={{
          tabBarIcon: () => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/Profile.json')}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={()=><UnderConstruction  titleName='BookMark'/>}
        options={{
          tabBarIcon: () => (
            <TabLottieIcon
              file={require('../../../../assets/lottie/BookMark.json')}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
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

