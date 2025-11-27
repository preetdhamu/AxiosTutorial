import { StyleSheet, View , Image} from 'react-native';
import React from 'react';
import { faBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const ProfileRowSection = () => {
  return (
    <View style={styles.profileRow}>
      <Image
        source={require('../../../../../../../assets//images/girlBItmoji.png')}
        style={styles.profileImage}
        resizeMode="contain"
      />
      <View style={styles.saveCircle}>
        <FontAwesomeIcon 
        icon={faBookmark as any} 
        size={12} 
        // color={colors.secondary} 
        />
      </View>
    </View>
  );
};

export default ProfileRowSection;

const styles = StyleSheet.create({
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  saveCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: -5,
  },
});
