import React, { useState, useCallback } from 'react';
import apiFunc from '@proffy/axios-config';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import * as S from './styles';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [values, setValues] = useState({
    subject: '',
    week_day: '',
    time: '',
  });

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(state => !state);
  }, []);

  const onChangeValue = useCallback((name: string, text: string) => {
    setValues(state => ({ ...state, [name]: text }));
  }, []);

  const loadFavorites = useCallback(async () => {
    const res = await AsyncStorage.getItem('favorites');
    if (res) {
      const favoritedTeachers = JSON.parse(res);
      setFavorites(favoritedTeachers.map((teacher: Teacher) => teacher.id));
    }
  }, []);

  const handleFiltersSubmit = useCallback(async () => {
    try {
      loadFavorites();
      const api = apiFunc('mobile');
      const { data } = await api.get('classes', {
        params: {
          ...values,
        },
      });

      setTeachers(data);
      setIsFiltersVisible(false);
    } catch (err) {
      console.log(err);
    }
  }, [values, loadFavorites]);

  useFocusEffect(() => {
    loadFavorites();
  });

  const headerRight = (
    <BorderlessButton onPress={handleToggleFiltersVisible}>
      <Feather name="filter" size={20} color="#FFF" />
    </BorderlessButton>
  );

  return (
    <S.Container>
      <PageHeader title="Proffys disponíveis" headerRight={headerRight}>
        {isFiltersVisible && (
          <S.SearchForm>
            <S.Label>Matéria</S.Label>
            <S.Input
              value={values.subject}
              onChangeText={t => onChangeValue('subject', t)}
              placeholder="Qual a matéria?"
            />

            <S.InputGroup>
              <S.InputBlock>
                <S.Label>Dia da semana</S.Label>
                <S.Input
                  value={values.week_day}
                  onChangeText={t => onChangeValue('week_day', t)}
                  placeholder="Qual o dia?"
                />
              </S.InputBlock>

              <S.InputBlock>
                <S.Label>Horário</S.Label>
                <S.Input
                  value={values.time}
                  onChangeText={t => onChangeValue('time', t)}
                  placeholder="Qual o horário?"
                />
              </S.InputBlock>
            </S.InputGroup>

            <S.SubmitButton onPress={handleFiltersSubmit}>
              <S.SubmitButtonText>Filtrar</S.SubmitButtonText>
            </S.SubmitButton>
          </S.SearchForm>
        )}
      </PageHeader>

      <S.TeacherListView>
        {teachers.map(teacher => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </S.TeacherListView>
    </S.Container>
  );
};

export default TeacherList;
