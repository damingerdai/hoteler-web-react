import {
  Box,
  Button,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import useSWR from 'swr';
import { fetchUsers } from '../slices/UserFetcher';
import { CreateUserModal } from '@/components/CreateUserModal';
import { Loading } from '@/components/Loading';

const User: React.FC = () => {
  const { data: users, isLoading } = useSWR('api/v1/users', fetchUsers);

  const {
    isOpen: isCreateUserModalOpen,
    onOpen: onCreateUserModalOpen,
    onClose: onCreateUserModalClose,
  } = useDisclosure();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box p={4} h='100%'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' onClick={onCreateUserModalOpen}>
          创建用户
        </Button>
      </Flex>
      <Divider colorScheme='gray' />
      {isLoading && <Loading />}
      {!isLoading && (
        <Box w='100%' boxShadow='md' borderWidth='1px' mt={4}>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>用户名</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.username}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
      />
    </Box>
  );
};

export default User;
