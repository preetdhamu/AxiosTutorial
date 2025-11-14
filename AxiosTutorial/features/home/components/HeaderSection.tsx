import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'; // vacant bell icon
import colors from '../../../constants/color';
const HeaderSection = () => {
  return (
    <View style={styles.header}>
             <Text style={styles.headerTitle}>NewsFeed</Text>
             <View style={styles.trailingIcon}>
               <FontAwesomeIcon
                 icon={faBell}
                 size={20}
                 style={styles.notificationIcon}
               />
               <View style={styles.notificationDot} />
             </View>
           </View>
  )
}

export default HeaderSection

const styles = StyleSheet.create({
  header: {
    // flex : 1 , 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    paddingVertical: 4,
    borderLeftWidth: 2,
  },
  trailingIcon: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    color: colors.placeHolderColor,
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor:  'black',
  },
});
