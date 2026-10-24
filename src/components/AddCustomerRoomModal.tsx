import useSWR from 'swr';
import * as Yup from 'yup';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { fetchCustomers } from '../slices/CustomerFetcher';
import { format } from '../lib/date';
import { request } from '../lib/request';
import { toast } from '../lib/toast';
import type { Room } from '../types';
import FormDialog from './FormDialog';
import GlobalLoading from './GlobalLoading';
import LoadError from './LoadError';

const schema = Yup.object({
  customerId: Yup.string().required('请选择客户'),
  beginDate: Yup.date().typeError('请选择入住时间').required('请选择入住时间'),
  endDate: Yup.date()
    .typeError('请选择离开时间')
    .required('请选择离开时间')
    .test('after-start', '离开时间必须晚于入住时间', function (value) {
      return !!value && value > this.parent.beginDate;
    })
});
export default function AddCustomerRoomModal({
  room,
  onClose,
  onSuccess
}: {
  room: Room;
  onClose: () => void;
  onSuccess: () => Promise<unknown>;
}) {
  const {
    data: customers,
    error,
    isLoading,
    mutate
  } = useSWR('/api/v1/customers', fetchCustomers);
  if (isLoading || error || !customers?.length)
    return (
      <Dialog open onClose={onClose} aria-labelledby="checkin-title">
        <DialogTitle id="checkin-title">客人入住 · {room.roomname}</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <GlobalLoading />
          ) : error ? (
            <LoadError retry={mutate} />
          ) : (
            <Alert severity="info">请先在客户信息页面创建客户。</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    );
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <FormDialog
      title={`客人入住 · ${room.roomname}`}
      onClose={onClose}
      schema={schema}
      initialValues={{
        customerId: customers[0].id ?? '',
        beginDate: format(today, 'yyyy-MM-dd'),
        endDate: format(tomorrow, 'yyyy-MM-dd')
      }}
      fields={[
        {
          name: 'customerId',
          label: '客户',
          options: customers.map(customer => ({
            value: customer.id!,
            label: customer.name
          }))
        },
        { name: 'beginDate', label: '入住时间', type: 'date' },
        { name: 'endDate', label: '离开时间', type: 'date' }
      ]}
      onSubmit={async values => {
        await request({
          url: '/api/v1/customer-checkin-record',
          method: 'post',
          data: {
            ...values,
            roomId: room.id,
            beginDate: new Date(`${values.beginDate}T12:00:00`).toISOString(),
            endDate: new Date(`${values.endDate}T12:00:00`).toISOString()
          }
        });
        toast.success('入住成功');
        await onSuccess();
      }}
    />
  );
}
