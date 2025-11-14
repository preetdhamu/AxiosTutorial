import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faClock } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../constants/color';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.6); // 60% of screen width

const PopularNewSection = () => {
  const items = [1, 2, 3, 4, 5];
  const [error, setError] = useState(false);

  return (
    <View style={styles.popularSection}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Popular Now</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item, index) => (
          <View key={index} style={[styles.card, { width: CARD_WIDTH }]}>
            <Image
              source={
                error
                  ? require('../../../../assets/images/defaultImage.png')
                  : { uri: `https://picsum.photos/400/300?random=${index}` }
              }
              style={styles.image}
              resizeMode="cover"
              defaultSource={require('../../../../assets/images/defaultImage.png')}
              onLoadStart={() => console.log('🟡 Image loading started...')}
              onLoad={() => console.log('🟢 Image loaded successfully!')}
              onError={err => {
                console.log('🔴 Image load failed:', err.nativeEvent.error);
                setError(true);
              }}
              onLoadEnd={() => console.log('⚪️ Image load ended.')}
            />

            <View style={[styles.overlay, { width: CARD_WIDTH }]}>
              <View style={styles.overlayHeader}>
                <View style={styles.timeRow}>
                  <FontAwesomeIcon
                    icon={faClock}
                    size={12}
                    style={styles.clockIcon}
                  />
                  <Text style={styles.timeText}>2 Hours ago</Text>
                </View>

                <View style={styles.profileRow}>
                  <Image
                    source={require('../../../../assets/images/girlBItmoji.png')}
                    style={styles.profileImage}
                    resizeMode="contain"
                  />
                  <View style={styles.saveCircle}>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size={12}
                      color={colors.secondary}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.categoryText}>Sport</Text>

              <Text style={styles.descriptionText}  
              numberOfLines={3}
            ellipsizeMode="tail" >
                Al-Hilal defeated Al-Ittihad 1-0 on Sunday to move into the
                King's Cup fi gdfsjgiofhsf shdsfh dskjf hdskfhskajhgklagh d ghreiug hrea ir hiorgh ireeri gherighnal...
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PopularNewSection;

const styles = StyleSheet.create({
  popularSection: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },

  sectionTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },

  seeAll: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },

  scrollContent: {
    paddingRight: 10,
  },

  card: {
    backgroundColor: '#999',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 200,
    marginBottom: 100,
  },

  overlay: {
    backgroundColor: colors.cardUpperLayer,
    position: 'absolute',
    bottom: 0,
    borderRadius: 16,
    paddingTop: 15,
    zIndex: 5,
  },

  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 0,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  clockIcon: {
    color: colors.secondary,
  },

  timeText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 8,
    fontWeight: '700',
    color: colors.secondary,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },

  saveCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: -15,
  },

  categoryText: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
    paddingHorizontal: 12,
    marginBottom: 12,
    textAlign: 'justify',
  },

  descriptionText: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
    paddingHorizontal: 12,
    marginBottom: 15,
    textAlign: 'justify',
  },
});
