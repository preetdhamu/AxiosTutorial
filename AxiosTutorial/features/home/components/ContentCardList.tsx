import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../constants/color';
import ProfileRowSection from './ProfileRowSection';
import { NewsItem } from '../mockData/mockData';

const ContentCardItem = ({ category, title, photo }: any) => {
  const [error, setError] = useState(false);
  return (
    <View style={styles.card}>
      {photo && (
        <Image
          source={
            error
              ? require('../../../../assets/images/defaultImage.png')
              : { uri: photo }
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
      )}
      <View style={styles.mainContent}>
        <View>
           <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={2}
            ellipsizeMode='tail' >{title}</Text>
        </View>
        <ProfileRowSection />
      </View>
    </View>
  );
};


type Props = {
  items: NewsItem[];
};

// List Component
const ContentCardList = ({items } : Props ) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <ContentCardItem
          key={index}
          category={item?.category}
          title={item?.title}
          photo={item?.photo}
        />
      ))}
    </View>
  );
};

export default ContentCardList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  card: {
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },

  image: {
    flex: 1.41,
   
    height: 100,
    backgroundColor: '#999',
    borderRadius: 16,
  },

  mainContent: {
    flex: 3,
    paddingRight : 15 ,
    justifyContent : 'flex-start'
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
