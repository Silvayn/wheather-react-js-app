import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { endpointWeather, endpointForecast } from "../config/endpoints";

export function WeatherForm({ handleUpdate }) {
  const [city, setCity] = useState("");

  const WeatherForm = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
  `;
  const WeatherInput = styled.input`
    font-style: normal;
    font-weight: 300;
    font-size: 25px;
    line-height: 33px;
    color: #88bbbb;
    background: #ffffff;
    mix-blend-mode: normal;
    border-radius: 70px;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 14px 20px 14px 56px;
  `;
  const WeatherButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    ::after {
      content: url("data:image/svg+xml,%3Csvg width='34' height='31' viewBox='0 0 34 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg style='mix-blend-mode:hard-light'%3E%3Cpath d='M32 28.7392L24.75 22.2772' stroke='%231B6464' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.3333 25.7681C22.6971 25.7681 28.6667 20.4475 28.6667 13.8841C28.6667 7.32068 22.6971 2 15.3333 2C7.96954 2 2 7.32068 2 13.8841C2 20.4475 7.96954 25.7681 15.3333 25.7681Z' stroke='%231B6464' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E");
      position: absolute;
      top: 50%;
      left: 13px;
      transform: translateY(-50%);
      z-index: 99;
    }
  `;

  const handleSubmit = (event) => {
    event.preventDefault(), fetchData();
  };

  const handleChange = (event) => {
    setCity(event.currentTarget.value);
  };

  async function fetchData() {
    axios
      .all(
        [endpointWeather(`q=${city}`), endpointForecast(`q=${city}`)].map(
          (endpoint) => axios.get(`${endpoint}`)
        )
      )
      .then(
        axios.spread(({ data: weather }, { data: forecast }) => {
          handleUpdate({ data: weather, forecast: forecast.list });
        })
      );
  }

  return (
    <WeatherForm onSubmit={handleSubmit}>
      <WeatherInput
        type="text"
        name="weatherInput"
        autoFocus="autoFocus"
        onChange={handleChange}
        value={city}
        placeholder="Entrez votre ville"
      />
      <WeatherButton
        type="submit"
        name="weatherButtonSubmit"
        title="Rechercher"
      ></WeatherButton>
    </WeatherForm>
  );
}
