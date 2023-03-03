import React, { memo, useState } from 'react';
import { StyleSheet, View,Dimensions  } from 'react-native';
import { useSelector } from 'react-redux';
import { MMKV } from 'react-native-mmkv'
import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import { selectAverageScore, selectUser, selectIsLoggedIn, selectTestData} from '../../../store/user';
import { selectAverageRecentTestScore } from '../../../store/test-results';
import Image from '../../../components/Image';
import ResultScoreCard from '../../../components/ResultScoreCard';
import ResultsDetails from '../../test-results/components/ResultsDetails';
import ResultStatCard from '../../../components/ResultStatCard';
import ProfileIcon from '../../../assets/icons/default-pp.svg'
const { width: viewportWidth } = Dimensions.get('window');

const MyPageStats = () => {
  const user = useSelector(selectUser);
  const islogin = useSelector(selectIsLoggedIn);
  const [averageScore, setaverageScore] = useState("");
  const [skinage, setskinage] = useState("");
  var worstval=0;
  var worsttext='';
  if(islogin){
    console.log(user!.uid);
    const storage = new MMKV()  
    const oil = storage.getNumber(user!.uid+'user.oil');
    const wrinkle = storage.getNumber(user!.uid+'user.wrinkle');
    const pigment = storage.getNumber(user!.uid+'user.pigment');
    const trouble = storage.getNumber(user!.uid+'user.trouble');
    const pore = storage.getNumber(user!.uid+'user.pore');
    const flush = storage.getNumber(user!.uid+'user.flush');
    const istest = storage.getBoolean(user!.uid+'user.istest');
    console.log("oil: "+oil);
  
    var worstname='';
    if (istest==false){
      worstname="미측정";
    }else{
      const arr = [ oil, pore, pigment, flush, wrinkle, trouble ];
      var min = arr[0];
        var minIndex = 0;
        var worstname='';
        var worstindex=0;
        
        // 최소값, 최소값의 인덱스 구하기
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
                minIndex = i;
            }
        }
        switch(minIndex){
          case 0:
            worstname="oil";
            worstindex=minIndex;
            worsttext="유수분";
          case 1:
            worstname="pore";
            worstindex=minIndex;
            worsttext="모공";
          case 2:
            worstname="pigment";
            worstindex=minIndex;
            worsttext="색소침착";
          case 3:
            worstname="flush";
            worstindex=minIndex;
            worsttext="홍조";
          case 4:
            worstname="wrinkle";
            worstindex=minIndex;
            worsttext="주름";
          case 5:
            worstname="trouble";
            worstindex=minIndex;
            worsttext="트러블";
        }
        worstval=arr[worstindex];
    }
    if(worstname=="미측정"){
      const averagescore="최근 측정 데이터가 없습니다."
      return (
        <View style={styles.container}>
          <View style={styles.sectionTop}>
            <View style={styles.image}>
            <ProfileIcon width={150} height={150} />
            </View>
            <View style={styles.statsContainer}>
              <ResultStatCard
                style={styles.marginBottom}
                title="종합점수"
                content={`${averagescore}`}
              />
              <ResultStatCard
                title="나이"
                content={user.age}
              />
            </View>
          </View>
          <ResultScoreCard 
          name={"미측정"}
          score={0}
          />
        </View>
      )
    }else{
      const averagescore=(Math.round((oil+wrinkle+pigment+pore+flush+trouble)/6)).toString();
      return (
        <View style={styles.container}>
          <View style={styles.sectionTop}>
            <View style={styles.image}>
            <ProfileIcon width={150} height={150} />
            </View>
            <View style={styles.statsContainer}>
              <ResultStatCard
                style={styles.marginBottom}
                title="종합점수"
                content={`${averagescore}`}
              />
              <ResultStatCard
                title="나이"
                content={user!.age||"미입력"}
              />
            </View>
          </View>
          <ResultScoreCard 
          name={worsttext}
          score={worstval}
          />
        </View>
      )
    }
      
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.sectionTop}>
          <View style={styles.image}>
          <ProfileIcon width={150} height={150} />
          </View>
          <View style={styles.statsContainer}>
            <ResultStatCard
              style={styles.marginBottom}
              title="종합점수"
              content={`로그인을 해주세요.`}
            />
            <ResultStatCard
              title="나이"
              content={`로그인을 해주세요.`}
            />
          </View>
        </View>
        <ResultScoreCard 
        name={"로그인을 해주세요."}
        score={0}
        />
      </View>
      
    );
  }
  
  



  
  

};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
  },
  sectionTop: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    aspectRatio: 1.2,
    marginRight: 5,
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
  },
  statsContainer: {
    marginLeft: 5,
    flex: 1,
  },
  marginBottom: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: 20,
    padding: 24,
    paddingBottom: -20,
  },
});

export default memo(MyPageStats);
