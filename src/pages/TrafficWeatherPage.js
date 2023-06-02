import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components
import { faCloud, faCloudRain, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function TrafficWeatherPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

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
        
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="날씨별 통행속도"
              subheader=""
              chartData={[
                { label: '맑음', value: 400 },
                { label: '비', value: 430 },
                { label: '눈', value: 448 },
        
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
              title="교통속도 오름차순"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '맑음, 17°C',
                  '눈, -3°C',
                  '맑음, 20°C',
                  '맑음, 29°C',
                  '맑음, 17°C',
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
