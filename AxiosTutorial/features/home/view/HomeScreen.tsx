
// screens/Home/HomeScreen.tsx
import React, { useContext, useMemo } from "react";
import {
  View,
  StyleSheet,
  SectionList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../constants/color";

import HeaderSection from "./components/HeaderSection/HeaderSection";
import SearchSection from "./components/SearchSection/SearchSection";
import PopularNewSection from "./components/PopularNewsSection/PopularNewSection";
import ContentCardList from "./components/CategoryNewsSection/components/ContentCardList";
import ContentCardListShimmer from "./components/CategoryNewsSection/components/ContentCardListShimmer";
import CommonErrorDialog from "../../../util/CommonErrorDialog";
import CategoryNewsSection from "./components/CategoryNewsSection/CategoryNewsSection";
import { NewsVMContext } from "../context/NewsViewModelProvider";

const HomeScreen = ({ navigation }: any) => {
  const vm = useContext(NewsVMContext);

  
  const sections = useMemo(() => {
    return [
      {
        title: "CategorySection",
        data: vm.items,
      },
    ];
  }, [vm.items]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) =>
            item?.id ?? item?.url ?? index.toString()
          }
          renderItem={({ item, index }) => (
            <View style={styles.renderItem}>
              <ContentCardList item={item} index={index} />
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <HeaderSection />
              <SearchSection />
              <PopularNewSection
                useNewHeader={false}
                topHeadlines={vm.topHeadlines}
                loadMoreTopNews={vm.loadMoreTopNews}
                onSeeAll={() => navigation.navigate("PopularNews")}
                
              />
            </>
          )}
          
          renderSectionHeader={() => (
            <CategoryNewsSection
              activeTab={vm.activeTab}
              onTabPress={vm.handleTabPress}
              categoryData={vm.categoryData}
              scrollRef={vm.scrollRef}
              onSeeAll={() => {
                vm.setActiveTab("All");
                navigation.navigate("CategoryNews")}}
            />
          )}
          renderSectionFooter={() =>
            vm.loadingMore ? (
              <View style={styles.shimmerPadding}>
                {[...Array(3)].map((_, i) => (
                  <ContentCardListShimmer key={i} />
                ))}
              </View>
            ) : null
          }
          stickySectionHeadersEnabled={true} 
          refreshing={vm.refreshing}
          onRefresh={vm.onRefresh}
          onEndReached={vm.handleEndReached}
          onEndReachedThreshold={0.6}
          contentContainerStyle={styles.flashListContent}
          showsVerticalScrollIndicator={false}
        />

        <CommonErrorDialog
          visible={!!vm.error}
          message={vm.error || ""}
          onClose={vm.clearError}
        />
      </SafeAreaView>
     </SafeAreaProvider> 
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundColor },
  flashListContent: { paddingBottom: 40 , backgroundColor : colors.backgroundColor },
  renderItem: { paddingHorizontal: 16 },
  shimmerPadding : { paddingTop : 10  , paddingHorizontal: 16   }
});
