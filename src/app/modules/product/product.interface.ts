export type TKeyboardBrand =
  | 'Logitech'
  | 'Razer'
  | 'Corsair'
  | 'SteelSeries'
  | 'Microsoft'
  | 'Apple'
  | 'HyperX'
  | 'Ducky'
  | 'Cooler Master'
  | 'Das Keyboard'
  | 'Filco'
  | 'Varmilo'
  | 'Keychron'
  | 'Anne Pro'
  | 'Redragon';

export type TProduct = {
  name: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
  description: string;
  brand: TKeyboardBrand;
  isDeleted?: boolean;
};

export type TUpdateProps = {
  _id: string;
  quantity: [];
};
