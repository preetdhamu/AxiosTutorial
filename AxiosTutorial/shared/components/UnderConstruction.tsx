import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import colors from '../../constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderSection from './HeaderSection';

interface UnderConstructionProp {
  titleName: string;
}

const UnderConstruction = ({ titleName }: UnderConstructionProp) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <HeaderSection title={titleName} showBackAction={false} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../assets/images/girlBItmoji.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Under Construction</Text>
        <Text style={styles.subtitle}>
          We’re working hard to bring this feature to life.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UnderConstruction;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
    borderRadius: 70,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: colors.primary || '#222',
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 12,
  },
});
