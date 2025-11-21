import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextField from '../../../../../util/TextField';

const SearchSection = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.searchSection}>
      <Text style={styles.searchMainTitle}>Discover Breaking News</Text>
      <TextField
        placeholder="Search all events..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderSize={14}
        onCancel={() => console.log('Search cleared')}
        showCancel={true}
        showBorder={true}
      />
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchMainTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
