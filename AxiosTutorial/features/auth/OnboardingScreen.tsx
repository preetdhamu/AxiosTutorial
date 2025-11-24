import React from 'react';
import { Text, View, StyleSheet , Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../constants/color';
import color from '../../constants/color';
import AnimatedCircularButton from './components/AnimatedCircularButton';
import { finishOnBoarding } from '../../store/slices/auth/authSlice';
import { useDispatch } from 'react-redux';

function OnboardingScreen({ navigation } :  any) {
  
   const dispatch = useDispatch();

   const completeOnBoarding = () => {
    dispatch(finishOnBoarding())
    navigation.replace("Login");
   }  
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <LinearGradient
            colors={[
              'rgba(255,255,255,0.0)',
              'rgba(255,255,255,0.54)',
              'rgba(255,255,255,0.64)',
              'rgba(255,255,255,0.7)',
              'white',
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
          >
            <View>
              <Text style={styles.title}>Discover Breaking News</Text>
              <Text style={styles.subtitle}>
                Make it easy for users to access the latest and most recent news
                quickly and easily from a single platform.
              </Text>

              <AnimatedCircularButton onTap={completeOnBoarding}/>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  logo: {
    height: '70%',
    alignSelf: 'center',
  },
  gradient: {
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 45,
    color: colors.primary,
    paddingBottom: 15,
  },
  subtitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 45,
    color: colors.secondary,
    paddingBottom: 15,
  },
});

export default OnboardingScreen;
