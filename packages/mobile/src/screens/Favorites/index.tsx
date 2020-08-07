import React from 'react';

import PageHeader from '../../components/PageHeader';

import * as S from './styles';

const Favorites: React.FC = () => {
  return (
    <S.Container>
      <PageHeader title="Meus proffys favoritos" />
    </S.Container>
  );
};

export default Favorites;
