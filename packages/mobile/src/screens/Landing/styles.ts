import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface TitleProps {
  bold?: boolean;
}

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #8257e5;
  justify-content: center;
  padding: 40px;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
`;

export const Title = styled.Text<TitleProps>`
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  margin-top: 80px;
  font-family: 'Poppins_400Regular';

  ${({ bold }) =>
    bold &&
    css`
      font-family: 'Poppins_600SemiBold';
    `};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

export const Button = styled(RectButton)<ButtonProps>`
  height: 150px;
  width: 48%;
  background-color: #333;
  border-radius: 8px;
  padding: 24px;
  justify-content: space-between;

  ${({ primary }) =>
    primary &&
    css`
      background-color: #9871f5;
    `};

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: #04d361;
    `};
`;

export const ButtonText = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 20px;
`;

export const TotalConnection = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #d4c2ff;
  font-size: 12px;
  line-height: 20px;
  max-width: 140px;
  margin-top: 40px;
`;
