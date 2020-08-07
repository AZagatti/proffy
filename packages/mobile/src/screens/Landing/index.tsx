import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, [navigate]);

  const handleNavigateToStudyPage = useCallback(() => {
    navigate('Study');
  }, [navigate]);

  return (
    <S.Container>
      <S.Banner source={landingImg} />

      <S.Title>
        Seja bem-vindo, {'\n'}
        <S.Title bold>O que deseja fazer?</S.Title>
      </S.Title>

      <S.ButtonsContainer>
        <S.Button primary onPress={handleNavigateToStudyPage}>
          <Image source={studyIcon} />
          <S.ButtonText>Estudar</S.ButtonText>
        </S.Button>

        <S.Button secondary onPress={handleNavigateToGiveClassesPage}>
          <Image source={giveClassesIcon} />
          <S.ButtonText>Dar aulas</S.ButtonText>
        </S.Button>
      </S.ButtonsContainer>

      <S.TotalConnection>
        Total de 285 conexões já realizadas <Image source={heartIcon} />
      </S.TotalConnection>
    </S.Container>
  );
};

export default Landing;
