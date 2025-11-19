import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './features/auth/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './features/home/HomeTabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import PopularNewsScreen from './features/home/components/PopularNewsSection/components/PopularNewsScreen';
import CategoryNewsScreen from './features/home/components/CategoryNewsSection/components/CategoryNewsScreen';


export type RootStackParamList = {
  Home: undefined;
  CategoryNews: undefined;
  PopularNews : undefined;
  OnBoarding : undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();



function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeTab} />
            <Stack.Screen name="PopularNews" component={PopularNewsScreen} />
            <Stack.Screen name="CategoryNews" component={CategoryNewsScreen} />
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
