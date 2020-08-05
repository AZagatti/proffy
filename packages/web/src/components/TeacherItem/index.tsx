import React, { useCallback } from 'react';
import api from '@proffy/axios-config';

import whatsappIcon from '@assets/images/icons/whatsapp.svg';

import { Container } from './styles';

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
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConnection = useCallback(async () => {
    try {
      await api.post('connections', { user_id: teacher.id });
    } catch (err) {
      console.log(err);
    }
  }, [teacher.id]);

  return (
    <Container>
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora:
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </Container>
  );
};

export default TeacherItem;
