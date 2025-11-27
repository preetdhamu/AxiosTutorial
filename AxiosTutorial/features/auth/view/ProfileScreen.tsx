// screens/ProfileScreen.tsx
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { AuthVMContext } from '../context/AuthViewModelProvider';
import HeaderSection from '../../../shared/components/HeaderSection';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constants/color';
import LanguageDropdown from '../../../shared/components/LanguageDropdown';


const ProfileScreen = ({ navigation }: any) => {
  const vm = useContext(AuthVMContext);
  const avatarSource =
    vm.user?.gender?.toLowerCase() === 'female'
      ? require('/Users/gurpreet/Desktop/ReactNative/AxiosTutorial/assets/images/girlBItmoji.png')
      : require('/Users/gurpreet/Desktop/ReactNative/AxiosTutorial/assets/images/boyBItmoji.png');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <HeaderSection title="Profile" showBackAction={false} />

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image source={avatarSource} style={styles.avatar} />
          <Text style={styles.userName}>{vm.user?.name ?? '—'}</Text>
        </View>

        {/* Information Box */}
        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{vm.user?.email ?? '—'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{vm.user?.gender ?? '—'}</Text>
          </View>

          {vm.user && (
            <View style={styles.row}>
              <Text style={styles.label}>App Lock</Text>
              <Switch
                value={vm.isAppLockedEnabled}
                onValueChange={vm.toggleAppLockSecurely}
              />
            </View>
          )}
        </View>


        <LanguageDropdown/>

        {vm.user ? (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={()=>{
              vm.handleLogout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            })
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.logoutBtn, { backgroundColor: colors.primary }]}
            onPress={()=>{
          
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            }
            }
          >
            <Text style={styles.logoutText}>Login</Text>
          </TouchableOpacity>
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eee',
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  infoBox: {
    backgroundColor: colors.cardUpperLayer,
    padding: 20,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.4,
    borderColor: '#ddd',
  },

  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  logoutBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.snackbarDangerColor,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
