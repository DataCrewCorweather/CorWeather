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
  const [weathers, setWeathers] = useState({});
  const [rainAvgs, setRainAvg] = useState({});
  const [minTemp, setMinTemp] = useState({});
  const [maxTemp, setMaxTemp] = useState({});
  const [cnt, setCnt] = useState({});
  const [weatherWarning, setweatherWarning] = useState({});
  const [weatherWarning2, setweatherWarning2] = useState({});

  const days = [
    '2022.07',
    '2022.08',
    '2022.09',
    '2022.10',
    '2022.11',
    '2022.12',
    '2023.01',
    '2023.02',
    '2023.03',
    '2023.04',
    '2023.05',
  ];
  
  const cities = ['서울', '부산', '인천', '대구', '대전', '광주', '울산', '수원', '원주', '청주', '홍성', '전주', '목포', '포항', '진주', '제주'];
  const iters = [1,2,3,4,5];
  useEffect(() => {
    

    const fetchTemperatures = async () => {
      try {
        const temperaturePromises = cities.map(city =>
          axios.post("http://localhost:4000/weather/getWeatherList", {
            headers,
            name: city,
            date: "2022.05.21"
          })
        );
        const temperatureResponses = await Promise.all(temperaturePromises);
        const temperatures = {};
        const colors = {};
        const weathers = {};

        temperatureResponses.forEach((response, index) => {
          const city = cities[index];
          const weatherData = response.data.list;
          if (weatherData && weatherData.length > 0) {
            const temp = weatherData[0].temp;
            temperatures[city] = temp;

            const rain = weatherData[0].day_rain;
            console.log(rain);
            if(rain == null){
              weathers[city] = 'null';
            }
            else{
              weathers[city] = rain;
            }

            
            if(temp > 33){
              colors[city] = "error";
            }


            if(rain != null){
              weathers[city] = faCloudRain;
              colors[city] = "info";
            }
            else{
              weathers[city] = faSun;
              colors[city] = "warning";
            }
          } else {
            temperatures[city] = 'N/A';
            colors[city] = 'warning';
            weathers[city] = faSun;
          }
        });

        setTemperatures(temperatures);
        setColors(colors);
        setWeathers(weathers);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRain = async () => {
      try {
        const rainPromises = cities.map(city =>
          axios.post("http://localhost:4000/weather/getDayrain", {
            headers,
            name: city,
            date: "2022.05.21"
          })
        );
        const rainResponses = await Promise.all(rainPromises);
        const rainAvgs = {};


        rainResponses.forEach((response, index) => {
          const city = cities[index];
          const rainData = response.data.list;
          if (rainData && rainData.length > 0) {
            const avg = rainData[0].avg;
            console.log(avg)

            rainAvgs[city] = avg;
          } 
        });

        setRainAvg(rainAvgs);
      } catch (error) {
        console.error(error);
      }
    };


    const fetchMinTemp = async () => {
      try {
        const minPromises = days.map(day =>
          axios.post("http://localhost:4000/weather/getMinTemp", {
            headers,
            date: day
          })
        );
        const minResponses = await Promise.all(minPromises);
        const minTemp = {};


        minResponses.forEach((response, index) => {
          const day = days[index];
          const minData = response.data.list;
          if (minData && minData.length > 0) {
            const min = minData[0].minTemp.toFixed(2);
            console.log(min)

            minTemp[day] = min;
          } 
        });

        setMinTemp(minTemp);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMaxTemp = async () => {
      try {
        const maxPromises = days.map(day =>
          axios.post("http://localhost:4000/weather/getMaxTemp", {
            headers,
            date: day
          })
        );
        const maxResponses = await Promise.all(maxPromises);
        const maxTemp = {};


        maxResponses.forEach((response, index) => {
          const day = days[index];
          const maxData = response.data.list;
          if (maxData && maxData.length > 0) {
            const max = maxData[0].maxTemp.toFixed(2);
            console.log(max)

            maxTemp[day] = max;
          } 
        });

        setMaxTemp(maxTemp);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCntWeather = async () => {
      try {
        const cntResponse = await axios.post("http://localhost:4000/weather/getWeatherRate", {
          headers,
          date: '2023.05'
        });
        const cntData = cntResponse.data.list;
        console.log(cntData);
        const cnt = {};
    
        if (cntData && cntData.length > 0) {
          const count1 = cntData[0].day_rain_count;
          console.log(count1)
          cnt[0] = count1;
    
          const count2 = cntData[0].day_snow_count;
          console.log(count2)
          cnt[1] = count2;

          const count3 = cntData[0].day_sunny_count;
          console.log(count3)
          cnt[2] = count3;


        }
    
        setCnt(cnt);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWeatherwarning = async() => {
      try{

          const weatherWarningResponse = await axios.post("http://localhost:4000/weather_warning/getWeather_warning",{
            headers,
            date:'2023-06-11'
          })


        const warningTime = {};
        const warningContext = {};

        const weatherWarningData = weatherWarningResponse.data.list;
        if(weatherWarningData && weatherWarningData.length > 0){
          warningTime[0] = weatherWarningData[0].time
          warningContext[0] = weatherWarningData[0].location + weatherWarningData[0].context
          
          warningTime[1] = weatherWarningData[1].time
          warningContext[1] = weatherWarningData[1].location + weatherWarningData[0].context

          warningTime[2] = weatherWarningData[2].time
          warningContext[2] = weatherWarningData[2].location + weatherWarningData[0].context

          warningTime[3] = weatherWarningData[3].time
          warningContext[3] = weatherWarningData[3].location + weatherWarningData[0].context

          warningTime[4] = weatherWarningData[4].time
          warningContext[4] = weatherWarningData[4].location + weatherWarningData[0].context

  
        }


        setweatherWarning(warningTime);
        setweatherWarning2(warningContext);
      } catch(error){
        console.error(error);
      }
    };

    fetchTemperatures();
    fetchRain();
    fetchMinTemp();
    fetchMaxTemp();
    fetchCntWeather();
    fetchWeatherwarning();
  }, []);

  console.log(cnt)



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
                icon={weathers[city] || faSun}
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
                  data: days.map(day => minTemp[day]),
                },
                {
                  name: '최고',
                  type: 'line',
                  fill: 'solid',
                  data:  days.map(day => maxTemp[day]),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="5월 날씨 비중"
              chartData={[
                { label: '비', value: cnt[0] || 0 },
                { label: '맑음', value: cnt[2] || 0 },
                { label: '눈', value: cnt[1] || 0},

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
              chartData={cities.map(city => ({ label: city, value: rainAvgs[city] }))}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={12}>
          <AppOrderTimeline
              title="기상특보"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: weatherWarning2[index],
                type: `order${index + 1}`,
                time: weatherWarning[index],
              }))}
            />
          </Grid>

          
        </Grid>
      </Container>
    </>
  );
}
