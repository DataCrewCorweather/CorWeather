import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function TrafficPage() {
  const theme = useTheme();
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
                { label: '0시~6시', value: 4344 },
                { label: '6시~12시', value: 5435 },
                { label: '12시~18시', value: 1443 },
                { label: '18시~24시', value: 4443 },
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
              chartData={[
                { label: '경부고속도로', value: 400 },
                { label: '서해안고속도로', value: 430 },
                { label: '평택시흥고속도로', value: 448 },
                { label: '평택화성고속도로', value: 470 },
                { label: '구리포천선', value: 540 },
                { label: '중부고속도로', value: 580 },
                { label: '제2중부고속도로', value: 690 },
                { label: '평택제천고속도로', value: 690 },
                { label: '중부내륙고속도로', value: 690 },
                { label: '영동고속도로', value: 690 },
                { label: '광주원주선', value: 690 },
                { label: '서울양양고속도로', value: 690 },
                { label: '수도권제1순환선', value: 690 },
                { label: '제2경인고속도로', value: 690 },
                { label: '인천대교고속도로', value: 690 },
                { label: '경인고속도로', value: 690 },
                { label: '인천국제공항고속도로', value: 690 },
                { label: '용인서울고속도로', value: 690 },
                { label: '봉담동탄고속도로', value: 690 },
                { label: '제2외곽선', value: 690 },
              ]}
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
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22],
                },
                
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
            // 4월 데이터 호선별 승차수 평균
              title="호선별 4월 이용객 수 평균"
              chartData={[
                { label: '1호선', value: 4344 },
                { label: '2호선', value: 5435 },
                { label: '3호선', value: 1443 },
                { label: '4호선', value: 4443 },
                { label: '5호선', value: 4443 },
                { label: '6호선', value: 4443 },
                { label: '7호선', value: 4443 },
                { label: '8호선', value: 4443 },
                { label: '9호선', value: 4443 },
              ]}
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
