import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import RadarChart from '../../../components/RadarChart';

const ResultsGraph = ({ data }: { data?: { [key: string]: number } }) => {
  const radarData = [
    { label: '주름', name: 'wrinkle' },
    { label: '색소', name: 'pigment' },
    { label: '트러블', name: 'trouble' },
    { label: '모공', name: 'pore' },
    { label: '홍조', name: 'flush' },
    { label: '유수분', name: 'oil' },
  ].map(({ label, name }) => ({ label, value: data?.[name] || 0 }));

  return (
    <View style={styles.container}>
      <RadarChart radarData={radarData} viewBoxSize={152} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 58,
    paddingBottom: 83,
  },
});

export default memo(ResultsGraph);
