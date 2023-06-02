import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';

// components
import { faCloud, faCloudRain, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// sections
import {
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function TrafficWeatherPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          날씨에 따른 예상 고속도로 통행량
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="경부고속도로" total={25.7} icon={faCloud} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="서해안고속도로" total={1352831} color="info" icon={faCloudRain} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="평택시흥고속도로" total={1723315} color="warning" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="평택화성고속도로" total={234} color="error" icon={faSnowflake} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="구리포천선" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="중부고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="제2중부고속도로" total={234} color="error" icon={faSun} />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="평택제천고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="중부내륙고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="영동고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="광주원주선" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="서울양양고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="수도권제1순환선" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="제2경인고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="인천대교고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="경인고속도로" total={234} color="error" icon={faSun} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="인천국제공항고속도로" total={234} color="error" icon={faSun} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="용인서울고속도로" total={234} color="error" icon={faSun} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="봉담동탄고속도로" total={234} color="error" icon={faSun} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="제2외곽선" total={234} color="error" icon={faSun} />
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
            <AppWidgetSummary title="내일 서울의 예상 통행속도" total={25.7} icon={faCloud} />
          </Grid>

        </Grid>

        <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="서울시 월별 날씨, 통행량 평균"
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
                '05/01/2023'
              ]}
              chartData={[
                {
                  name: '통행량 평균',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: '최고기온 평균',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: '최저기온 평균',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

      </Container>
    </>
  );
}
