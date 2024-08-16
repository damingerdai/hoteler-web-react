import {
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { IconType } from 'react-icons/lib';

interface NavItemProps extends FlexProps {
  icon?: IconType;
  path?: string;
}

const NavItem: React.FC<React.PropsWithChildren<NavItemProps>> = ({
  icon,
  path,
  children,
  ...rest
}) => {
  const hoverColor = useColorModeValue('black', 'white');

  return (
    <Link
      href={path ?? '/'}
      textDecoration='none'
      cursor='pointer'
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Flex
        align='center'
        p='3'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          color: hoverColor,
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{ color: hoverColor }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
