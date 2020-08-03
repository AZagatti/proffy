import React from 'react';

import PageHeader from '@components/PageHeader';
import TeacherItem from '@components/TeacherItem';

import { Container, Main } from './styles';

const TeacherList: React.FC = () => {
  return (
    <Container className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">
              Matéria
              <input type="text" id="subject" />
            </label>
          </div>
          <div className="input-block">
            <label htmlFor="week_day">
              Dia da semana
              <input type="text" id="week_day" />
            </label>
          </div>
          <div className="input-block">
            <label htmlFor="time">
              Hora
              <input type="text" id="time" />
            </label>
          </div>
        </form>
      </PageHeader>

      <Main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </Main>
    </Container>
  );
};

export default TeacherList;
