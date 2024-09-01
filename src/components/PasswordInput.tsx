/* eslint-disable react/jsx-props-no-spreading */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  IconButton, Input, InputGroup, InputProps, InputRightElement,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';

export const PasswordInput: React.FC<Exclude<InputProps, 'type'>> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement>
        <IconButton
          background='transparent'
          aria-label='switch password mode'
          icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
          _hover={{ background: 'transparent' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPassword(!showPassword);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};
