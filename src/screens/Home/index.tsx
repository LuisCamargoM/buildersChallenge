import React, { useState } from 'react';
import { PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  ContainerTop,
  ContainerBottom,
  Logo,
  Locations,
  Button,
  ButtonText,
  UpdateMessageView,
  MessageText,
} from './styles';

import { GEO_CODER_TOKEN } from '../../utils/constants';

import GetLocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import { WeatherInfo } from './components/WeatherInfo';
export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  Geocoder.init(GEO_CODER_TOKEN);

  const [btnText, setBtnText] = useState<string>("GET MY BUILDER'S INFO");

  const lat = useSelector((state) => state.location.lat);
  const lon = useSelector((state) => state.location.lon);
  const [hidden, setHidden] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const getCurrentLocation = () => {
    setLoading(true);
    setTimeout(() => {
      GetLocation.requestAuthorization('whenInUse').then(() => {
        GetLocation.getCurrentPosition(
          (position) => {
            dispatch({
              type: 'STORE_COORDS',
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
            setBtnText('UPDATE MY DATA');
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then((json) => {
                const address = json.results[0].formatted_address;
                dispatch({ type: 'STORE_ADDRESS', data: address });
                setHidden(false);
                setTimeout(() => {
                  setHidden(true);
                }, 3000);
              })
              .catch((error) => {
                console.error(`ERROR: ${JSON.stringify(error, null, 2)}`);
              });
            setLoading(false);
          },
          (error) => {
            console.log('map error: ', error);
            console.log(error.code, error.message);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      });
    }, 2000);
  };

  const _requestLocation = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <Container>
      <ContainerTop>
        <Logo source={require('../../assets/logo.png')} />
        {!lat && !lon ? (
          <Locations source={require('../../assets/location.png')} />
        ) : (
          <WeatherInfo />
        )}
      </ContainerTop>
      <ContainerBottom>
        <Button onPress={() => _requestLocation()}>
          {loading ? (
            <ActivityIndicator color={'black'} />
          ) : (
            <>
              <ButtonText>{btnText}</ButtonText>
              {!hidden && (
                <UpdateMessageView>
                  <MessageText>Informações atualizadas com sucesso!</MessageText>
                </UpdateMessageView>
              )}
            </>
          )}
        </Button>
      </ContainerBottom>
    </Container>
  );
};
