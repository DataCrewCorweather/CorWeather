import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
// components
import { faCloud, faCloudRain, faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// sections
import {
  AppWebsiteVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';


axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
// ----------------------------------------------------------------------

export default function TrafficWeatherPage() {

  const weathers = ['흐림','맑음','비','눈','구름조금','구름많음','눈/비'];
  const [weatherVelo,setweatherVelo] = useState({});
  const [minTemp, setMinTemp] = useState({});
  const [maxTemp, setMaxTemp] = useState({});
  const [monthAvg, setMonthAvg] = useState({});
  const [joinAvg, setJoinavg] = useState({});
  const [weatherIcon, setweathericon] = useState({});
  const [colors, setColor] = useState({});
  const [preWeather, setpreWeather] = useState({});
  const days = [  '2022.7',
  '2022.8',
  '2022.9',
  '2022.10',
  '2022.11',
  '2022.12',
  '2023.1',
  '2023.2',
  '2023.3',
  '2023.4',
  '2023.5']

  const loads = ['경부고속도로','서해안고속도로','영동고속도로','수도권제1순환고속도로','경인고속도로','용인서울고속도로']

  useEffect(() => {
    

    const fetchweatherVelo = async () => {
      try {
        const veloPromises = weathers.map(weather =>
          axios.post("http://localhost:4000/traffic_weather/getweatherVelo", {
            headers,
            name2: weather
          })
        );
        const weatherVeloResponses = await Promise.all(veloPromises);
        const weatherVeloTemp = {};


        weatherVeloResponses.forEach((response, index) => {
          const velo = weathers[index];
          const weatherVelodata = response.data.list;
          if (weatherVelodata && weatherVelodata.length > 0) {

            weatherVeloTemp[velo] = weatherVelodata[0].average;
          } 
        });

        setweatherVelo(weatherVeloTemp);
      } catch (error) {
        console.error(error);
      }
    };


    const fetchMaxVelo = async () => {
      try {
        const maxPromises = days.map(day =>
          axios.post("http://localhost:4000/traffic_weather/getMaxVelo", {
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


    const fetchMinVelo = async () => {
      try {
        const minPromises = days.map(day =>
          axios.post("http://localhost:4000/traffic_weather/getMinVelo", {
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


    const fetchMonthavg = async () => {
      try {
        const avgPromises = days.map(day =>
          axios.post("http://localhost:4000/traffic_weather/getMonthAvg", {
            headers,
            date: day
          })
        );
        const avgResponses = await Promise.all(avgPromises);
        const avgs = {};


        avgResponses.forEach((response, index) => {
          const day = days[index];
          const avgData = response.data.list;
          if (avgData && avgData.length > 0) {
            const avg = avgData[0].avg.toFixed(2);
            console.log(avg)

            avgs[day] = avg;
          } 
        });

        setMonthAvg(avgs);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchJoindata = async () => {
      try {
        const preResponse = await axios.post("http://localhost:4000/pre_weather/getpreWeather", {
          headers,
        });
        const preData = preResponse.data.list;
        console.log(preData);
        let pre = '';
        const preWeather = {};
    
        if (preData && preData.length > 0) {
          preWeather[0] = preData[0].weather
          pre = preData[0].weather
          setpreWeather(preWeather)
        }
        console.log(pre);

        if (pre === '맑음'){





          const joinPromises = loads.map(load =>
            axios.post("http://localhost:4000/traffic/getJoindata", {
              headers,
              name: load,
              weather: pre
            })
          );
          const joinResponses = await Promise.all(joinPromises);
          const joinAvg = {};
          const icon = {};
          const a = {};

          joinResponses.forEach((response, index) => {
            const load = loads[index];
            const joinData = response.data.list;
            if (joinData && joinData.length > 0) {

              joinAvg[load] = joinData[0].average_all_sum;
              setJoinavg(joinAvg);

              icon[load] = faSun;
              setweathericon(icon);

              a[load] = 'warning';
              setColor(a);
            } 
          });
        }
        else if(pre==='구름조금'){




          const joinPromises = loads.map(load =>
            axios.post("http://localhost:4000/traffic/getJoindata", {
              headers,
              name: load,
              weather: pre
            })
          );
          const joinResponses = await Promise.all(joinPromises);
          const joinAvg = {};
          const icon = {};
          const a = {};

          joinResponses.forEach((response, index) => {
            const load = loads[index];
            const joinData = response.data.list;
            if (joinData && joinData.length > 0) {
 
              joinAvg[load] = joinData[0].average_all_sum;
              setJoinavg(joinAvg);

              icon[load] = faCloudRain;
              setweathericon(icon);

              a[load] = 'info';
              setColor(a);
            } 
          });

        }
        else if(pre==='구름많음'){



          const joinPromises = loads.map(load =>
            axios.post("http://localhost:4000/traffic/getJoindata", {
              headers,
              name: load,
              weather: pre
            })
          );
          const joinResponses = await Promise.all(joinPromises);
          const joinAvg = {};
          const icon = {};
          const a = {};

          joinResponses.forEach((response, index) => {
            const load = loads[index];
            const joinData = response.data.list;
            if (joinData && joinData.length > 0) {

              joinAvg[load] = joinData[0].average_all_sum;
              setJoinavg(joinAvg);

              icon[load] = faCloudRain;
              setweathericon(icon);

              a[load] = 'info';
              setColor(a);
            } 
          });
        }
        else if(pre==='흐림'){



          const joinPromises = loads.map(load =>
            axios.post("http://localhost:4000/traffic/getJoindata", {
              headers,
              name: load,
              weather: pre
            })
          );
          const joinResponses = await Promise.all(joinPromises);
          const joinAvg = {};
          const icon = {};
          const a = {};

          joinResponses.forEach((response, index) => {
            const load = loads[index];
            const joinData = response.data.list;
            if (joinData && joinData.length > 0) {

              joinAvg[load] = joinData[0].average_all_sum.toFixed(2);
              setJoinavg(joinAvg);

              icon[load] = faCloud;
              setweathericon(icon);

              a[load] = 'info';
              setColor(a);
            } 
          });
        }
    
        
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchJoindata();
    fetchMonthavg();
    fetchMinVelo();
    fetchweatherVelo();
    fetchMaxVelo();
  }, []);

  console.log(joinAvg);



  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          날씨에 따른 예상 고속도로 통행량
        </Typography>
        {/* 날씨 아이콘: 예상 날씨(발표전날 수정), total -> 예상 이용량  */}

        <Grid container spacing={3}>
          {loads.map(load => (
            <Grid item xs={12} sm={6} md={3} key={load}>
              <AppWidgetSummary
                title={load || 'N/A'}
                total={joinAvg[load] || 'N/A'}
                color= {colors[load] || 'info'}
                icon={weatherIcon[load] || faCloud}
              />
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
            // 날씨교통 서울시 데이터 이용 -> 각 날씨별 평균 통행속도
              title="날씨별 통행속도"
              subheader=""
              chartData={weathers.map(weather => ({ label: weather, value: weatherVelo[weather] || '100'}))}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={4}>
            {/* 날씨교통 데이터를 기반으로한 서울 예상 통행속도 */}
            {/* 어떤 고속도로든 당일 서울 날씨를 사용하기에 다른 데이터에서 사용하는 날씨예보 정보를 가져옴 */}
            <AppWidgetSummary title="내일 서울의 예상 통행속도" total={weatherVelo[preWeather[0]]} icon={weatherIcon['경부고속도로'] || faCloud } color= {colors['경부고속도로'] || 'info'}/>
          </Grid>

        </Grid>

        <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
            // 서울시 날씨 교통 데이터 이용
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
                  data: days.map(day => monthAvg[day])
                },
                {
                  name: '최고기온 평균',
                  type: 'area',
                  fill: 'gradient',
                  data: days.map(day => maxTemp[day])
                },
                {
                  name: '최저기온 평균',
                  type: 'line',
                  fill: 'solid',
                  data: days.map(day => minTemp[day])
                },
              ]}
            />
          </Grid>

      </Container>
    </>
  );
}
