import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

import axios from "axios";
import { useState, useEffect } from 'react';
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from '../sections/@dashboard/app';


axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
// ----------------------------------------------------------------------

export default function TrafficPage() {
  const theme = useTheme();
  const [timetraffic,setTimetraffic] = useState({});
  const [monthAvg,setmonthAvg] = useState({});
  const [subAvg,setsubAvg] = useState({});
  const [linevalue,setline] = useState({});
  const times = ['0','6','12','18'];
  const roads = [
    '경부고속도로',
    '서해안고속도로',
    '평택시흥고속도로',
    '평택화성고속도로', 
    '구리포천선',
    '중부고속도로',
    '제2중부고속도로',
    '평택제천고속도로',
    '중부내륙고속도로',
    '영동고속도로',
    '광주원주선',
    '서울양양고속도로',
    '제2경인고속도로',
    '경인고속도로',
    '인천국제공항고속도로',
    '용인서울고속도로',
    '봉담동탄고속도로',
    '제2외곽선'
  ];
  const days = [
    '202207',
    '202208',
    '202209',
    '202210',
    '202211',
    '202212',
    '202301',
    '202302',
    '202303',
    '202304',
  ];
  const lines=['1호선','2호선','3호선','4호선','5호선','6호선','7호선','8호선','9호선'];

  useEffect(() => {

    const fetchTimeTraffic = async () => {
      try {
        const timePromises = times.map(time =>
          axios.post("http://localhost:4000/traffic/getTimetraffic", {
            headers,
            time1: time
          })
        );
        const timeTrafficResponses = await Promise.all(timePromises);
        const timeTrafficTemp = {};


        timeTrafficResponses.forEach((response, index) => {
          const time = times[index];
          const timeTrafficdata = response.data.list;
          if (timeTrafficdata && timeTrafficdata.length > 0) {

            timeTrafficTemp[time] = timeTrafficdata[0].total;
          } 
        });

        setTimetraffic(timeTrafficTemp);
      } catch (error) {
        console.error(error);
      }
    };


    const fetchMonthavg = async () => {
      try {
        const MonthavgPromises = roads.map(road =>
          axios.post("http://localhost:4000/traffic/getMonthavg", {
            headers,
            name: road,
            date: '2022/05'
          })
        );
        const monthAvgResponses = await Promise.all(MonthavgPromises);
        const monthAvgTemp = {};


        monthAvgResponses.forEach((response, index) => {
          const roadAvg = roads[index];
          const monthAvgdata = response.data.list;
          if (monthAvgdata && monthAvgdata.length > 0) {

            monthAvgTemp[roadAvg] = monthAvgdata[0].average.toFixed(2);
            console.log(monthAvgdata[0].average);
          } 
        });

        setmonthAvg(monthAvgTemp);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchsubAvg = async () => {
      try {
        const subPromises = days.map(day =>
          axios.post("http://localhost:4000/subway/getsubAvg", {
            headers,
            date: day
          })
        );
        const subResponses = await Promise.all(subPromises);
        const subAvg = {};


        subResponses.forEach((response, index) => {
          const day = days[index];
          const subData = response.data.list;
          if (subData && subData.length > 0) {
            const max = subData[0].riding
            console.log(max)

            subAvg[day] = max;
          } 
        });

        setsubAvg(subAvg);
      } catch (error) {
        console.error(error);
      }
    };


    const fetchlines = async () => {
      try {
        const linePromises = lines.map(line =>
          axios.post("http://localhost:4000/subway/getline", {
            headers,
            name: line
          })
        );
        const lineResponses = await Promise.all(linePromises);
        const lineTemp = {};


        lineResponses.forEach((response, index) => {
          const line = lines[index];
          const lineData = response.data.list;
          if (lineData && lineData.length > 0) {
            const max = lineData[0].count
            console.log(max)

            lineTemp[line] = max;
          } 
        });

        setline(lineTemp);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimeTraffic();
    fetchMonthavg();
    fetchsubAvg();
    fetchlines();
  }, []);



  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          교통량 통계
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {/* 고속도로 데이터에서 각 시간 데이터 6시간씩 합쳐서 평균값 구하기  */}
            <AppCurrentVisits
              title="시간대별 고속도로 통행량"
              chartData={[
                { label: '0시~6시', value: timetraffic[0] || 'N/A'},
                { label: '6시~12시', value: timetraffic[6] || 'N/A' },
                { label: '12시~18시', value: timetraffic[12] || 'N/A' },
                { label: '18시~24시', value: timetraffic[18] || 'N/A' },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
            // $dayOfWeek를 통해 요일별로 분류한 후 전일합계량 평균값 구하기
              title="요일별 고속도로 통행량 평균"
              subheader="2022.05.07~2023.5.28"
              chartData={[
                { label: '월', value: 400 },
                { label: '화', value: 430 },
                { label: '수', value: 448 },
                { label: '목', value: 470 },
                { label: '금', value: 540 },
                { label: '토', value: 580 },
                { label: '일', value: 690 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={12}>
            <AppConversionRates
            // 각 노선명당 전일합계 평균값
              title="고속도로 노선별 일일 평균 통행량"
              subheader="2022.05.07~2023.5.28"
              chartData={roads.map(road => ({ label: road, value: monthAvg[road] || '100'}))}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
            // 지하철 승차수 월별 평균
              title="월별 지하철 이용량"
              subheader=""
              chartLabels={[
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
              ]}
              chartData={[
                {
                  name: '승차평균',
                  type: 'column',
                  fill: 'solid',
                  data: days.map(day => subAvg[day])
                },
                
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
            // 4월 데이터 호선별 승차수 평균
              title="호선별 4월 이용객 수 평균"
              chartData={lines.map(line => ({ label: line, value: linevalue[line] || '100'}))}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        
        </Grid>
      </Container>
    </>
  );
}
