import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Dimensions, View} from 'react-native';
import colors from '../../utils/colors';
import {
  selectUser, selectIsLoggedIn
} from '../../store/user';
import ResultsDetails from '../test-results/components/ResultsDetails';
import ResultsHeader from '../test-results/components/ResultsHeader';
import ResultsGraph from '../test-results/components/ResultsGraph';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import {MMKV} from 'react-native-mmkv';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  TestResultsScreenNavigationProp,
  TestResultsScreenProp,
} from '../../navigators/navigation.types';
export interface placeholderData {
  oil: number,
  wrinkle: number,
  pigment: number,
  trouble: number,
  pore: number,
  flush: number,
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PopTestResultScreen = () => {
  const storage=new MMKV()
  const user = useSelector(selectUser);
  var result: placeholderData = {
    oil: 0,
    wrinkle: 0,
    pigment: 0,
    trouble: 0,
    pore: 0,
    flush: 0,
  };
  result.oil =  storage.getNumber(user?.uid+'user.oil')||0;
  result.wrinkle =  storage.getNumber(user?.uid+'user.wrinkle')||0;
  result.pigment =  storage.getNumber(user?.uid+'user.pigment')||0;
  result.trouble =  storage.getNumber(user?.uid+'user.trouble')||0;
  result.pore =  storage.getNumber(user?.uid+'user.pore')||0;
  result.flush =  storage.getNumber(user?.uid+'user.flush')||0;
  const testdata = {
    oil: result.oil,
    wrinkle:result.wrinkle,
    pigment: result.pigment,
    pore: result.pore,
    flush: result.flush,
    trouble: result.trouble,
  }
  const getoil = (q:number, a:number)  => {


    var oilfactor = 0;
    var oilval= 0;
      console.log('age:'+a)
      console.log('skin after skincare:'+q)
      switch(q){
        case 1:
          oilfactor--;
          break
        case 2:
          break
        case 3:
          oilfactor++;
          break
        case 4:
          oilfactor++;
          oilfactor++;
          break        
        default:
          break
      }
      switch(a){
        case 1:
          oilfactor=oilfactor+4;
          break
        case 2:
          oilfactor=oilfactor+3;
          break
        case 3:
          oilfactor=oilfactor+2;
          break
        case 4:
          oilfactor=oilfactor+1;
          break         
        case 5:
          oilfactor=oilfactor+0;
          break
        case 6:
          oilfactor=oilfactor-1;
          break
        case 7:
          oilfactor=oilfactor-2;
          break
        case 8:
          oilfactor=oilfactor-3;
          break                
        default:
          break
      }
  
  
  
    switch(oilfactor){
      case -4:
        oilval=10;
        break;
      case -3:
        oilval=20;
        break;
      case -2:
        oilval=30;
        break;
      case -1:
        oilval=40;
        break;
      case 0:
        oilval=50;
        break;
      case 1:
        oilval=60;
        break;
      case 2:
        oilval=70;
        break;
      case 3:
        oilval=80;
        break;
      case 4:
        oilval=90;
        break;
      default:
        oilval = 100;
        break;
    }
    console.log("oil :" + oilval);
    return oilval;
  }
  const navigation = useNavigation<TestResultsScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate =  () => {
    console.log("button pushed")
    console.log(isLoggedIn)
    

    if (isLoggedIn) {
      console.log("go detail")
      var sksc = user?.questionnaire?.skinAfterSkincare||0
      var age = user?.questionnaire?.age||0
      var cnum=getcarenum(sksc, age);
      navigation.navigate("TestResultsDetails",  {carenum: cnum});
      
    } else {
      console.log("login ")
      navigation.navigate("Login"); 
    }
    return;
  };
  
  
  const getcarenum = (q:number, a):number => {

    var age = a;
    var carenum;
    if (result.wrinkle<50){
      carenum=50;
      return carenum-1;
    }  
    var sex;
    if(user?.questionnaire?.gender !=null){
      sex=user.questionnaire.gender;
    }else{
      console.log('qg is null');
      sex=1;
    }
    var sksc = q;
    if(sex != 2){
      switch(age){
        case 1:
          //1~3
          if(getoil(sksc, age)<50){
            carenum=2;
            return carenum-1;
          }else{
            if(result.pigment<50){
              carenum=3;
              return carenum-1;
            }else{
              carenum=1;
              return carenum-1;
            }
          }
        case 2:
          if(getoil(sksc, age)>50){
            carenum=7;
            return carenum-1;
          }else{
            if(result.pigment>=50){
              carenum=5;
              return carenum-1;
            }else if(result.flush<50){
              carenum=4;
              return carenum-1;
            }else{
              carenum=6;
              return carenum-1;
            }
          }
        case 3:
          if(getoil(sksc, age)>50){
            if(result.pigment<50){
              carenum=15;
              return carenum-1;
            }else{
              carenum=11;
              return carenum-1;
            }
          }else if(result.pigment>=50){
            if(result.flush>50){
              carenum=13;
              return carenum-1;
            }else{
              if(result.trouble>=50){
                carenum=18;
                return carenum-1;
              }else{
                carenum=14;
                return carenum-1;
              }
            }
          }else{
            if(result.trouble>=50){
              carenum=16;
              return carenum-1;
            }
          }
        case 4:
          if(result.pigment<50){
            carenum=20;
            return carenum-1;
          }else if(result.pore<50){
            carenum=22;
            return carenum-1;
          }else{
            carenum=21;
            return carenum-1;
          }
        case 5:
          if(result.pigment<50){
            carenum=24;
            return carenum-1;
          }else{
            if(result.pore<50){
              carenum=25;
              return carenum-1;
            }else if(result.trouble>=50){
              carenum=27;
              return carenum-1;
            }else{
              carenum=26;
              return carenum-1;
            }
          }
        case 6:
          if(getoil(sksc, age)<50){
            if(result.pigment<50){
              carenum=29;
              return carenum-1;
            }
            else{
              carenum=33;
             return carenum-1;
            }
          }else{
            if(result.pigment<50){
              carenum = 30;
              return carenum-1;
            }else{
              carenum = 34;
              return carenum-1;
            }
          }
        case 7:
          if(getoil(sksc, age)<50){
            carenum=38;
            return carenum-1;
          }else{
            carenum=37;
            return carenum-1;
          }
        case 8:
          carenum=40;
          return carenum-1;
        default:
          carenum = 1;
          return carenum-1;
      }
    }
    else{
      switch(age){
        case 1:
          //41~42
          if(getoil(sksc, age)<50){
            carenum=41;
            return carenum-1;
          }else{
            carenum=42;
            return carenum-1;
          }
        case 2:
        case 3:
        case 4:
          if(result.pore<50){
            carenum = 44;
            return carenum-1;
          }else{
            if(result.pigment<50){
              carenum = 45;
              return carenum-1;
            }
            else if(result.flush<50){
              carenum = 43;
              return carenum-1;
            }else{
              carenum = 46;
              return carenum-1;
            }

          }
          case 5:            
          case 6:
            if(result.pore<50){
              carenum = 47;
              return carenum-1;
            }else{
              if(result.pigment<50){
                carenum = 50;
                return carenum-1;
              }
              else if(result.flush<50){
                carenum = 48;
                return carenum-1;
              }else{
                carenum = 51;
                return carenum-1;
              }
            }
          case 7:
          case 8:
            carenum = 52;
            return carenum-1;
        default:
          carenum = 41;
          return carenum-1;
      }
    }
  }  


    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.card}>
          <ResultsHeader data={testdata} />
          <ResultsGraph data={testdata} />
            <ResultsDetails data={testdata} />
          </ScrollView>
          <BottomBar>
        { <Button onPress={navigate}>
          {'상세 측정 결과 확인'}
        </Button> }
      </BottomBar>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    image: {
        width: windowWidth,
        height: windowHeight+100,
        resizeMode: 'contain',
    },
    scrollView: {
      backgroundColor: 'pink',
    },
    text: {
      fontSize: 42,
    },
    card: {
      borderRadius: 10,
      backgroundColor: colors.backgroundSecondary,
      marginBottom: 20,
      padding: 24,
      paddingBottom: -20,
    },
});

export default PopTestResultScreen;
