import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./features/auth/OnboardingScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./features/home/HomeScreen";
import TestImage from "./TestImage";



const Stack = createNativeStackNavigator();


function App() {
  // return (
  //   <TestImage/>
  // )
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="OnBoarding" component={OnboardingScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;