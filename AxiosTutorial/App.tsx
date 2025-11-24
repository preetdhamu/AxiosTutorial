import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import HomeTab from './features/home/view/HomeTabs';
import PopularNewsScreen from './features/home/view/PopularNewsScreen';
import CategoryNewsScreen from './features/home/view/CategoryNewsScreen';
import OnboardingScreen from './features/auth/OnboardingScreen';
import LoginScreen from './features/auth/LoginScreen';
import { NewsViewModelProvider } from './features/home/context/NewsViewModelProvider';

export type RootStackParamList = {
  Home: undefined;
  CategoryNews: undefined;
  PopularNews: undefined;
  OnBoarding: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { firstLaunch, token } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <NewsViewModelProvider>
        <Stack.Navigator
          initialRouteName={
            firstLaunch ? 'OnBoarding' : token ? 'Home' : 'Login'
          }
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="PopularNews" component={PopularNewsScreen} />
          <Stack.Screen name="CategoryNews" component={CategoryNewsScreen} />
        </Stack.Navigator>
      </NewsViewModelProvider>
    </NavigationContainer>
  );
}
