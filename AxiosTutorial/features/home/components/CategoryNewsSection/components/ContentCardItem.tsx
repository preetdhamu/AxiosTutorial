import { useState } from "react";
import { StyleSheet, Text, View  , Image} from "react-native";
import colors from "../../../../../constants/color";
import ProfileRowSection from "../../PopularNewsSection/components/ProfileRowSection";

export const ContentCardItem = ({ category, title, photo }: any) => {
  const [error, setError] = useState(false);
  return (
    <View style={styles.card}>
        <Image
          source={
            error
              ? require('../../../../../../assets/images/defaultImage.png')
              : { uri: photo }
          }
          style={styles.image}
          resizeMode="cover"
          defaultSource={require('../../../../../../assets/images/defaultImage.png')}
          // onLoadStart={() => console.log('🟡 Image loading started...')}
          // onLoad={() => console.log('🟢 Image loaded successfully!')}
          onError={()=>{
            setError(true);
          }}
          
        />
      
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

  image: {
    flex: 1.41,

    height: 100,
    backgroundColor: '#999',
    borderRadius: 16,
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
