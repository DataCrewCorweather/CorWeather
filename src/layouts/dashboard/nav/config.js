// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [

  {
    title: 'weather',
    path: '/dashboard/weather',
    icon: icon('ic_weather'),
  },
  {
    title: 'traffic',
    path: '/dashboard/traffic',
    icon: icon('ic_traffic'),
  },
  {
    title: 'trafficweather',
    path: '/dashboard/trafficweather',
    icon: icon('ic_traffic_weather'),
  },
];

export default navConfig;
