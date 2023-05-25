import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// import Iconify from '../components/iconify';
import { faCloud, faCloudRain, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// sections
import axios from "axios";
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

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
// ----------------------------------------------------------------------


export default function WeatherPage() {
  const [temperatures, setTemperatures] = useState({});
  const [colors, setColors] = useState({});

  const cities = ['서울', '부산', '인천', '대구', '대전', '광주', '울산', '수원', '원주', '청주', '홍성', '전주', '목포', '포항', '진주', '제주'];
  useEffect(() => {
    

    const fetchTemperatures = async () => {
      try {
        const temperaturePromises = cities.map(city =>
          axios.post("http://localhost:4000/weather/getWeatherList", {
            headers,
            name: city,
            date: "2022-05-21"
          })
        );
        const temperatureResponses = await Promise.all(temperaturePromises);
        const temperatures = {};
        const colors = {};

        temperatureResponses.forEach((response, index) => {
          const city = cities[index];
          const weatherData = response.data.list;
          if (weatherData && weatherData.length > 0) {
            const temp = weatherData[0].temp;
            temperatures[city] = temp;
            if(temp > 20){
              colors[city] = "warning";
            }
            else{
              colors[city] = "info"
            }
          } else {
            temperatures[city] = 'N/A';
            colors[city] = 'N/A';
          }
        });

        setTemperatures(temperatures);
        setColors(colors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTemperatures();
  }, []);





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
          {cities.map(city => (
            <Grid item xs={12} sm={6} md={3} key={city}>
              <AppWidgetSummary
                title={city}
                total={temperatures[city] || 'N/A'}
                color= {colors[city] || 'info'}
                icon={faCloud}
              />
            </Grid>
          ))}


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
                // theme.palette.warning.main,
                // theme.palette.info.main,
                // theme.palette.primary.main,
    
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
