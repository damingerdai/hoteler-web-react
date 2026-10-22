import { Box, Paper, Typography, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';
import useSWR from 'swr';
import { request } from '../lib/request';
import type {
  DataResponse,
  PastWeekCustomerCounts,
  RoomStatusDonut
} from '../types';
import GlobalLoading from '../components/GlobalLoading';
import LoadError from '../components/LoadError';
export default function Dashboard() {
  const theme = useTheme();
  const rooms = useSWR('/api/v1/stat/rooms/nums', () =>
    request<DataResponse<RoomStatusDonut>>({ url: '/api/v1/stat/rooms/nums' })
  );
  const customers = useSWR('/api/v1/stat/customers/counts', () =>
    request<DataResponse<{ pastWeekCustomerCounts: PastWeekCustomerCounts }>>({
      url: '/api/v1/stat/customers/counts'
    })
  );
  const roomData = rooms.data?.data;
  const counts = customers.data?.data.pastWeekCustomerCounts || [];
  const chartTheme = { mode: theme.palette.mode };
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        仪表盘
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3
        }}
      >
        <Paper sx={{ p: 2, minWidth: 0 }}>
          <Typography component="h2" variant="h6">
            房间状态统计
          </Typography>
          {rooms.isLoading ? (
            <GlobalLoading />
          ) : rooms.error ? (
            <LoadError retry={rooms.mutate} />
          ) : (
            <Chart
              type="donut"
              height={320}
              series={[roomData?.inUseNums || 0, roomData?.notUsedNums || 0]}
              options={{
                theme: chartTheme,
                chart: { background: 'transparent' },
                labels: ['占用', '空闲'],
                noData: { text: '暂无数据' },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: { show: true, label: '房间总数' }
                      }
                    }
                  }
                }
              }}
            />
          )}
        </Paper>
        <Paper sx={{ p: 2, minWidth: 0 }}>
          <Typography component="h2" variant="h6">
            过去一周的入住客户数量变化
          </Typography>
          {customers.isLoading ? (
            <GlobalLoading />
          ) : customers.error ? (
            <LoadError retry={customers.mutate} />
          ) : (
            <Chart
              type="line"
              height={320}
              series={[
                {
                  name: '入住客户数量',
                  data: counts.map(item => item.customerCount)
                }
              ]}
              options={{
                theme: chartTheme,
                chart: { background: 'transparent', toolbar: { show: false } },
                xaxis: { categories: counts.map(item => item.checkInDate) },
                noData: { text: '暂无数据' }
              }}
            />
          )}
        </Paper>
      </Box>
    </>
  );
}
