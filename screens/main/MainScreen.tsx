import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ModalResultType } from 'react-native-use-modal';
import { useSelector } from 'react-redux';
import { MainScreenNavigationProp } from '../../navigators/navigation.types';
import { paddingHorizontal } from '../../utils/utils';
import { selectHasTestResults, selectRecentTestResults } from '../../store/test-results';
import { selectIsLoggedIn,selectUser } from '../../store/user';
import useSimpleModal from '../../hooks/useSimpleModal';
import Container from '../../components/Container';
import MainBanner from './components/MainBanner';
import MainCard from './components/MainCard';
import MainColumns from './components/MainColumns';
import MainCC from './components/MainCC';
import MainFooter from './components/MainFooter';
import ReportIcon from '../../assets/icons/report.svg';
import ScanSkinIcon from '../../assets/icons/scan-skin.svg';
import OpenCV from '../../NativeModules/OpenCV';
import {MMKV} from 'react-native-mmkv'
const storage = new MMKV()  
const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const hasTestResults = useSelector(selectHasTestResults);
  const simpleModal = useSimpleModal();
  const user = useSelector(selectUser);
  const tr=useSelector(selectRecentTestResults);
  const goToCamera = () => {

    if (isLoggedIn) {
      
      navigation.navigate('Camera');
      
    } else {
      console.log("login ")
      navigation.navigate("Login"); 
    }
    
  }
  const goToResult = () => navigation.navigate('PopTestResult');

  const goToRecentResult = async () => {
      storage.getBoolean(user?.uid+'user.istest')

      if (storage.getBoolean(user?.uid+'user.istest')==true) { //hasTestResults
      
          goToResult();
        
        //goToResult();
      } else { 
        const result = await simpleModal.show({
          message: '최근 측정결과가 없습니다.',
          confirmText: '피부 측정',
        });

        if (result.type === ModalResultType.CONFIRM) {
          goToCamera;
        }
      }

    
    goToCamera;
  };
//<MainCC />
  return (
    <Container contentContainerStyle={styles.container} scrollEnabled={false}>
      <View style={styles.section}>
        <MainCard
          title="피부 측정"
          textLink="피부 촬영하기"
          icon={ScanSkinIcon}
          onPress={goToCamera}
        />
        <MainCard
          title="최근 피부 분석 결과"
          textLink="결과 확인하기"
          icon={ReportIcon}
          onPress={goToRecentResult}
        />
      </View>
      <MainCC />
      <MainFooter />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
  },
  section: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginVertical: 45,
  },
  marginRight: {
    marginRight: 10,
  },
});

export default MainScreen;
