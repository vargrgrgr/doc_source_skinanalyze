import { SvgProps } from 'react-native-svg';

import ClearSkyNight from 'assets/icons/weather/clear-sky-night.svg';
import ClearSky from 'assets/icons/weather/clear-sky.svg';
import Drizzle from 'assets/icons/weather/drizzle.svg';
import FewCloudNight from 'assets/icons/weather/few-clouds-night.svg';
import FewCloud from 'assets/icons/weather/few-clouds.svg';
import Mist from 'assets/icons/weather/mist.svg';
import RainAndSnow from 'assets/icons/weather/rain-and-snow.svg';
import RainNight from 'assets/icons/weather/rain-night.svg';
import Rain from 'assets/icons/weather/rain.svg';
import ScatteredCloud from 'assets/icons/weather/scattered-clouds.svg';
import Snow from 'assets/icons/weather/snow.svg';
import Thunderstorm from 'assets/icons/weather/thunderstorm.svg';

const weatherIcons: {
  [key: number]: { day: React.FC<SvgProps>; night: React.FC<SvgProps> };
} = {
  200: { day: Thunderstorm, night: Thunderstorm },
  201: { day: Thunderstorm, night: Thunderstorm },
  202: { day: Thunderstorm, night: Thunderstorm },
  210: { day: Thunderstorm, night: Thunderstorm },
  211: { day: Thunderstorm, night: Thunderstorm },
  212: { day: Thunderstorm, night: Thunderstorm },
  221: { day: Thunderstorm, night: Thunderstorm },
  230: { day: Thunderstorm, night: Thunderstorm },
  231: { day: Thunderstorm, night: Thunderstorm },
  232: { day: Thunderstorm, night: Thunderstorm },
  300: { day: Thunderstorm, night: Thunderstorm },
  301: { day: Drizzle, night: Drizzle },
  302: { day: Drizzle, night: Drizzle },
  310: { day: Drizzle, night: Drizzle },
  311: { day: Drizzle, night: Drizzle },
  312: { day: Drizzle, night: Drizzle },
  313: { day: Drizzle, night: Drizzle },
  314: { day: Drizzle, night: Drizzle },
  321: { day: Drizzle, night: Drizzle },
  500: { day: Rain, night: RainNight },
  501: { day: Rain, night: RainNight },
  502: { day: Rain, night: RainNight },
  503: { day: Rain, night: RainNight },
  504: { day: Rain, night: RainNight },
  511: { day: Snow, night: Snow },
  520: { day: Drizzle, night: Drizzle },
  521: { day: Drizzle, night: Drizzle },
  522: { day: Drizzle, night: Drizzle },
  531: { day: Drizzle, night: Drizzle },
  600: { day: Snow, night: Snow },
  601: { day: Snow, night: Snow },
  602: { day: Snow, night: Snow },
  611: { day: Snow, night: Snow },
  612: { day: Snow, night: Snow },
  613: { day: Snow, night: Snow },
  615: { day: RainAndSnow, night: RainAndSnow },
  616: { day: RainAndSnow, night: RainAndSnow },
  620: { day: RainAndSnow, night: RainAndSnow },
  621: { day: RainAndSnow, night: RainAndSnow },
  622: { day: RainAndSnow, night: RainAndSnow },
  701: { day: Mist, night: Mist },
  711: { day: Mist, night: Mist },
  721: { day: Mist, night: Mist },
  731: { day: Mist, night: Mist },
  741: { day: Mist, night: Mist },
  751: { day: Mist, night: Mist },
  761: { day: Mist, night: Mist },
  762: { day: Mist, night: Mist },
  771: { day: Mist, night: Mist },
  781: { day: Mist, night: Mist },
  800: { day: ClearSky, night: ClearSkyNight },
  801: { day: FewCloud, night: FewCloudNight },
  802: { day: ScatteredCloud, night: ScatteredCloud },
  803: { day: FewCloud, night: FewCloudNight },
  804: { day: FewCloud, night: FewCloudNight },
};

export default weatherIcons;
