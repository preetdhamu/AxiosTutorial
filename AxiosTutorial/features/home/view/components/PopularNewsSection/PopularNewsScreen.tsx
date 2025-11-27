import { useContext } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { NewsVMContext } from '../../../context/NewsViewModelProvider';
import PopularNewSection from './PopularNewSection';

import colors from '../../../../../constants/color';
const PopularNewsScreen = ({ navigation }: any) => {
  const vm = useContext(NewsVMContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PopularNewSection
          useNewHeader
          topHeadlines={vm.topHeadlines}
          loadMoreTopNews={vm.loadMoreTopNews}
          goBack={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PopularNewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundColor },
});
