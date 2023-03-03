import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, InteractionManager } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv'


import colors from '../../utils/colors';
import {
  onTestResultsDone,
  selectRecentTestResults,
} from '../../store/test-results';
import { paddingHorizontal } from '../../utils/utils';
import { selectIsLoggedIn, selectUser } from '../../store/user';
import {
  TestResultsScreenNavigationProp,
  TestResultsScreenProp,
} from '../../navigators/navigation.types';
import useLoading from '../../hooks/useLoading';
import BottomBar from '../../components/BottomBar';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ResultsDetails from './components/ResultsDetails';
import ResultsGraph from './components/ResultsGraph';
import ResultsHeader from './components/ResultsHeader';
import ResultItem from './components/ResultItem';

const placeholderData = {
  oil: 0,
  wrinkle: 0,
  pigment: 0,
  trouble: 0,
  pore: 0,
  flush: 0,
};

const result = {
  oil: 0,
  wrinkle: 0,
  pigment: 0,
  trouble: 0,
  pore: 0,
  flush: 0,
};


const useTestResults = () => {
  const { result, result2, photo } = useRoute<TestResultsScreenProp>().params || {};
  const dispatch = useDispatch();
  const recentResults = useSelector(selectRecentTestResults);
  const user = useSelector(selectUser);
  var age =0;
  var sksc =0;
  var goil =0;
  return useQuery(
    ['testResults', photo],
    async () => {
      if (!photo) {
        return recentResults || placeholderData;
      }
      
      if(user!=null){
        if(user.questionnaire != null){
          age=user.questionnaire.age||0
          sksc=user.questionnaire.skinAfterSkincare||0
        }else{
          age=3
          sksc=3
        }
      }
      

      const { data } = await new Promise<{ data: { [key: string]: number } }>(
        (resolve) => {
          goil = getoil(sksc, age);
          setTimeout(() => {
            const testedResults = {
              oil: goil,
              wrinkle: result.wrinkle,
              pigment: result.pigment,
              trouble: result.trouble,
              pore: result.pore,
              flush: result.flush,
            };

            dispatch(onTestResultsDone(testedResults));
            resolve({ data: testedResults });
          }, 2000);
        },
      );
      //console.log(useSelector(selectRecentTestResults));
      //console.log(useSelector(useTestResults));
      return data;
    },
    { placeholderData, cacheTime: 0 },
  );
};
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

/*
oil: Math.floor(100),
wrinkle: Math.floor(40+((Math.random()) * 20)),
pigment: Math.floor(40+ (Math.random() * 20)),
trouble: Math.floor(40+ (Math.random() * 20)),
pore: Math.floor(40+ (Math.random() * 20)),
flush: Math.floor(40+ ((Math.random()) * 20)),
*/
const TestResultsScreen = () => {
  const { result } = useRoute<TestResultsScreenProp>().params || {};
  const { result2 } = useRoute<TestResultsScreenProp>().params || {};
  const { data, isFetching } = useTestResults();
  //const [isloading, setisloading] = useState(false);
  useLoading(isFetching);
  const navigation = useNavigation<TestResultsScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user =  useSelector(selectUser);
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
  

  /*
  inside container
          <View style={styles.resultsContainer}>
          <Canvas ref={handleCanvas}
          style={{borderWidth: 0, borderColor: 'black',
          transform: [
            { rotateX: "0deg" },
            { rotateY: "180deg" },
            { rotateZ: "0deg" },
            { translateX: 264 }
          ]
        }}
        />
  */
        const storage = new MMKV();
        storage.set(user?.uid+'user.flush', result.flush);
        storage.set(user?.uid+'user.pigment', result.pigment);
        storage.set(user?.uid+'user.trouble', result.trouble);
        storage.set(user?.uid+'user.pore', result.pore);
        storage.set(user?.uid+'user.wrinkle', result.wrinkle);
        storage.set(user?.uid+'user.oil', getoil(user?.questionnaire?.skinAfterSkincare||0, user?.questionnaire?.age||0));
        storage.set(user?.uid+'user.istest',true);

  return (
    <>
      <Container scrollEnabled contentContainerStyle={styles.contentContainer}>
       <View style={styles.resultsContainer}>
          <ResultsHeader data={data} />
          <ResultsGraph data={data} />
          <ResultsDetails data={data} results={{
    oil: getoil(user?.questionnaire?.skinAfterSkincare||0, user?.questionnaire?.age||0),
    wrinkle: result2.wrinkle,
    pigment: result2.pigment,
    trouble: result2.trouble,
    pore: result2.pore,
    flush: result2.flush,
  }} />
        </View>
      </Container>
      <BottomBar>
        { <Button onPress={navigate}>
          {'상세 측정 결과 확인'}
        </Button> }
      </BottomBar>
    </>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    paddingHorizontal,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.backgroundSecondary,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  face: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'red'
  },
  header: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    backgroundColor: colors.backgroundSecondary,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});

export default TestResultsScreen;
