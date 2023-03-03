import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import colors from '../../utils/colors';
import { paddingHorizontal } from '../../utils/utils';
import { selectAverageScore } from '../../store/user';
import { selectAverageRecentTestScore } from '../../store/test-results';
import { TestResultsDetailsScreenNavigationProp,
  TestResultsDetailsScreenProp } from '../../navigators/navigation.types';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ResultStatCard from '../../components/ResultStatCard';
import TestResultsDetailsCare from './components/TestResultsDetailsCare';
import {SkinTypes} from './components/52types';
import TextBold from '../../components/TextBold';
import TextLight from '../../components/TextLight';
import { MMKV } from 'react-native-mmkv'
/*
          if (ptrouble>=0.25){
            result.trouble =25
          }else{
            if(ptrouble>=0.15){
              result.trouble =50
            }else{
              if(ptrouble>=0.1){
                result.trouble = 75    
              }else{
                result.trouble = 100    
              }
            }  
          }

          if (ppore>0.15){
            result.pore =25
          }else{ 
            if(ppore>=0.08){
              result.pore =50
            }else{
              if(ppore>=0.01){
                result.pore = 75
              }else{
                result.pore = 100
              }
            }
          }


          if (pflush>=0.5){
            result.flush =25
          }else{
            if(pflush>=0.25){
              result.flush =50
            }else{
              if(pflush>=0.07){
                result.flush =75
              }else{
                  result.flush = 100      
              }    
            }  
          }
          

          if (ppigment>=0.5){
            result.pigment =25
          }else{
            if(ppigment>=0.3){
              result.pigment =50
            }else{
              if(ppigment>=0.1){
                result.pigment = 75
              }else{
                result.pigment = 100
              }
            }
          } 
          
          if (pwrinkle>=0.4){
            result.wrinkle =25
          }else{
            if(pwrinkle>=0.2){
              result.wrinkle =50
            }else{
              if(pwrinkle>=0.08){
                result.wrinkle = 75
              }else{
                result.wrinkle = 100
              }
            }
          } 
          
*/
const TestResultsDetailsScreen = () => {
  const navigation = useNavigation<TestResultsDetailsScreenNavigationProp>();
  const averageScore = useSelector(selectAverageScore);
  const averageRecentScore = useSelector(selectAverageRecentTestScore);
  //const goToSummary = () => navigation.navigate('TestResultsSummary');
  
  const user = useSelector(selectUser);
  const storage = new MMKV();
  const cnum = useRoute<TestResultsDetailsScreenProp>().params.carenum;
  console.log('TestResultsDetailsScreen :' + cnum);
  const goToCustomizedSolution = () => navigation.navigate('CustomizedSolution', {carenum: SkinTypes[cnum].care});
  console.log(SkinTypes[cnum].care);
  var uage=user?.questionnaire?.age || 0;
  var skage=30;
  if(uage<5){
    skage=uage*5+16;
  }else{
    skage=uage*6+16;
  }

  
  if(averageScore>=85){
    skage=skage*0.9
  }
  if(averageScore<85 && averageScore>=70){
    skage=skage*0.95
  }
  if(averageScore<75 && averageScore>=50){
    skage=skage*1
  }
  if(averageScore<50 && averageScore>=25){
     skage=skage*1.05
  }
  if(averageScore<25){
    skage=skage*1.1
  }
  
 console.log("qage: " +uage);
 console.log("skage: " +uage);
skage = Math.round(skage);

storage.set(user?.uid+'user.skinage',skage.toString());
  return (
    <>
      <Container style={styles.contentContainer} scrollEnabled>
        <TextBold style={styles.username}> {user?.userName} </TextBold>
        <TextLight style={styles.welcome}>회원님의 진단 결과입니다!</TextLight>
        <View style={styles.statsContainer}>
          <ResultStatCard
            style={styles.statsCard}
            title="종합점수"
            content={`${averageScore || averageRecentScore}점`}
          />
          <ResultStatCard
            style={styles.statsCard}
            title="피부나이"
            content= {String(skage)+"세"}
          />
        </View>
        <TestResultsDetailsCare
          carenum= {cnum}
        />
      </Container>
      <BottomBar>
        <Button onPress={goToCustomizedSolution}>
          진단결과로 제품 추천받기
        </Button>
      </BottomBar>
    </>
  );
};
/*
<TestResultsDetailsCare carenum={5} />
      <BottomBar>
        <Button onPress={goToSummary}>진단결과</Button>
      </BottomBar>
*/
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: paddingHorizontal,
  },
  username: {
    fontSize: 18,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 30,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 10,
  },
  statsCard: {
    marginHorizontal: 5,
  },
});

export default TestResultsDetailsScreen;
