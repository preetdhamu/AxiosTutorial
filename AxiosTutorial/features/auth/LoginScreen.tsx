// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';

import {
  loginWithGoogle,
  loginWithFacebook,
  loginWithEmailPassword,
} from '../../store/slices/auth/authSlice';

import { RootState, useAppDispatch } from '../../store/store';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((s: RootState) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      await dispatch(
        loginWithEmailPassword({ email: cleanEmail, password: cleanPassword }),
      ).unwrap();

      navigation.replace('Home'); // navigate after success
    } catch (err) {
      console.log('Login failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigation.replace('Home');
    } catch (err) {
      console.log('Google Login Error:', err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await dispatch(loginWithFacebook()).unwrap();
      navigation.replace('Home');
    } catch (err) {
      console.log('Facebook Login Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {loading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {/* EMAIL */}
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.emailBtn} onPress={handleEmailLogin}>
        <Text style={styles.btnText}>Login with Email</Text>
      </TouchableOpacity>

      {/* GOOGLE */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#DB4437' }]}
        onPress={handleGoogleLogin}
      >
        <Text style={styles.btnText}>Login with Google</Text>
      </TouchableOpacity>

      {/* FACEBOOK */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#3b5998' }]}
        onPress={handleFacebookLogin}
      >
        <Text style={styles.btnText}>Login with Facebook</Text>
      </TouchableOpacity>

      {/* SKIP */}
      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text style={styles.skip}>Skip Login →</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// --------------------------------
// Styles
// --------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 30, textAlign: 'center' },
  inputBox: {
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    borderRadius: 10,
  },
  input: { padding: 15, fontSize: 16 },
  emailBtn: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  btn: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: { color: 'white', fontSize: 16 },
  skip: { textAlign: 'center', marginTop: 20, color: 'grey' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
