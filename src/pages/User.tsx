import {
  Box,
  Button,
  Separator,
  Flex,
  Table,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import useSWR from 'swr';
import { fetchUsers } from '../slices/UserFetcher';
// import { CreateUserModal } from '@/components/CreateUserModal';
import { Loading } from '@/components/Loading';

const User: React.FC = () => {
  const { data: users, isLoading } = useSWR('api/v1/users', fetchUsers);

  const {
    open: isCreateUserModalOpen,
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
      <Separator colorScheme='gray' />
      {isLoading && <Loading />}
      {!isLoading && (
        <Box w='100%' boxShadow='md' borderWidth='1px' mt={4}>
          <Table.Root>
            <Table.Header>
              <Table.Row>        
                  <Table.ColumnHeader>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>用户名</Table.ColumnHeader>
                 
              </Table.Row>
              </Table.Header>
              <Table.Body>
                {users?.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
          </Table.Root>
        </Box>
      )}
      {/* <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
      /> */}
    </Box>
  );
};

export default User;
