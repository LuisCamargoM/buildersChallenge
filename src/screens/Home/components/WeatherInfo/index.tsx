import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  Label,
  Info,
  ContainerInfoColumn,
  ContainerInfoInline,
  InfoInline,
  AddressText,
  DateText,
  InfoColumn,
  WeatherImage,
} from "./styles";
import { getTemperature, getWeatherURL } from "../../../../utils";

export const WeatherInfo: React.FC = () => {
  const location = useSelector((state) => state.location);
  const [tempMax, setTempMax] = useState<number>(0.0);
  const [tempMin, setTempMin] = useState<number>(0.0);
  const [temp, setTemp] = useState<number>(0.0);

  const [humidity, setHumidity] = useState<number>(0.0);
  const [local, setLocal] = useState<string>("");
  const [pais, setPais] = useState<string>("");
  const [actualWind, setActualWind] = useState<number>(0.0);

  const [icon, setIcon] = useState<string>("");
  const [today, setToday] = useState<string>("");
  const [night, setNight] = useState<boolean>();

  const getWeatherInfo = async () => {
    const URL = getWeatherURL(location.lat, location.lon);

    await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { weather, main, wind } = data;
        setIcon(weather[0].icon);
        setTemp(getTemperature(main.temp));
        setTempMax(getTemperature(main.temp_max));
        setTempMin(getTemperature(main.temp_min));
        setHumidity(main.humidity);
        setActualWind(wind.speed);
        setLocal(data.name);
        setPais(data.sys.country);
      });
  };

  const nightMood = (): boolean => {
    return today <= "09:00" || today >= "17:00";
  };

  const updateDateTime = (): void => {
    const dateNow = new Date().toTimeString().split("GMT")[0].split(":");
    setToday(`${dateNow[0]}:${dateNow[1]}`);
  };

  useEffect(() => {
    getWeatherInfo();
    updateDateTime();
    setNight(nightMood());
  }, [location]);

  return (
    <Container isNight={night}>
      <ContainerInfoColumn>
        <InfoColumn>
          <DateText isNight={night}>{`${today}`}</DateText>
          {location.address !== undefined && (
            <AddressText>{location.address}</AddressText>
          )}
        </InfoColumn>
      </ContainerInfoColumn>

      <ContainerInfoColumn>
        {icon.length !== 0 && (
          <WeatherImage
            source={{
              uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
            }}
            width={100}
            height={80}
          />
        )}
        {temp !== undefined && (
          <Info isNight={night}>{Math.round(temp, 2) || 0} °C</Info>
        )}
        <Label>{`${local}, ${pais}`}</Label>
      </ContainerInfoColumn>

      <ContainerInfoInline>
        <InfoInline>
          {tempMin !== undefined && (
            <Info isNight={night}>{Math.round(tempMin, 2)} °C</Info>
          )}
          <Label>Temp. Mínima</Label>
        </InfoInline>
        <InfoInline>
          {tempMax !== undefined && (
            <Info isNight={night}>{Math.round(tempMax, 2)} °C</Info>
          )}
          <Label>Temp. Máxima</Label>
        </InfoInline>
      </ContainerInfoInline>
      <ContainerInfoInline>
        <InfoInline>
          {actualWind !== undefined && (
            <Info isNight={night}>{actualWind}</Info>
          )}
          <Label>Vento (m/s)</Label>
        </InfoInline>
        <InfoInline>
          {humidity !== undefined && <Info isNight={night}>{humidity}</Info>}
          <Label>Umidade (%)</Label>
        </InfoInline>
      </ContainerInfoInline>
    </Container>
  );
};
