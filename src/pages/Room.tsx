import { useState } from 'react';
import {
  Alert,
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
import { fetchRooms } from '../slices/RoomFetcher';
import type { Room as RoomType } from '../types';
import { request } from '../lib/request';
import { toast } from '../lib/toast';
import FormDialog from '../components/FormDialog';
import ConfirmModal from '../components/ConfirmModal';
import AddCustomerRoomModal from '../components/AddCustomerRoomModal';
import PageHeader from '../components/PageHeader';
import GlobalLoading from '../components/GlobalLoading';
import LoadError from '../components/LoadError';
const schema = Yup.object({
  roomname: Yup.string().trim().required('请输入房间名字'),
  price: Yup.number()
    .typeError('请输入房间价格')
    .min(1, '价格至少为 1')
    .required('请输入房间价格')
});
export default function Room() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/v1/rooms',
    fetchRooms
  );
  const [editing, setEditing] = useState<RoomType | 'new' | null>(null);
  const [deleting, setDeleting] = useState<RoomType | null>(null);
  const [checkin, setCheckin] = useState<RoomType | null>(null);
  return (
    <>
      <PageHeader
        title="房间信息"
        action="创建房间"
        onCreate={() => setEditing('new')}
      />
      {isLoading && <GlobalLoading />}
      {error && <LoadError retry={mutate} />}
      {data?.length === 0 && (
        <Alert severity="info">暂无房间，请创建房间。</Alert>
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
        {data?.map(room => (
          <Card key={room.id} variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Typography variant="h6">{room.roomname}</Typography>
                <Chip
                  size="small"
                  color={room.status === 1 ? 'success' : 'default'}
                  label={
                    room.status === 1
                      ? '空闲'
                      : room.status === 2
                      ? '占用'
                      : '未知'
                  }
                />
              </Stack>
              <Typography sx={{ mt: 2 }}>¥ {room.price} / 晚</Typography>
            </CardContent>
            <CardActions>
              <Button
                disabled={room.status !== 1}
                onClick={() => setCheckin(room)}
              >
                入住
              </Button>
              <Button onClick={() => setEditing(room)}>修改</Button>
              <Button color="error" onClick={() => setDeleting(room)}>
                删除
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      {editing && (
        <FormDialog
          title={editing === 'new' ? '创建房间' : '修改房间'}
          schema={schema}
          initialValues={
            editing === 'new' ? { roomname: '', price: 200 } : { ...editing }
          }
          fields={[
            { name: 'roomname', label: '房间名字' },
            { name: 'price', label: '房间价格', type: 'number' }
          ]}
          onClose={() => setEditing(null)}
          onSubmit={async values => {
            await request({
              url: '/api/v1/room',
              method: editing === 'new' ? 'post' : 'put',
              data: { ...values, price: Number(values.price) }
            });
            toast.success('保存房间成功');
            await mutate();
          }}
        />
      )}
      {deleting && (
        <ConfirmModal
          name={deleting.roomname}
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            await request({
              url: `/api/v1/room/${deleting.id}`,
              method: 'delete'
            });
            toast.success('删除房间成功');
            await mutate();
          }}
        />
      )}
      {checkin && (
        <AddCustomerRoomModal
          room={checkin}
          onClose={() => setCheckin(null)}
          onSuccess={mutate}
        />
      )}
    </>
  );
}
