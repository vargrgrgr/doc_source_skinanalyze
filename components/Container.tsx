import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
  FlatList,
  FlatListProps,
  ListRenderItem,
} from 'react-native';
import { useRoute, useScrollToTop } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { updateIsTop } from '../store/common';
import colors from '../utils/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  flatList?: boolean;
  ListHeaderComponent?: Element;
  ListFooterComponent?: Element;
  ItemSeparatorComponent?: () => JSX.Element;
  data?: any[];
  keyExtractor?: (item: any, index: number) => string;
  renderItem?: ListRenderItem<any>;
}

const useResetIsTopOnUnmount = (scrollEnabled: boolean) => {
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (scrollEnabled) {
        dispatch(updateIsTop({ screen: route.name, value: true }));
      }
    },
    [],
  );
};

const Container = ({
  children,
  style,
  contentContainerStyle,
  scrollEnabled = true,
  flatList = false,
  ...rest
}: Props) => {
  const ContentComponent = scrollEnabled ? ScrollView : View;
  const dispatch = useDispatch();
  const route = useRoute();
  useResetIsTopOnUnmount(scrollEnabled || flatList);
  const scrollRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);
  useScrollToTop(scrollRef);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = nativeEvent.contentOffset.y;
    dispatch(updateIsTop({ screen: route.name, value: offset <= 0 }));
  };

  const ContentComponentProps =
    scrollEnabled || flatList
      ? {
          contentContainerStyle: [
            styles.contentContainer,
            styles.flexGrow,
            contentContainerStyle,
          ],
          onScroll,
          scrollEventThrottle: 200,
          showsVerticalScrollIndicator: false,
          ref: scrollRef,
          keyboardShouldPersistTaps: 'always' as any,
        }
      : {
          style: [styles.contentContainer, styles.flex, contentContainerStyle],
        };

  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {flatList ? (
        <FlatList
          {...ContentComponentProps}
          ref={flatListRef}
          {...(rest as FlatListProps<any>)}
        />
      ) : (
        <ContentComponent {...ContentComponentProps}>
          {children}
        </ContentComponent>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});

export default Container;
