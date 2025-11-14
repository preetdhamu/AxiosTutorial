import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./features/auth/OnboardingScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomeTab from "./features/home/HomeTabs";



const Stack = createNativeStackNavigator();


function App() {
  // return (
  //   <TestImage/>
  // )
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown : false }}>
            <Stack.Screen name="Home" component={HomeTab}/>
            <Stack.Screen name="OnBoarding" component={OnboardingScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;