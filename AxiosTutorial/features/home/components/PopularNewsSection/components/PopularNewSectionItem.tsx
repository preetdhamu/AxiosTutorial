import { useState } from 'react';
import { NewsItem } from '../../../../../types/newsTypes';
import  toTitleCase  from '../../../../../util/TitleCaseHelper';
import { CARD_WIDTH, styles } from '../PopularNewSection';
import { Text, View  , Image} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ProfileRowSection from './ProfileRowSection';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export const PopularNewSectionItem = ({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) => {
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  const getTimeAgo = (pubDate: string) => {
    if (!pubDate) return 'Just now';

    const published = new Date(pubDate).getTime();
    const now = Date.now();
    const diffHours = Math.floor((now - published) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  const imageUrl = item.image_url;
  const description = toTitleCase(item.title) || 'No title available';
  const category = toTitleCase(item.category?.[0]) || 'News';
  const publishedTime = getTimeAgo(item.pubDate);

  return (
    <View key={index} style={[styles.card, { width: CARD_WIDTH }]}>
      <Image
        source={
          errorIndexes.includes(index)
            ? require('../../../../../../assets/images/defaultImage.png')
            : { uri: imageUrl }
        }
        style={styles.image}
        resizeMode="cover"
        defaultSource={require('../../../../../../assets/images/defaultImage.png')}
        onError={() => setErrorIndexes(prev => [...prev, index])}
      />

      <View style={[styles.overlay, { width: CARD_WIDTH }]}>
        <View style={styles.overlayHeader}>
          <View style={styles.timeRow}>
            <FontAwesomeIcon
              icon={faClock as any }
              size={12}
              // color={ colors.secondary}
            />
            <Text style={styles.timeText}>{publishedTime}</Text>
          </View>

          <ProfileRowSection />
        </View>
        <Text style={styles.categoryText}>{category}</Text>
        <Text
          style={styles.descriptionText}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
