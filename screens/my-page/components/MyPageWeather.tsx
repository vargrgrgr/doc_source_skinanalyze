import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import BuildConfig from 'react-native-config';
import { useQuery } from 'react-query';
import axios from 'axios';

import colors from '../../../utils/colors';
import { paddingHorizontal } from '../../../utils/utils';
import useLocation from '../../../hooks/useLocation';
import weatherIcons from '../../../utils/weather-icons';
import AppText from '../../../components/AppText';
import ClearSky from '../../../assets/icons/weather/clear-sky.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import TextBold from '../../../components/TextBold';
import TextDemiLight from '../../../components/TextDemiLight';

const useWeather = (coords: { latitude?: number; longitude?: number }) => {
  return useQuery(
    ['weather', coords],
    async () => {
      if (
        typeof coords.latitude !== 'undefined' &&
        typeof coords.longitude !== 'undefined'
      ) {
        const { data } = await axios.get<{
          weather: { main: string; id: number }[];
          main: { temp: number; humidity: number };
          sys: {
            sunrise: number;
          };
        }>('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: coords.latitude,
            lon: coords.longitude,
            appid: BuildConfig.OpenWeatherKey,
          },
        });
        return data;
      } else {
        const { data } = await axios.get<{
          weather: { main: string; id: number }[];
          main: { temp: number; humidity: number };
          sys: {
            sunrise: number;
          };
        }>('http://api.openweathermap.org/data/2.5/weather', {
          params: { q: 'seoul,kr', appid: BuildConfig.OpenWeatherKey },
        });
        return data;
      }
    },
    { cacheTime: 60 * 60 * 1000 },
  );
};

const isNight = (sunrise: number) => new Date() <= new Date(sunrise * 1000);

const MyPageWeather = () => {
  let location = useLocation();
  const { isError, isLoading, data } = useWeather(location);

  const WeatherIcon =
    isError || isLoading
      ? ClearSky
      : weatherIcons[data!.weather[0].id][
          isNight(data!.sys.sunrise) ? 'night' : 'day'
        ];

  const getTemperature = () => {
    if (isError || isLoading) {
      return 15;
    }
    return Math.round(data!.main.temp - 273.15);
  };

  const getHumidity = () => {
    if (isError || isLoading) {
      return 20;
    }
    return Math.round(data!.main.humidity);
  };
  console.log(location)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextBold>현위치</TextBold>
        <View style={styles.row}>
          <LocationIcon />
          <AppText style={styles.location}>
            {(location?.state || location.city) +
              (location?.county && location.county !== location.city
                ? ' ' + location.county
                : '')}
          </AppText>
        </View>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.weatherInfo}>
          <TextBold style={styles.temperature}>{getTemperature()}°C</TextBold>
          <TextDemiLight style={styles.humidity}>
            습도 : {getHumidity()}%
          </TextDemiLight>
        </View>
        <WeatherIcon width={30} height={30} fill={colors.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontal,
    marginVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: colors.textSecondary,
    marginLeft: 4,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherInfo: {
    marginRight: 20,
  },
  temperature: {
    fontSize: 24,
  },
  humidity: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default memo(MyPageWeather);
