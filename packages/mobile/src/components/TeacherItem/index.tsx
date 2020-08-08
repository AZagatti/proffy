import React, { useCallback, useState } from 'react';
import { Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiFunc from '@proffy/axios-config';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import * as S from './styles';

export interface Teacher {
  id: number;
  name: string;
  bio: string;
  cost: number;
  avatar: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = useCallback(async () => {
    const api = apiFunc('mobile');

    try {
      await api.post('connections', {
        user_id: teacher.id,
      });
      await Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    } catch (err) {
      console.log(err);
    }
  }, [teacher.whatsapp, teacher.id]);

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }
    if (isFavorited) {
      favoritesArray = favoritesArray.filter(
        (teacherItem: Teacher) => teacherItem.id !== teacher.id,
      );
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, [isFavorited, teacher]);

  return (
    <S.Container>
      <S.Profile>
        <S.Avatar source={{ uri: teacher.avatar }} />

        <S.ProfileInfo>
          <S.Name>{teacher.name}</S.Name>
          <S.Subject>{teacher.subject}</S.Subject>
        </S.ProfileInfo>
      </S.Profile>

      <S.Bio>{teacher.bio}</S.Bio>

      <S.Footer>
        <S.Price>
          Preço/hora {'   '}
          <S.PriceValue>R$ {teacher.cost}</S.PriceValue>
        </S.Price>

        <S.ButtonsContainer>
          <S.FavoriteButton
            favorited={isFavorited}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </S.FavoriteButton>

          <S.ContactButton onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <S.ContactButtonText>Entrar em contato</S.ContactButtonText>
          </S.ContactButton>
        </S.ButtonsContainer>
      </S.Footer>
    </S.Container>
  );
};

export default TeacherItem;
