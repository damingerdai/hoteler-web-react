/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

interface RouterLinkProps extends LinkProps {
  to: string,
  name: string
}

const RouterLink: React.FC<RouterLinkProps> = ({ to, name, ...rest }) => (
  <Link
    ml={4}
    as={ReactLink}
    textDecoration='none'
    cursor='pointer'
    _hover={{
      textDecoration: 'none',
    }}
    _focus={{
      boxShadow: 'none',
    }}
    to={to}
    {...rest}
  >
    {name}
  </Link>
);

export default RouterLink;
