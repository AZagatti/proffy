import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@proffy/axios-config';

import logoImg from '@assets/images/logo.svg';
import landingImg from '@assets/images/landing.svg';

import studyIcon from '@assets/images/icons/study.svg';
import giveClassesIcon from '@assets/images/icons/give-classes.svg';
import purpleHeartIcon from '@assets/images/icons/purple-heart.svg';

import { Container, ButtonsContainer } from './styles';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('connections');

        setTotalConnections(data.total);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
        <ButtonsContainer>
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </ButtonsContainer>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{' '}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </Container>
  );
};

export default Landing;
