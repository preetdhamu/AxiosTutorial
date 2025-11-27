import { NativeModules , Platform , Linking } from "react-native";

const { BiometricsModule } = NativeModules;

export const unlockWithBiometrics = async () => {
    try {
        const result = await BiometricsModule.unlock();
        return result;
    } catch (e){
        console.log(`Error is : ${e}`);
        return { success: false, reason: "FAILED" };
    }
}


export const openSettings = () =>{
    if (Platform.OS === 'ios'){
        Linking.openURL("app-settings:")
    } else {
        Linking.openURL("package:" + NativeModules.PlatformConstants.reactNativeVersion.packageName)
    }
}