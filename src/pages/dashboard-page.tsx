import { Box, Paper, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import useSWR from 'swr';
import { request } from '../lib/request';
import type {
  DataResponse,
  PastWeekCustomerCounts,
  RoomStatusDonut
} from '../types';
import GlobalLoading from '../components/global-loading';
import LoadError from '../components/load-error';
import PageHeader from '../components/page-jeader';
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
  const paperSx = {
    p: 3,
    minWidth: 0,
    borderRadius: 3,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`
  };
  return (
    <>
      <PageHeader title="仪表盘" />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3
        }}
      >
        <Paper elevation={0} sx={paperSx}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ fontWeight: 600, mb: 1 }}
          >
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
                colors: ['#5330bc', '#c4b5fd'],
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
        <Paper elevation={0} sx={paperSx}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ fontWeight: 600, mb: 1 }}
          >
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
                colors: ['#7B1FA1'],
                stroke: { curve: 'smooth', width: 3 },
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
