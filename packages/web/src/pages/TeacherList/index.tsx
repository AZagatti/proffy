import React, { useState, ChangeEvent, useCallback, FormEvent } from 'react';
import api from '@proffy/axios-config';

import PageHeader from '@components/PageHeader';
import TeacherItem, { Teacher } from '@components/TeacherItem';
import Select from '@components/Select';
import Input from '@components/Input';

import { Container, Main } from './styles';

const initialValues = {
  subject: '',
  week_day: '',
  time: '',
};

type ValuesEvent = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [values, setValues] = useState(initialValues);

  const onChangeValue = useCallback(
    (name: string, e: ChangeEvent<ValuesEvent>) => {
      const { value } = e.target;
      setValues(state => ({ ...state, [name]: value }));
    },
    [],
  );

  const handleSearchTeachers = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const { data } = await api.get('classes', {
          params: {
            ...values,
          },
        });

        setTeachers(data);
      } catch (err) {
        console.log(err);
      }
    },
    [values],
  );

  return (
    <Container className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={values.subject}
            onChange={e => onChangeValue('subject', e)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Artes' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Física', label: 'Física' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={values.week_day}
            onChange={e => onChangeValue('week_day', e)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={values.time}
            onChange={e => onChangeValue('time', e)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <Main>
        {teachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </Main>
    </Container>
  );
};

export default TeacherList;
