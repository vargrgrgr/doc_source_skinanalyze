import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import FlareIcon from '../../../assets/icons/flare.svg';
import HappyFace from '../../../assets/icons/emoticon-happy.svg';
import NeutralFace from '../../../assets/icons/emoticon-neutral.svg';
import ResultBar from '../../../components/ResultBar';
import SadFace from '../../../assets/icons/emoticon-sad.svg';
import SkinAcneIcon from '../../../assets/icons/skin-acne.svg';
import SkinHairIcon from '../../../assets/icons/skin-hair.svg';
import StripesIcon from '../../../assets/icons/stripes.svg';
import TextBold from '../../../components/TextBold';
import WaterThirdIcon from '../../../assets/icons/water-third-white.svg';
import WavesIcon from '../../../assets/icons/waves.svg';
import ResultItem from './ResultItem';

const resultsLabel = [

  { label: '주름', name: 'wrinkle', icon: WavesIcon },
  { label: '색소', name: 'pigment', icon: FlareIcon },
  { label: '트러블', name: 'trouble', icon: SkinAcneIcon },
  { label: '모공', name: 'pore', icon: SkinHairIcon },
  { label: '홍조', name: 'flush', icon: StripesIcon },
  { label: '유수분', name: 'oil', icon: WaterThirdIcon },
];


const ResultsDetails = ({
  data, results
}: {
  data?: { [key: string]: number } | null;
  results?: {
    oil: number,
    wrinkle: number,
    pigment: number,
    trouble: number,
    pore: number,
    flush: number,
  } | null;
}) => {
  const getResult = ({
    label,
    name,
    icon,
    value,
  }: {
    label: string;
    name: string;
    icon: FC<SvgProps>;
    value: number;
  }) => {
    const Icon = icon;
    var desc=value;
    if(results!=null){
      switch(name){
        case 'oil': 
        desc=value;
          break;
        case 'pigment':
          desc=results.pigment;
          break;
        case 'trouble':
          desc=results.trouble;
          break;
        case 'pore':
          desc=results.pore;
          break;
        case 'wrinkle':
          desc=results.wrinkle;
          break;
        case 'flush':
          desc=results.flush;
          break;
      } 
    }

      return (

        <View key={name} style={styles.resultContainer}>
          <View style={styles.resultNameContainer}>
            <Icon fill={colors.text} />
            <TextBold>{label}</TextBold>
          </View>
          <View style={styles.tempContainer}>
            <View style={styles.resultBarContainer}>
              <View style={styles.facesContainer}>
                <SadFace fill={colors.icon} />
                <NeutralFace fill={colors.icon} />
                <HappyFace fill={colors.icon} />
              </View>
              <ResultBar value={value} />
            </View>
            <View style={styles.resultBarContainer}>
              <ResultItem name={name} value={desc} score={value} />
            </View>
          </View>
        </View>
      );
    

  };

  if (!data) {
    return null;
  }

  return (
    <View>
      {resultsLabel.map((r, i) =>
        getResult({ ...r, value: data?.[r.name] || 0 }),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  resultNameContainer: {
    width: 60,
    marginTop: -6,
    marginLeft: -8,
    paddingRight: 8,
    alignItems: 'center',
  },
  resultBarContainer: {
    width: 220,
    flex: 1,
  },
  facesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default memo(ResultsDetails);
