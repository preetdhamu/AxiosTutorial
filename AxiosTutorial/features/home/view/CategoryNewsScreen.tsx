import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'; // 1. Import FlatList
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constants/color';

import CategoryNewsSection from './components/CategoryNewsSection/CategoryNewsSection';
import ContentCardList from './components/CategoryNewsSection/components/ContentCardList'; // 2. Import the Card Component
import ContentCardListShimmer from './components/CategoryNewsSection/components/ContentCardListShimmer';
import CommonErrorDialog from '../../../util/CommonErrorDialog';
import { NewsVMContext } from '../context/NewsViewModelProvider';

const CategoryNewsScreen = ({ navigation }: any) => {
  const vm = useContext(NewsVMContext);

  return (
    <SafeAreaView style={styles.container}>
  
        <CategoryNewsSection
            useNewHeader
            activeTab={vm.activeTab}
            onTabPress={vm.handleTabPress}
            categoryData={vm.categoryData}
            scrollRef={vm.scrollRef}
            // Fix: Pass as a function so it doesn't auto-execute
            goBack={() => {
              vm.setActiveTab("All");
              navigation.goBack()}} 
        />
     

    
      <FlatList
        data={vm.items}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.renderItem}>
            <ContentCardList item={item} index={index} />
          </View>
        )}
        
      
        ListFooterComponent={() =>
            vm.loadingMore ? (
              <View style={styles.shimmerPadding}>
                {[...Array(3)].map((_, i) => (
                  <ContentCardListShimmer key={i} />
                ))}
              </View>
            ) : null
        }

    
        onEndReached={vm.handleEndReached}
        onEndReachedThreshold={0.6} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <CommonErrorDialog
        visible={!!vm.error}
        message={vm.error || ''}
        onClose={vm.clearError}
      />
    </SafeAreaView>
  );
};

export default CategoryNewsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.backgroundColor 
  },
  
  listContent: { 
    paddingBottom: 40 
  },
   renderItem: { 
    paddingHorizontal: 16 
  },
  
 shimmerPadding : { paddingTop : 10 , paddingHorizontal: 16    }

  
});