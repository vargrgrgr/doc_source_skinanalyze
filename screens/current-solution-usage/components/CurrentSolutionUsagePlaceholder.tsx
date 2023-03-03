import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import Container from '../../../components/Container';
import CurrentSolutionUsagePlaceholderItem from './CurrentSolutionUsagePlaceholderItem';

const CurrentSolutionUsagePlaceholder = () => {
  const keyExtractor = useCallback((item: number) => `${item}`, []);
  const renderItem = useCallback(
    () => <CurrentSolutionUsagePlaceholderItem />,
    [],
  );

  return (
    <Container
      contentContainerStyle={styles.contentContainer}
      flatList
      data={[...Array(8).keys()]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 15,
  },
});

export default CurrentSolutionUsagePlaceholder;
