import React from 'react';

import whatsappIcon from '@assets/images/icons/whatsapp.svg';

import { Container } from './styles';

const TeacherItem: React.FC = () => {
  return (
    <Container>
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/40201172?s=460&u=adaf68194a331e5c46f4213f1ff4a5a4337c5095&v=4"
          alt="azagatti"
        />
        <div>
          <strong>André Zagatti</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das
        pessoas através de experiências
      </p>

      <footer>
        <p>
          Preço/hora:
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </Container>
  );
};

export default TeacherItem;
