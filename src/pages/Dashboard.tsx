/* eslint-disable spaced-comment */
import { Box, Flex } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import { ProtectRoute } from '../components/ProtectRoute';
import { useAppDispatch, useAppSelector } from '../lib/reduxHooks';
import { fecthRoomStatusDonut, fetchPastWeekCustomerCounts } from '../slices/StatSlice';

const DefaultRoomStatusDonutOption: ApexOptions = {
  title: {
    text: '房间状态统计',
  },
  labels: ['占用', '空闲'],
  chart: {
    id: 'roomStatusDonutChart',
    type: 'donut',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
  series: [],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
          },
        },
      },
    },
  },
};

const DefaultPastWeekCustomerCountOption: ApexOptions = {
  title: {
    text: '房间状态统计',
  },
  chart: {
    id: 'pastWeekCustomerCountChart',
    type: 'line',
  },
  series: [],
};

const Dashboard = () => {
  const dispath = useAppDispatch();
  const [roomStatusDonutOption, setRoomStatusDonutOption] = useState(DefaultRoomStatusDonutOption);
  // eslint-disable-next-line max-len
  const [pastWeekCustomerCountOption, setPastWeekCustomerCountOption] = useState(DefaultPastWeekCustomerCountOption);
  const { roomStatusDonut, pastWeekCustomerCounts } = useAppSelector((state) => state.stat);

  useEffect(() => {
    Promise.all([dispath(fecthRoomStatusDonut()), dispath(fetchPastWeekCustomerCounts())]);
  }, []);

  useEffect(() => {
    if (roomStatusDonut.totalNums) {
      setRoomStatusDonutOption({
        ...roomStatusDonutOption,
        series: [roomStatusDonut.inUseNums, roomStatusDonut.notUsedNums],
      });
    }
  }, [roomStatusDonut]);

  useEffect(() => {
    if (pastWeekCustomerCounts && pastWeekCustomerCounts.length > 0) {
      setPastWeekCustomerCountOption({
        ...pastWeekCustomerCountOption,
        series: [{
          name: '入住客户数量',
          data: pastWeekCustomerCounts.map((pwcc) => pwcc.customerCount),
        }],
        xaxis: {
          categories: pastWeekCustomerCounts.map((pwcc) => pwcc.checkInDate),
        },
      });
    }
  }, [pastWeekCustomerCounts]);

  return (
    <Box m={2}>
      <Flex
        flexDir={{ base: 'column', sm: 'row' }}
        alignItems='stretch'
        justifyContent='center'
        width='100%'
        m={2}
        mt={4}
      >
        <Box w={{ base: '100', sm: '50%' }} boxShadow='xs' m={2} p={2}>
          { roomStatusDonutOption && (
            <Chart
              options={roomStatusDonutOption}
              series={roomStatusDonutOption?.series}
              type='donut'
              width='100%'
              height={320}
            />
          )}
        </Box>
        <Box w={{ base: '100', sm: '50%' }} boxShadow='xs' m={2} p={2}>
          { pastWeekCustomerCountOption && (
            <Chart
              options={pastWeekCustomerCountOption}
              series={pastWeekCustomerCountOption?.series}
              type='line'
              width='100%'
              height={320}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};
export default ProtectRoute(Dashboard);
