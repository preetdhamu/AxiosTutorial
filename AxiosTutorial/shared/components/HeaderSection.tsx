import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'; // vacant bell icon
import colors from '../../constants/color';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const HeaderSection = ({
  title = 'NewsFeed',
  showBackAction = false,
  onBackPress = () => {},
}) => {
  return (
    <View style={styles.header}>
      {showBackAction && (
        <View style={styles.defaultBoxes}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <FontAwesomeIcon
              icon={faChevronLeft as any}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.defaultBoxes}>
        <Text
          style={[
            styles.headerTitle,
            { borderLeftWidth: showBackAction ? 0 : 2 },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={[styles.trailingIcon, styles.defaultBoxes]}>
        <FontAwesomeIcon
          icon={faBell as any}
          size={20}
          // color={colors.placeHolderColor}
        />
        <View style={styles.notificationDot} />
      </View>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignContent: 'center',
  },
  backButton: {
    paddingRight: 0,
  },
  defaultBoxes: { height: 40, justifyContent: 'center', alignItems: 'center' },
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

  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor: 'black',
  },
});
