import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './features/home/view/HomeTabs';
import PopularNewsScreen from './features/home/view/PopularNewsScreen';
import CategoryNewsScreen from './features/home/view/CategoryNewsScreen';
import OnboardingScreen from './features/auth/OnboardingScreen';
import { NewsViewModelProvider } from './features/home/context/NewsViewModelProvider';

export type RootStackParamList = {
  Home: undefined;
  CategoryNews: undefined;
  PopularNews: undefined;
  OnBoarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NewsViewModelProvider>
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
         </NewsViewModelProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
