import { useState } from 'react';
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import useSWR from 'swr';
import * as Yup from 'yup';
import { fetchUsers } from '../slices/UserFetcher';
import { request } from '../lib/request';
import { toast } from '../lib/toast';
import FormDialog from '../components/FormDialog';
import PageHeader from '../components/PageHeader';
import GlobalLoading from '../components/GlobalLoading';
import LoadError from '../components/LoadError';
const schema = Yup.object({
  username: Yup.string().trim().required('请输入用户名'),
  password: Yup.string().required('请输入密码')
});
export default function User() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/v1/users',
    fetchUsers
  );
  const [creating, setCreating] = useState(false);
  return (
    <>
      <PageHeader
        title="用户管理"
        action="创建用户"
        onCreate={() => setCreating(true)}
      />
      {isLoading && <GlobalLoading />}
      {error && <LoadError retry={mutate} />}
      {data?.length === 0 && <Alert severity="info">暂无用户。</Alert>}
      {!!data?.length && (
        <TableContainer component={Paper}>
          <Table aria-label="用户列表">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>用户名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {creating && (
        <FormDialog
          title="创建用户"
          initialValues={{ username: '', password: '' }}
          schema={schema}
          fields={[
            { name: 'username', label: '用户名' },
            { name: 'password', label: '密码', type: 'password' }
          ]}
          onClose={() => setCreating(false)}
          onSubmit={async values => {
            await request({
              url: '/api/v1/user',
              method: 'post',
              data: values
            });
            toast.success('创建用户成功');
            await mutate();
          }}
        />
      )}
    </>
  );
}
