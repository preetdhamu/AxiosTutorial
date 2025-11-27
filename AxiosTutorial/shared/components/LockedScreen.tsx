import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";

function LockedScreen({ onUnlock }: { onUnlock: () => Promise<any> }) {
  
  const handleUnlock = async () => {
    const res = await onUnlock();

    if (res.reason === "NO_PERMISSION"|| res.reason === "NOT_AVAILABLE") {
      Alert.alert(
        "Biometric Permission Needed",
        "Please enable FaceID/Fingerprint permission for this app.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    if (res.reason === "NOT_ENROLLED") {
      Alert.alert(
        "No Biometrics Found",
        "Please set up FaceID or Fingerprint on your device.",
        [{ text: "OK" }]
      );
      return;
    }

    
    if (!res.success) {
      Alert.alert(
        "Authentication Failed",
        `Reason : ${res.reason}`,
        [{ text: "OK" }]
      );
      return;
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Locked</Text>
      <Text style={styles.sub}>Authenticate to continue</Text>

      <TouchableOpacity style={styles.button} onPress={handleUnlock}>
        <Text style={styles.btnText}>Unlock with Biometric</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LockedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  sub: { fontSize: 16, color: "#666", marginBottom: 20 },
  button: {
    padding: 14,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  btnText: { color: "white", fontSize: 16 },
});
