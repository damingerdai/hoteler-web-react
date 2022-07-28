import React from 'react';
import { Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

interface RouterLinkProps {
  to: string,
  name: string
}

const RouterLink: React.FC<RouterLinkProps> = ({ to, name }) => (
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
  >
    {name}
  </Link>
);

export default RouterLink;
