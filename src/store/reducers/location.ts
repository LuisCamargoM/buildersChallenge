export const STORE_ADDRESS = 'STORE_ADDRESS';
export const STORE_COORDS = 'STORE_COORDS';

export interface Info {
  address: string;
  lat: number;
  lon: number;
}

const initialState: Info = {
  address: '',
  lat: 0.0,
  lon: 0.0,
};

export const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STORE_ADDRESS:
      return {
        ...state,
        address: action.data,
      };
    case STORE_COORDS:
      return {
        ...state,
        lat: action.lat,
        lon: action.lon,
      };
    default:
      return state;
  }
};
