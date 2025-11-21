import { useContext } from 'react';
import PopularNewSection from './components/PopularNewsSection/PopularNewSection';
import { NewsVMContext } from '../context/NewsViewModelProvider';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import colors from '../../../constants/color';
import CommonErrorDialog from '../../../util/CommonErrorDialog';

const PopularNewsScreen = ({navigation} : any) => {
  const vm = useContext(NewsVMContext)

  return <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <PopularNewSection
          useNewHeader
          topHeadlines={vm.topHeadlines}
          loadMoreTopNews={vm.loadMoreTopNews}
          goBack={()=>{ navigation.goBack() }}
        />
         <CommonErrorDialog
          visible={!!vm.error}
          message={vm.error || ''}
          onClose={vm.clearError}
        />
    </SafeAreaView>
  </SafeAreaProvider>;
};

export default PopularNewsScreen;



const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: colors.backgroundColor },
})