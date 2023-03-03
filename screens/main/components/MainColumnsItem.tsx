import React, { memo } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { Source } from 'react-native-fast-image';
import colors from '../../../utils/colors';
import TouchableRipple from '../../../components/TouchableRipple';
import useNavigation from '../../../hooks/useNavigation';
import { MainScreenNavigationProp } from '../../../navigators/navigation.types';
import Image from '../../../components/Image';
import Container from '../../../components/Container';
interface Props {
  uri: number | Source;
  curi: number | Source;
}

const windowWidth = Dimensions.get('window').width;


const MainColumnsItem = ({ uri, curi }: Props) => {const navigation = useNavigation<MainScreenNavigationProp>({
  lock: true,
  });
  console.log('uri'+uri+'curi'+curi)
  
  const goToColumn = () =>{

    navigation.navigate("Column", {curi});
  };
  return (
    <View style={styles.container}>
      <TouchableRipple onPress={goToColumn}>
        <Image style={styles.image} source={uri}   />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    width: '50%',
    marginTop: 10,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 5,
  },
  title: {
    marginTop: 12,
    marginBottom: 4,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});

export default memo(MainColumnsItem);
