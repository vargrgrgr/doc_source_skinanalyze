import axios from 'axios';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import BuildConfig from 'react-native-config';
import Geolocation from 'react-native-geolocation-service';
import { useQuery } from 'react-query';

const useReverseGeocoding = (coords?: {
  latitude: number;
  longitude: number;
}) => {
  return useQuery(
    ['reverseGeocoding', coords],
    async () => {
      if (coords) {
        const { data } = await axios.get<{
          address: { state: string; city: string; county: string; town: string; };
        }>('https://us1.locationiq.com/v1/reverse.php', {
          params: {
            key: BuildConfig.LocationIqToken,
            lat: coords.latitude,
            lon: coords.longitude,
            'accept-language': 'ko',
            format: 'json',
          },
        });
        return {
          state: data.address.state, 
          city: data.address.city,
          county: data.address.county,
        };
      } else {
        return {
          state: '',
          city: '불명',
          county: '',
        };
      }
    },
    { cacheTime: 60 * 60 * 1000 },
  );
};

const useLocation = () => {
  const [coords, setCoords] =
    useState<{ latitude: number; longitude: number }>();
  const { data: address } = useReverseGeocoding(coords);

  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      console.log('status granted');
      return true;
    }

    if (status === 'denied') {
      console.log('status denied');
    }

    if (status === 'disabled') {
      console.log('status disabled');
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ latitude, longitude });
      },
      (error) => {
        //console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60 * 60 * 1000,
      },
    );
  };

  useEffect(() => {
    getLocation().catch(() => {});
  }, []);

  return { ...coords, ...address };
};

export default useLocation;
