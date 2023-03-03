import React, { useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, Dimensions} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { Source } from 'react-native-fast-image';
import {
  ColumnScreenNavigationProp,
  ColumnScreenProp,
} from '../../navigators/navigation.types';
import Image from '../../components/Image';
import { partialDeepEqual } from 'react-query/types/core/utils';



type Column = {
    curi: number | Source;
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ColumnScreen = () => {
    const params = useRoute<ColumnScreenProp>().params;
    const URI = params.curi;
    console.log('URI');
    console.log(URI);
    console.log(URI);
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Image style={styles.image} source={URI}  />
        </ScrollView>
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
        transform: [{ scale: 1 }],
        resizeMode: 'contain',
    },
    scrollView: {
      backgroundColor: 'pink',
    },
    text: {
      fontSize: 42,
    },
});

export default ColumnScreen;
