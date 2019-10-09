import React from 'react';

const Weather = ({weather}) => {
  return (
    <>
      <h2>Weather for {weather.location.name}</h2>
      <p><strong>temperature: </strong>{weather.current.temperature} degrees</p>
      <img src={weather.current.weather_icons[0]} alt="current_weather" />
      <p><strong>wind: </strong>{weather.current.wind_speed} mph {weather.current.wind_dir}</p>
    </>
  );
}

export default Weather;