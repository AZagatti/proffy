import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <Container className="input-block">
      <label htmlFor={name}>
        {label}
        <input type="text" data-testid={name} id={name} {...rest} />
      </label>
    </Container>
  );
};

export default Input;
