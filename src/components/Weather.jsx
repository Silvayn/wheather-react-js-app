import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "./Axios";
import 'weather-react-icons/lib/css/weather-icons.css';

export function Weather() {
  const [weather, setWeather] = useState(false);
  const [coords, setCoords] = useState({ lat: 48.8534, lon: 2.3488 });
  const [loading, setLoading] = useState(true);

  // styled-components
  const Weater = styled.section`
    display: flex;
    row-gap: 20px;
    p {
      margin-bottom: 0;
    }
  `;
  const WeaterLoading = styled(Weater)`
    .weatherLoading::after {
      width: 25px;
      height: 25px;
      content: url("data:image/svg+xml,%3Csvg version='1.1' id='L7' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enableBackground='new 0 0 100 100' xmlSpace='preserve' width='25' hei ='25'%3E%3Cpath fill='%23fff' d='M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3 c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='rotate' dur='2s' from='0 50 50' to='360 50 50' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3Cpath fill='%23fff' d='M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7 c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='rotate' dur='1s' from='0 50 50' to='-360 50 50' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3Cpath fill='%23fff' d='M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='rotate' dur='2s' from='0 50 50' to='360 50 50' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3C/svg%3E");
    }
  `;
  const WeaterBox = styled.div`
    width: 100%;
    height: auto;
    background: #63c9c9;
    opacity: 0.8;
    backdrop-filter: blur(4.5px);
    border-radius: 39px;
    margin: 0 25px;
    padding: 25px 40px;
  `;
  const WeaterBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    h2 {
      font-weight: 500;
      font-size: 30px;
      line-height: 30px;
      text-transform: capitalize;
      margin: 0;
    }
    .displayFlex {
      display: flex;
    }
    .flexDirectionColumn {
      flex-direction: column;
    }
    .justifyContentSpaceBetween {
      justify-content: space-between;
    }
    .alignItemsCenter {
      align-items: center;
    }
    .fontSize85 {
      font-size: 85px;
    }
    .fontWeightSemiBold {
      font-weight: 600;
    }
    .weatherDate {
      font-size: 16px;
    }
    .weatherFeelLike {
      font-size: 65px;
      line-height: 65px;
      color: linear-gradient(
        180deg,
        #ffffff 36.96%,
        #ffffff 36.97%,
        #dcdcdc 124.58%
      );
    }
    .weatherIcon {
      width: 79px;
      height: 87px;
      content: url("data:image/svg+xml,%3Csvg width='79' height='87' viewBox='0 0 79 87' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M65.3673 21.3592H61.9319C60.9118 17.4084 58.804 13.823 55.848 11.0104C52.8921 8.19768 49.2064 6.27054 45.2099 5.4479C41.2133 4.62527 37.0662 4.94013 33.2397 6.3567C29.4131 7.77328 26.0607 10.2348 23.5632 13.4615C21.0657 16.6882 19.5234 20.5507 19.1115 24.6102C18.6995 28.6697 19.4345 32.7633 21.2329 36.4259C23.0313 40.0885 25.8209 43.1733 29.2849 45.3297C32.7489 47.4861 36.7482 48.6276 40.8285 48.6245H65.3673C68.9829 48.6245 72.4505 47.1882 75.0071 44.6316C77.5637 42.075 79 38.6075 79 34.9919C79 31.3763 77.5637 27.9087 75.0071 25.3521C72.4505 22.7955 68.9829 21.3592 65.3673 21.3592Z' fill='url(%23paint0_linear_6_73)'/%3E%3Cpath d='M41.2355 39.0063L18.423 61.7907L32.9832 65.3964L26.9424 82.8563L49.7549 60.0719L35.1947 56.4662L41.2355 39.0063Z' fill='%23FFE600'/%3E%3Cpath d='M46.3673 16.3592H42.9319C41.9118 12.4084 39.804 8.82303 36.848 6.01036C33.8921 3.19768 30.2064 1.27054 26.2099 0.447904C22.2133 -0.374732 18.0662 -0.0598739 14.2397 1.3567C10.4131 2.77328 7.06066 5.23477 4.56319 8.46147C2.06571 11.6882 0.523385 15.5507 0.111453 19.6102C-0.30048 23.6697 0.434502 27.7633 2.23288 31.4259C4.03126 35.0885 6.82093 38.1733 10.2849 40.3297C13.7489 42.4861 17.7482 43.6276 21.8285 43.6245H46.3673C49.9829 43.6245 53.4505 42.1882 56.0071 39.6316C58.5637 37.075 60 33.6075 60 29.9919C60 26.3763 58.5637 22.9087 56.0071 20.3521C53.4505 17.7955 49.9829 16.3592 46.3673 16.3592Z' fill='url(%23paint1_linear_6_73)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_6_73' x1='49' y1='5' x2='49' y2='48.6245' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23DDDDDD'/%3E%3Cstop offset='1' stop-color='%23BEBEBE'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_6_73' x1='30' y1='0' x2='30' y2='43.6245' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%23DDDBDB'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
    }
  `;
  const WeaterInnerBoxContainer = styled(WeaterBoxContainer)`
    flex-direction: column;
    row-gap: 1px;
    background: rgba(22, 201, 201, 0.64);
    opacity: 0.7;
    border-radius: 22px;
    padding: 15px 25px;
  `;
  const WeaterInnerBoxTitle = styled.span`
    font-size: 15px;
    line-height: 18px;
    text-transform: capitalize;
    text-align: center;
  `;
  const WeaterInnerBoxContent = styled.span`
    font-size: 12px;
    line-height: 15px;
    text-transform: capitalize;
    text-align: center;
  `;
  const ButtonAddWishList = styled.button`
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 0;
    ::after {
      width: 25px;
      height: 25px;
      content: url("data:image/svg+xml,%3Csvg width='25' height='22' viewBox='0 0 25 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.2913 3.61183C20.7805 3.10083 20.1741 2.69547 19.5066 2.41891C18.8392 2.14235 18.1238 2 17.4013 2C16.6788 2 15.9634 2.14235 15.2959 2.41891C14.6285 2.69547 14.022 3.10083 13.5113 3.61183L12.4513 4.67183L11.3913 3.61183C10.3596 2.58013 8.96032 2.00053 7.50129 2.00053C6.04226 2.00053 4.64298 2.58013 3.61129 3.61183C2.5796 4.64352 2 6.04279 2 7.50183C2 8.96086 2.5796 10.3601 3.61129 11.3918L4.67129 12.4518L12.4513 20.2318L20.2313 12.4518L21.2913 11.3918C21.8023 10.8811 22.2076 10.2746 22.4842 9.60718C22.7608 8.93972 22.9031 8.22431 22.9031 7.50183C22.9031 6.77934 22.7608 6.06393 22.4842 5.39647C22.2076 4.72901 21.8023 4.12258 21.2913 3.61183V3.61183Z' stroke='url(%23paint0_linear_6_78)' stroke-width='3' stroke-linecap='round' strokeLinejoin='round'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_6_78' x1='12.4516' y1='2' x2='12.4516' y2='20.2318' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF8F8'/%3E%3Cstop offset='1' stop-color='%23EFEEEE'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
    }
  `;

  useEffect(async () => {
    setLoading(true);
    async function fetchData() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        });
      }
      const request = await axios
        .get(
          `?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=fr&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        )
        .then((response) => {
          if (response.status === 200) {
            setWeather(response.data);
            setLoading(false);
          }
          return () => request;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <WeaterLoading>
        <div className="weatherLoading"></div>
      </WeaterLoading>
    );

  if (!weather)
    return (
      <Weater>
        <p>Donnée Météo non disponible.</p>
      </Weater>
    );

  console.log("weather", weather);

  return (
    <Weater>
      <WeaterBox>
        <WeaterBoxContainer>
          <div className="displayFlex justifyContentSpaceBetween alignItemsCenter">
            <div className="displayFlex flexDirectionColumn">
              <h2>{weather.name}</h2>
              <span className="weatherDate">
                {new Date().toLocaleDateString("fr")}
              </span>
            </div>
            <ButtonAddWishList></ButtonAddWishList>
          </div>
          <div className="displayFlex justifyContentSpaceBetween alignItemsCenter">
            <div className="weatherFeelLike">
              <span className="fontSize85 fontWeightSemiBold">
                {parseInt(weather.main.feels_like)}
              </span>
              <sup className="fontWeightSemiBold">°</sup>c
            </div>
            <div className="weatherIcon"></div>
          </div>
          <div className="displayFlex justifyContentSpaceBetween alignItemsCenter">
            <WeaterInnerBoxContainer>
              <WeaterInnerBoxTitle><i class="wi wi-thermometer"></i>Le plus haut</WeaterInnerBoxTitle>
              <WeaterInnerBoxContent>
                {parseInt(weather.main.temp_max)}
                <sup>°</sup>c
              </WeaterInnerBoxContent>
            </WeaterInnerBoxContainer>
            <WeaterInnerBoxContainer>
              <WeaterInnerBoxTitle><i class="wi wi-thermometer-exterior"></i>Le plus bas</WeaterInnerBoxTitle>
              <WeaterInnerBoxContent>
                {parseInt(weather.main.temp_min)}
                <sup>°</sup>c
              </WeaterInnerBoxContent>
            </WeaterInnerBoxContainer>
          </div>
        </WeaterBoxContainer>
      </WeaterBox>
    </Weater>
  );
}
