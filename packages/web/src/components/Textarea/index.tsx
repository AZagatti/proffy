import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ name, label, ...rest }) => {
  return (
    <Container className="textarea-block">
      <label htmlFor={name}>
        {label}
        <textarea id={name} {...rest} />
      </label>
    </Container>
  );
};

export default TextArea;
