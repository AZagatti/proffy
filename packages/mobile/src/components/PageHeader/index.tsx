import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import * as S from './styles';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { navigate } = useNavigation();

  const handleGoBack = useCallback(() => {
    navigate('Landing');
  }, [navigate]);

  return (
    <S.Container>
      <S.TopBar>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </S.TopBar>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default PageHeader;
