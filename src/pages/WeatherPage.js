import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';
import { faCloud, faCloudRain, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// sections

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function WeatherPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> WeatherPage </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          오늘의 날씨
        </Typography>
        {/* 현재 날씨를 표현 */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="서울" total={25.7} icon={faCloud} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="부산" total={1352831} color="info" icon={faCloudRain} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="인천" total={1723315} color="warning" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="대구" total={234} color="error" icon={faSnowflake} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="대전" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="광주" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="울산" total={234} color="error" icon={faSun} />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="경기도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="강원도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="충청북도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="충청남도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="전라북도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="전라남도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="경상북도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="경상남도" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="제주도" total={234} color="error" icon={faSun} />
          </Grid>


          {/* 전국 평균 월별 최고 최저 기운 계산해서 차트로 표현 */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="월별 최고 최저 기온"
              subheader="전국 평균"
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
                '05/01/2023',
              ]}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: '최저',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: '최고',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="5월 날씨 비중"
              chartData={[
                { label: '비', value: 4344 },
                { label: '맑음', value: 5435 },
                { label: '눈', value: 1443 },

              ]}
              chartColors={[
                theme.palette.warning.main,
                theme.palette.info.main,
                theme.palette.primary.main,
    
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates
              title="5월 강수량"
              subheader=""
              chartData={[
                { label: '대전', value: 400 },
                { label: '충북', value: 430 },
                { label: '서울', value: 448 },
                { label: '강원', value: 470 },
                { label: '제주', value: 540 },
                { label: '충남', value: 580 },
                { label: '전북', value: 690 },
                { label: '전남', value: 1100 },
                { label: '경기', value: 1200 },
                { label: '인천', value: 1380 },
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={12}>
          <AppOrderTimeline
              title="기상특보"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '강풍주의보',
                  '풍랑주의보',
                  '황사주의보',
                  '폭염주의보',
                  '건조주의보',
                ][index],
                type: `order${index + 1}`,
                time: [
                '2022-07-31T01:33:29.567Z',
                '2025-07-31T01:33:29.567Z',
                '2021-07-31T01:33:29.567Z',
                '2022-07-31T01:33:29.567Z',
                '2022-07-31T01:33:29.567Z'][index],
              }))}
            />
          </Grid>

          
        </Grid>
      </Container>
    </>
  );
}
