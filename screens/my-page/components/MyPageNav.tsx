import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { MyPageScreenNavigationProp } from '../../../navigators/navigation.types';
import { onLoading, onLoadingEnd } from '../../../store/common';
import { onLogout } from '../../../store/user';
import { sleep } from '../../../utils/utils';
import Hr from '../../../components/Hr';
import MyPageNavItem from './MyPageNavItem';

const MyPageNav = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<MyPageScreenNavigationProp>();

  const logout = async () => {
    dispatch(onLoading());
    await sleep(500);
    dispatch(onLogout());
    dispatch(onLoadingEnd());
    navigation.replace('BottomTabNavigator', { screen: 'Main' });
  };

  const navigate = (screen: 'CurrentSolutionUsage') =>
    navigation.navigate(screen);

  return (
    <>
      <MyPageNavItem>이전 진단 이력</MyPageNavItem>
      <Hr />
      <MyPageNavItem onPress={() => navigate('CurrentSolutionUsage')}>
        현재의 솔루션과 사용량
      </MyPageNavItem>
      <Hr />
      <MyPageNavItem>나의 솔루션 구매 이력</MyPageNavItem>
      <Hr />
      <MyPageNavItem>주문 배송 현황</MyPageNavItem>
      <Hr />
      <MyPageNavItem>나의 마일리지</MyPageNavItem>
      <Hr />
      <MyPageNavItem onPress={logout}>로그아웃</MyPageNavItem>
    </>
  );
};

export default memo(MyPageNav);
