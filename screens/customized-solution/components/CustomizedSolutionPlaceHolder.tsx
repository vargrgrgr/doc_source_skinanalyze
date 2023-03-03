import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import Container from '../../../components/Container';
import CustomizedSolutionHeader from './CustomizedSolutionHeader';
import CustomizedSolutionItemPlaceholder from './CustomizedSolutionItemPlaceholder';

interface Props {
  carenum: number;
}

const CustomizedSolutionPlaceHolder = (props: Props) => {
  const keyExtractor = useCallback((item: number) => `${item}`, []);
  const renderItem = useCallback(
    () => <CustomizedSolutionItemPlaceholder />,
    [],
  );

  return (
    <Container
      flatList
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={<CustomizedSolutionHeader carenum={props.carenum} />}
      data={[...Array(9).keys()]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 5,
  },
});

export default CustomizedSolutionPlaceHolder;
