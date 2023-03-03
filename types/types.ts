import { Source } from 'react-native-fast-image';

export type Product = {
  id: number;
  picture: number | Source;
  name: string;
  description: string;
  discount?: number;
  price: number;
};
