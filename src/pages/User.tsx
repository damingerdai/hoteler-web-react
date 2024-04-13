import {
  Box, Button, Divider, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import * as React from 'react';
import useSWR from 'swr';
import { fetchUsers } from '../slices/UserFetcher';
import { Loading } from '@/components/Loading';

const User: React.FC = () => {
  const { data: users, isLoading } = useSWR('api/v1/users', fetchUsers);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box p={4} h='100%'>
      <Flex p={2} justifyContent='right'>
        <Button colorScheme='teal' isDisabled>
          创建用户
        </Button>
      </Flex>
      <Divider colorScheme='gray' />
      {isLoading && <Loading />}
      {!isLoading && (
        <Box
          w='100%'
          boxShadow='md'
          borderWidth='1px'
          // flexDir='row'
          // flexWrap='wrap'
          // boxSizing='border-box'
          // alignContent='center'
          // justifyContent='start'
          mt={4}
        >
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>User Name</Th>
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
    </Box>
  );
};

export default User;
