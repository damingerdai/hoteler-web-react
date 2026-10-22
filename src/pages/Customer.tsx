import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material';
import useSWR from 'swr';
import * as Yup from 'yup';
import { fetchCustomers } from '../slices/CustomerFetcher';
import type { Customer as CustomerType } from '../types';
import { request } from '../lib/request';
import { toast } from '../lib/toast';
import FormDialog from '../components/FormDialog';
import ConfirmModal from '../components/ConfirmModal';
import PageHeader from '../components/PageHeader';
import GlobalLoading from '../components/GlobalLoading';
import LoadError from '../components/LoadError';

const schema = Yup.object({
  name: Yup.string().trim().required('请输入客户名字'),
  gender: Yup.string().oneOf(['M', 'F', 'N']).required('请选择性别'),
  cardId: Yup.string().trim().required('请输入身份证号码'),
  phone: Yup.string().trim().required('请输入联系方式')
});
export default function Customer() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/v1/customers',
    fetchCustomers
  );
  const [editing, setEditing] = useState<CustomerType | 'new' | null>(null);
  const [deleting, setDeleting] = useState<CustomerType | null>(null);
  return (
    <>
      <PageHeader
        title="客户信息"
        action="创建客户"
        onCreate={() => setEditing('new')}
      />
      {isLoading && <GlobalLoading />}
      {error && <LoadError retry={mutate} />}
      {data?.length === 0 && (
        <Alert severity="info">暂无客户，请创建客户。</Alert>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {data?.map(customer => (
          <Card key={customer.id} variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 2, alignItems: 'center' }}
              >
                <Avatar>{customer.name.slice(0, 1)}</Avatar>
                <Typography variant="h6">{customer.name}</Typography>
                <Chip
                  size="small"
                  label={{ M: '男', F: '女', N: '未知' }[customer.gender]}
                />
              </Stack>
              <Typography>手机号码：{customer.phone}</Typography>
              <Typography sx={{ overflowWrap: 'anywhere' }}>
                身份证：{customer.cardId}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => setEditing(customer)}>修改</Button>
              <Button color="error" onClick={() => setDeleting(customer)}>
                删除
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      {editing && (
        <FormDialog
          title={editing === 'new' ? '创建客户' : '修改客户'}
          schema={schema}
          initialValues={
            editing === 'new'
              ? { name: '', gender: 'M', phone: '', cardId: '' }
              : { ...editing, phone: String(editing.phone) }
          }
          fields={[
            { name: 'name', label: '客户名字' },
            {
              name: 'gender',
              label: '性别',
              options: [
                { value: 'M', label: '男' },
                { value: 'F', label: '女' },
                { value: 'N', label: '未知' }
              ]
            },
            { name: 'phone', label: '手机号码', type: 'tel' },
            { name: 'cardId', label: '身份证号码' }
          ]}
          onClose={() => setEditing(null)}
          onSubmit={async values => {
            await request({
              url: '/api/v1/customer',
              method: editing === 'new' ? 'post' : 'put',
              data: values
            });
            toast.success('保存客户成功');
            await mutate();
          }}
        />
      )}
      {deleting && (
        <ConfirmModal
          name={deleting.name}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await request({
              url: `/api/v1/customer/${deleting.id}`,
              method: 'delete'
            });
            toast.success('删除客户成功');
            await mutate();
          }}
        />
      )}
    </>
  );
}
