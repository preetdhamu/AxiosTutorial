// screens/LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AuthVMContext } from '../context/AuthViewModelProvider';
import colors from '../../../constants/color';
import TextField from '../../../shared/components/TextField';

const LoginScreen = ({ navigation }: any) => {
  const vm = useContext(AuthVMContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleEmailLogin = async () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      await vm.loginEmail(cleanEmail, cleanPassword);
      navigation.replace('Home');
    } catch (err) {
      console.log('Login failed:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await vm.loginGoogleVM();
      navigation.replace('Home');
    } catch (err) {
      console.log('Google Login Error:', err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await vm.loginFaceBookVM();
      navigation.replace('Home');
    } catch (err) {
      console.log('Facebook Login Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{ t("login.title")}</Text>
      <Text style={styles.subtitle}>{ t("login.subtitle")}</Text>


      {/* Loading */}
      {vm.loading && <ActivityIndicator size="large" color={colors.primary} />}

      {/* Email */}
      <TextField
         placeholder={t("login.placeholder.email")}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        needIcon={false}
        showCancel={false}
        style={styles.inputField}
        showBorder={false}
      />

      {/* Password */}
      <TextField
       placeholder={t("login.placeholder.password")}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        needIcon={false}
        showCancel={false}
        style={styles.inputField}
        showBorder={false}
      />

      {/* Email Login */}
      <TouchableOpacity style={styles.emailBtn} onPress={handleEmailLogin}>
        <Text style={styles.btnText}>{t("login.buttons.emailLogin")} </Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>{t("login.or")}</Text>

      {/* Google */}
      <TouchableOpacity
        style={[
          styles.socialBtn,
          { backgroundColor: colors.snackbarDangerColor },
        ]}
        onPress={handleGoogleLogin}
      >
        <Text style={styles.btnText}>{t("login.buttons.google")}</Text>
      </TouchableOpacity>

      {/* Facebook */}
      <TouchableOpacity
        style={[
          styles.socialBtn,
          { backgroundColor: colors.snackbarLightColor },
        ]}
        onPress={handleFacebookLogin}
      >
        <Text style={styles.btnText}>{t("login.buttons.facebook")}</Text>
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text style={styles.skip}>{t("login.skip")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.primary,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    marginTop: 4,
  },

  inputField: {
    paddingVertical: 5,
  },

  emailBtn: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  socialBtn: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  or: {
    textAlign: 'center',
    margin: 15,
    fontSize: 14,
    color: colors.placeHolderColor,
  },

  skip: {
    textAlign: 'center',
    marginTop: 25,
    color: colors.secondary,
    fontWeight: '600',
  },
});
