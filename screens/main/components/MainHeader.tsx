import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { MainScreenNavigationProp } from '../../../navigators/navigation.types';
import { selectIsLoggedIn } from '../../../store/user';
import BagIcon from '../../../assets/icons/bag.svg';
import Header from '../../../components/Header';
import Logo from '../../../assets/icons/logo.svg';
import MenuIcon from '../../../assets/icons/menu.svg';
import TouchableRipple from '../../../components/TouchableRipple';

const MainHeader = (props: BottomTabHeaderProps) => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const goToProfile = () => {
    if (isLoggedIn) {
      navigation.navigate('BottomTabNavigator', { screen: 'MyPage' });
    } else {
      navigation.navigate('Login');
    }
  };

  const goToShopping = () => navigation.navigate('Shopping');

  return (
    <Header style={styles.mainHeader} {...props}>
      <TouchableRipple style={styles.button} onPress={goToProfile}>
        <MenuIcon />
      </TouchableRipple>
      <Logo />
      <TouchableRipple style={styles.button} onPress={goToShopping}>
        <BagIcon />
      </TouchableRipple>
    </Header>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainHeader;
