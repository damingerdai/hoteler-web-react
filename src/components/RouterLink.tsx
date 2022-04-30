import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const RouterLink = ({ to, name }: { to: string, name: string }) => (
  <Link
    ml={2}
    as={ReactLink}
    textDecoration='none'
    minW='64px'
    cursor='pointer'
    _hover={{
      textDecoration: 'none',
    }}
    to={to}
  >
    {name}
  </Link>
);

export default RouterLink;
