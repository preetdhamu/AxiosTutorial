import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';

import HomeTab from './home/view/HomeTabs';
import CategoryNewsScreen from './home/view/components/CategoryNewsSection/CategoryNewsScreen';
import PopularNewsScreen from './home/view/components/PopularNewsSection/PopularNewsScreen';

import OnboardingScreen from './auth/view/OnboardingScreen';

import { NewsViewModelProvider } from './home/context/NewsViewModelProvider';
import { AuthVMContext } from './auth/context/AuthViewModelProvider';
import LockedScreen from '../shared/components/LockedScreen';
import LoginScreen from './auth/view/LoginScreen';

export type RootStackParamList = {
  Home: undefined;
  CategoryNews: undefined;
  PopularNews: undefined;
  OnBoarding: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const vm = useContext(AuthVMContext);
  if (vm.locked && vm.isAppLockedEnabled) {
    return <LockedScreen onUnlock={vm.unlockApp} />;
  }

  return (
    <NewsViewModelProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            vm.firstLaunch ? 'OnBoarding' : vm.token ? 'Home' : 'Login'
          }
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="PopularNews" component={PopularNewsScreen} />
          <Stack.Screen name="CategoryNews" component={CategoryNewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NewsViewModelProvider>
  );
}
