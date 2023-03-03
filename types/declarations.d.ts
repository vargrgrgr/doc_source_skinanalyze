declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module 'react-native-config' {
  interface Env {
    GoogleWebClientId: string;
    KakaoKey: string;
    OpenWeatherKey: string;
    LocationIqToken: string;
    NaverkConsumerKey: string;
    NaverkConsumerSecret: string;
  }

  const BuildConfig: Env;

  export default BuildConfig;
}
