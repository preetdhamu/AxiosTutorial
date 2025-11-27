import { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import colors from '../../../../../../constants/color';
import ProfileRowSection from '../../PopularNewsSection/components/ProfileRowSection';

export const ContentCardItem = ({ category, title, photo }: any) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {loading && !error && (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={styles.loader}
          />
        )}

        <Image
          source={
            error
              ? require('../../../../../../../assets/images/defaultImage.png')
              : { uri: photo }
          }
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      </View>

      <View style={styles.mainContent}>
        <View>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <ProfileRowSection />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },

  imageContainer: {
    flex: 1.41,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },

  loader: {
    position: 'absolute',
    zIndex: 10,
  },

  mainContent: {
    flex: 3,
    paddingRight: 15,
    justifyContent: 'flex-start',
  },

  category: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    fontWeight: '700',
    color: colors.lightSecondary,
  },

  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'justify',
  },
});
